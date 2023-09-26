const collectionDataMapper = require('../dataMappers/collectionDataMapper')


const collectionController = {
    
    getCollection : async function (req, res) {
        try {
            const targetId = req.params.id
            const collection = await collectionDataMapper.getCollection(targetId)
            
            res.json(collection)
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
        
    },
    
    postCollection : async function (req, res) {
        try {
            const userId = req.session.user.id
            const gameApiId = req.params.gameApiId
            const slug = req.params.slug
            
            const collection = await collectionDataMapper.postCollection(userId, gameApiId, slug)
            
            res.send("Youpi")
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
    },
    
    deleteFromCollection : async function (req, res) {
        try {
            const gameApiId = req.params.gameApiId
            const userId = req.session.user.id
            
            const gameToDelete = await collectionDataMapper.deleteFromCollection(userId, gameApiId);
            
            res.json(gameToDelete);
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
        
    }
    
    
};




module.exports = collectionController;