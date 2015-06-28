$(document).ready(function() {
	
	var relays = ["#relay1", "#relay2"];
	var relayStatus = [];
	
	for (var i=0; i<relays.length; i++) {

		//closure for state check
		var stateCallback = function(current) {
			return function(data) {
				if (data != "ERROR") {
					relayStatus[current] = data.trim();
					
					if (relayStatus[current] == 1) {
						$(relays[current]).addClass("on");
					};
				};
			};
		};

		//closure for switches
		var switchCallback = function(current, state) {
			return function(error) {
				if (error == "OK") {
					if (state == 0 && $(relays[current]).hasClass("on")) {
						$(relays[current]).removeClass("on");
					}
					if (state == 1 && !$(relays[current]).hasClass("on")) {
						$(relays[current]).addClass("on");
					}
					relayStatus[current] = state;
				} else {
					console.log(error);
				};
			};
		};

		//get current state
		$.get("/status/"+i).done(stateCallback(i));

		//set onclick listeners
		$(relays[i]).click(function(current) {
			return function() {
				if (relayStatus[current] == 0) {
					$.get("/switch/on/"+current).done(switchCallback(current, 1));
				} else {
					$.get("/switch/off/"+current).done(switchCallback(current, 0));
				};
			}
		}(i));
	};
});