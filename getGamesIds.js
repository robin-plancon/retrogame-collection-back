const axios = require("axios");
const fs = require("fs"); // Importez le module fs

require("dotenv").config();

const gameDataMapper = {
  getGames: async function () {
    const listOfGamesIds = [];

    for (let offset = 0; offset < 400000; offset += 500) {
      try {
        const result = await axios({
          method: "POST",
          url: "https://api.igdb.com/v4/games",
          headers: {
            Accept: "application/json",
            "Client-ID": process.env.PG_CLIENT_ID,
            "Authorization": process.env.PG_AUTHORIZATION,
          },
          data: `fields id; sort id desc; where platforms = (4, 7, 15, 16, 18, 19, 22, 24, 25, 26, 27, 29, 30, 32, 33, 35, 50, 51, 53, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 75, 78, 79, 80, 84, 86, 87, 88, 89, 90, 93, 94, 99, 114, 115, 117, 119, 120, 123, 128, 136, 142, 154, 158, 274, 373, 410); limit 500; offset ${offset};`,
        });

        if (result.data.length == 0) {
          break;
        }
        result.data.forEach((game) => {
          listOfGamesIds.push(game.id);
        });
      } catch (error) {
        console.log(error);
      }
    }

    // Construisez un objet JSON avec les données que vous souhaitez stocker
    const jsonData = {
      gameIds: listOfGamesIds,
    };

    // Utilisez fs.writeFile() pour écrire l'objet JSON dans un fichier
    fs.writeFile("gameData.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier JSON : ", err);
      } else {
        console.log("Données stockées dans gameData.json avec succès !");
      }
    });
  },
};

// Appelez la fonction getGames pour déclencher la récupération des données et la sauvegarde dans le fichier JSON
gameDataMapper.getGames();
