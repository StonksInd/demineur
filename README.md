# Démineur JavaScript

Un jeu de démineur classique développé en JavaScript vanilla avec une interface HTML/CSS simple.

##  Description du projet

Ce projet implémente le célèbre jeu de démineur avec plusieurs niveaux de difficulté. Le joueur doit révéler toutes les cases sans bombes en utilisant les indices numériques qui indiquent le nombre de bombes adjacentes.

##  Technologies utilisées

- **HTML5** : Structure de la page et interface utilisateur
- **CSS3** : Stylisation (classes Tailwind CSS mentionnées mais non implémentées)
- **JavaScript Vanilla** : Logique du jeu, gestion des événements et manipulation DOM

##  Fonctionnalités

###  Fonctionnalités implémentées

- **4 niveaux de difficulté** :
  - Débutant : 9x9 cases, 10 bombes
  - Intermédiaire : 16x16 cases, 40 bombes
  - Expert : 22x22 cases, 100 bombes
  - Maître : 30x30 cases, 250 bombes

- **Génération dynamique de la grille** selon la difficulté choisie
- **Placement aléatoire des bombes** sans redondance
- **Calcul automatique des nombres** indiquant les bombes adjacentes
- **Révélation en cascade** des cases vides (propagation automatique)
- **Système de drapeaux** (clic droit) pour marquer les bombes supposées
- **Timer intégré** qui se lance au début de la partie
- **Détection de victoire** quand tous les drapeaux sont correctement placés
- **Détection de défaite** quand une bombe est révélée

###  Interactions utilisateur

- **Clic gauche** : Révéler une case
- **Clic droit/molette** : Placer/retirer un drapeau
- **Prévention du menu contextuel** sur clic droit

##  Comment jouer

1. **Choisir la difficulté** en cliquant sur l'un des boutons
2. **Lancer le jeu** en cliquant sur "Lancer le jeu"
3. **Révéler les cases** avec le clic gauche
4. **Marquer les bombes** avec le clic droit (drapeau 🚩)
5. **Gagner** en plaçant correctement tous les drapeaux sur les bombes

##  Structure du projet

```
code/
├── index.html          # Interface utilisateur et structure HTML
├── index.js            # Logique principale du jeu
└── README.md           # Documentation (ce fichier)

Fichiers de configuration :
├── .gitattributes      # Configuration Git pour la normalisation
├── .gitignore          # Fichiers/dossiers à ignorer par Git
└── TODO.txt            # Liste des tâches de développement
```

##  Variables globales principales

- `grid_demineur[][]` : Tableau 2D contenant la grille de jeu
- `tab_3x3_coord_case[]` : Coordonnées relatives des 8 cases adjacentes
- `coord_bomb_placed[]` : Positions des bombes placées
- `revealed_cases[][]` : État de révélation de chaque case
- `timer`, `seconds`, `minutes` : Gestion du chronomètre
- `flag_count` : Compteur de drapeaux placés

##  Installation et utilisation

1. **Cloner le projet** ou télécharger les fichiers
2. **Ouvrir `code/index.html`** dans un navigateur web
3. **Commencer à jouer** !

Aucune installation de dépendances n'est nécessaire - le jeu fonctionne entièrement côté client.

## Algorithmes clés

### Génération des bombes
- Génération de coordonnées aléatoires
- Vérification de non-redondance
- Placement jusqu'à atteindre le nombre requis

### Calcul des nombres adjacents
- Parcours de chaque case non-bombe
- Vérification des 8 cases adjacentes
- Comptage des bombes environnantes

### Révélation en cascade
- Algorithme récursif pour les cases vides (valeur "00")
- Propagation aux cases adjacentes
- Arrêt sur les cases avec drapeaux ou déjà révélées

## État du développement

Le jeu est **entièrement fonctionnel** avec toutes les fonctionnalités de base du démineur classique. Voir `TODO.txt` pour les améliorations possibles (notamment l'ajout de CSS pour l'effet de survol).

## Interface utilisateur

- Header avec timer et sélection de difficulté
- Grille de jeu générée dynamiquement
- Boutons représentant les cases du jeu
- Affichage des bombes (💣) et drapeaux (🚩)

---

*Projet développé en JavaScript vanilla pour une expérience de jeu de démineur complète et interactive.*