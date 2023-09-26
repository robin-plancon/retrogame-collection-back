const userDataMapper = require("../dataMappers/userDataMapper");
const bcrypt = require('bcrypt');


const userController = {
    
    getUserDetail : async function (req,res) {
        try {
            const targetId = req.params.id;
            
            const user = await userDataMapper.getUserDetail(targetId);
            console.log("User :", JSON.stringify(user, null, 2));
            res.json(user)
            
        } catch (error) {
            res.status(500).json(error.toString())
        }
    },

    signUp : async function (req,res) {
        try {
            let {nickname, email, password, confirmation } = req.body;
            
            if (password == confirmation){
                password = await bcrypt.hash(password, parseInt(process.env.SALT));
                const newUser = await userDataMapper.signUp(nickname, email, password);
                //storing user information into session
                delete newUser.password;
                req.session.user = newUser;
                res.json(newUser)
            }
            else {
                res.json("La confirmation et le mot de passe ne sont pas identiques")
            };
            
        }
        catch (error) {
                    if (error.code === '23505') {
                // Contrainte d'unicité violée
                if (error.detail.includes('nickname')) {
                  res.status(400).json({ message: "Ce pseudo est déjà utilisé." });
                } else if (error.detail.includes('email')) {
                  res.status(400).json({ message: "Cet email est déjà utilisé." });
                } else {
                  // Autre erreur inattendue
                  console.error(error);
                  res.status(500).json({ message: "Erreur interne du serveur." });
                }
              } else {
                // Autre erreur inattendue
                console.error(error);
                res.status(500).json({ message: "Erreur interne du serveur." });
              }
        }
        
    },

    login : async function(req, res) {
      try{
      const {nickname, password} = req.body;
      const targetUser = await userDataMapper.getUserByNickname(nickname);
      if (!targetUser) {
        return res.json("Couple login/mot de passe incorrect !");
      }
      const isGoodPass = await bcrypt.compare(password, targetUser.password);
      if (!isGoodPass){
        return res.json("Couple login/mot de passe incorrect !");
      }
      
      req.session.user = targetUser;
      delete req.session.user.password;
      return res.json(targetUser);
    } catch (error) {
      return res.status(500).json(error.toString())
  };
    }
}

module.exports = userController;