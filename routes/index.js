const express=require('express');
const router=express.Router();


router.use('/api', require('./api'));
const getOTPController = require("../controllers/getOTPController");
const getJWTTokenController=require("../controllers/getJWTController");


router.get('/getOTP', getOTPController.getotp);
router.post('/getJWTToken',getJWTTokenController.createSession);

router.get('/',(req,res)=>{
    return res.send('root');
})

module.exports=router;