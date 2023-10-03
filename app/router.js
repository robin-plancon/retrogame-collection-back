const express = require("express");
const router = express.Router();

const gameController = require("./controllers/gameController");
const userController = require("./controllers/userController");
const collectionController = require("./controllers/collectionController");
const securityService = require("./service/securityService");
const validationService = require("./service/validationService");

// Game routes
router.get("/games", gameController.getGames);
router.get("/game/:id(\\d+)", gameController.getOneGame);
router.get("/search", gameController.getGameByName);

// User routes
router.get("/user/profile", securityService.checkToken, userController.getUserDetail);
router.patch ("/user/update", validationService.checkNewPasswordForm, userController.patchUser);
router.delete("/user/delete", userController.deleteUser);

// Collection routes
router.get("/user/:id(\\d+)/collection", securityService.checkToken, collectionController.getCollection);
router.post("/user/collection/:gameApiId(\\d+)", securityService.checkToken, collectionController.postCollection);
router.delete("/user/collection/:gameApiId(\\d+)", securityService.checkToken, collectionController.deleteFromCollection);

// Authentication routes
router.post("/signup", validationService.checkSignUpForm, userController.signUp);
router.post("/login", validationService.checkLoginForm, userController.login);
router.get ("/logout", userController.logout);


module.exports = router;