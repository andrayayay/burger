// Required dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

// Port
var PORT = process.env.PORT || 3000;

// Express
var app = express();
app.use(express.static(__dirname + '/public'));

// Bodyparsers 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

// override with POST having ?_method=DELETE or PUT
app.use(methodOverride('_method'));

// Handlebars 
var exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes
var routes = require('./controllers/burger_controllers.js');
app.use('/', routes);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});