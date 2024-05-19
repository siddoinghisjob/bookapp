const model = require('./schema').user;

const Auth = async (id) => {
  try {
    const query = await model.findById(id);
    if (query.loggedin == true)
      return {
        success: true,
        username: query.name,
        email: query.email,
      };
    else return { success: false };
  } catch (e) {
    return { success: false };
  }
};

module.exports = Auth;
