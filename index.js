require('dotenv').config();

const express = require('express');
const router = require('./app/router');

const app = express();

// On demande à Express d'extraire les données des requêtes POST
app.use(express.urlencoded({ extended: true }));

// On demande à Express d'extraire les données des requêtes POST formatées en JSON
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API demarrée sur http://localhost:${port}`);
});