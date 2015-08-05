(function constructor(args) {
	
	if (!args.authenticated) {		
		Alloy.createController("signIn").getView().open();
		
	} else { 		
		Alloy.createController("home").getView().open();
	}
	
})(arguments[0] || {});