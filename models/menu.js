const mongoose =require('mongoose');

// creating the schema or model for the menu of a hotel in mongodbb

const menuschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
        required:true,
        default:0
    },
    taste:{
        type:String,
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false,
        required:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})


// creating model for the mongoose
 const menu = mongoose.model('menu',menuschema);
 module.exports=menu;