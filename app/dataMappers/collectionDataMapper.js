const axios = require('axios');
const client = require('./dbClient.js');

const collectionDataMapper = {
    
    
    
    async getCollection(id) {
        
        const sqlQuery = `SELECT "game_id" FROM "collection" WHERE user_id = $1`
        const result = await client.query(sqlQuery, [id])
        console.log("Mes jeux :", result.rows)
        const gamesIdsArray = [];
        
        
        result.rows.forEach(element => {
            gamesIdsArray.push(element.game_id)                 
        });
        
        const gamesIds = gamesIdsArray.join();
        
        const games = await axios(
            
            { method: 'POST',
            url: "https://api.igdb.com/v4/games",
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.PG_CLIENT_ID,
                'Authorization': process.env.PG_AUTHORIZATION,
            },
            data: `fields cover.url, name, first_release_date, genres.name, platforms.name, platforms.platform_logo.url, screenshots.url, summary; where platforms = (4, 7, 15, 16, 18, 19, 22, 25, 26, 27, 29, 30, 32, 33, 35, 50, 51, 53, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 75, 78, 79, 80, 84, 86, 87, 88, 89, 90, 93, 94, 99, 114, 115, 117, 119, 120, 123, 128, 136, 142, 154, 158, 274, 373, 410) & id=(${gamesIds});`
        })
        console.log(games.data)
        return games.data;
    },
    
    async postCollection(userId, gameId) {
        const gameQuery = `
        INSERT INTO "game"("id") 
        VALUES ($1) 
        ON CONFLICT (id) DO NOTHING 
        RETURNING "id";
        `;
        const newGame = await client.query(gameQuery, [gameId]);
        console.log("gameQuery :", newGame);
        
        
        
        const collectionQuery = `
        INSERT INTO "collection"("user_id", "game_id") 
        VALUES ($1, $2) 
        ON CONFLICT (user_id, game_id) DO NOTHING
        RETURNING *;
        `;
        const newCollection = await client.query(collectionQuery, [userId, gameId]);
        console.log("collectionQuery :", newCollection);
        if (newCollection.rows.lenght == 0) {
            res.send ("Attention ce jeu fait déjà parti de votre collection")
        }
    },
    
    
}


module.exports = collectionDataMapper;