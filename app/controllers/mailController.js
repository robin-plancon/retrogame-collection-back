const userDataMapper = require('../dataMappers/userDataMapper');
const transporter = require('../middlewares/mail');
const securityService = require('../service/securityService');

const mailController = {


    askResetPasswordEmail : async function (req, res) {

        try {
            const email = req.body.email;
            
            const targetUser = await userDataMapper.getUserByEmail(email);
            
            if (!targetUser) {
                return res.json({message : "Cet email est invalide !", status : "Error"})   
            }
            ;
            const token = securityService.generateResetToken(targetUser);

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