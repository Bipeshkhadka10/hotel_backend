const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { text } = require('express');
// defination and model for the database
const loginSchema = new mongoose.Schema({
    username:{
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

// hashing the password before saving in database using .pre function

loginSchema.pre('save',async function (next) {
    //we store the password the is goint to be hashed
    const logins = this;
    //we check the password is modified or new else no need of hashing it
    if(!logins.isModified('Password'))  return next();
    try{
        //if the password is modified or new then 
    //first we generate the salt for hash
    const salt = await bcrypt.genSalt(10);
    // now we will hash password by .hash function (parameter1 = given paswrd, parameter2=salt)
    const hashedpassword = await bcrypt.hash(logins.Password,salt); 
        // saving hashed password in database
        logins.Password = hashedpassword;
    }  
    catch(err)
    {
        return next(err)
    }
})
//comparing the password for authentication
loginSchema.methods.comparePassword = async function (usersPassword) {
    try{
        const isMatched = await bcrypt.compare(usersPassword,this.Password);
        return isMatched;
    }
    catch(err)
    {
        throw(err);
    }
}

//creating a model 
const login = mongoose.model('login',loginSchema);
module.exports=login;