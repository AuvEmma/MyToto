'use strict';
const pgp = require('pg-promise')({});
const geocoder = require('geocoder')
if(process.env.ENVIRONMENT === 'production'){
  var cn = process.env.DATABASE_URL;
}else{
  var cn = {
    host: process.env.HOST, // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  }
}
const db = pgp(cn)

function createToto(req,res,next){
  var location = req.body.location;
  var geolocation
  geocoder.geocode(location, function ( err, data ) {
    console.log(data);
  });
  var description = req.body.description;
}

function publicToto(req,res,next){
  db.any(`select * from publictoto`)
    .then(function(data){
      console.log(data);
      res.publicToto = data;
      next()
    })
    .catch(function(err){
      console.error('error with select * from publictoto', err);
    })
}

module.exports.createToto = createToto;
module.exports.publicToto = publicToto;
