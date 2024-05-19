const model = require('../model/reviews').add;

const add = async (req, res) => {
    try{
        const query = await model(req);
        res.json({success : true}).status(200);
    }
    catch(e){
        res.json({success : false}).status(400);
    }
}

module.exports = { add };