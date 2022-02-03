const User = require("../Models/UserModel");

exports.protect = async (req, res, next) => {
  const user = await User.findOne({ rollNum: req.body.userName }).select(
    "+password"
  );
  // if(!user) tell user to check username and password
  const compare = await user.comparePassword(req.body.password, user.password);
  if (compare) return next();
  // else tell user to check username and password
};
