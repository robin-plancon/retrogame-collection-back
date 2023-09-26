const express = require("express");
const router = express.Router();

const gameController = require("./controllers/gameController");
const userController = require("./controllers/userController");
const collectionController = require("./controllers/collectionController");

const validationService = require("./service/validationService");

router.get("/", gameController.getGames);
router.get("/game/:id(\\d+)", gameController.getOneGame);

router.get("/user/:id(\\d+)", userController.getUserDetail);
router.patch ("/user/:id(\\d+)", validationService.checkNewPasswordForm, userController.patchUser);

router.get("/user/:id(\\d+)/collection", collectionController.getCollection);
router.post("/user/collection/:slug/:gameApiId(\\d+)", collectionController.postCollection);
router.delete("/user/collection/:gameApiId(\\d+)", collectionController.deleteFromCollection);

router.post("/signup", validationService.checkSignUpForm, userController.signUp);
router.post("/login", validationService.checkLoginForm, userController.login);
router.get ("/logout", userController.logout);


module.exports = router;