const loginChecker = require("../model/login");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const utility = await loginChecker(password, email);
  if (utility.success) {
    jwt.sign(
      JSON.stringify({
        key: utility.id,
      }),
      process.env.secret,
      (err, token) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, msg: ["Email or password is wrong."] });
        }

        if (token)
          return res
            .cookie("token", token, {
              httpOnly: true,
              expires: 0,
              sameSite: "None",
              secure: true,
            })
            .json({ success: true, msg: ["Success!"] });

        return res
          .status(500)
          .json({ success: false, msg: ["Email or password is wrong."] });
      }
    );
  } else
    return res
      .status(421)
      .json({ success: false, msg: ["Email or password is wrong."] });
};
