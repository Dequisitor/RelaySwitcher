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

app.listen(80, "192.168.2.200");
console.log("webserver ready...");

//export GPIO pins
var exec = require("child_process").exec;
exec("sudo echo 22 > /sys/class/gpio/export", function (error, stdout, stderr) {
	console.log(stdout.trim());
	console.log(stderr.trim());
});
exec("sudo echo 23 > /sys/class/gpio/export", function (error, stdout, stderr) {
	console.log(stdout.trim());
	console.log(stderr.trim());
});
