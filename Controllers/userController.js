const User = require("../Models/UserModel");
const {promisify} = require("util");
const { validationResult } = require('express-validator')

exports.protect = async (req,res,next) => {
    const user = await User.findOne({rollNum: req.body.userName})
    .select("+password");
    if(!user){
        res.status(400).json({
            "message": "Either UserName or Password Wrong"
        });
    }
    const compare = await user.comaperPassword(req.body.password, user.password);
    if(compare) return next();
    if(!user || !compare){
        res.status(401).json({
            "message": "Either UserName or Password Wrong"
        });
    }
};

exports.checkJWT = async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if(req.cookies.jwt) token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        res.status(401).json({
            "message": "Invalid User"
        });
    }
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return res.status(400).json({
            "message": "Token Expired, Login again"
        }); 
    }
    req._id = decoded.id;
    next();
};

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
      await ExistingUser.save();
  }catch(err){
    next(new Error('User could not be updated!!'))
  }
  res.status(200).json({"Message":"User updated successfully",ExistingUser});
}

exports.DeleteUser = async(req,res,next) => {
  const {userId} = req.body;
  let ExistingUser
  try {
    ExistingUser = await User.findOne({ UserId: userId })
  } catch (err) {
    next(new Error('User not found!!'))
  }
  try {
    await ExistingUser.remove();
  } catch (err) {
    next(new Error('User deletion failed!!'))
  }
  res.status(200).json({"Message":"User Deleted successfully",ExistingUser});
}

