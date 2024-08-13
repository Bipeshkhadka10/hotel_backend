const express = require('express');
const position = require('../models/position');
const { generateToken, jwtAuthMiddleWare } = require('../jwt');
const router = express.Router();


// add person/position routes


router.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        const newPosition= position(data);
        const response= await newPosition.save();
        console.log('data saved');
        
        // assginign the payload
        const payload ={
          id: response.id,
          username:response.username,
          password:response.Password
        }
        const token = generateToken(payload);
        console.log('token is : ',token)
        res.status(200).json({response,token: token})
       }
       catch(err)
       {
        res.status(500).json({Error:'internal server errror'})
       }
  })

  router.post('/login',async(req,res)=>{

    try {
      // creating a login route in case token is expired
      const {username, Password} = req.body;
      //checking user in db
      const user = await position.findOne({username: username});
      // incase if username or password is wrong even user is right then
      if(!user)
      {
        return res.status(401).json({error:'invalid user'})
       }

     

        const payload ={
          id:user.id,
          username:user.username
        }

        const token = generateToken(payload);
        res.json({token});

    } catch (error) {
      res.status(500).json({error:'internal server error'})
    }
  })



  router.get('/',jwtAuthMiddleWare,async(req,res)=>{
    const data = await position.find();
    console.log('fetched data')
    res.status(200).json(data);
  })
  


 router.get('/:work',async(req,res)=>{
   const workType = req.params.work;
    // authencate the url for the particulat field
   if (workType=="chef" ||workType=="manager" || workType=="waiter")  {
    try{
        const data = await position.find({work:workType});
        console.log('fetched successfully')
        res.status(200).json(data)
       }
       catch(err)
       {
        res.status(500).json({Error:'internal server errror'})
       }
   } else {
    res.status(404).json({Error:'page not found'});
   }

 })



// update operations
router.put('/:id',async(req,res)=>{
  try{
    const positionId = req.params.id;
    const changedata = req.body; // updated data

    const response = await position.findByIdAndUpdate(positionId,changedata,{
      new:true,  //return updated documents
      runValidators:true  // automatically provide mongoose validation
    })
    if(!response){
      res.status(404).json({message:'page not found'})
    }
    console.log('data updated')
    res.status(200).json(response)
  }
  catch(err){
    res.status(500).json({error:'internal server error'})
  }
})


// delete operations

router.delete('/:id',async(req,res)=>{
  try{
    const positionId = req.params.id;
    const deletedperson= await position.findByIdAndDelete(positionId);

    if(!deletedperson)
    {
      res.status(404).json({message:'data not found'})
    }

    console.log('data deleted');
    res.status(200).json(deletedperson);
  }
  catch(err)
  {
    res.status(500).json({error:'internal server error'})
  }
})

module.exports=router;