const passport = require('passport');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
const env = require('../config/environment');


passport.use(new GoogleStrategy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({email:profile.emails[0].value}, (err, user)=>{
        if(user){
            return done(null, user);
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(5).toString('hex')
            },(err, user)=>{
                return done(null, user);
            })
        }
    })
  }
));


passport.serializeUser((user,done)=>{
    return done(null, user);
})


module.exports = passport;