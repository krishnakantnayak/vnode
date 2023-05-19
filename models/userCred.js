const mongoose = require('mongoose');

const userCredSchema= mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required:true
    },
    otp:{
        type:String,
    },
    
    failedAttempts:{
        type:Number,
        default:0
    },
    lockedAt:{
        type:Date
    }
    
},{timestamps:true});

const UserCred=mongoose.model('UserCred',userCredSchema);
module.exports=UserCred;