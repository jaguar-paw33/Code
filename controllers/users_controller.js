const User = require('../models/User');
const Friend = require('../models/Friend');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req,res){
    let user = await User.findById(req.params.id);
    let friend =await  Friend.findOne({
        from_user:req.user._id,
        to_user:req.params.id
    });
    if(!friend){
        friend =await  Friend.findOne({
            to_user:req.user.id,
            from_user:req.params.id
        });
    }
    if(user){
        
        return res.render('profile', {
            title:'Profile',
            profile_user:user,
            isFriend:friend
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
<<<<<<< HEAD
                req.flash('success', 'Successfully Updated');
=======
                req.flash('success', 'Updated Successfully');
>>>>>>> noty
                return res.redirect('back');
            })
        }

        }else{
            req.flash('error', 'Unauthorised');
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
<<<<<<< HEAD
                req.flash('error', 'Confirm Password does not match');
=======
                req.flash('error', 'Confirm Password does not Match');
>>>>>>> noty
                return res.redirect('back');
            }

            let user = await User.findOne({email:req.body.email});
            if(user){
<<<<<<< HEAD
                req.flash('error', 'User Already Exists');
=======
                req.flash('error', 'User already exists');
>>>>>>> noty
                return res.redirect('/users/signIn');
            }
            else{
                await User.create(req.body);
<<<<<<< HEAD
                req.flash('success', 'Successfully Signed Up');
=======
                req.flash('success', 'Signed Up Successfully');
>>>>>>> noty
                return res.redirect('/users/signIn');
            }
        
    }catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
}


module.exports.create_session = function(req,res){
<<<<<<< HEAD
    req.flash('success', 'Successfully Signed In');
=======
    req.flash('success', 'Signed In Successfully');
>>>>>>> noty
    return res.redirect('/');
}


module.exports.destroy_session = function(req,res){
    req.logout();
<<<<<<< HEAD
    req.flash('success', 'Successfully Signed Out');
=======
    req.flash('success', 'Signed Out Successfully');
>>>>>>> noty
    return res.redirect('/users/signIn');
}