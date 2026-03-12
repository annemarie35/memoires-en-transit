# Mémoires en Transit — CLAUDE.md

## Description du projet

Application de cartographie des mémoires de l'immigration portugaise en France. Elle permet de visualiser sur une carte interactive des témoignages collectés par l'association Mémoire Vive.

## Architecture

Le projet est composé de deux parties distinctes :

### `api/` — Serveur Hapi (Node/TypeScript)
- Port : `3000`
- Prérequis : Redis (cache geocoding, TTL 7 jours)
- Routes :
  - `GET /locations?q=...` — geocoding via Nominatim (avec cache Redis)
  - `GET /testimonies` — renvoie les témoignages depuis `data/temoignages-enriched.json`
  - `GET /hello` — route de test
- Commandes : `npm run start` | `npm run dev` | `npm test`

### `memories/` — Front React/Vite (TypeScript)
- Port : `5173`
- Stack : React 19, Vite, Leaflet (react-leaflet), Tailwind CSS v4, React Router
- Commandes : `npm run dev` | `npm test` | `npm run build`

## Structure du front (`memories/src/`)

```
application/     — logique métier (get-markers, get-testimonies)
components/      — composants UI (Map, MapSection, MapTypeSelector, Testimony, Menu, Layout…)
infrastructure/  — accès données (appel API)
pages/           — pages (About, Testimonies)
types/           — types TypeScript partagés
```

## Données

Les données sources sont dans `api/data/` :
- `temoignages.csv` — données brutes
- `temoignages.json` — converties en JSON
- `temoignages-clean.json` — nettoyées
- `temoignages-enriched.json` — enrichies avec coordonnées géographiques (utilisé en production)
- Scripts de transformation dans `api/helpers/`

## Commandes utiles

```bash
# Démarrer Redis (macOS)
brew services start redis

# API
cd api && npm run dev

# Front
cd memories && npm run dev

# Tests
cd api && npm test
cd memories && npm test
```

## Conventions

- Langue du code : anglais ; langue de l'UI et des données : français
- Tests avec Vitest (front et api)
- Linting ESLint + Prettier sur le front
