(function constructor(args) {				
		
	var user = Ti.App.Properties.getObject("user");				
	if (user) {

		doLogin({
			username: user.username,
			password: user.password,
			autoMode: true 
		});	
		
	}			
	
	$.usernameTextField.setValue( (user ? user.username : "") );
	
})(arguments[0] || {});

function onClickLogin() {
	
	doLogin({
		username: $.usernameTextField.getValue(),
		password: $.passwordTextField.getValue(),
		rememberMe: $.rememberMeButton.getValue()
	});
	
}

function doLogin(args) {
	
	var _coreSessionLogInCallback = function(user){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(user) + "]");
		
		if (!args.autoMode) {
			Ti.App.Properties.setObject("user", _.extend(user, {password: (args.rememberMe ? args.password : ""), timestamp: new Date()}));
		}
		
		Alloy.createController("index", {authenticated: true});
	
    	$.signIn.close();		
	};
	
	ZZ.API.Core.Session.logIn({
		username : args.username,
		password : args.password
	}, _coreSessionLogInCallback, function(error){
		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
	});
	
}