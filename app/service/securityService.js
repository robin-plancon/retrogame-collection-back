const jwt = require('jsonwebtoken');

const securityService = {
    
    // Methods for authentication Token
    getToken(user){
        return jwt.sign(user, process.env.JWT_SECRET);
    },
    
    
    checkToken(req, res, next){
        const token = req.headers.authorization.split(" ")[1];
        // console.log("Token au moment di verify:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = req.session.user
       
        // We compare the user's data inside the token with the data from the session before allowing access to the user 
        if (user.nickname == decoded.nickname && user.mail == decoded.mail) {
         
            return next();
        } else {           
            return res.status(401).json({message: 'Accès non autorisé', status: "Error"});
        };
    },
    
    
    // Methods for forgotten password reset Token
    generateResetToken(user){
        return jwt.sign({ 
            userId: user.id,
            type: 'reset'
        }, process.env.JWT_SECRET, { expiresIn: '15m' });
    },
    
    checkResetToken(req, res, next){
        try {
            const token = req.query.token; // Récupère le token depuis l'URL contenu dans le mail envoyé au user
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Vérifie si le token est de type 'reset'
            if (decoded.type !== 'reset') {
                return res.status(401).json({ message: 'Token invalide', status: 'Error' });
            }
            
            // Stocke l'ID de l'utilisateur dans la requête pour l'utiliser plus tard
            req.userId = decoded.userId;
            
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token invalide ou expiré', status: 'Error' });
        }
    },
    
    
};


module.exports = securityService;

