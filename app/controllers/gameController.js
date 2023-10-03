const gameDataMapper = require("../dataMappers/gameDataMapper");


const gameController = {
    // Retrieve all games with details from IGDB API 
    getGames : async function (req, res) {
        try {
            
            const games = await gameDataMapper.getGames();
            console.log("Games :",JSON.stringify(games, null, 2));
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
            console.log("Game :",JSON.stringify(game, null, 2));
            res.json({result: game, status : "Success"});          
            
        } catch (error) {
            res.status(500).json({message: error.toString(), status : "Error"});
        }
        
    },
    
    // Retrieve one game by its name with details from IGDB API
    getGameByName : async function (req, res) {
        try {
        const game = req.query.game;
        const searchedGame = await gameDataMapper.getGameByName(game);
        console.log("searchGame :",JSON.stringify(searchedGame, null, 2));
        res.json({result: searchedGame, status : "Success"});

        } catch (error) {
        res.status(500).json({message: error.toString(), status : "Error"});
        }
    },
    // Retrieve games with by their platform from IGDB API
    getGamesByPlatform : async function (req, res) {
        try {
            const platformId = req.params.id;
            const platform = await gameDataMapper.getGamesByPlatform(platformId);
            console.log(platform)
            res.json({result: platform,status : "Success"});
            
        } catch (error) {
            res.status(500).json({message: error.toString(), status : "Error"});
        }
    },
};


module.exports = gameController;