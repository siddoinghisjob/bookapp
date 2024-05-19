const reg = require("../model/regsiter");

module.exports = async (req, res) => {
  const util = await reg(req.body);
  if (!util) return res.status(400).json({ success: false });
  res.status(200).json({ success: true });
};
