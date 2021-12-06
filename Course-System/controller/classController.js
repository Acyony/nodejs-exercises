const Student = require('../model/studentModel');
const Class = require('../model/classModel');
const {validationResult} = require("express-validator");

//add a new class
async function addClass(req, res, next) {
    console.log("=^.^= Creating New Class!")

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }

        const result = await Class.create({
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            type: req.body.title
        });
        res.status(200).send(result);

    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}


//all classes
async function allClasses(req, res, next) {
    try {
        const classes = await Class.find();
        if (!classes) {
            res.status(200).send([]);
            return;
        }
        res.status(200).send(classes);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}

async function addStudentToClass(req, res, next) {
    try {

        // To find a class
        const klass = await Class.findById(req.params.cid);
        if (!klass) {
            res.status(404).send("Class not found");
            return;
        }

        // to find a student
        const sid = req.body.sid;
        const student = await Student.findById(sid);
        if (!student) {
            res.status(404).send("Student not found");
            return;
        }

        // to add a student into a class
        if (!klass.participants.find((s) => s._id.toString() === sid)) {
            klass.participants.push(sid);
            klass.save();
        }

        res.send(klass)
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}


//classParticipants
async function stdClasses(req, res, next) {
    try {
        const klasses = await Class.find({participants: req.params.sid})
        res.send(klasses);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}

module.exports = {addClass, allClasses, stdClasses, addStudentToClass};