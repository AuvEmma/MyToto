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
  var name = req.body.name;
  var location = req.body.location;
  var comments = req.body.description;
  var user_id = req.body.user_id;
  var formattedAddress
  var lat, lng
  geocoder.geocode(location, function ( err, data ) {
    formattedAddress = data.results[0].formatted_address
    lat = data.results[0].geometry.location.lat
    lng = data.results[0].geometry.location.lng
    db.any('INSERT INTO privatetoto (name, location, latitude, longitude, comments, user_id) VALUES ($1,$2,$3,$4,$5,$6) returning privatetoto_id, name, location, latitude, longitude, comments', [name, formattedAddress, lat, lng, comments, user_id])
      .then(function(data){
        res.rows = data;
        next();
      })
      .catch(function(error){
        console.error('error inserting privatetoto: ', error);
      })

  });
}

function publicToto(req,res,next){
  db.any(`select * from publictoto`)
    .then(function(data){
      res.rows = data;
      next()
    })
    .catch(function(err){
      console.error('error with select * from publictoto', err);
    })
}

function myToto(req,res,next){
  var user_id = req.body.user_id;
  db.any(`select * from privatetoto where user_id = $1`,[user_id])
    .then(function(data){
      // console.log(`select * from privatetoto where user_id = $1`, data);
      res.rows = data;
      next()
    })
    .catch(function(err){
      console.error('error with select * from mytoto where user_id = $1', err);
    })
}


module.exports.createToto = createToto;
module.exports.publicToto = publicToto;
module.exports.myToto = myToto;
