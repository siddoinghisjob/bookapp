const model = require("./schema").user;
const bcrypt = require("bcrypt");

const compare = (db_password, password) => {
  return new Promise(function (resolve) {
    bcrypt.compare(password, db_password, (err) => {
      if (err) resolve(false);
      resolve(true);
    });
  });
};

const login = async (password, email) => {
  try {
    const query = await model.findOne({ email: email });
    if (!query) throw new Error();
    const db_password = query.password;
    const com = await compare(db_password, password);
    if (!com) throw new Error();
    await model.findByIdAndUpdate(query._id, { loggedin: true });
    return { success: true, id: query._id };
  } catch (err) {
    return { success: false };
  }
};

module.exports = login;
