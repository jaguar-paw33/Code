const passport = require('passport');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID:"120223279993-f7bfk53m9dglp6j1ldrq0sgvb75h5fb5.apps.googleusercontent.com",
    clientSecret:"sab9Zi6kHSkGcfQf-t0FWyis",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
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