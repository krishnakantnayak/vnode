const express=require('express');
const app=express();
const dotenv=require('dotenv').config()

const port=process.env.PORT;
const db=require('./config/mongoose');
const passport=require('passport');
const passportJWT=require('./config/passpotr-jwt-strategy');
app.use(express.json());

app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){console.log(`app failure due to ${err}`);}
    console.log(`app running on port ${port}`);
})