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
