'use strict'
require('dotenv').config();
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const secret       = process.env.SECRET;
const expressJWT   = require('express-jwt');
const userRoutes   = require( path.join(__dirname, '/routes/users'));

const app          = express();
const _port        = process.argv[2]|| process.env.port||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files
app.use(express.static(path.join(__dirname,'public')));

//set up some logging
app.use(logger('dev'));

app.use('/users',expressJWT({secret:secret}),userRoutes)

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
})
// turn me on!
app.listen(_port , ()=>
  console.log(`server here! listening on`, _port )
);
