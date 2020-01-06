**TP - Dart Master**

Énoncé: 

Vous avez eu la super idée d'acheter un jeu de fléchettes électroniques pour occuper les pauses dans votre boîte. Petit soucis, vous oublié qu'Antonin (votre collègue un peu bourrin) aurait de grandes chances de le casser en jouant avec.

Quelques jours plus tard, ce qui devait arrivait, arriva, et l'écran du jeu ne fonctionne plus. Vous êtes maintenant obligé de tenir les scores à la main.

C'est long et pénible, sans compter les erreurs de calculs. Heureusement vous êtes développeur, vous allez pouvoir faire un progamme qui gère les scores pour 3 modes de jeux.



Contraintes fonctionnelles:

- Vous devez pouvoir choisir entre 2 et N joueurs et le mode de jeu, au début de la partie
- Gérer un input manuel (1ere partie du TP)
- Gérer un input via une API (2ème partie)
- Stocker les parties et les utilisateurs en base de données (3eme partie)
- Le détail des règles pour chaque mode de jeu est détaillé plus bas
- Vous devez pouvoir choisir entre 2 et N joueurs et le mode de jeu, au début de la partie
- La partie doit pouvoir continuer jusqu'à définir l'ordre de l'ensemble des joueurs
- Le joueur qui commence est choisi aléatoirement
- Modes de jeu
  - **N*1 - le tour du Monde**: chaque joueur lance 3 flechettes, le but est toucher les secteurs de 1 à 20, dans l'ordre. Un fois un secteur touché, il est dévérouillé et le joueur peut ainsi viser le secteur suivant. Le premier joueur à dévérouiller le secteur 20 a gagné
  - **N*2 - le 301**: chaque joueur commence avec un score de 301, Le but du jeu est de réduire son nombre de points. Le premier joueur qui arrive exactement à zéro a gagné. Si un joueur réalise plus de points qu'il n'en reste à soustraire, son tour n'est pas pris en compte. Attention, il faut absolument atteindre zéro en terminant par un double
  - **N*3 - le Cricket**: voici les règles, un peu plus complexes cette-fois http://jeudeflechette.fr/variantes-cricket/



Contraintes techniques:

**1ere Partie (input manuel)**

	- Le progamme doit être en nodeJS
	- Accessible directement depuis un terminal (conseil: console.table pour gérer l'affichage)
	- L'input du score de chaque joueur se fait via le terminal (conseil: Inquierer)
	- Vous devez gérer votre logique avec des classes, et de l'héritage de classe
	- (Bonus: le nom du joueur est annoncé au début de son tour, vous pouvez utiliser l'api Dialogflow)


**2eme Partie (input distant)**

