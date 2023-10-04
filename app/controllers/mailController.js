const userDataMapper = require('../dataMappers/userDataMapper');
const transporter = require('../middlewares/mail');
const securityService = require('../service/securityService');

const mailController = {

    sendMail : async function (req, res) {
    try {

        
await transporter.sendMail({
    from: 'retr0gamecollection.team@gmail.com',
    to: "retr0gamecollection.team@gmail.com",
    subject: 'Noiiiice',
    text: 'Hello, this is a test email from my server'
  });

  res.send('Email sent successfully');
} catch (error) {
  console.error(error);
  res.send('An error occurred');


};
},

    askResetPasswordEmail : async function (req, res) {

        try {
            const email = req.body.email;
            
            const targetUser = await userDataMapper.getUserByEmail(email);
            console.log("Target email :", targetUser);
            if (!targetUser) {
                return res.json({message : "Cet email invalide !", status : "Error"})   
            }
            ;
            console.log(securityService.generateResetToken(targetUser))
            


        } catch (error) {
        return res.status(500).json(error.toString());
        }
},

};

module.exports = mailController;