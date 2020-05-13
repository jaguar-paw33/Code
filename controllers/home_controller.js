const Post = require('../models/Post');
const User = require('../models/User');

module.exports.home = async function(req,res){

    try{

        let posts = await Post.find({}).sort('-createdAt')
                        .populate('user', 'name email')
                        .populate({
                            path:'comments',
                            populate:{
                                path:'user',
                                path:'likes'
                            }
                        }).populate('likes');
        let users = await User.find({});
        return res.render('home', {
            title:'Home | Codeial',
            posts:posts,
            users:users
        })
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}