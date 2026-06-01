"""
Backend API tests for Groupe Havre d'Amour et de Paix.
Covers:
- Root /api/
- Contact create + admin list
- Donation checkout (package, custom, validation)
- Donation status
- Donation admin list
"""
import os
import uuid
import pytest
import requests
from dotenv import load_dotenv
from pathlib import Path

# Load frontend .env to get REACT_APP_BACKEND_URL
load_dotenv(Path(__file__).resolve().parents[2] / 'frontend' / '.env')

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_TOKEN = "ghap2025admin"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
class TestRoot:
    def test_root_message(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Havre" in data["message"]


# ---------- Contact ----------
class TestContact:
    def test_create_contact_valid(self, session):
        payload = {
            "name": "TEST_Jean Tremblay",
            "email": f"TEST_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "514-555-1234",
            "subject": "Question test",
            "message": "Ceci est un message de test automatisé.",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data
        assert "created_at" in data

    def test_create_contact_invalid_email(self, session):
        payload = {
            "name": "TEST_Bad Email",
            "email": "not-an-email",
            "message": "msg",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_list_contacts_requires_admin_token(self, session):
        r = session.get(f"{API}/contact")
        assert r.status_code == 401

    def test_list_contacts_wrong_token(self, session):
        r = session.get(f"{API}/contact", headers={"X-Admin-Token": "wrong"})
        assert r.status_code == 401

    def test_list_contacts_with_token(self, session):
        r = session.get(f"{API}/contact", headers={"X-Admin-Token": ADMIN_TOKEN})
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # At least one contact should exist after create above
        assert len(data) >= 1
        for c in data[:5]:
            assert "_id" not in c
            assert "email" in c


# ---------- Donations ----------
class TestDonationCheckout:
    def test_checkout_package_50(self, session):
        payload = {
            "package_id": "50",
            "frequency": "one_time",
            "donor_name": "TEST_Donor",
            "donor_email": "TEST_donor@example.com",
            "origin_url": "https://example.com",
        }
        r = session.post(f"{API}/donations/checkout", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "url" in data
        assert "session_id" in data
        assert "checkout.stripe.com" in data["url"]
        # Save session_id for status tests
        pytest.session_id_pkg = data["session_id"]

    def test_checkout_custom_amount(self, session):
        payload = {
            "custom_amount": 12.50,
            "frequency": "monthly",
            "origin_url": "https://example.com",
        }
        r = session.post(f"{API}/donations/checkout", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "checkout.stripe.com" in data["url"]

    def test_checkout_amount_too_low(self, session):
        r = session.post(f"{API}/donations/checkout", json={
            "custom_amount": 0.5,
            "origin_url": "https://example.com",
        })
        assert r.status_code == 400

    def test_checkout_amount_too_high(self, session):
        r = session.post(f"{API}/donations/checkout", json={
            "custom_amount": 50001,
            "origin_url": "https://example.com",
        })
        assert r.status_code == 400

    def test_checkout_no_amount(self, session):
        r = session.post(f"{API}/donations/checkout", json={
            "origin_url": "https://example.com",
        })
        assert r.status_code == 400

    def test_checkout_invalid_package(self, session):
        r = session.post(f"{API}/donations/checkout", json={
            "package_id": "999",
            "origin_url": "https://example.com",
        })
        assert r.status_code == 400

    def test_donation_status(self, session):
        sid = getattr(pytest, "session_id_pkg", None)
        if not sid:
            pytest.skip("No session_id from previous test")
        r = session.get(f"{API}/donations/status/{sid}")
        assert r.status_code == 200
        data = r.json()
        assert "payment_status" in data
        assert "status" in data
        assert "amount" in data
        assert data["currency"].lower() == "cad"

    def test_donation_status_not_found(self, session):
        r = session.get(f"{API}/donations/status/nonexistent_session_xyz_123")
        assert r.status_code == 404


# ---------- Careers / Applications ----------
class TestCareers:
    _created_id = None

    def test_create_application_valid_pdf(self, session):
        s = requests.Session()  # multipart needs no JSON content-type
        files = {
            "cv": ("test_cv.pdf", b"%PDF-1.4\n%TEST_CV_CONTENT\n%%EOF", "application/pdf"),
        }
        data = {
            "name": "TEST_Applicant",
            "email": f"TEST_app_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "514-555-9999",
            "position": "Préposé(e) aux bénéficiaires",
            "message": "Candidature de test automatisée.",
        }
        r = s.post(f"{API}/careers", data=data, files=files)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "id" in body
        assert body["message"] == "received"
        TestCareers._created_id = body["id"]

    def test_create_application_rejects_oversized(self, session):
        s = requests.Session()
        big = b"%PDF-1.4\n" + (b"A" * (5 * 1024 * 1024 + 100))
        files = {"cv": ("big.pdf", big, "application/pdf")}
        data = {"name": "TEST_Big", "email": "TEST_big@example.com"}
        r = s.post(f"{API}/careers", data=data, files=files)
        assert r.status_code == 400
        assert "too large" in r.text.lower()

    def test_create_application_rejects_invalid_type(self, session):
        s = requests.Session()
        files = {"cv": ("evil.png", b"\x89PNG\r\n\x1a\nFAKE", "image/png")}
        data = {"name": "TEST_Bad", "email": "TEST_bad@example.com"}
        r = s.post(f"{API}/careers", data=data, files=files)
        assert r.status_code == 400
        assert "invalid file type" in r.text.lower()

    def test_list_applications_requires_token(self, session):
        r = session.get(f"{API}/careers")
        assert r.status_code == 401

    def test_list_applications_wrong_token(self, session):
        r = session.get(f"{API}/careers", headers={"X-Admin-Token": "wrong"})
        assert r.status_code == 401

    def test_list_applications_with_token_no_cv_data(self, session):
        r = session.get(f"{API}/careers", headers={"X-Admin-Token": ADMIN_TOKEN})
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        for ap in data[:5]:
            assert "_id" not in ap
            assert "cv_data" not in ap, "cv_data must not be exposed in listing"
            assert "email" in ap
            assert "cv_filename" in ap

    def test_download_cv_requires_token(self, session):
        if not TestCareers._created_id:
            pytest.skip("no application id available")
        r = requests.get(f"{API}/careers/{TestCareers._created_id}/cv")
        assert r.status_code == 401

    def test_download_cv_wrong_token(self, session):
        if not TestCareers._created_id:
            pytest.skip("no application id available")
        r = requests.get(f"{API}/careers/{TestCareers._created_id}/cv?token=wrong")
        assert r.status_code == 401

    def test_download_cv_success(self, session):
        if not TestCareers._created_id:
            pytest.skip("no application id available")
        r = requests.get(f"{API}/careers/{TestCareers._created_id}/cv?token={ADMIN_TOKEN}")
        assert r.status_code == 200
        assert r.headers.get("content-type", "").startswith("application/pdf")
        assert b"%PDF" in r.content


class TestDonationAdmin:
    def test_list_donations_requires_token(self, session):
        r = session.get(f"{API}/donations")
        assert r.status_code == 401

    def test_list_donations_with_token(self, session):
        r = session.get(f"{API}/donations", headers={"X-Admin-Token": ADMIN_TOKEN})
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        # Verify initiated status & amount field
        first = data[0]
        assert "session_id" in first
        assert "amount" in first
        assert "payment_status" in first
        assert "_id" not in first
