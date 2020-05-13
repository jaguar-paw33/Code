const Post = require('../../../models/Post');
module.exports.posts = async function(req,res){
    try{
        let posts = await Post.find({}).sort('-createdAt');
        return res.json(200, {
            message:'Posts fetched Successfully',
            data:{
                posts:posts
            }
        })  
    }catch(err){
        console.log('Error', err);
        return res.json(500, {
            message:'Internal Server Error'
        })        
    }
    
}


module.exports.destroy = async function(req,res){
    let post = await Post.findById(req.params.id);
    if(post){
        post.remove();
        return res.json(200, {
            message:'Successfully Deleted'
        })
    }else{
        return res.json('404', {
            message:'Not Found'
        })
    }
}