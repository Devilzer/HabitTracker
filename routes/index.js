const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/",userController.start);
router.get("/signup",userController.signup);
router.post("/create-user",userController.createUser);
router.post("/login-user",userController.createUser);

module.exports = router;