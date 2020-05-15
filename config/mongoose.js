const mongoose = require('mongoose');
const env = require('../config/environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;


db.on('error', console.error.bind(console, "Error connecting to DB"));

db.once('open', function(){
    console.log('Successfully Connected to DB');
    
})


module.exports = db;