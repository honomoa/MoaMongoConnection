'use strict';

var MoaMongoConnection = require('./MoaMongoConnection.js');

module.exports = function(option){
  return new MoaMongoConnection(option);
};

