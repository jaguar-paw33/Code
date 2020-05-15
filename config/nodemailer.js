
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env = require('../config/environment');


let transporter = nodemailer.createTransport(env.smtp);


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