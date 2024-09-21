# KwykSmart

KwykSmart est une extension Chrome pour copier facilement les questions et les calculs de Kwyk.fr dans le presse-papier.

## Fonctionnalités

- Copie automatiquement les questions et les calculs de Kwyk.fr.
- Possibilité de copier les calculs en format LaTeX ou KaTeX.
- Interface utilisateur pour gérer les préférences de copie.

## Installation

1. Clonez ce dépôt ou téléchargez-le en tant que fichier ZIP et extrayez-le.
2. Ouvrez Chrome et accédez à `chrome://extensions/`.
3. Activez le mode développeur en haut à droite.
4. Cliquez sur "Charger l'extension non empaquetée" et sélectionnez le dossier extrait ou cloné.

## Utilisation

1. Accédez à une page de devoirs ou d'exercices sur Kwyk.fr.
2. L'extension affichera un popup demandant si vous souhaitez copier les questions et les calculs.
3. Sélectionnez "Oui" pour copier le contenu dans le presse-papier.

## Scripts principaux

### `background.js`

- Gère l'installation de l'extension et les messages de communication entre les scripts de contenu et l'arrière-plan.

### `content.js`

- Affiche un popup sur les pages pertinentes de Kwyk.fr.
- Extrait le texte des questions et des calculs KaTeX ou LaTeX et les copie dans le presse-papier.

### `popup.html`

- Interface utilisateur pour activer ou désactiver la copie en mode LaTeX.

## Permissions

- `activeTab`: Pour accéder à l'onglet actif.
- `clipboardWrite`: Pour écrire dans le presse-papier.
- `storage`: Pour stocker les préférences de l'utilisateur.

## Contribuer

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request pour toute amélioration ou correction.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.