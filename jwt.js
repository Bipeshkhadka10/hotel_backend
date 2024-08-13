// here i will create a middleware for verify the jwt token and generate the new token as username and password is given
const jwt = require('jsonwebtoken');


// creating a verify middleware for jwt token

const jwtAuthMiddleWare = (req,res,next)=>{
    
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'invalid token'})

    // we extract the jwt token from the request header by spliting the bearse token
    const token = req.headers.authorization.split(' ')[1];

    // if token is not valid 
    if(!token) return res.status(404).json({error:'unauthorize'})

    try
    {
       // to verify the token
       const decoded = jwt.verify(token,process.env.SECREAT_KEY);
       
       // passing the payload to user
       req.user = decoded;
       next();

        
    }
    catch(err){
        console.log(err)
        res.status(401).json({err:'invalid token'})
    }
}


// for generating te jwt token
 const generateToken = (userData)=>{
    try{
        //generating token using .sign()
        return jwt.sign(userData,process.env.SECREAT_KEY,{expiresIn: 300000});
    }
    catch(err)
    {
        console.log(err)
        res.status(401).json({err:'invalid token'})
    }
 }




module.exports ={jwtAuthMiddleWare,generateToken};