
const User = require('../models/userCred');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});

        if(!user){
            return res.json(422, {
                message: "Invalid Email or OTP"
            });
        }

        if(user.failedAttempts>=5){
            if(user.lockedAt){
                if(((new Date().getTime() - user.lockedAt.getTime()) / 60000) <= 60){
                    return res.json(421,{
                        message:`Account has been locked please wait ${60- ((new Date().getTime() - user.lockedAt.getTime()) / 60000)} mins`
                    })
                }
            }            
            
        }

        

        if (((new Date().getTime() - user.updatedAt.getTime()) / 60000) >5) {
            //otp expired
            return res.json(421,{
                message:'OTP has been expired, please generate otp again'
            })
        }

        

        if (!user || user.otp != req.body.otp){
            if(!user.failedAttempts){
                user.failedAttempts=0;
                user.save();
            }
            else{
                user.failedAttempts+=1;
                user.save();
                if(user.failedAttempts>=5){
                    user.lockedAt=new Date();
                }
            }
            
            return res.json(422, {
                message: "Invalid Email or OTP"
            });
        }

        user.failedAttempts=0;
        user.save();

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '10000'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}