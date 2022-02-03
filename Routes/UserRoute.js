const express = require("express");
const router = express.Router();
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");
const { check } = require("express-validator");
router.post("/login", userController.protect, authController.login);
router.route("/signUp").post(userController.signUp);
router.post("/login", UserController.protect, AuthController.login);
router.patch(
  "/update",
  [
    check("userId").not().isEmpty(),
    check("Name").not().isEmpty(),
    check("rollNum").not().isEmpty(),
    check("profilePhoto").not().isEmpty(),
  ],
  UserController.UpdateUser
);
router.delete(
  "/update",
  [check("userId").not().isEmpty()],
  UserController.DeleteUser
);
