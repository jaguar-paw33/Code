const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports.create= async function(req,res){

    try{
        let user = User.findById(req.user.id);
        if(!user){
            console.log('Unauthorised');
            return res.redirect('back');
        }
        else{
            await Post.create({
                content:req.body.content,
                user:req.user.id
            });
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
    
}

module.exports.destroy = async function(req,res){

    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            
            await post.remove();
            await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
        }else{
            console.log('Unauthorised');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }

   
}