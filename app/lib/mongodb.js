'use strict';
var MongoClient = require('mongodb').MongoClient;

module.exports = function (name, cb){
  var url = 'mongodb://localhost/' + name;
  MongoClient.connect(url, function(err, db){
    global.mongodb = db;
    if(cb){cb();}

    console.log('MongoDB Ready:', name);
  });
};

