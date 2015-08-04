(function constructor(args) {				
	
	var user = Ti.App.Properties.getObject("user");
		
	$.usernameTextField.setValue( (user ? user.username : "") );
	
})(arguments[0] || {});

function onClickLogin() {

	var _coreSessionLogInCallback = function(user){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(user) + "]");
		
		Ti.App.Properties.setObject("user", _.extend(user, {password: $.passwordTextField.getValue()}));
		
		Alloy.createController("index");
	
    	$.signIn.close();		
	};
	
	ZZ.API.Core.Session.logIn({
		//username: "rnduser_1418923442021",
		//username : "rnduser_1418911231967",
		//username : "mario.muggianu",
		//password : "password"
		username : $.usernameTextField.getValue(),
		password : $.passwordTextField.getValue()
	}, _coreSessionLogInCallback, function(error){
		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
	});
	
}