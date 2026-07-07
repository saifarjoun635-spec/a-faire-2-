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

## Refonte visuelle — Juin 2026 (itération 3)
- Palette revue plus vivante : vert forêt #1C743B, orange chaud #E66C37, fond #FBF9F6, cartes blanches, texte #1B2A20 (remap global via sed sur tout src/).
- Images de fond désormais VISIBLES sur chaque section (technique : image bg-cover + voile dégradé /75-/90 + contenu z-10) sur toutes les pages.
- Héros de l'accueil : image pleine page (infirmière/aînée chaleureuse) avec effet ken-burns, texte blanc.
- Badge "Organisme à but non lucratif" remplacé par « Au service des personnes vulnérables » / "Serving vulnerable people" (translations.js l.22/298).
- Nouvelles photos chaleureuses (Unsplash validées) : heroNurse, cozyHouse, elderlyDancing, homeCare, seniorsTalking, softLight. Photos caregiverHands (sombre) et abstractBg supprimées de media.js.
- Cartes services avec photo en tête sur Accueil et Services. Section Régions inchangée (demande utilisateur).
- Testé : iteration_3.json — 100% frontend, aucun bug, formulaires Contact/Carrières/Don OK, Stripe OK, Loi 25 OK, mobile OK.

## Optimisation photos + UX (audit utilisateur) — Juin 2026 (itération 4)
- Poids images accueil : 5,7 Mo → ~915 Ko. Lobby PNG 1,9 Mo → WebP locaux /images/lobby1.webp & lobby2.webp (~73 Ko, balance des blancs corrigée + crop droit photo 1). Pexels avec ?auto=compress&cs=tinysrgb&w=800. Unsplash avec w= params.
- loading="lazy" + width/height explicites sur toutes les <img> (sauf héros en CSS bg).
- Authenticité : carte « Hébergement (RI) » utilise les vraies photos du lobby (Accueil + Services). Image IA growthHands supprimée partout (Don, devise, bannières) → vraies photos humaines.
- Crédits photo CC ajoutés sur les 4 cartes Régions (Vreee, Wladyslaw, Quintin Soloviev, Arctic.gnome) — conformité licences Wikimedia.
- Téléphone cliquable (tel:) dans le header desktop + icône mobile + entrée menu mobile.
- index.html : lang="fr", meta description unique FR, theme-color #1C743B. ⚠️ Nécessite restart frontend après modif de public/index.html (CRA ne hot-reload pas ce fichier).
- Contraste : orange texte sur fond clair foncé à #AD4A1F (WCAG). Texte mort « prélèvement récurrent » (monthlyNote) vidé.
- Testé : iteration_4.json — 9/9 critères PASS, 100 % frontend + formulaires/Stripe OK.
- Reste côté utilisateur : domaine personnalisé à configurer avant lancement (via déploiement Emergent).


## Nettoyage des images mal cadrées — Février 2026 (itération 6)
- Retrait des images de fond où les visages étaient coupés (plainte utilisateur : "faces cropped mid-image").
- Sections converties en dégradés sobres (vert forêt → orange chaud, avec accents radiaux) :
  - Home : Hero, Notre devise, Bannière don « Votre générosité transforme des vies »
  - Services : Hero + section blocs (fond crème)
  - Résidences : Hero + section Loisirs & activités (dégradé orange chaud)
  - À propos : Hero + section Nos engagements (fond vert clair) + section Notre engagement (dégradé vert)
  - Régions : Hero
  - Carrières : Hero
- Photos conservées (bien cadrées) : cartes services (grille), image "Un véritable milieu de vie" (lobby2), galerie résidences, photos de ville (Régions), image de la section "Pourquoi nous rejoindre" (Carrières).
- Photo d'enfant (>5 ans) NON ajoutée : reportée pour éviter tout nouveau problème de cadrage — à préciser avec l'utilisateur (image fournie ou requête spécifique).
