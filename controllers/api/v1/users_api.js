const jwt = require('jsonwebtoken');
const User = require('../../../models/User');


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
                token:jwt.sign(user.toJSON(), 'codeial', {expiresIn:'100000'})
            }
        })
    }
    }catch(err){
        return res.json(500, {
            message:'Internal Server Error'
        })
    }
}