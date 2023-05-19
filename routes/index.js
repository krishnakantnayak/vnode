const express=require('express');
const router=express.Router();


router.use('/api', require('./api'));
router.get('/',(req,res)=>{
    return res.json(2999);
})

module.exports=router;