const express = require("express");
const router = express.Router();

const gameController = require("./controllers/gameController");
const userController = require("./controllers/userController");
const collectionController = require("./controllers/collectionController");

router.get("/", gameController.getGames);
router.get("/game/:id", gameController.getOneGame);

router.get("/user/:id", userController.getUserDetail);

router.get("/user/:id/collection", collectionController.getCollection);

router.post("/user/collection/:slug/:gameApiId", collectionController.postCollection);

module.exports = router;