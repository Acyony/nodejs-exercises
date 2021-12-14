const User = require("../model/User");

const {validationResult} = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.userSignup = async (req, res) => {
    // validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }


    //get user inputs - req.body
    const {username, password, email} = req.body;

    try {
        //check if user already exists
        let existingUser = await User.findOne({email});

        if (existingUser) {
            res.status(400).json({msg: "User already exists!"})
            return;
        }

        //create a new user if it doesn't exist
        const newUser = new User({
            username,
            email,
            password
        })

        //hash the password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        //save user to DB
        await newUser.save();

        //sight JWT and res token to the FE
        const payload = {
            newUser: {
                id: newUser.id,
                name: newUser.username
            }
        }

        jwt.sign(payload, "bonekDeCroche", {expiresIn: "1h"}, (err, token) => {
            if (err) throw err;
            res.status(200).json({token})
        })

    } catch (err) {
        res.status(500).send("Error in saving: " + err.message)
    }
}


exports.userLogin = async (req, res) => {
    // validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    const {email, password} = req.body; // frontend

    try {
        let user = await User.findOne({email}); //backend hashed password
        if (!user) {
            res.status(400).json({msg: "User not found!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({msg: "Incorrect password!"});
        }

        /*If true create a token*/
        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, "bonek_de_croche", {expiresIn: "1h"}, (err, token) => {
            if (err) throw err;
            res.status(200).json({token})
        })

    } catch (err) {
        res.status(500).send("Error in saving: " + err.message)
    }
};

exports.loggedIn = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        // res.json(user);
        res.status(200).send({username: user.username, email: user.email});
    } catch (error) {
        res.json({msg: "Error in fetching user"});
    }
}