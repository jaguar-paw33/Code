const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment)=>{
   
    let htmlString = nodeMailer.renderTemplate(comment, '/comments/new_comment.ejs'); 
    nodeMailer.transporter.sendMail({
        from:'mishrapriyank0303@gmail.com',
        to:comment.user.email,
        subject:'New Comment',
        html:htmlString
    },(err, info)=>{
        if(err){
            console.log('Error', err);
            return;           
        }        
    })

}