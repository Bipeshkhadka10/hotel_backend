const express = require('express');
const app=express();
const db=require('./db');
require('dotenv').config();
const passport =require('./auth');
const login = require('./models/login');
const {jwtAuthMiddleWare,generateToken} = require('./jwt')

const bcrypt = require('bcrypt')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT=process.env.PORT||5000

app.set('views engine','ejs');


// middleware function for loginRequest 
const loginRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.orignialUrl}`)
    next()// for the next middleware
}

app.use(loginRequest);



// we have to initalize passport now
app.use(passport.initialize()); 

const authMiddleWare = passport.authenticate('local',{session:false});

app.get('/',function(req,res){
    res.render('home.ejs');
})


// login routing
const loginroutes= require('./routes/loginRoutes')
// we will pass as parameter in the routes where authentication is needed
app.use('/login',authMiddleWare,loginroutes);

// menu routing
const menuroutes = require('./routes/menuRoutes');
app.use('/menu',menuroutes);


// position routing
const positionRoutes = require('./routes/positionRoustes');
const position = require('./models/position');
app.use('/position',positionRoutes)


app.listen(PORT,()=>{
    console.log("successfully rendered at the port",PORT)
})