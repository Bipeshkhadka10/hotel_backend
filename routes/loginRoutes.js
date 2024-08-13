const express=require('express')
const  router=express.Router();
const login=require('../models/login')


router.post('/',async(req,res)=>{

    try{
        // here the data id saved in the data throught the req.body
  const data =req.body;  

  // creating a new login document of mongoose model 
   const newlogin = login(data);

   // save the login data in the database with .save() function;
   const response = await newlogin.save();
   console.log('data saved');
   res.status(200).json(response); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'internal server error'});

    }
})

router.get('/',async(req,res)=>{
    try{

        const data = await login.find();
        console.log('fetched succesfully');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'internal server error'})
    }
})


module.exports=router;