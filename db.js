//require the mongoose model
const mongoose = require('mongoose')
require('dotenv').config();


//define a mongodb URL
//const mongoURL= process.env.MONGO_DBLOCALURL  // we can put any database name 


// contecting with the cloud database

const mongoURL=process.env.MONGO_DBURL;
//setup mongodb connections
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

// get default object connections
const db=mongoose.connection;   // here mongoose maintain a default connection object

// adding a event listner to know the database connections status

db.on('connected',()=>{
    console.log("connected to the mongodb server");
})

db.on('error',(err)=>{
    console.log("mongodb connection error",err)
})

db.on('disconnected',()=>{
    console.log("failed to connect mongodb server")
})


// export this db or default connection to the app.js for interaction with node js

module.exports=db;