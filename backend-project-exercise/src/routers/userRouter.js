const router = require('express').Router();
const {addUser, getUserById, getAllUsers, updateUser, deleteUser} = require('../controllers/userController')
router.post('/', addUser);
router.get('/:uid', getUserById);
router.get('/', getAllUsers);
router.put('/update/:uid',updateUser);
router.delete('/delete/:uid', deleteUser);
module.exports = router;