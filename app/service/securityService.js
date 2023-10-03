const jwt = require('jsonwebtoken');

const securityService = {

    getToken(user){
        return jwt.sign(user, process.env.JWT_SECRET);
    },


    checkToken(req, res, next){
        const token = req.headers.authorization.split(" ")[1];
        // console.log("Token au moment di verify:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = req.session.user
        console.log("Token décodé:", decoded);
        console.log("User en session:", user);
        // We compare the user's data inside the token with the data from the session before allowing access to the user 
        if (user.nickname == decoded.nickname && user.mail == decoded.mail) {
            console.log("Token vérifié");
            return next();
        } else {           
              return res.status(401).json({message: 'Accès non autorisé', status: "Error"});
        };
    },
};


module.exports = securityService;

