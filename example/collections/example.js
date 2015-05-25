'use strict';

var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
  account: {type: String, index: true},
  modified: {type: Date, default: Date.now}
});

