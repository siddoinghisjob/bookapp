const mongoose = require('./pool');

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    loggedin : Boolean
});

const user = mongoose.model("User",userSchema);

const reviewSchema = new mongoose.Schema({
    oid : String,
    rating : Number,
    review: String,
    name : String
});

const review = mongoose.model("review",reviewSchema);

module.exports = {user, review};