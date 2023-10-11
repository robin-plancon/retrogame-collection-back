const userDataMapper = require("../dataMappers/userDataMapper");
const transporter = require("../middlewares/mail");
const securityService = require("../service/securityService");

const mailController = {
  // Manage the sending of the reset email for forgotten passwords
  askResetPasswordEmail: async function (req, res) {
    try {
      const { email } = req.body;

      // We verify in the database if the user exists.
      const targetUser = await userDataMapper.getUserByEmail(email);

      if (!targetUser) {
        return res.status(400).json({
          message: "Cet email est invalide !",
          status: "Error",
        });
      }
      // We create a json web token with the user details inside
      const token = securityService.generateResetToken(targetUser);

      // We send the email containing the reset password link with the token inside the url to the user
      await transporter.sendMail({
        from: "retr0gamecollection.team@gmail.com",
        to: email,
        subject: "Retr0game Collection - Réinitialisation du mot de passe",
        html: ` <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    background-color: #0e121d;
                    color: #d6d6d6;
                    text-align: center;
                }
        
                .retrogame-logo {
                    max-width: 15%;
                    text-align: center;
                    margin-bottom: 40px;
                }
        
                .email-text {
                    font-size: 18px;
                    padding: 15px;
                    margin: auto;
                    margin-bottom: 20px;
                    border: 2px solid rgba(255, 105, 180, 0.5); /* Bordure rose/violette avec flou */
                    border-radius: 1rem;
                    max-width: 90%
                }
        
                .reset-link {
                    color: #0fd7b0;
                    text-decoration: none;
                    border: solid 2px #0fd7b0;
                    border-radius: 5px;
                    padding: 0.75rem 1.5rem;
                    display: inline-block;
                    margin: 20px;
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <img class="retrogame-logo" src="https://i.imgur.com/ejnskcY.png" alt="Logo Retrogame collection">
            <div class="email-text">
                Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous (Attention, il n'est valable que 15 min):
                <br>
                <a href="${process.env.CLIENT_URL}/reset-form?token=${token}" class="reset-link"> Réinitialiser mon mot de passe</a>
            </div>
        </body>
        </html>
         `,
      });

      res.send({ message: "Email sent successfully", status: "Success" });
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  },
};

module.exports = mailController;
