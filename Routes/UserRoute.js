const express = require("express");
const router = express.Router();
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");
const { check } = require("express-validator");
router.post("/login", userController.protect, authController.login);
router.route("/signUp").post(userController.checkJWT, authController.signUp);
router.post("/login", userController.protect, authController.login);
router.patch(
  "/update",
  [
    check("userId").not().isEmpty(),
    check("Name").not().isEmpty(),
    check("rollNum").not().isEmpty(),
    check("profilePhoto").not().isEmpty(),
  ],
  userController.UpdateUser
);
router.delete(
  "/update",
  [check("userId").not().isEmpty()],
  userController.DeleteUser
);
router
  .route("/viewMembers")
  .get(userController.checkJWT, authController.viewMembers);
router.get(
  "/viewProfile/:userId",
  userController.checkJWT,
  authController.viewProfile
);
router.patch(
  "/updateProfile/:userId",
  userController.checkJWT,
  authController.updateProfile
);
module.exports = router;
