const axios = require('axios');
const client = require('./dbClient.js');

// fields and platform ids list used in the request to the IGDB API, cf l40
const fields = "fields id, cover.url, name, cover.height, cover.width, slug, first_release_date, genres.name, platforms.name, platforms.platform_logo.url, screenshots.url, summary;";
const platform_list = "4, 7, 15, 16, 18, 19, 22, 24, 25, 26, 27, 29, 30, 32, 33, 35, 50, 51, 53, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 75, 78, 79, 80, 84, 86, 87, 88, 89, 90, 93, 94, 99, 114, 115, 117, 119, 120, 123, 128, 136, 142, 154, 158, 274, 373, 410";


const collectionDataMapper = {
    
    
    // Retrieve Collection from User by its Id
    getCollection: async function (id) {
        try {
        const sqlQuery = `SELECT "api_id" FROM "game"
        JOIN "collection" ON game.id = collection.game_id
        WHERE "user_id" = $1;`
        const result = await client.query(sqlQuery, [id]);        
        } catch (error) {
        throw new Error("Impossible de récupérer les données de la base de données.");
        }
        
        // We store all the games ids from the user collection in gamesIdsArray
        const gamesIdsArray = [];       
        result.rows.forEach(element => {
            gamesIdsArray.push(element.api_id);              
        });
        
        // Using ".join" on the games ids array so we can use them in the IGDB api request (cf l34)
        const gamesIds = gamesIdsArray.join();
        
        try {
        // We retrieve all the details we need from the user's collection games by calling the IGDB api
        const games = await axios(
            
            { method: 'POST',
            url: "https://api.igdb.com/v4/games",
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.PG_CLIENT_ID,
                'Authorization': process.env.PG_AUTHORIZATION,
            },
            data: `${fields}; where platforms = (${platform_list}) & id=(${gamesIds});`
        })
        
        return games.data;
    } catch (error) {
        throw new Error("Impossible de récupérer les données de l'API IGDB.");
    }
    },
    
    /* 1- Add game to "game" table if not yet inside
    2- Associate User Id with Game Id in "collection" table */
    postCollection: async function (userId, gameApiId, slug) {
        try {
        const gameQuery = `
        SELECT insert_game($1, $2) AS game_id, $2 AS slug;
        `;
        const result = await client.query(gameQuery, [gameApiId, slug]);
        } catch (error) {
            throw new Error("Erreur lors de la tentative d'ajout du jeu dans la table 'game'.");
        }
        const game_id = result.rows[0].game_id;
        
        try {
        const collectionQuery = `
        INSERT INTO "collection"("user_id", "game_id") 
        VALUES ($1, $2) 
        ON CONFLICT (user_id, game_id) DO NOTHING
        RETURNING *;
        `;
        const newCollection = await client.query(collectionQuery, [userId, game_id]);
        
        if (newCollection.rows.length == 0) {
            return "Attention ce jeu fait déjà parti de votre collection"
        }
        return newCollection.rows[0];
    } catch (error) {
        throw new Error("Erreur lors de la tentative d'ajout du jeu à la table 'collection'.");
    }
    },
    
    // Remove a game from "collection" table
    deleteFromCollection: async function (userId, gameApiId) {
        try{
        const sqlQuery = `DELETE FROM "collection"
        WHERE "user_id" = $1 AND "game_id" = (SELECT game.id FROM "game" WHERE api_id = $2)
        RETURNING *`
        const gameToDelete = await client.query(sqlQuery, [userId, gameApiId]);
        
        return gameToDelete.rows[0];
        } catch (error) {
            throw new Error("Erreur lors de la tentative de suppression au niveau de la base de données.");
            }
    
    },
};


module.exports = collectionDataMapper;