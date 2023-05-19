
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

        if (((new Date().getTime() - user.updatedAt.getTime()) / 60000) >5) {
            //otp expired
            return res.json(421,{
                message:'OTP has been expired, please generate otp again'
            })
        }

        if (!user || user.otp != req.body.otp){
            return res.json(422, {
                message: "Invalid Email or OTP"
            });
        }

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