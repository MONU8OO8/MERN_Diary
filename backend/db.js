const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.ATLAS_URL;



const connectToMongo = ()=>{

    mongoose.connect(mongoURI, ()=>{
        console.log("connect to mongo successfully");
    })
}

module.exports = connectToMongo;