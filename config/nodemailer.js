const nodemailer=require('nodemailer');
const ejs = require('ejs');
const path = require('path')



let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'d52306406@gmail.com',
        pass:'bpqxgmkhwvwtxdnp'
    }
})


module.exports = {
    transporter: transporter
}