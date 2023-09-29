const jwt = require('jsonwebtoken');

const securityService = {

    getToken(user){
        return jwt.sign(user, process.env.JWT_SECRET);
    },


    checkToken(user,token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // On retourne la comparaison entre les valeurs des propriétés du token et le user présent en session
        return user.nickname == decoded.nickname && user.mail == decoded.mail;
    }
};


module.exports = securityService;

