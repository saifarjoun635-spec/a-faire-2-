# PRD — Groupe Havre d'Amour et de Paix inc.

## Original problem statement
Bilingual (FR/EN) website for a Quebec OBNL: Ressource Intermédiaire (RI) + Centre de Répit
serving vulnerable people (seniors, DI-TSA, mental health). Needs: services, residences gallery,
mission/vision/values, national presence (Montréal, Outaouais, Mauricie, Ottawa), contact page,
and online donation/payment. Warm, dignified design.

Coordonnées: 514-464-5880 · info@ghap-hlpg.ca · 245 boulevard Robert Bourassa, unité 1104, Montréal, QC, H3C 1A4.

## User choices
- Payments: simplest reliable → Stripe Checkout (test key from env, no user effort).
- Contact: least effort → stored in MongoDB, viewable in simple admin panel (no email API).
- Donations: predefined (25/50/100/250) + custom, one-time + monthly.
- Design: created (warm/organic — olive green, terracotta, warm sand; Playfair Display + Manrope).
- Photos: provided residence photos used in gallery, not 100% central (more residences coming).

## Architecture
- Backend FastAPI (/app/backend/server.py): /api/contact (POST/GET admin), /api/donations/checkout,
  /api/donations/status/{id}, /api/donations (GET admin), /api/webhook/stripe. Collections: contacts, payment_transactions.
- Frontend React + Tailwind + framer-motion + sonner. i18n via LanguageContext (FR/EN).
  Routes: / /services /residences /a-propos /regions /contact /don /don/merci /admin.
- Auth: admin panel gated by X-Admin-Token (ADMIN_TOKEN env = ghap2025admin). No user accounts.

## Implemented (2026-05-30)
- Full bilingual marketing site, all pages, design-compliant.
- Stripe donation flow (preset + custom, one-time/monthly), status polling on /don/merci.
- Contact form → DB; admin dashboard listing messages + donations.
- Tested: backend 16/16 pass, frontend all critical flows pass.

## Known limitations
- Monthly donations are processed as a single Stripe Checkout charge; true auto-recurring billing
  (Stripe subscriptions) is NOT automated — UI notes that the team will contact the donor to set up recurrence.

## Backlog / Next
- P1: True recurring billing via Stripe subscriptions (price_id) for monthly donors.
- P1: Email notification to org on new contact message / donation (Resend/SendGrid — needs key).
- P2: Tax receipt generation for donations (OBNL).
- P2: Per-residence pages as the network grows; CMS-style content editing.
- P2: Multi-region landing content per region.
