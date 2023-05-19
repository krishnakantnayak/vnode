const nodeMailer = require('../config/nodemailer');
const User = require('../models/userCred');

function generateOTP() {

    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

exports.getotp = async function (req, res) {
    
    let otp = generateOTP();

    let user = await User.findOne({ 'email': req.body.email })
    if (user) {
        

        if(user.failedAttempts>=5){
            if(user.lockedAt){
                if(((new Date().getTime() - user.lockedAt.getTime()) / 60000) <= 60){
                    return res.json(421,{
                        message:`Account has been locked please wait ${60- ((new Date().getTime() - user.lockedAt.getTime()) / 60000)} mins`
                    })
                }
            }            
            
        }
        
        if (((new Date().getTime() - user.updatedAt.getTime()) / 60000) < 1) {
            res.json({ message: 'cant generate OTP as last OTP was genearated within 1 minutes' })
        } else {
            user.otp = otp;
            user.save();
            nodeMailer.transporter.sendMail({
                from: 'd52306406@gmail.com',
                to: req.body.email,
                subject: "OTP authentication for simplifii test app !",
                html: `<h1>Yup, your otp is ${otp}</h1>`
            }, (err, info) => {
                if (err) {
                    console.log('Error in sending mail', err);
                    return res.status(501).json({
                        message: 'failure'
                    });
                }

                console.log('Message sent', info);
                return res.status(201).json({
                    message: 'Please Check your mail for OTP and login within 5 minutes'
                });;
            });
        }
    }
    else {
        let newUser = User.create({
            email: req.body.email,
            otp: otp
        })
        nodeMailer.transporter.sendMail({
            from: 'd52306406@gmail.com',
            to: req.body.email,
            subject: "OTP authentication for simplifii test app !",
            html: `<h1>Yup, your otp is ${otp}</h1>`
        }, (err, info) => {
            if (err) {
                console.log('Error in sending mail', err);
                return res.status(501).json({
                    message: 'failure'
                });
            }

            console.log('Message sent', info);
            return res.status(201).json({
                message: 'Please Check your mail for OTP and login within 5 minutes'
            });;
        });
        return res.status(201).json({
            message: 'Please Check your mail for OTP and login within 5 minutes'
        });;
    }
}

