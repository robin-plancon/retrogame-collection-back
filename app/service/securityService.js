const jwt = require('jsonwebtoken');

const securityService = {

    getToken(user){
        return jwt.sign(user, process.env.JWT_SECRET);
    },


    checkToken(req, res, next){
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token au moment di verify:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = req.session.user

        // On compare les valeurs des propriétés du token et du user présent en session
        if (user.nickname == decoded.nickname && user.mail == decoded.mail) {
            return next();
        } else {           
              return res.status(401).json({message: 'Accès non autorisé', status: "Error"});
        };
    },
};


module.exports = securityService;

