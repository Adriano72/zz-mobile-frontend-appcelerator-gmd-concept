if ( Ti.App.Properties.getBool("authenticated") ) {
	Alloy.createController("home").getView().open();

} else { 
	Alloy.createController("signIn").getView().open();
	
}