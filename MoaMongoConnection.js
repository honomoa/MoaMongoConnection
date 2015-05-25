'use strict';

var    fs = require('fs'),
   colors = require('colors'),
 mongoose = require('mongoose'),
   MoaLog = require('MoaLog');

var MoaMongoConnection = (function(){
  function MoaMongoConnection(option) {
    this.option = option;
    this.server = option.server;
    this.port = option.port;
    this.database = option.database;
    this.username = option.username;
    this.password = option.password;
    this.opts = option.opts;
    this.collectionPath = option.collectionPath+'/';
    this.createConnection();
    this.createDb();
    return this.getDb();
  };

  MoaMongoConnection.prototype.db = {};

  MoaMongoConnection.prototype.createConnection = function(){
    var _this = this;
    var mongoUrl = 'mongodb://'+_this.username+':'+_this.password+'@'+_this.server+':'+_this.port+'/'+_this.database;
    _this.connection = mongoose.createConnection(mongoUrl, _this.opts);
    _this.connection.on('connected', function(err){
      MoaLog.debug('Mongodb('+_this.server+') connection has been connected');
    });
    _this.connection.on('reconnected', function(err){
      MoaLog.debug('Mongodb('+_this.server+') connection has been reconnected');
    });
    _this.connection.on('error', function(err){
      MoaLog.warn('Mongodb('+_this.server+') occur error');
      MoaLog.error(err);
    });
  };

  MoaMongoConnection.prototype.createDb = function(){
    var _this = this;
    
    fs
    .readdirSync(__dirname+'/./'+_this.collectionPath)
    .filter(function(file) {
      // filter out filename with `index' or `connection' prefix or not end with `.js' postfix
      var notSelfFolder = (file.indexOf('.') !== 0);
      var notIndexPrefix = (file.indexOf('index') !== 0);
      var notConnectionPrefix = (file.indexOf('connection') !== 0);
      var isJsPostfix = (file.lastIndexOf('.js')==file.length-3);
      
      return notSelfFolder && notIndexPrefix && notConnectionPrefix && isJsPostfix;
    })
    .forEach(function(file) {
    //  console.log(file)
      var filename = file.split('.')[0];
      _this.db[filename] = _this.connection.model(filename, require('./'+_this.collectionPath+file), filename);
    });
  };

  MoaMongoConnection.prototype.getDb = function(){
    var _this = this;
    return _this.db;
  };
  
  return MoaMongoConnection;
})();

module.exports = MoaMongoConnection;

