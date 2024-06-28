const express = require("express");
const {sendEmail} = require("../Controller/sendEmailController.js");
const { auth_middleware } = require("../middleware/verify.js");


const router = express.Router();
router.post("/sendemail",  sendEmail);



module.exports = router;