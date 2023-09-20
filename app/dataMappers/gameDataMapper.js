const axios = require('axios');
require('dotenv').config();


const gameDataMapper = {
  
  async getGames() {
    try{
      const result = await axios(
        
        { method: 'POST',
        url: "https://api.igdb.com/v4/games",
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.PG_CLIENT_ID,
          'Authorization': process.env.PG_AUTHORIZATION,
        },
        data: "fields cover.url, name, first_release_date, genres.name, platforms.name, platforms.platform_logo.url, screenshots.url, summary; where platforms = 4;limit 100;"
      })
      //console.log(result)
      return result.data;
    }
    catch (error) {
      console.log(error)
    }
    
  },
  async getOneGame(id) {
    try{
      const result = await axios(
        
        { method: 'POST',
        url: "https://api.igdb.com/v4/games",
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.PG_CLIENT_ID,
          'Authorization': process.env.PG_AUTHORIZATION,
        },
        data: `fields cover.url, name, first_release_date, genres.name, platforms.name, platforms.platform_logo.url, screenshots.url, summary; where platforms = (4, 7, 15, 16, 18, 19, 22, 25, 26, 27, 29, 30, 32, 33, 35, 50, 51, 53, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 75, 78, 79, 80, 84, 86, 87, 88, 89, 90, 93, 94, 99, 114, 115, 117, 119, 120, 123, 128, 136, 142, 154, 158, 274, 373, 410) & id=${id};`
      })
      //console.log(result.data)
      return result.data[0];
    }
    catch (error) {
      console.log(error)
    }
    
  },
}


module.exports = gameDataMapper;