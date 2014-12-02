function switchOn(id) {
	$.get('/switch/on/' + id)
		.done(function (data) {
			console.log('relay #'+id+' is ' + data);
		});		
};

function switchOn(id) {
	$.get('/switch/off/' + id)
		.done(function (data) {
			console.log('relay #'+id+' is ' + data);
		});		
};

function setButtonStatus(status) {
	var button = [];
	button[0] = $('#relay1');
	button[1] = $('#relay2');

	for (var i=0; i<button.length; i++) {
		if (status[i] == "on") {
			if (!button[i].hasClass('on')) {
				button[i].addClass('on');
			}
		}

		if (status[i] == "off") {
			if (button[i].hasClass('on')) {
				button[i].removeClass('on');
			}
		}
	}
}


/********************************************************************************************/
$(document).ready(function() {
	var relayStatus;
	$.get('/status').done(function(data) {
		relayStatus = data.trim().split('/');
		console.log(data);

		if (!data) {
			relayStatus[0] = "off";
			relayStatus[1] = "off";
		}

		setButtonStatus(relayStatus);
	});

	$('#relay1').click(function () {
		console.log('clicked #1 with status: ' + relayStatus[0]);
		if (relayStatus[0] == "off") {
			$.get('/switch/on/0').done(function (error) {
				if (error == "OK") {
					relayStatus[0] = "on";
					setButtonStatus(relayStatus);
				}
			});
		}
		if (relayStatus[0] == "on") {
			$.get('/switch/off/0').done(function (error) {
				if (error == "OK") {
					relayStatus[0] = "off";
					setButtonStatus(relayStatus);
				}
			});
		}
	});

	$('#relay2').click(function () {
		console.log('clicked #2 with status: ' + relayStatus[1]);
		if (relayStatus[1] == "off") {
			$.get('/switch/on/1').done(function (error) {
				if (error == "OK") {
					relayStatus[1] = "on";
					setButtonStatus(relayStatus);
				}
			});
		}
		if (relayStatus[1] == "on") {
			$.get('/switch/off/1').done(function (error) {
				if (error == "OK") {
					relayStatus[1] = "off";
					setButtonStatus(relayStatus);
				}
			});
		}
	});

});