const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback:true
    },function(req,email,password, done){
        User.findOne({email:email}, (err, user)=>{
            if(err){
                console.log('Error', err);
                return done(err);
            }
            if(!user || user.password != password){
               req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            else{
                return done(null, user);
            }
        })
    }
))


passport.serializeUser((user, done)=>{
    return done(null, user._id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        if(err){
            console.log('Error', err);
            return done(err);
        }
        else{
            return done(null, user);
        }
    })
})


passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else
    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;