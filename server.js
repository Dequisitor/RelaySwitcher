var express	= require("express");

var mainPage	= require('./routes/mainPage');
var switcher 	= require('./routes/switcher');
var status	 	= require('./routes/status');

var app = express();
app.set('views', __dirname+ "/views");
app.set('view engine', 'jade');
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.use('/', mainPage);
app.use('/switch/*', switcher);
app.use('/status', status);

app.listen(3000);
console.log("webserver ready...");
