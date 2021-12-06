const Student = require('../model/studentModel');
const {validationResult} = require('express-validator');


/*-----=^.^=---------add a new Student-----=^.^=-----*/
async function addStudent(req, res, next) {
    console.log("=^.^= Hello New Student!")

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }

        const result = await Student.create(req.body);
        res.status(200).send(result);

    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }

}

/*-----=^.^=---------to get the list of students of a class with cid-----=^.^=-----*/
function classParticipants(req, res, next) {
    res.send(req.url);
}





/*-----=^.^=---------to get the list of all students-----=^.^=-----*/
async function allStudent(req, res, next) {
    console.log("=^.^= Hello New Student!")

    try {
        const students = await Student.find();
        if (!students) {
            res.status(200).send([]);
            return;
        }
        res.status(200).send(students);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}

module.exports = {addStudent, classParticipants, allStudent};