const User = require('../Models/UserModel')
const { validationResult } = require('express-validator')

exports.UpdateUser = async (req, res, next) => {
  const { userId, Name, rollNum, profilePhoto } = req.body
  let ExistingUser
  try {
    ExistingUser = await User.findOne({ UserId: userId })
  } catch (err) {
    next(new Error('User not found!!'))
  }
  ExistingUser.name = Name
  ExistingUser.rollNum = rollNum
  ExistingUser.profilePhoto = profilePhoto
  try{
      await User.save();
  }catch(err){
    next(new Error('User could not be updated!!'))
  }
  res.status(200).json({"Message":"User updated successfully",ExistingUser});
}

exports.protect = async (req, res, next) => {
  const user = await User.findOne({ rollNum: req.body.userName }).select(
    '+password'
  )
  // if(!user) tell user to check username and password
  const compare = await user.comparePassword(req.body.password, user.password)
  if (compare) return next()
  // else tell user to check username and password
}
