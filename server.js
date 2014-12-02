var express	= require("express");
var stylus	= require("stylus");
var nib		= require("nib");

var mainPage	= require('./routes/mainPage');
var switcher 	= require('./routes/switcher');
var status	 	= require('./routes/status');

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

var app = express();
app.set('views', __dirname+ "/views");
app.set('view engine', 'jade');
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.static(__dirname + '/public'));

app.get('/', mainPage);
app.get('/switch/*', switcher);
app.get('/status', status);

app.listen(3000);
console.log("webserver ready...");