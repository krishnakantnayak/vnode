const express=require('express');
const app=express()

app.use('/',function(req,res){
    return res.json({'all good':0})
})

app.listen(8000,function(err){
    if(err){console.log(`running on port 8000`);}
    console.log(`running on port 8000`);
})