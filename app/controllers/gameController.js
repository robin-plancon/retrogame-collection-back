const gameDataMapper = require("../dataMappers/gameDataMapper");


const gameController = {
    // Retrieve all games with details from IGDB API 
    getGames : async function (req, res) {
        try {
            
            const games = await gameDataMapper.getGames();
            
            for (const game of games) {
                if (game.cover)
                {game.cover.url=game.cover.url.replace("thumb", "cover_big") };
                
            }
                                   

            res.json({result: games, status : "Success"});
           

        } catch (error) {
            res.status(500).json({result: error.toString(), status : "Error"});
        }
        
    },
    
    // Retrieve one game by its Id with details from IGDB API 
    getOneGame : async function (req, res) {
        try {            

            const targetId = req.params.id;
            
            const game = await gameDataMapper.getOneGame(targetId);
            if (game.cover)
            {game.cover.url=game.cover.url.replace("thumb", "cover_big_2x") };
           
            res.json({result: game, status : "Success"});          
           
        } catch (error) {
            res.status(500).json({message: error.toString(), status : "Error"});
        }
        
    },

    // Retrieve one game by its slug with details from IGDB API
    getOneGameBySlug : async function (req, res) {
        try {
            
            const slug = req.params.slug;
            
            const game = await gameDataMapper.getOneGameBySlug(slug);
            
            res.json({result: game, status : "Success"});          
            
        } catch (error) {
            res.status(500).json({message: error.toString(), status : "Error"});
        }
        
    },
    
    // Retrieve one game by its name with details from IGDB API
    getGameByName : async function (req, res) {
        try {
        const game = req.query.game;        
        const filteredPlatformId = req.query.platformId
      
        const searchedGame = await gameDataMapper.getGameByName(game, filteredPlatformId);
        for (const game of searchedGame) {
            if (game.cover)
            {game.cover.url=game.cover.url.replace("thumb", "cover_big") };
            
        }
        res.json({result: searchedGame, status : "Success"});

        } catch (error) {
        res.status(500).json({message: error.toString(), status : "Error"});
        }
    },
    // Retrieve games with by their platform from IGDB API
    getGamesByPlatform : async function (req, res) {
        try {
            const platformId = req.params.id;
            const gamesByPlatform = await gameDataMapper.getGamesByPlatform(platformId);
            for (const game of gamesByPlatform) {
                if (game.cover)
                {game.cover.url=game.cover.url.replace("thumb", "cover_big") };
                
            }
            res.json({result: gamesByPlatform,status : "Success"});
            
        } catch (error) {
            res.status(500).json({message: error.toString(), status : "Error"});
        }
    },
};


module.exports = gameController;