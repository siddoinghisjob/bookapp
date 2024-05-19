const pool = require('../model/pool');
const model = require('./schema').user
const logout = async (id) => {
    try{
        const query = await model.findByIdAndUpdate(id, {loggedin : false});
        return true;
    }
    catch(e){
        return false;
    }
}

module.exports = logout;