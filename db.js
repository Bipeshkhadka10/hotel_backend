//require the mongoose model
const mongoose = require('mongoose')

//define a mongodb URL
//const mongoURL= 'mongodb://localhost:27017/hotel'  // we can put any database name 
// contecting with the cloud database
const mongoURL ='mongodb+srv://bipeshkhadka2003:hello1234@hotel.i8p32.mongodb.net/'
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