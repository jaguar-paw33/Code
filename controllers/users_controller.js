const User = require('../models/User');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req,res){
    let user = await User.findById(req.params.id);
    if(user){
        return res.render('profile', {
            title:'Profile',
            profile_user:user
        })
    }else{
        console.log('Unauthorised');
        return;
    }
    
}

module.exports.update = async function(req,res){
    try{
        if(req.params.id == req.user.id){

        let user = await User.findById(req.user.id);
        if(user){
             User.uploadedAvatar(req,res, (err)=>{
                 if(err){
                     console.log('Error', err);
                     return res.redirect('back');
                 }
                user.name= req.body.name;
                user.email = req.body.email;
                if(req.file){
    
                    if(user.avatar && fs.existsSync(path.join(__dirname,'..', user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                        user.avatar = path.join(User.avatarPath, '/', req.file.filename);
                    }
                    else{
                        user.avatar = path.join(User.avatarPath, '/', req.file.filename);
                    }
                }
                user.save();
                return res.redirect('back');
            })
        }

        }else{
            console.log('Unauthorosed');
            return res.redirect('back');
        }
        
    }catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    else{
        return res.render('signIn', {
            title:'Sign In'
        })
    }
}


module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    else{
        return res.render('signUp', {
        title:'Sign Up'
        })
    }
}


module.exports.create = async function(req,res){

    try{
            if(req.body.password != req.body.confirm_password)
            {
                console.log('Confirm Password does not Match');
                return res.redirect('back');
            }

            let user = await User.findOne({email:req.body.email});
            if(user){
                console.log('User already exists');
                return res.redirect('/users/signIn');
            }
            else{
                await User.create(req.body);
                console.log('Successfully Created');
                return res.redirect('/users/signIn');
            }
        
    }catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
}


module.exports.create_session = function(req,res){
    return res.redirect('/');
}


module.exports.destroy_session = function(req,res){
    req.logout();
    return res.redirect('/users/signIn');
}