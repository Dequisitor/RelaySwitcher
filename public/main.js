$(document).ready(function() {
	
	var relays = ["#relay1", "#relay2"];
	var relayStatus = [];
	
	for (var i=0; i<relays.length; i++) {
		//get button handle
		var button = $(relays[i]);
		
		//get current state
		$.get("/status/"+i).done(function(data) {
			if (data != "ERROR") {
				relayStatus[i] = data.trim();
				
				if (relayStatus[i] == 1) {
					button.addClass("on");
				};
			};
		});

		//set onclick listeners
		$(button).click(function () {
			if (relayStatus[i] == 0) {
				$.get("/switch/on/"+i).done(function (error) {
					if (error == "OK") {
						if (!button.hasClass("on")) {
							button.addClass("on");
						}
						relayStatus[i] = 1;						
					} else {
						console.log(error);
					}
				});

			} else {
				$.get("/switch/off/"+i).done(function (error) {
					if (error == "OK") {
						if (button.hasClass("on")) {
							button.removeClass("on");
						}
						relayStatus[i] = 0;					
					} else {
						console.log(error);
					}
				});
			}
		});
	};
});