const mongoose = require('mongoose');

const userCredSchema= mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
    },
    
    failedAttempts:{
        type:Number,
        default:0
    }
    
},{timestamps:true});

const UserCred=mongoose.model('UserCred',userCredSchema);
module.exports=UserCred;