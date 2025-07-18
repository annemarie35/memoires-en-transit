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
Ces projets n'ont pas été maintenu, ceci est une nouvelle occasion en testant cursor et d'autres outils IA.

- Node
- React Next
- Vite
- Vitest

## Démarrage rapide

### 1. Lancer le serveur API (Hapi)

Prérequis 
### Redis
Sur Mac Os
- Installer Redis : `brew install redis`
- Executer Redis : `brew services start redis`
- Stopper Redis : `brew services stop redis` et/ou `pkill redis-server`


Dans un terminal, placez-vous dans le dossier `memories/api` puis lancez :

```bash
npm install
npm run start
```

Le serveur Hapi sera accessible sur [http://localhost:3000](http://localhost:3000)

- Route de test : [http://localhost:3000/hello](http://localhost:3000/hello)
- Route de localisation : [http://localhost:3000/locations](http://localhost:3000/locations)

### 2. Lancer le front (Vite/React)

Dans un autre terminal, placez-vous dans le dossier `memories` puis lancez :

```bash
npm install
npm run dev
```

L'application React sera accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché par Vite).

---




