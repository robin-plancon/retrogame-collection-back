require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const session = require('express-session');
const notFound404 = require("./app/middlewares/notFound404");
const cors = require('cors');


const app = express();
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  }
  ));
  
  // Express is asked to extract data from POST requests
  app.use(express.urlencoded({ extended: true }));
  
  // Express is asked to extract data from POST requests formatted in JSON 
  app.use(express.json());
  
  app.use(session({
    secret: process.env.PG_SESSION_SECRET,
    resave: true, 
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    }
  }));
  
  app.use(express.static("public")); 

  app.use(router);
  
  app.use(notFound404);
  
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`API demarrée sur http://localhost:${port}`);
  });