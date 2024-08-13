const passport = require('passport')
const LocalStratergy=require('passport-local').Strategy;
const login = require('./models/login')
const position = require('./models/position')
 //authentication part for positions

 passport.use(new LocalStratergy(async(username,Password,done)=>{
    //here is the logic implementation for authentication of username and password
    console.log('Recived crediantials',username,Password);

   try{
     // checking for the username auth
     const user = await login.findOne({username: username})
     // if user is not matched then
     if(!user){
         return done(null,false,{message:'invalid username'})
     }
 
     const checkPassword = await user.comparePassword(Password);
     // checking password if password matched then
     if(checkPassword){
         return done(null,user);
     }
     else{
         return done(null,false,{message:'wrong Password'})
     }
   }
   catch(err)
   {
    return done(err);
   }
}))



//positions authentications
passport.use(new LocalStratergy(async(username,Password,done)=>{
    //here is the logic implementation for authentication of username and password
    console.log('Recived crediantials',username,Password);

   try{
     // checking for the username auth
     const user = await position.findOne({username: username})
     // if user is not matched then
     if(!user){
         return done(null,false,{message:'invalid username'})
     }
 
     const checkPassword = await user.comparePassword(Password);
     // checking password if password matched then
     if(checkPassword){
         return done(null,user);
     }
     else{
         return done(null,false,{message:'wrong Password'})
     }
   }
   catch(err)
   {
    return done(err);
   }
}))




module.exports = passport;