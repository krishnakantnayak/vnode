const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const passport=require('passport');
const passportJWT=require('./config/passpotr-jwt-strategy');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){console.log(`app failure due to ${err}`);}
    console.log(`app running on port ${port}`);
})