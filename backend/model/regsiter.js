const bcrypt = require("bcrypt");
const model = require("./schema").user;

const register = async (body) => {
  const { username, email, password } = body;
  try {
    const pass = await bcrypt.hashSync(password, 10);
    const user = new model({
      name: username,
      email: email,
      password: pass,
      loggedin: false,
    });
    await user.save();
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = register;
