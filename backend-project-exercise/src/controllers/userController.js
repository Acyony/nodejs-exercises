const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

/*-----=^.^=--------- add a new User -----=^.^=-----*/

async function addUser(req, res, next) {
    console.log("=^.^= Hello New User!")

// handling  the error
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).send(err);
        }

        const {fullName, username, email, password} = req.body;
        const result = await User.create({
            fullName,
            username,
            email,
            password: await encryptPassword(password)
        })

        // Returning "result will expose the user password what isn't safe
        // res.status(200).send(result);

        res.status(200).send({
            fullName,
            username,
            email
        });

    } catch (err) {
        console.log(err);
        err.status(500);
        next(err);
    }


}


/*-----=^.^=--------- encrypting the password -----=^.^=-----*/
const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        })
    })
}


module.exports={addUser}