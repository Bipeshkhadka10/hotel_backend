const mongoose = require('mongoose');

// defination and model for the database
const loginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },

    Password:
    {
        type:String,
        required:true,
    },
    address:{
        type:String,
    }

})


//creating a model 
const login = mongoose.model('login',loginSchema);
module.exports=login;