# Préparation du déploiement Vercel — 11 mars 2026

## Objectif

Rendre l'application déployable sur Vercel en supprimant les dépendances incompatibles avec un environnement serverless (Redis, serveur Hapi persistant) et en passant les données statiques directement dans le front.

---

## Changements effectués

### 1. Suppression de Redis et simplification de l'API

- **`api/server.ts`** : suppression de Redis (import, connexion, TTL, cache), suppression de la route `/testimonies`. La route `/locations` appelle désormais Nominatim directement sans cache.
- **`api/package.json`** : suppression de la dépendance `redis`.

L'API Hapi reste un outil **local uniquement**, utilisé pour l'enrichissement des données (géocodage). Elle n'est plus nécessaire en production.

### 2. Données témoignages servies statiquement

- **`api/data/temoignages-enriched.json`** copié dans **`memories/public/`**.
- **`memories/src/infrastructure/get-testimonies.ts`** : l'URL passe de `http://localhost:3000/testimonies` à `/temoignages-enriched.json`.
- Le front est désormais **entièrement statique** : aucun appel API au runtime.

### 3. Configuration Vercel

- Création de **`vercel.json`** à la racine :
  - `buildCommand` : build depuis `memories/`
  - `outputDirectory` : `memories/dist`
  - `rewrites` : redirection vers `index.html` pour React Router (SPA)

### 4. Correction du build TypeScript

- **`memories/src/application/get-markers.ts`** : `theme?: [string]` (tuple) corrigé en `theme?: string[]`.

### 5. Filtre par ville sur la carte

- **`get-markers.ts`** : ajout du champ `city` dans le type `Marker`.
- **`App.tsx`** : état `selectedCity`, liste `cities`, filtrage des marqueurs.
- **`MapSection.tsx`** : ajout d'un `<select>` "Toutes les villes" avec une option par ville.

### 6. Affichage des thèmes dans la page Témoignages

- **`memories/src/pages/Testimonies.tsx`** : `testimonyTheme` (chaîne CSV) splitté et affiché sous forme de tags individuels (`bg-yellow-100`, coins arrondis).

### 7. Corrections de tests

| Fichier | Problème | Correction |
|---|---|---|
| `Testimony.test.tsx` | `getByText('F')` ne matchait pas `"Qui ? F"` (deux nœuds texte) | Assertions mises à jour ; test thèmes adapté au bloc commenté |
| `Map.test.tsx` | Mock `leaflet` sans `divIcon` ; mock `react-leaflet` sans `Tooltip` ; `getByText` ambigu sur titre dupliqué | Ajout `divIcon`, `Tooltip` au mock ; passage à `getAllByText` |
| `MapSection.test.tsx` | Champ `city` manquant dans les fixtures, nouveaux props requis | Fixtures et props mis à jour |

---

## État final

- `npm run build` dans `memories/` : vert
- Tous les tests : verts
- Déploiement : connecter le dépôt GitHub sur [vercel.com](https://vercel.com), le `vercel.json` est détecté automatiquement
