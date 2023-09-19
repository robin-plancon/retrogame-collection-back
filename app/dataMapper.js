const axios = require('axios');


const dataMapper = {

    async getGames() {
try{
        const result = await axios(
            
            { method: 'POST',
            url: "https://api.igdb.com/v4/games",
              headers: {
                'Accept': 'application/json',
                'Client-ID': 'id8rk3ax6npbn7ldob5ev3v8idoywo',
                'Authorization': 'Bearer bf1qow8odl2xtl7ooo6vbw4vwuhs18',
              },
              data: "fields cover.url,name,first_release_date,genres,platforms; limit 1;"
          })
            //console.log(result)
          return result.data;
        }
        catch (error) {
            console.log(error)
        }
            
    },
    
}






module.exports = dataMapper;