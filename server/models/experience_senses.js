var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  'title' : {type : String, default: ''},
  'sight' : {type : Number, min: 0, max: 5},
  'listen' : {type : Number, min: 0, max: 5},
  'smell' : {type : Number, min: 0, max: 5},
  'taste' : {type : Number, min: 0, max: 5},
  'touch' : {type : Number, min: 0, max: 5}
});

module.exports = mongoose.model('ExperienceSenses', schema);