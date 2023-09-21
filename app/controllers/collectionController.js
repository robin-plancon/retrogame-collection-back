const collectionDataMapper = require('../dataMappers/collectionDataMapper')


const collectionController = {
    
    getCollection : async function (req, res) {
        try {
            const targetId = req.params.id
            const collection = await collectionDataMapper.getCollection(targetId)
            
            res.render("collection", {collection})
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
        
    },
    
    postCollection : async function (req, res) {
        try {
            const userId = req.session.user.id
            const gameId = req.params.gameId
            
            const collection = await collectionDataMapper.postCollection(userId, gameId)
            
            res.send("Youpi")
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
    }
}




module.exports = collectionController;