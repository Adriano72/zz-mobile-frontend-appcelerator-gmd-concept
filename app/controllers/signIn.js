function onClickLogin() {
	
	Ti.App.Properties.setBool("authenticated", true);
	
	Alloy.createController("index");
	
    $.signIn.close();
}