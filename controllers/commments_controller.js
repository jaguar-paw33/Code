const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post_id);

        
        if(post){
           let comment =  await Comment.create({
            user:req.user.id,
            content:req.body.content,
            post:req.body.post_id
           });
           
           await post.comments.push(comment._id);
           post.save();
           comment = await comment.populate('user', 'name').execPopulate();
           if(req.xhr){
                return res.json(200, {
                    message:'Successfully Commented',
                    data:{
                        comment:comment
                    }
                })
           }

           return res.redirect('back');    
        }
        else{
            console.log('Unauthorised');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return ;
    }
}

module.exports.destroy = async function(req,res){
    try{

        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user .id)
        {
            let post_id = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(post_id, {$pull:{comments:req.params.id}});
            
            if(req.xhr){
                return res.json(200, {
                    message:'Successfully Deleted',
                    data:{
                        comment_id:req.params.id
                    }
                })
            }
            
            return res.redirect('back');
        }else{
            let post = await Post.findById(comment.post);
            if(post.user == req.user.id)
            {
                comment.remove();
                post.comments.pull(req.params.id);
                post.save();
                if(req.xhr){
                    return res.json(200, {
                        message:'Successfully Deleted',
                        data:{
                            comment_id:req.params.id
                        }
                    })
                }
                return res.redirect('back');
            }
            else{
                console.log('Unauthorised');
                return res.redirect('back');
            }
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
   
}