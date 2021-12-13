const Student = require('../model/studentModel');
const Class = require('../model/classModel');
const {validationResult} = require('express-validator');
const bcrypt = require("bcrypt");


/*-----=^.^=---------add a new Student-----=^.^=-----*/
async function addStudent(req, res, next) {
    console.log("=^.^= Hello New Student!")

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }

        const {fullName, email, password, phone, address, job} = req.body;

        const result = await Student.create({
            fullName,
            email,
            password: await encryptPassword(password),
            phone,
            address,
            job
        });

        // Returning "result will expose the user password what isn't safe
        /*res.status(200).send({result});*/

        res.status(200).send({
            fullName, email, phone, address, job
        });

    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }

}

/*-----=^.^=---------to get the list of students of a class with cid-----=^.^=-----*/

async function classParticipants(req, res, next) {
    console.log("=^.^= Hello class Participants!")
    try {
        console.log(req.params)

        const classId = req.params.cid;
        const students = await Class.findById(classId).populate('participants', 'fullname');
        res.status(200).send(students);

    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }

}


/*-----=^.^=---------to get the list of all students-----=^.^=-----*/
async function allStudent(req, res, next) {
    console.log("=^.^= Hello New Student!")

    try {
        const students = await Student.find();
        if (!students) {
            res.status(200).send({results: students.length, students});
            return;
        }
        res.status(200).send(students);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}


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


module.exports = {addStudent, classParticipants, allStudent};