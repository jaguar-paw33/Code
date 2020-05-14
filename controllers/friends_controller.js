const Friend = require('../models/Friend');
const User = require('../models/User');

module.exports.toggle_friend = async function(req,res){

    try{
        let user1 = await User.findById(req.user.id);
        let user2 = await User.findById(req.params.id);
    if(user1 && user2){
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

        if(friend){
            friend.remove();
            await user1.friends.pull(friend._id);
            await user1.save();
            await user2.friends.pull(friend._id);
            await user2.save();
            if(req.xhr){
                return res.json(200, {
                    message:'Removed',
                    data:{
                        text:'Add-Friend'
                    }
                })
            }

            return res.redirect('back');            
        }else{

            let friend = await Friend.create({
                from_user:req.user.id,
                to_user:req.params.id
            });
            await user1.friends.push(friend._id);
            user1.save();
            await user2.friends.push(friend._id);
            user2.save();

            if(req.xhr){
                return res.json(200, {
                    message:'Added',
                    data:{
                        text:'Un-Friend'
                    }
                })
            }


            return res.redirect('back');
        }
    }else{
        console.log('Unauthorised');
        return res.redirect('back');
    }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}
