const axios = require('axios');
require('dotenv').config();
const gameData = require('../data/gameData.json');


const gameDataMapper = {
  
  // Retrieve all games from specific list of platforms from IGDB API
  getGames: async function () {
    
    const randomIdsArray= []
    
    for (const id of gameData.gameIds) {
      if (randomIdsArray.length >= 500) {
        break;
      }
      const randomNumber= Math.floor( Math.random()*(gameData.gameIds.length));
      const randomApiId= gameData.gameIds[randomNumber];
      const checkDuplicate= randomIdsArray.some((id) => id == randomApiId ); 
      if (!checkDuplicate) {
        randomIdsArray.push(randomApiId) 
      }
    }
    console.log("Le tableau avant requête :",randomIdsArray)
    const randomIdsList= randomIdsArray.join()
    try{
      const result = await axios(
        
        { method: 'POST',
        url: "https://api.igdb.com/v4/games",
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.PG_CLIENT_ID,
          'Authorization': process.env.PG_AUTHORIZATION,
        },
        data: `fields id, cover.url, name, cover.height, cover.width, slug, first_release_date, genres.name, platforms.name, platforms.platform_logo.url, screenshots.url, summary; where platforms = (4, 7, 15, 16, 18, 19, 22, 25, 26, 27, 29, 30, 32, 33, 35, 50, 51, 53, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 75, 78, 79, 80, 84, 86, 87, 88, 89, 90, 93, 94, 99, 114, 115, 117, 119, 120, 123, 128, 136, 142, 154, 158, 274, 373, 410) & id=(${randomIdsList}); limit 500;`
      })
      
      return result.data;
    }
    catch (error) {
      console.log(error);
    }
    
  },
  
  // Retrieve one game by its ID with details from IGDB API
  getOneGame: async function (id) {
    try{
      const result = await axios(
        
        { method: 'POST',
        url: "https://api.igdb.com/v4/games",
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.PG_CLIENT_ID,
          'Authorization': process.env.PG_AUTHORIZATION,
        },
        data: `fields id, cover.url, name, slug, first_release_date, genres.name, platforms.name, platforms.platform_logo.url, screenshots.url, summary; where id=${id};`
      })
      return result.data[0];
    }
    catch (error) {
      console.log(error);
    }
    
  },
  
  // Retrieve one game by its name with details from IGDB API
  getGameByName : async function (game) {
    try {
      const result = await axios(
        
        { method: 'POST',
        url: "https://api.igdb.com/v4/games",
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.PG_CLIENT_ID,
          'Authorization': process.env.PG_AUTHORIZATION,
        },
        data: `fields id, cover.url, name, slug, first_release_date, genres.name, platforms.name, platforms.platform_logo.url, screenshots.url, summary; search "${game}"; where platforms = (4, 7, 15, 16, 18, 19, 22, 25, 26, 27, 29, 30, 32, 33, 35, 50, 51, 53, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 75, 78, 79, 80, 84, 86, 87, 88, 89, 90, 93, 94, 99, 114, 115, 117, 119, 120, 123, 128, 136, 142, 154, 158, 274, 373, 410);`
      })
      console.log(result.data)
      return result.data;
    }
    catch (error) {
      console.log(error);
    }
  },
  
  // Retrieve games by their platform from IGDB API
  getGamesByPlatform : async function (platformId) {
    try {
      const result = await axios(
        
        { method: 'POST',
        url: "https://api.igdb.com/v4/games",
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.PG_CLIENT_ID,
          'Authorization': process.env.PG_AUTHORIZATION,
        },
        data: `fields id, cover.url, name, slug, first_release_date, genres.name, platforms.name, platforms.platform_logo.url, screenshots.url, summary; sort name asc; where platforms = ${platformId}; limit 500;`
      })
      console.log(result.data)
      return result.data;
    }
    catch (error) {
      console.log(error);
    }
  },
  
};


module.exports = gameDataMapper;