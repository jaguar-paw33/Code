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
           let post = await Post.create({
                content:req.body.content,
                user:req.user.id
            });
            post = await post.populate('user', 'name email').execPopulate();
            if(req.xhr){
                return res.json(200, {
                    message:'Successfully Posted',
                    data:{
                        post:post
                    }
                })
            }

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
            if(req.xhr){
                return res.json(200,{
                    message:'Post Deleted',
                    data:{
                        post_id:req.params.id
                    }
                })
            }
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