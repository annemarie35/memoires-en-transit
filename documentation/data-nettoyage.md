# NETTOYAGE DES DONNEES

Le formulaire de réponse contient beaucoup de champ libre, il faut uniformiser les informations.
Les scripts peuvent évoluer pour prendre en compte ces cas.


## Nom de ville manquante
Si la ville concernée par le témoignage, remplacer le champ vide par "Ville non renseignée"
```json
{
  "testimonyCity": "Ville non renseignée"
}
```

- Si le département est renseigné, mettre les coordonnées d'une ville au centre du département.

- si le département est manquant, mettre les coordonnées de Jersey, l'anomalie se verra sur la carte.
```json
{
  "testimonyLocation": [
    49.2157750,
    -2.1217346
  ]
}
```

Si plusieurs villes :
Récupérer les coordonnées de la première
```
{
    "testimonyCity": "Châlette-sur-Loing, Ferrières-en-Gâtinais",
}
```