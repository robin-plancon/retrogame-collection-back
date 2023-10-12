const gameDataMapper = require("../dataMappers/gameDataMapper");
const log = require("../service/errorLogService");


const gameController = {
    // Retrieve all games with details from IGDB API 
    getGames : async function (req, res) {
        try {
            
            const games = await gameDataMapper.getGames();
            
            // Pictures size from the IGDB API are defined inside the pictures url, so we used ".replace" method to resize them as needed
            for (const game of games) {
                if (game.cover)
                {game.cover.url=game.cover.url.replace("thumb", "cover_big") };
                
            }
            
            
            res.json({result: games, status : "Success"});
            
            
        } catch (error) {
            log.error({ error: error }, 'Erreur : ', error.message);
            res.status(500).json({result: error.toString(), status : "Error"});
        }
        
    },
    
    // Retrieve one game by its Id with details from IGDB API 
    getOneGame : async function (req, res) {
        try {            
            
            const targetId = req.params.id;
            
            const game = await gameDataMapper.getOneGame(targetId);

            if(!game) {
                res.status(404).json({message: "Aucun jeu trouvé avec ces données.", status : "Error"});;
            }
            
            // Pictures size from the IGDB API are defined inside the pictures url, so we used ".replace" method to resize them as needed
            if (game.cover)
            {game.cover.url=game.cover.url.replace("thumb", "cover_big_2x") };
            
            res.json({result: game, status : "Success"});          
            
        } catch (error) {
            log.error({ error: error }, 'Erreur : ', error.message);
            res.status(500).json({message: error.toString(), status : "Error"});
        }
        
    },
    
    // Retrieve one game by its slug with details from IGDB API
    getOneGameBySlug : async function (req, res) {
        try {
            
            const slug = req.params.slug;
            
            const game = await gameDataMapper.getOneGameBySlug(slug);
            
            if(!game) {
                res.status(404).json({message: "Aucun jeu trouvé avec ces données.", status : "Error"});;
            }
            
            res.json({result: game, status : "Success"});          
            
        } catch (error) {
            log.error({ error: error }, 'Erreur : ', error.message);
            res.status(500).json({message: error.toString(), status : "Error"});
        }
        
    },
    
    // Retrieve one game by its name with details from IGDB API
    getGameByName : async function (req, res) {
        try {
            const game = req.query.game;        
            const filteredPlatformId = req.query.platformId
            
            const searchedGame = await gameDataMapper.getGameByName(game, filteredPlatformId);
            
            // Pictures size from the IGDB API are defined inside the pictures url, so we used ".replace" method to resize them as needed
            for (const game of searchedGame) {
                if (game.cover)
                {game.cover.url=game.cover.url.replace("thumb", "cover_big") };
                
            }
            res.json({result: searchedGame, status : "Success"});
            
        } catch (error) {
            log.error({ error: error }, 'Erreur : ', error.message);
            res.status(500).json({message: error.toString(), status : "Error"});
        }
    },
    // Retrieve games with by their platform from IGDB API
    getGamesByPlatform : async function (req, res) {
        try {
            const platformId = req.params.id;
            const gamesByPlatform = await gameDataMapper.getGamesByPlatform(platformId);
            
            // Pictures size from the IGDB API are defined inside the pictures url, so we used ".replace" method to resize them as needed
            for (const game of gamesByPlatform) {
                if (game.cover)
                {game.cover.url=game.cover.url.replace("thumb", "cover_big") };
                
            }
            res.json({result: gamesByPlatform,status : "Success"});
            
        } catch (error) {
            log.error({ error: error }, 'Erreur : ', error.message);
            res.status(500).json({message: error.toString(), status : "Error"});
        }
    },
};


module.exports = gameController;