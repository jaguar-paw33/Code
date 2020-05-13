const Like = require('../models/Like');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/Comment');

module.exports.toggle_like = async function(req,res){

    try{
        let deleted = false;
        let likeable;
        if(req.query.type == 'Post')
        {
            likeable = await Post.findById(req.query.id);
        }else{
            likeable = await Comment.findById(req.query.id);
        }

        
        let like = await Like.findOne({
            user:req.user.id,
            likeable:req.query.id,
            onModel:req.query.type
        });
        if(!like){
            
            like = await Like .create({
                user:req.user.id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            await likeable.likes.push(like._id);
            likeable.save();

            return res.redirect('back');
        }
        else{
            deleted = true;
            await likeable.likes.pull(like._id);
            await likeable.save();
            await like.remove();

            return res.redirect('back');
        }

    }catch(err){
        console.log('Error', err);
        return;
    }

    
}