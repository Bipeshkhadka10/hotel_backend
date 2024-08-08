const express = require('express');
const position = require('../models/position');
const router = express.Router();

// add person/position routes


router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newPosition= position(data);
        const response= await newPosition.save();
        console.log('data saved');
        res.status(200).json(response)
       }
       catch(err)
       {
        res.status(500).json({Error:'internal server errror'})
       }
  })

  router.get('/',async(req,res)=>{
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