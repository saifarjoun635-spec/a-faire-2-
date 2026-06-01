from fastapi import FastAPI, APIRouter, HTTPException, Request, Header, UploadFile, File, Form
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import base64
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone

from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest,
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN')

# Predefined donation amounts (CAD) defined server-side
PREDEFINED_AMOUNTS = {
    "25": 25.00,
    "50": 50.00,
    "100": 100.00,
    "250": 250.00,
}
MIN_DONATION = 1.00
MAX_DONATION = 50000.00
DONATION_CURRENCY = "cad"

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: Optional[str] = ""
    message: str


class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    subject: str = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class DonationCheckoutRequest(BaseModel):
    package_id: Optional[str] = None          # predefined amount key
    custom_amount: Optional[float] = None     # custom donation amount
    frequency: str = "one_time"               # "one_time" or "monthly"
    donor_name: Optional[str] = ""
    donor_email: Optional[str] = ""
    origin_url: str


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Groupe Havre d'Amour et de Paix API"}


# ----- Contact -----
@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    contact = Contact(**payload.model_dump())
    await db.contacts.insert_one(contact.model_dump())
    logger.info(f"New contact message from {contact.email}")
    return contact


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts(x_admin_token: Optional[str] = Header(None)):
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


# ----- Careers / Job applications -----
MAX_CV_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_CV_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


@api_router.post("/careers")
async def create_application(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(""),
    position: str = Form(""),
    message: str = Form(""),
    cv: UploadFile = File(...),
):
    content = await cv.read()
    if len(content) > MAX_CV_SIZE:
        raise HTTPException(status_code=400, detail="CV file too large (max 5MB)")
    if cv.content_type not in ALLOWED_CV_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type (PDF, DOC, DOCX only)")

    application = {
        "id": str(uuid.uuid4()),
        "name": name,
        "email": email,
        "phone": phone,
        "position": position,
        "message": message,
        "cv_filename": cv.filename,
        "cv_content_type": cv.content_type,
        "cv_data": base64.b64encode(content).decode("utf-8"),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.applications.insert_one(application)
    logger.info(f"New job application from {email}")
    return {"id": application["id"], "message": "received"}


@api_router.get("/careers")
async def list_applications(x_admin_token: Optional[str] = Header(None)):
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    docs = await db.applications.find(
        {}, {"_id": 0, "cv_data": 0}
    ).sort("created_at", -1).to_list(1000)
    return docs


@api_router.get("/careers/{application_id}/cv")
async def download_cv(application_id: str, token: Optional[str] = None):
    if not ADMIN_TOKEN or token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    doc = await db.applications.find_one({"id": application_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Application not found")
    data = base64.b64decode(doc["cv_data"])
    filename = doc.get("cv_filename", "cv")
    return Response(
        content=data,
        media_type=doc.get("cv_content_type", "application/octet-stream"),
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


# ----- Donations / Stripe -----
def _get_stripe(request: Request) -> StripeCheckout:
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    return StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)


@api_router.post("/donations/checkout")
async def create_donation_checkout(payload: DonationCheckoutRequest, request: Request):
    # Determine amount server-side
    if payload.package_id:
        if payload.package_id not in PREDEFINED_AMOUNTS:
            raise HTTPException(status_code=400, detail="Invalid donation package")
        amount = PREDEFINED_AMOUNTS[payload.package_id]
    elif payload.custom_amount is not None:
        amount = round(float(payload.custom_amount), 2)
        if amount < MIN_DONATION or amount > MAX_DONATION:
            raise HTTPException(status_code=400, detail="Donation amount out of range")
    else:
        raise HTTPException(status_code=400, detail="No amount provided")

    frequency = payload.frequency if payload.frequency in ("one_time", "monthly") else "one_time"

    origin = payload.origin_url.rstrip("/")
    success_url = f"{origin}/don/merci?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/don"

    metadata = {
        "type": "donation",
        "frequency": frequency,
        "donor_name": payload.donor_name or "",
        "donor_email": payload.donor_email or "",
    }

    stripe_checkout = _get_stripe(request)
    checkout_request = CheckoutSessionRequest(
        amount=amount,
        currency=DONATION_CURRENCY,
        success_url=success_url,
        cancel_url=cancel_url,
        metadata=metadata,
    )
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)

    transaction = {
        "id": str(uuid.uuid4()),
        "session_id": session.session_id,
        "amount": amount,
        "currency": DONATION_CURRENCY,
        "frequency": frequency,
        "donor_name": payload.donor_name or "",
        "donor_email": payload.donor_email or "",
        "metadata": metadata,
        "payment_status": "initiated",
        "status": "initiated",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.payment_transactions.insert_one(transaction)

    return {"url": session.url, "session_id": session.session_id}


@api_router.get("/donations/status/{session_id}")
async def donation_status(session_id: str, request: Request):
    txn = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not txn:
        raise HTTPException(status_code=404, detail="Transaction not found")

    # If already finalized, return stored state (avoid double processing)
    if txn.get("payment_status") == "paid":
        return {
            "payment_status": txn["payment_status"],
            "status": txn["status"],
            "amount": txn["amount"],
            "currency": txn["currency"],
            "frequency": txn.get("frequency", "one_time"),
        }

    stripe_checkout = _get_stripe(request)
    checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)

    update = {
        "payment_status": checkout_status.payment_status,
        "status": checkout_status.status,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.payment_transactions.update_one({"session_id": session_id}, {"$set": update})

    return {
        "payment_status": checkout_status.payment_status,
        "status": checkout_status.status,
        "amount": checkout_status.amount_total / 100 if checkout_status.amount_total else txn["amount"],
        "currency": checkout_status.currency or txn["currency"],
        "frequency": txn.get("frequency", "one_time"),
    }


@api_router.get("/donations")
async def list_donations(x_admin_token: Optional[str] = Header(None)):
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    docs = await db.payment_transactions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    stripe_checkout = _get_stripe(request)
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook handling failed")

    if webhook_response.session_id:
        await db.payment_transactions.update_one(
            {"session_id": webhook_response.session_id},
            {"$set": {
                "payment_status": webhook_response.payment_status,
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }},
        )
    return {"received": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
