//if ( Ti.App.Properties.getBool("authenticated") ) {
if ( Ti.App.Properties.getObject("user") ) {
	
	var _coreSessionLogInCallback = function(user){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(user) + "]");
		
		Alloy.createController("home").getView().open();		
	};
	
	ZZ.API.Core.Session.logIn({
		username : "rnduser_1418911231967", // "mario.muggianu", //"rnduser_1418911231967", //"rnduser_1418923442021"
		password : "password",
	}, _coreSessionLogInCallback, function(error){
		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
	});					

} else { 
	Alloy.createController("signIn").getView().open();
	
}