const router = require("express").Router();
const {
  addUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

router.post("/register", addUser);
router.post("/login", loginUser);
router.get("/:uid", getUserById);
router.get("/", getAllUsers);
router.put("/update/:uid", updateUser);
router.delete("/delete/:uid", deleteUser);
module.exports = router;
