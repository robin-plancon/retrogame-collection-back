require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const session = require('express-session');
const RedisStore = require("connect-redis").default;
const notFound404 = require("./app/middlewares/notFound404");
const cors = require('cors');

const redisClient = require("./app/service/redisClient");
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "retrOgame :", // le prefix va permettre de classer les clefs qui concernent notre application
});

const app = express();
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  }
));
// On demande à Express d'extraire les données des requêtes POST
app.use(express.urlencoded({ extended: true }));

// On demande à Express d'extraire les données des requêtes POST formatées en JSON
app.use(express.json());

app.use(session({
  store: redisStore,
  secret: process.env.PG_SESSION_SECRET,
  resave: true, 
  saveUninitialized: false,
}));

app.use(router);

app.use(notFound404);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API demarrée sur http://localhost:${port}`);
});