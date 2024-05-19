const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const model = require('../model/auth');

const auth = async (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.secret, async (err, suc) => {
    if (err)
      {
        return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
        
      }
    const query = await model(suc.key);
    if (!query.success)
    {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }      
    req.jwtid = suc.key;
    next();
  });
};

module.exports = auth;
