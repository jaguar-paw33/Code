const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const env = require('../../../config/environment');



module.exports.create_session = async function(req,res){
    try{
    let user = await User.findOne({email:req.body.email});
    
    if(!user || user.password!= req.body.password)
    {
        return res.json(401,{
            message:'Unauthorised'
        })
    }else{
        return res.json(200,{
            message:'Here is your token',
            data:{
                token:jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn:'100000'})
            }
        })
    }
    }catch(err){
        return res.json(500, {
            message:'Internal Server Error'
        })
    }
}