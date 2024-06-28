const express = require("express");
const { login, register } = require("../Controller/userController.js");


const router = express.Router();
router.post("/signup",register);
router.post("/signin",login);


module.exports = router;