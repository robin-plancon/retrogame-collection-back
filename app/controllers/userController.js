const userDataMapper = require("../dataMappers/userDataMapper");
const bcrypt = require('bcrypt');
const securityService = require('../service/securityService');
const jwt = require('jsonwebtoken');
const log = require("../service/errorLogService");

const userController = {
  
  // Retrieve User Details from database
  getUserDetail : async function (req,res) {
    try {
      
      
      const targetId = req.session.user.id;

      if (!targetId) {
        res.status(401).json({ message: "Utilisateur non authentifié", status: "Error" });
        return;
      }
      
      const user = await userDataMapper.getUserDetail(targetId);
      
       res.json({result: user, status : "Success"});
      
    } catch (error) {
      log.error({ error: error }, 'Erreur : ', error.message);
      res.status(500).json({message: error.toString(), status: "Error"});
    }
  },
  
  // Allow visitor to create a user account
  signUp : async function (req,res) {
    try {
      let {nickname, email, password, confirmation} = req.body;
      // If password and confirmation provided are equal, we use bcrypt to hash the password before calling dataMapper to create the user account
      if (password == confirmation){
        password = await bcrypt.hash(password, parseInt(process.env.SALT));
        const newUser = await userDataMapper.signUp(nickname, email, password);
        delete newUser.password;        
        res.json({result: newUser, status : "Success"});
      }
      else {
        res.status(400).json({message : "La confirmation et le mot de passe ne sont pas identiques", status : "Error"});
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
          log.error({ error: error }, 'Erreur : ', error.message);
          res.status(500).json({ message: error.toString(), status : "Error" });
        }
      } else {
        // Other unexpected error
        log.error({ error: error }, 'Erreur : ', error.message);
        res.status(500).json({ message: error.toString(), status : "Error" });
      }
    }
    
  },
  
  // Allow user to connect to its account
  login : async function(req, res) {
    try{
      const {nickname, password} = req.body;
      // Verifying if the nickname provided exists in the database
      const targetUser = await userDataMapper.getUserByNickname(nickname);
      
      if (!targetUser) {
        return res.status(401).json({message : "Couple login/mot de passe incorrect !", status : "Error"});
      }
      // Verifying if the password provided is similare to the one in the database, using bcrypt ".compare" method
      const isGoodPass = await bcrypt.compare(password, targetUser.password);
      if (!isGoodPass){
        return res.status(401).json({message : "Couple login/mot de passe incorrect !", status : "Error"});
      }
      // Saving user details in the session without the password
      delete targetUser.password;
      req.session.user = targetUser;
      // Creating Json Web Token with user details and sending it to the client side to allow stronger authentication process
      const token = securityService.getToken(targetUser);
      
      return res.json({token: token, user: targetUser, status : "Success"});
    } catch (error) {
      log.error({ error: error }, 'Erreur : ', error.message);
      return res.status(500).json({message: error.toString(), status: "Error"});
    };
    
  },
  
  // Allow user to disconnect from its account by removing its details from the session
  logout: function (req, res) {
    try {
      if (req.session.user) {
        delete req.session.user;
        return res.send({ message: "Vous êtes déconnecté !", status: "Success" });
      } else {
        return res.status(401).json({ message: "Aucune session utilisateur trouvée.", status: "Error" });
      }
    } catch (error) {
      log.error({ error: error }, 'Erreur : ', error.message);
      return res.status(500).json({ message: error.toString(), status: "Error" });
    }
  },
  
  
  // Allow user to modify its password
  patchUser : async function(req, res) {
    try {
      
      const userId = req.session.user.id;
      if (!userId) {
        res.status(401).json({ message: "Utilisateur non authentifié", status: "Error" });
        return;
      }

      let {currentPassword, newPassword, confirmation} = req.body;
      // Retrieving user information by its id from the database then comparing provided new password with the current one in the database
      const user = await userDataMapper.getUserDetail(userId);
      const isGoodPass = await bcrypt.compare(currentPassword, user.password);
      if (!isGoodPass){
        return res.status(401).json({message :"Le mot de passe actuel est incorrect !", status : "Error"});
      }
      // If new password is equal to confirmation, we hash it using bcrypt then we call the dataMapper to update the password in the database
      if (newPassword == confirmation) {
        newPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT));
        await userDataMapper.patchUser(newPassword, userId);
        return res.json({message :"Votre mot de passe a été modifié avec succès !", status : "Success"});
        
      }
      else {
        return res.status(400).json({message :"La confirmation et le mot de passe ne sont pas identiques", status : "Error"});
      };
      
      
    } catch (error) {
      log.error({ error: error }, 'Erreur : ', error.message);
      return res.status(500).json({message: error.toString(), status: "Error"});
      
    }
  },
  
  // Allow user to delete its account
  deleteUser : async function (req, res) {
    try {
      const userId = req.session.user.id;
      if (!userId) {
        res.status(401).json({ message: "Utilisateur non authentifié", status: "Error" });
        return;
      }
      
      const deletedUser = await userDataMapper.deleteUser(userId);
      return res.json({message : "Votre compte a bien été supprimé !", status : "Success"});
    } catch (error) {
      log.error({ error: error }, 'Erreur : ', error.message);
      return res.status(500).json({message: error.toString(), status: "Error"});
    }
  },
  
  // Allow user who forgot its password to reset it
  handleResetForm : async function (req, res) {
    try {
      const {newPassword, confirmation, token} = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      if (newPassword === confirmation) {
        password = await bcrypt.hash(newPassword, parseInt(process.env.SALT));
        await userDataMapper.patchUser(password, userId);
        return res.json({message :"Votre mot de passe a été modifié avec succès !", status : "Success"});
        
      }
      else {
        return res.status(400).json({message :"La confirmation et le mot de passe ne sont pas identiques", status : "Error"});
      } 
    }catch (error) {
      log.error({ error: error }, 'Erreur : ', error.message);
      return res.status(500).json({message: error.toString(), status: "Error"});
    }    
  },
  
  // Verify if the user's "forgotten password token" is valid and sends the information to Front end
  verifyResetToken : function (req, res) {
    try {
      securityService.checkResetToken(req, res);
      
    } catch (error) {
      log.error({ error: error }, 'Erreur : ', error.message);
      return res.status(500).json({message : error.toString(), status: "Error"});
    }
  },
  
};


module.exports = userController;