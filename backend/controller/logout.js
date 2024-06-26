const model = require("../model/logout");

const logout = async (req, res) => {
  try {
    const success = await model(req.jwtid);
    if (!success) {
      throw new Error();
    }
    res.clearCookie("token");
    res.json({ success: true , message: "Successfully logged out" }).status(200);
  } catch (e) {
    res.json({ message: "Server Error" }).status(500);
  }
};

module.exports = logout;
