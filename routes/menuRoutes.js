const express=require('express')
const router=express.Router();
const menu=require('../models/menu')

router.post('/',async(req,res)=>{

    try{
        // getting data from the client
        const data =req.body;
       
        // create new menu document of mongoose
        const newmenu= menu(data);
        //save the data in the database
        const response= await newmenu.save();
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
          const resposnse=await menu.find();
          console.log('data fetched')
          res.status(200).json(resposnse);
        }
        catch(err)
        {
          res.status(500).json({error:'internal server error'})
        }
      })
    
    
    router.get('/:taste',async(req,res)=>{
        // getting the taste from the url
    const tasteType=req.params.taste;

    if(tasteType=="salty"||tasteType=="sweet"||tasteType=="spicy"||tasteType=="soule"){
        try{
         
            const menuitems = await menu.find({taste:tasteType});
            console.log('fetched successfully');
            res.status(200).json(menuitems);
            }
            catch(err){
                res.status(500).json({err:'internal server err'});
            }
    }else{
        res.status(404).json({error:'page not found'})
    }

    })
       
// update operations
router.put('/:id',async(req,res)=>{
    try{
      const menuId = req.params.id;  //extract the id
      const updateddata = req.body;  //updated data
  
      const response = await menu.findByIdAndUpdate(menuId,updateddata,{
        new:true,  //returns the updated documents
        runValidators:true  //run mongoose validationa automatically
      })
      if(!response){
        res.status(404).json({error:'page not found'})
      }
  
      console.log('data updated')
      res.status(200).json(response)
    }
    catch(err)
    {
      res.status(500).json({error:'server error'})
    }
  
  })

  // delete operations

router.delete('/:id',async(req,res)=>{
    try{
      const menuId = req.params.id;
      const deletedmenu= await menu.findByIdAndDelete(menuId);
  
      if(!deletedmenu)
      {
        res.status(404).json({message:'data not found'})
      }
  
      console.log('data deleted');
      res.status(200).json(deletedmenu);
    }
    catch(err)
    {
      res.status(500).json({error:'internal server error'})
    }
  })
 

 module.exports=router;