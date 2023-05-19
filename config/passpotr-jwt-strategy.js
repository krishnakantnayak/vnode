const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User=require('../models/userCred');
const opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'secretHiddenKey'
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){

    User.findOne({email:jwtPayload.email},function(err, user){
        if(err){
            console.log('error in finding user',err)
        }
        if(user){
            return done(null,user)
        }
        else{
            return done(null,false);
        }
    })
}));

module.exports = passport;