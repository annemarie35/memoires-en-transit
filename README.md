# MEMOIRES EN TRANSIT

Le projet de cartographier des mémoires éparses et multiples autour de l'immigration portugaise. Qu'ont ces lieux à nous dire ?

Un projet a été lancé par l'association Mémoire Vive en 2020 [Appel pour une collecte de témoignages sur le racisme anti-portugais en France](https://www.memoria-viva.fr/mv2-archives/?p=2399)
Les témoignages utilisés ici proviennent de cette récolte.

Sources :

- https://www.memoria-viva.fr/category/les-projets/les-deserteurs-des-guerres-coloniales-portugaises-1961-1975/
- http://www.sudexpress.org/
- https://ecosexilios-cria.org/fr/

## Stack technique

Ce projet a fait l'object d'un premier test avec un [front en react](https://github.com/asso-memoire-vive/memoires-en-transit) et une [api en python](https://github.com/annemarie35/memoires-en-transit-api).
Ces projets n'ont pas été maintenus, ceci est une nouvelle occasion en testant cursor et d'autres outils IA avec :

- Node
- React Next
- Vite
- Vitest

## Démarrage rapide

### 1. Lancer le front (Vite/React)

Dans un autre terminal, placez-vous dans le dossier `memories` puis lancez :

```bash
npm install
cp .env.example .env   # puis renseignez CARTO_API_KEY
npm run dev
```

En développement et en test, le fond de carte utilise les tuiles CARTO, qui nécessitent une clé API depuis septembre 2026 (sans clé, la carte affiche « API KEY REQUIRED »).
Une clé gratuite peut être obtenue sur [carto.com/basemaps/apikey](https://carto.com/basemaps/apikey), sans compte CARTO.
En production (`npm run build`), la carte utilise les tuiles [OpenStreetMap](https://tile.openstreetmap.org) : aucune clé n'est nécessaire et la clé CARTO n'est pas incluse dans le build.

L'application React sera accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché par Vite).
