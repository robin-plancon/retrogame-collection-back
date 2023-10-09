const userDataMapper = require('../dataMappers/userDataMapper');
const transporter = require('../middlewares/mail');
const securityService = require('../service/securityService');

const mailController = {

    // Manage the sending of the reset email for forgotten passwords
    askResetPasswordEmail : async function (req, res) {

        try {
            const { email } = req.body;
            
            // We verify in the database if the user exists.
            const targetUser = await userDataMapper.getUserByEmail(email);
            
            if (!targetUser) {
                return res.json({message : "Cet email est invalide !", status : "Error"})   
            }
            ;
            // We create a json web token with the user details inside
            const token = securityService.generateResetToken(targetUser);

            // We send the email containing the reset password link with the token inside the url to the user
            await transporter.sendMail({
                from: 'retr0gamecollection.team@gmail.com',
                to: email,
                subject: 'Réinitialisation du mot de passe',
                text: `Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous (Attention, il n'est valable que 15 min): \n
                ${process.env.CLIENT_URL}/reset-form?token=${token} `
                
              });
            
              res.send({message: 'Email sent successfully', status: 'Success'});


        } catch (error) {
        return res.status(500).json(error.toString());
        }
},

};

module.exports = mailController;