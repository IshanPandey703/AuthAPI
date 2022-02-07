const express = require('express')
const router = express.Router()
const userController = require('./../Controllers/userController')
const authController = require('./../Controllers/authController')
const { check } = require('express-validator')
router.post('/login', userController.protect, authController.login)
router.route('/signUp').post(authController.signUp)
router.patch(
  '/update',
  userController.checkJWT,
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
  userController.UpdateUser
)
router.patch(
  '/deactivate',
  userController.checkJWT,
  [
    check('userId')
      .not()
      .isEmpty()
  ],
  userController.DeactivateUser
)
router.delete(
  '/delete',
  userController.checkJWT,
  [
    check('userId')
      .not()
      .isEmpty()
  ],
  userController.DeleteUser
)
router
  .route('/viewMembers')
  .get(userController.checkJWT, authController.viewMembers)
router.get(
  '/viewProfile/:userId',
  userController.checkJWT,
  authController.viewProfile
)
router.patch(
  '/updateProfile/:userId',
  userController.checkJWT,
  authController.updateProfile
)
router.patch(
  '/updatePassword',
  userController.checkJWT,
  userController.updatePassword
)
module.exports = router
