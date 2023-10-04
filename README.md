### Penser à exécuter dans le terminal le fichier function.sql après avoir exécuté le fichier create_db.sql afin que celle-ci soit fonctionnelle.

### Exécuter le fichier getGamesIds.js :

commande à effectuer dans le terminal: node getGamesIds.js

Cette opération prend vingt huit secondes et va récupérer tous les ID de jeux de l'API IGDB selon les consoles que l'on a choisi et les enregistre dans le fichier gameData.json

C'est ce fichier gameData.json qui est utilisé par la fonction getGames du gameController.js pour permettre d'afficher aléatoirement des jeux sur la route /games.
