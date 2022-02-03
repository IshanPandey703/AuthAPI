const express = require("express");
const router = express.Router();
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");
router.post("/login", userController.protect, authController.login);
router.route("/signUp").post(userController.signUp);
