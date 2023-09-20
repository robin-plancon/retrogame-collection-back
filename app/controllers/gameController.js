const gameDataMapper = require("../dataMappers/gameDataMapper")


const gameController = {
    
    getGames : async function (req, res) {
        try {
            
            const games = await gameDataMapper.getGames()
            console.log("Games :",JSON.stringify(games, null, 2));
            res.render("index", {games});
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
        
    },
    
    getOneGame : async function (req, res) {
        try {
            
            const targetId = req.params.id;
            
            const game = await gameDataMapper.getOneGame(targetId)
            console.log("Game :",JSON.stringify(game, null, 2));
            res.render("gameDetails", {game});
            
            
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
        
    }
    
}


module.exports = gameController