const User = require("../models/UserModel");
require("dotenv").config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
     return res.status(401).json({ message: 'Unauthorized' });
    } else {
      const user = await User.findById(data.id)
      if (user) {
        req.user = user;
        next();
      }
      else return res.status(401).json({ message: 'Unauthorized' });
    }
  })
}

module.exports.getLoggedInUser = (req, res, next) => {
  return res.json({ status: true, username: req.user.username, id: req.user._id })
}