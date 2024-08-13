const mongoose=require('mongoose');
const bcrypt = require('bcrypt')

const positionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    work:{
        type:String,
        enum:['chef','manager','waiter'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        uniqued:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        default: 15000,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

// hashing the password of the person

positionSchema.pre('save',async function (next) {
 
    const positions = this;
    // if password is not modified then
    if(!positions.isModified('Password')) return  nexr();
    
    try {
        //generating salt
        const salt = await bcrypt.genSalt(10);
            //hashing the password
        const hashed = await bcrypt.hash(positions.Password,salt);

        positions.Password=hashed;
        
    } catch (error) {
        return next(error);
    }
    
})

const position = mongoose.model('position',positionSchema);
module.exports=position;