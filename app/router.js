const express = require("express");
const router = express.Router();

const gameController = require("./controllers/gameController");
const userController = require("./controllers/userController");

router.get("/", gameController.getGames);
router.get("/game/:id", gameController.getOneGame);

router.get("/user/:id", userController.getUserDetail);

module.exports = router;