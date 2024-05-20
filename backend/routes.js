const router = require("express").Router();

const auth = require("./utils/auth");
const auth_controller = require("./controller/auth"); 
const logout = require("./controller/logout"); 
const login = require('./controller/login');
const register = require('./controller/register');
const images = require("./controller/images");
const work = require('./controller/work');
const search = require("./controller/search");
const { add } = require("./controller/review");

router.post('/login',login);
router.post('/register', register);

router.use(auth)
router.post("/logout", logout);
router.get("/images/:page", images);
router.post("/auth", auth_controller);
router.get("/work/:id",work);
router.get("/search/:id",search);
router.post("/review",add);

module.exports =  router;