const express=require('express');
const router = express.Router();
const { register,login,forgotPassword, resetPassword, getUsers, updateUserById, deleteUserById } = require('../controllers/auth');
const { protect } = require("../middleware/auth");



router.route("/:userId").delete(protect, deleteUserById);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);
router.route("/").get(protect, getUsers);
router.route("/:userId").put(protect, updateUserById);
  

module.exports=router;

