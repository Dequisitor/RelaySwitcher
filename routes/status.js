var exec = require('child_process').exec;
var status = require('express').Router();

status.get('/', function (req, res) {
	var bashSwitch = exec('sudo python ./executables/status.py', function (error, stdout, stderr) {
		console.log("relays are: " + stdout.trim());
		res.send(stdout);
	});
});

module.exports = status;
