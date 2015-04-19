var express	= require("express");

var mainPage	= require('./routes/mainPage');
var switcher 	= require('./routes/switcher');
var status	 	= require('./routes/status');

var app = express();
app.set('views', __dirname+ "/views");
app.set('view engine', 'jade');
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(require('morgan')());

app.use('/', mainPage);
app.use('/switch/*', switcher);
app.use('/status', status);

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
