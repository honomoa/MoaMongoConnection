
var config = require('./config/db.name.js'),
        db = require('../index.js')(config);

db.example.findOne()
.then(function(doc){
  console.log(doc);
});

