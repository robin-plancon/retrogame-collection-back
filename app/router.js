const express = require("express");
const router = express.Router();

const gameController = require("./controllers/gameController");
const userController = require("./controllers/userController");
const collectionController = require("./controllers/collectionController");

const validationService = require("./service/validationService");

router.get("/", gameController.getGames);
router.get("/game/:id", gameController.getOneGame);

router.get("/user/:id", userController.getUserDetail);

router.get("/user/:id/collection", collectionController.getCollection);
router.post("/user/collection/:slug/:gameApiId", collectionController.postCollection);
router.delete("/user/collection/:gameApiId", collectionController.deleteFromCollection);

router.post("/signup", validationService.checkSignUpForm, userController.signUp);
router.post("/login", validationService.checkLoginForm, userController.login);

module.exports = router;