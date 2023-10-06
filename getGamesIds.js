/* The API only allows us to retrieve 500 games per request and it does not allow us to retrieve games randomly
 This file is used to retrieve all the game IDs depending on the platforms we have chosen from the IGDB API
 The retrieved IDS are automatically stored in a JSON file in our application
 The "getGames" function of the datamapper will retrieve 500 random Ids in this JSON file for each request 
 and call the IGDB API to retrieve the information of the corresponding games 
 This allows new games to be displayed on the home page at each refresh. 
 */
 
const axios = require("axios");
const fs = require("fs");

require("dotenv").config();


  async function getGamesIds () {
    // We create a array in which the IDS of the games will be stored.
    const listOfGamesIds = [];
    // We retrieve all games in groups of 500 from the IGDB API
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
        // Once we have retrieved all the games, we stop the loop
        if (result.data.length == 0) {
          break;
        }
        // At each request we add each game retrieved in our array
        result.data.forEach((game) => {
          listOfGamesIds.push(game.id);
        });
      } catch (error) {
        console.log(error);
      }
    }

    // We construct a JSON object with all the retrieved IDS
    const jsonData = {
      gameIds: listOfGamesIds,
    };

    // We create a JSON file where we save our JSON object
    fs.writeFile("./app/data/gameData.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier JSON : ", err);
      } else {
        console.log("Données stockées dans gameData.json avec succès !");
      }
    });
  };


getGamesIds();
