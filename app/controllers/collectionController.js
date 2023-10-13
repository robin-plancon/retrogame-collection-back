const collectionDataMapper = require('../dataMappers/collectionDataMapper')
const log = require("../service/errorLogService");


const collectionController = {
    
    // Retrieve Collection from User by its Id
    getCollection : async function (req, res) {
        try {
            const targetId = req.params.id;
            const collection = await collectionDataMapper.getCollection(targetId);
            console.log('collection', collection);
            
            if (collection.length === 0) {
                res.json({result: collection, status : "Success"});
                return;
            }

            // Pictures size from the IGDB API are defined inside the pictures url, so we used ".replace" method to resize them as needed
            for (const game of collection) {
                if (game.cover)
                {game.cover.url=game.cover.url.replace("thumb", "cover_big") };
                
            }
            
            res.json({result: collection, status : "Success"});
            
        } catch (error) {
            log.error({ error: error }, 'Erreur : ', error.message);
            res.status(500).json({message: error.toString(), status : "Error"});
        }
        
    },
    
    /* 1- Add game to "game" table if not yet inside
    2- Associate User Id with Game Id in "collection" table */
    postCollection : async function (req, res) {
        try {
            const userId = req.session.user.id;
            const gameApiId = req.params.gameApiId;
            const slug = req.body.slug;

            console.log('userId', userId);
            console.log('gameApiId', gameApiId);
            console.log('slug', slug);
            
            const collection = await collectionDataMapper.postCollection(userId, gameApiId, slug);
            console.log('collection', collection);
            res.json({result : collection, status : "Success"});
            
        } catch (error) {
            log.error({ error: error }, 'Erreur : ', error.message);
            res.status(500).json({message: error.toString(), status : "Error"});
        }
    },
    
    // Remove a game from "collection" table
    deleteFromCollection : async function (req, res) {
        try {
            const gameApiId = req.params.gameApiId;
            const userId = req.session.user.id;
            
            const gameToDelete = await collectionDataMapper.deleteFromCollection(userId, gameApiId);
            
            res.json({result: gameToDelete, status : "Success"});
            
        } catch (error) {
            log.error({ error: error }, 'Erreur : ', error.message);
            res.status(500).json({message: error.toString(), status : "Error"});
        }
        
    },
};


module.exports = collectionController;