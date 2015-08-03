function onClickLogin() {

	var _coreSessionLogInCallback = function(user){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(user) + "]");
		
		//Ti.App.Properties.setBool("authenticated", true);
		Ti.App.Properties.setObject("user", user);
		
		Alloy.createController("index");
	
    	$.signIn.close();		
	};
	
	ZZ.API.Core.Session.logIn({
		//username: "rnduser_1418923442021",
		username : "rnduser_1418911231967",
		//username : "mario.muggianu",
		password : "password"
	}, _coreSessionLogInCallback, function(error){
		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
	});
	
}