const router = require("express").Router();
const {body, validationResult} = require('express-validator');
const { addStudent, classParticipants, allStudent } = require('../controller/studentCrontroller');

router.post("/", addStudent);
router.get("/all", allStudent);
router.get('/:cid', classParticipants);

module.exports = router;