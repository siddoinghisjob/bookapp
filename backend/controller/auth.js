const getDataById = require("../model/auth");

const auth = async (req, res) => {
  const results = await getDataById(req.jwtid);

  if (!results.success)
    return res
      .status(401)
      .json({ success: false, msg: ["Invalid credentials."] });
  const data = {
    success: true,
    username: results.username,
    email: results.email,
    avatar:results.avatar
  };
  res.status(200).json(data);
};

module.exports = auth;