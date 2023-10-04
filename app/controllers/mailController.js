const transporter = require('../middlewares/mail');

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
};

module.exports = mailController;