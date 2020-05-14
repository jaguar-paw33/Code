const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
 
const log_directory = path.join(__dirname, '../production_logs');

fs.existsSync(log_directory) || fs.mkdirSync(log_directory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', 
  path: log_directory
});
 

const development = {
    name:'development',
    assets_path:'/assets',
    session_cookie_secret:'9XhkH9B5pXZFSVhs8qPAH1bw3k7aKubS',
    db:'codeial_development_db',
    smtp:{
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: 'mishrapriyank0303', 
            pass: 'UP93W8549' 
        }
    },
    google_clientID:"120223279993-f7bfk53m9dglp6j1ldrq0sgvb75h5fb5.apps.googleusercontent.com",
    google_clientSecret:"sab9Zi6kHSkGcfQf-t0FWyis",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'oM4gmXSXROcXf5MxWNKNbMkpYeQlkaxu',
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream }
    }
}



const production = {
    name:process.env.CODEIAL_ENVIRONMENT,
    assets_path:process.env.CODEIAL_ASSETS_PATH,
    session_cookie_secret:process.env.CODEIAL_SESSION_COOKIE_SECRET,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.CODEIAL_SMTP_AUTH_USER, 
            pass: process.env.CODEIAL_SMTP_AUTH_PASS 
        }
    },
    google_clientID:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_clientSecret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL:process.env.CODEIAL_GOOGLE_CALLBACKURL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream }
    }
}




module.exports = eval(process.env.CODEIAL_ENVIRONMENT=='production')?production:development;