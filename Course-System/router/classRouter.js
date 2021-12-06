const router = require('express').Router();
const {addClass, allClasses, stdClasses, addStudentToClass} = require('../controller/classController.js')

router.post('/', addClass);
router.get('/all', allClasses);
router.get('/:sid', stdClasses);
router.put('/addstudent/:cid', addStudentToClass);

module.exports = router;