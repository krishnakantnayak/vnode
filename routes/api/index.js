const express=require('express');
const router=express.Router();


router.use('/v1', require('./v1'));
router.get('/',(req,res)=>{
    return res.send('api');
})

module.exports=router;