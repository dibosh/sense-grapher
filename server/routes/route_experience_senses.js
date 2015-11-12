var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'), // Parses information from POST
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  expSenses = require('./../models/experience_senses.js');

var ExperienceSenses = mongoose.model('ExperienceSenses');

router.use(bodyParser.urlencoded( { extended: true } ));
router.use(methodOverride( function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // Look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

router.route('/api/experiencesenses/all')
  // GET all rows
  .get(function(req, res) {
    // Retrieve all rows from Mongo
    ExperienceSenses.find({}, function(err, rows) {
      if (err)
        res.send(err);
      res.json(rows);
    });

  });

router.route('/api/experiencesenses/addNew')
  // Create new
  .post(function(req, res) {
    new ExperienceSenses({
      'title' : req.body.title,
      'sight' : req.body.sight,
      'listen' : req.body.listen,
      'smell' : req.body.smell,
      'taste' : req.body.taste,
      'touch' : req.body.touch
    }).save( function ( err, sense ){
        if( err ) return res.send( err );
        return res.json(sense);
      });
  });

module.exports = router;