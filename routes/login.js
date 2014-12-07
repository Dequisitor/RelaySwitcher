var login = require('express').Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

login.get('/', function (req, res) {
	console.log('get login');
	res.render('login');
});

login.post('/', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: 'login',
		failureFlash: true })
);

passport.use(new LocalStrategy(
	function (login, passwd, done) {
		User.findOne({ username: login }, function(err, user) {
			if (!!err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'user is null faggot'});
			}
			if (!user.validPassword(passwd)) {
				return done(null, false, { message: 'incorrect password faggot'});
			}

			return done(null, user);
		});
	}
));

module.exports = login;