'use strict'

const express     = require('express');
const toto      = express.Router();
const bodyParser  = require('body-parser');
const db          = require('./../db/pg/toto');
const secret      = process.env.SECRET;
const expressJWT  = require('express-jwt');
const jwt         = require('jsonwebtoken');


toto.route('/')
  .post( db.createToto, (req,res)=>res.json(res.rows) )

toto.route('/public')
  .get( db.publicToto, (req,res)=>res.json(res.rows) )

toto.route('/private')
  .post( db.myToto, (req,res)=>res.json(res.rows) )


module.exports = toto;
