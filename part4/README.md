# HBnB - Partie 4 : Frontend dynamique et intégration API

## Présentation

Cette partie du projet HBnB propose une interface web moderne permettant :
- d’afficher dynamiquement la liste des hébergements depuis l’API,
- de consulter les détails d’un lieu (description, prix, hôte, avis, etc.),
- de filtrer les lieux par prix,
- de se connecter pour pouvoir ajouter un avis (review) sur un lieu,
- de bénéficier d’une expérience utilisateur fluide et responsive.

Le frontend est réalisé en HTML, CSS et JavaScript vanilla, et communique avec l’API Flask développée dans les parties précédentes.

---

## Fonctionnalités principales

- **Affichage dynamique des lieux** :  
  La page d’accueil (`index.html`) affiche la liste des hébergements récupérés via l’API. Les cartes sont générées dynamiquement en JS.

- **Filtrage par prix** :  
  Un menu déroulant permet de filtrer les lieux selon un prix maximum.

- **Consultation des détails** :  
  En cliquant sur "View Details", l’utilisateur accède à la page de détails du lieu (`place.html`) : description, hôte, prix, commodités, image, et liste des avis.

- **Gestion des avis (reviews)** :  
  - Tous les utilisateurs peuvent lire les avis.
  - Seuls les utilisateurs connectés peuvent ajouter un avis via le formulaire (affiché uniquement si connecté).
  - Les messages d’erreur ou de succès sont affichés dynamiquement.

- **Authentification** :  
  - Un formulaire de connexion (`login.html`) permet de s’authentifier.
  - Le token JWT est stocké en cookie et utilisé pour les requêtes protégées (ajout d’avis).
  - Le lien "Login" s’affiche ou disparaît selon l’état de connexion.

- **Accessibilité et responsive** :  
  - Les titres cachés (`visually-hidden`) améliorent l’accessibilité.
  - Le design s’adapte aux différents écrans.

---

## Structure des fichiers

```
part4/
│
├── index.html         # Page d’accueil, liste des lieux
├── place.html         # Détail d’un lieu et ses avis
├── login.html         # Formulaire de connexion
├── add_review.html    # (optionnel) Formulaire d’ajout d’avis isolé
├── styles.css         # Feuille de style principale
├── scripts.js         # Logique JS (auth, affichage dynamique, appels API)
├── images/            # Images utilisées (lieux, icônes, logo)
└── README.md          # Ce fichier
```

---

## Utilisation

1. **Lancer le backend**  
   Assure-toi que l’API Flask (partie 3) tourne sur `http://127.0.0.1:5000`.

2. **Ouvrir le frontend**  
   Ouvre `index.html` dans ton navigateur (via un serveur local pour éviter les problèmes CORS).

3. **Naviguer**  
   - Parcours la liste des lieux, filtre par prix.
   - Clique sur "View Details" pour voir les détails et les avis.
   - Connecte-toi via "Login" pour pouvoir ajouter un avis.

---

## Points techniques importants

- **Sécurité** :  
  - Les endpoints GET sont publics (affichage des lieux et avis).
  - L’ajout d’avis (POST) nécessite un token JWT valide.
  - Le formulaire d’avis n’est affiché que si l’utilisateur est connecté.

- **Dynamisme** :  
  - Toutes les données sont injectées dynamiquement en JS.
  - Les erreurs et succès sont gérés côté client.

- **Accessibilité** :  
  - Utilisation de titres cachés pour les lecteurs d’écran.
  - Navigation claire et boutons accessibles.

---

## Auteurs

- Guillaume Font (FontGuillaume)
- Projet Holberton School

---

## Remarques

- Pour toute question ou bug, merci d’ouvrir une issue ou de contacter l’auteur.
- Ce projet est réalisé dans le cadre du cursus Holberton School.

---

**Bon test et bonne navigation sur HBnB