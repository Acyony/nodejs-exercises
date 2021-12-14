const express = require("express");
const {userSignup, userLogin, loggedIn} = require("../controllers/userControler");
const auth = require("../middleware/auth");

const {check} = require("express-validator")


const router = express.Router();


//http://localhost:5000/user/signup
router.post('/signup', [
    check("username", "Please, enter your username").notEmpty(),
    check("email", "Please, enter a valid email").notEmpty().isEmail(),
    check("password", "Please, enter a valid password").notEmpty().isLength({min: 4}),
], userSignup);

router.post('/login',[
    check("email", "Please, enter a valid email").notEmpty().isEmail(),
    check("password", "Please, enter a valid password").notEmpty().isLength({min: 4}),
],userLogin);
router.get('/me', auth, loggedIn)


module.exports = router;