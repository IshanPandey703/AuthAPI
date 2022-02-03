const express = require('express')
const { check } = require('express-validator')
const UserController = requir('../Controllers/userController.js')
const AuthController = requir('../Controllers/authController.js')
const router = express.Router()

router.post('/login', UserController.protect, AuthController.login)
router.patch(
  '/update',
  [
    check('userId')
      .not()
      .isEmpty(),
    check('Name')
      .not()
      .isEmpty(),
    check('rollNum')
      .not()
      .isEmpty(),
    check('profilePhoto')
      .not()
      .isEmpty()
  ],
  UserController.UpdateUser
)
router.delete(
  '/update',
  [
    check('userId')
      .not()
      .isEmpty()
  ],
  UserController.DeleteUser
)
