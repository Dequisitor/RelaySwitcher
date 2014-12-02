var exec = require('child_process').exec;
var switcher = require('express').Router();

switcher.param('id', function (req, res, next, id) {
	req.id = id;
	next();
});

switcher.get('/switch/on/:id', function (req, res) {
	var execReturn = function (error, stdout, strerr) {
		if (!!error) {
			console.log(error);
			res.send(error);
		} else {
			res.sendStatus(200);
		}	
	};

	var command = "sudo python ./executables/on" + req.id + '.py';
	var bashSwitch = exec(command, execReturn);
});

switcher.get('/switch/off/:id', function (req, res) {
	var execReturn = function (error, stdout, strerr) {
		if (!!error) {
			console.log(error);
			res.send(error);
		} else {
			res.sendStatus(200);
		}	
	};

	var command = "sudo python ./executables/off" + req.id + '.py';
	var bashSwitch = exec(command, execReturn);
});

module.exports = switcher; 