const model = require("./schema").review;
const usermodel = require("./schema").user;

const add = async (req) => {
  try {
    const review = new model({
      oid: req.body.oid,
      rating: req.body.rating,
      review: req.body.text,
      uid: req.jwtid,
    });
    await review.save();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const get = async (id) => {
  try {
    const book = await model.find({ oid: id });
    let rating = 0;
    const reviews = [];
    for(let i = 0; i < book.length; i++){
        rating += book[i].rating;
        reviews.push({
            text : book[i].review,
            rating : book[i].rating
        })
    }
    return {
        rating : book.length>0?rating/book.length:0,
        reviews : reviews
    };
  } catch (e) {
    return [];
  }
};

module.exports = { add, get };
