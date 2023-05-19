const express=require('express');
const router=express.Router();
 

const getOTPController = require("../../../controllers/getOTPController");
const getJWTTokenController=require("../../../controllers/getJWTController");


router.get('/getOTP', getOTPController.getotp);
router.post('/getJWTToken',getJWTTokenController.createSession);


module.exports=router;