const mongoose=require('mongoose');

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
    }
})


const position = mongoose.model('position',positionSchema);
module.exports=position;