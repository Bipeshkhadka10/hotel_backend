const express = require('express');
const app=express();
const db=require('./db');
require('dotenv').config();

// require an middleware module body-parser help to automatically convert the formate requested through http request

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT=process.env.PORT||5000


app.set('views engine','ejs');

app.get('/',function(req,res){
    res.render('home.ejs');
})


// login routing
const loginroutes= require('./routes/loginRoutes')
app.use('/login',loginroutes);

// menu routing
const menuroutes = require('./routes/menuRoutes');
app.use('/menu',menuroutes);


// position routing
const positionRoutes = require('./routes/positionRoustes');
app.use('/position',positionRoutes)
 

// accessing port variable from .env


app.listen(PORT,()=>{
    console.log("successfully rendered at the port",PORT)
})