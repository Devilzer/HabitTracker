const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/",userController.start);
router.get("/signup",userController.signup);
router.post("/create-user",userController.createUser);
router.post("/login-user",userController.signinUser);
router.post("/create-habit",userController.createHabit);
router.get("/update/:date&:habit",userController.updateHabitStatus);
router.get("/delete-habit/:id",userController.deleteHabit);
// router.get("/dashboard",userController.home);

module.exports = router;