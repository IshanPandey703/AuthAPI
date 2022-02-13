const express = require('express')
const router = express.Router()
const userController = require('./../Controllers/userController')
const authController = require('./../Controllers/authController')
router.post('/login', userController.protect, authController.login)
router.route('/signUp').post(authController.signUp)
router.patch(
  '/update',
  userController.checkJWT,
  userController.UpdateUser
)
router.patch(
  '/deactivate',
  userController.checkJWT,
  userController.DeactivateUser
)
router.delete(
  '/delete',
  userController.checkJWT,
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
