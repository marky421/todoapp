// server.js

// set up =====================================================================
var express  = require('express');           // load express module
var app      = express();                    // create our app with express
var mongoose = require('mongoose');          // load mongoose module for mongodb
var port     = process.env.port || 8081;     // the port were listening on
var database = require('./config/database'); // load the database config

// configuration ==============================================================
mongoose.connect(database.url);                      // connect to mongoDB database

app.configure(function() {
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
    app.use(express.logger('dev'));                 // log every request to the console
    app.use(express.bodyParser());                  // pull information from html in POST
    app.use(express.methodOverride());              // simulate DELETE and PUT
});

// routes =====================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) =====================================
app.listen(port);
console.log("todo app server listening on port " + port);
