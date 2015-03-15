var casper = require('casper').create();
var utils = require('utils');

var result = {
	'alert' : false,
	'path' : 'capture.png' };

casper.start("http://ucraft-online.com/", function(){
	casper.evaluate( function(){
		$("#UserName").val("ID_HERE");
		$("#Password").val("PASSWORD_HERE");
		$('input[type="submit"]:first').click();
	});
});

casper.then(function(){
	casper.evaluate( function(){
		on_button_gamestart();
	});
});
casper.then(function(){
	var alert = casper.evaluate( function(){
		return $(".siren_warn").length!=0 ? true : false;
	});

	if(alert == false){
		casper.evaluate( function(){
			$("#fleet_bar_list_panel").css("display", "block");
		});
		casper.then(function(){
			casper.captureSelector('capture.png', '#fleet_bar_list_panel');
		});
	}

	casper.then(function(){
		console.log( JSON.stringify(result) );
		casper.exit();
	});
});

casper.run(function(){
});
