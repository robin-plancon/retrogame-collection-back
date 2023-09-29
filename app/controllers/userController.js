const userDataMapper = require("../dataMappers/userDataMapper");
const bcrypt = require('bcrypt');


const userController = {

  // Retrieve User Details from database
  getUserDetail : async function (req,res) {
    try {
      const targetId = req.params.id;
      
      const user = await userDataMapper.getUserDetail(targetId);
      console.log("User :", JSON.stringify(user, null, 2));
      //Voir avec le front comment gérer le cas ou l'utilisateur n'existe pas en BDD (erreur 404 ? comment ?)
      res.json(user)
      
    } catch (error) {
      res.status(500).json(error.toString())
    }
  },

  // Allow visitor to create a user account
  signUp : async function (req,res) {
    try {
      let {nickname, email, password, confirmation} = req.body;
      
      if (password == confirmation){
        password = await bcrypt.hash(password, parseInt(process.env.SALT));
        const newUser = await userDataMapper.signUp(nickname, email, password);
        //storing user information into session
        delete newUser.password;
        req.session.user = newUser;
        res.json(newUser)
      }
      else {
        res.json({message : "La confirmation et le mot de passe ne sont pas identiques", status : "Error"})
      };
      
    }
    catch (error) {
      // 23505 = Violation of unique constraint code.
      if (error.code === '23505') {
        
        if (error.detail.includes('nickname')) {
          res.status(400).json({ message: "Ce pseudo est déjà utilisé.", status : "Error" });
        } else if (error.detail.includes('email')) {
          res.status(400).json({ message: "Cet email est déjà utilisé.", status : "Error" });
        } else {
          // Other unexpected error
          console.error(error);
          res.status(500).json({ message: "Erreur interne du serveur.", status : "Error" });
        }
      } else {
        // Other unexpected error
        console.error(error);
        res.status(500).json({ message: "Erreur interne du serveur.", status : "Error" });
      }
    }
    
  },
  
  // Allow user to connect to its account
  login : async function(req, res) {
    try{
      const {nickname, password} = req.body;
      const targetUser = await userDataMapper.getUserByNickname(nickname);
      if (!targetUser) {
        return res.json({message : "Couple login/mot de passe incorrect !", status : "Error"});
      }
      const isGoodPass = await bcrypt.compare(password, targetUser.password);
      if (!isGoodPass){
        return res.json({message : "Couple login/mot de passe incorrect !", status : "Error"});
      }
      
      req.session.user = targetUser;
      delete req.session.user.password;
      return res.json(targetUser);
    } catch (error) {
      return res.status(500).json(error.toString())
    };
    
  },
  
  // Allow user to disconnect from its account 
  logout : function (req, res) {
    delete req.session.user;
      return res.send ({message : "Vous êtes déconnecté !", status : "Success"});
  },
  
  // Allow user to modify its password
  patchUser : async function(req, res) {
    try {
      
      const userId = req.session.user.id;
      let {currentPassword, newPassword, confirmation} = req.body;
      
      const user = await userDataMapper.getUserDetail(userId);
      const isGoodPass = await bcrypt.compare(currentPassword, user.password);
      if (!isGoodPass){
        return res.json({message :"Le mot de passe actuel est incorrect !", status : "Error"});
      }
      if (newPassword == confirmation) {
        newPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT));
        await userDataMapper.patchUser(newPassword, userId);
        return res.json({message :"Votre mot de passe a été modifié avec succès !", status : "Success"});
        
      }
      else {
        return res.json({message :"La confirmation et le mot de passe ne sont pas identiques", status : "Error"})
      };
      
      
    } catch (error) {
      return res.status(500).json(error.toString());
      
    }
  },
  
  // Allow user to delete its account
  deleteUser : async function (req, res) {
    try {
      const userId = req.session.user.id
    
    const deletedUser = await userDataMapper.deleteUser(1)
    return res.json({message : "Votre compte a bien été supprimé !", status : "Success"})
    } catch (error) {
    return res.status(500).json(error.toString());
    }
  },
}

module.exports = userController;