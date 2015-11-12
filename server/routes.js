var experienceSenses = require('./routes/route_experience_senses.js');
module.exports = function(app) {
  // Backend routes
  app.use('/', experienceSenses);
  // Frontend routes
  app.get('*', function(req, res) {
    res.sendfile('./client/index.html');
  });

};