'use strict'
require('dotenv').config();
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const secret       = process.env.SECRET;
const expressJWT   = require('express-jwt');
const userRoutes   = require( path.join(__dirname, '/routes/users'));
const guestRoutes   = require( path.join(__dirname, '/routes/guests'));

const app          = express();
const _port        = process.argv[2]|| process.env.port||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files
app.use(express.static(path.join(__dirname,'public')));

//set up some logging
app.use(logger('dev'));

app.use('/guests', guestRoutes)
app.use('/users',expressJWT({secret:secret}),userRoutes)

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
})
// turn me on!
app.listen(_port , ()=>
  console.log(`server here! listening on`, _port )
);
