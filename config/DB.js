const mongoose = require('mongoose');
require('dotenv').config()

async function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
       .then(() => console.log("DataBase Connected..."))
       .catch(err => console.log(err));
}

module.exports = connectDB;