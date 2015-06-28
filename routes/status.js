var exec = require('child_process').exec;
var status = require('express').Router();

status.param('id', function(req, res, next, id) {
	req.id = id;
	next();
});

status.get('/:id', function(req, res) {
	var command = "sudo python ./executables/status.py " + (22 + parseInt(req.id));
	console.log(command);
	var bashSwitch = exec(command, function(error, stdout, stderr) {
		if (!!error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(stdout.trim());
		}
	});
});

module.exports = status;
