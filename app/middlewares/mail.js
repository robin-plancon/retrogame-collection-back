const nodemailer = require('nodemailer');

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'retr0gamecollection.team@gmail.com',
      pass: process.env.MAIL_SECRET
    }
  });

  module.exports = transporter;