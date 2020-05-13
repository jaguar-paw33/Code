const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;


db.on('error', console.error.bind(console, "Error connecting to DB"));

db.once('open', function(){
    console.log('Successfully Connected to DB');
    
})


module.exports = db;