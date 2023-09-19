const dataMapper = require("./dataMapper")


const controller = {

getGames : async function (req, res) {
    try {
    
        const games = await dataMapper.getGames()
        console.log("Games :",games);
        res.render("index", {games});
   
    } catch (error) {
        res.status(500).json(error.toString())
}
        
}

}


module.exports = controller