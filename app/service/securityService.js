const jwt = require('jsonwebtoken');

const securityService = {
    
    // Methods for authentication Token
    getToken(user){
        return jwt.sign(user, process.env.JWT_SECRET);
    },
    
    
    checkToken(req, res, next){
        const token = req.headers.authorization.split(" ")[1]; 
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
    
    checkResetToken(req, res){
        try {
            const token = req.body.token; // Retrieves the token from the body of the request sent by the front
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Checks if the token is of type 'reset'
            if (decoded.type !== 'reset' || !decoded) {
                return res.status(401).json({ message: 'Token invalide ou expiré', status: 'Error' });
            }
            
            return res.status(200).json({ message: 'Token valide', status: 'Success' });
            
        } catch (err) {
            return res.status(401).json({ message: 'Token invalide ou expiré', status: 'Error' });
        }
    },
};


module.exports = securityService;

