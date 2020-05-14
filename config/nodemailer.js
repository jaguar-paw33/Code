
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: 'mishrapriyank0303', 
        pass: 'UP93W8549' 
    }
});


let renderTemplate = (data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mail_templates',relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Error', err);
                return;
            }
            
            mailHtml = template;
        }
    )
    return mailHtml;
}

module.exports ={
    transporter:transporter,
    renderTemplate:renderTemplate
}