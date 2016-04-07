express = require 'express'
router = express.Router()
fs = require 'fs'
shell = require 'child_process'

router.get '/', (req, res) ->
	res.redirect '/relays/views/index.html'

router.get '*', (req, res, next) ->
	path = req.params[0]
	fs.stat './RelaySwitcher/public/' + path, (err, stat) ->
		if err
			next()
			return
		else
			res.sendFile path, {root: './RelaySwitcher/public/'}
			return

router.get '/status/:id', (req, res) ->
	#for some reason /sys/class/gpio/export uses bcd addressing (gpio 15/16 => 22/23)
	shell.exec './RelaySwitcher/executables/status ' + (22+parseInt(req.params.id)), (err, stdout, stderr) ->
		if err
			res.send err
			return
		else
			res.send stdout
			return

router.get '/switch/:mode/:id', (req, res) ->
	shell.exec './RelaySwitcher/executables/' + req.params.mode + '.py ' + (22+parseInt(req.params.id)), (err, stdout, stderr) ->
		if err
			res.send err
			return
		else
			res.send 'OK'
			return

#init
shell.exec 'sudo echo 22 > /sys/class/gpio/export'
shell.exec 'sudo echo 23 > /sys/class/gpio/export'

module.exports = router
