var express	= require("express");
var stylus	= require("stylus");
var nib		= require("nib");
var flash 	= require('connect-flash')

var mainPage	= require('./routes/mainPage');
var switcher 	= require('./routes/switcher');
var status	 	= require('./routes/status');
var login 		= require('./routes/login');

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

var app = express();
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.set('views', __dirname+ "/views");
app.set('view engine', 'jade');
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.static(__dirname + '/public'));

app.use('/', mainPage);
app.use('/switch/*', switcher);
app.use('/status', status);
app.use('/login', login)

app.listen(3000);
console.log("webserver ready...");