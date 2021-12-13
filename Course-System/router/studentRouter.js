const router = require("express").Router();
const {body, validationResult} = require('express-validator');
const { addStudent, classParticipants, allStudent } = require('../controller/studentCrontroller');

router.post("/",[
    body("fullName").notEmpty().withMessage('FullName name is required!').trim(),
    body('email', 'Email is required!').notEmpty().isEmail().normalizeEmail(),
    body('password', 'Password is required').isLength({min: 4}),
    body("phone").notEmpty().withMessage('Phone name is required!'),
    body("address").notEmpty().withMessage('Address name is required!'),
    body("job").notEmpty().withMessage('Job name is required!'),
], addStudent);
router.get("/all", allStudent);
router.get('/:cid', classParticipants);

module.exports = router;