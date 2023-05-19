const express=require('express');
const router=express.Router();


router.use('/api', require('./api'));
router.get('/',(req,res)=>{
    return res.send('root');
})

module.exports=router;