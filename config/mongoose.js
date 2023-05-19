const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Simplifi_Otp');
const db=mongoose.connection;

db.on('error',console.error.bind(console.log('error connecting to db')));
db.once('open',function(){
    console.log('storing records at mongoDB');
})