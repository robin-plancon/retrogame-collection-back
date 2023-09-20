const userDataMapper = require("../dataMappers/userDataMapper");



const userController = {
    
    getUserDetail : async function (req,res) {
        try {
            const targetId = req.params.id;
            
            const user = await userDataMapper.getUserDetail(targetId);
            console.log("User :", JSON.stringify(user, null, 2));
            res.render("user", {user})
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
    },
    
}


module.exports = userController;