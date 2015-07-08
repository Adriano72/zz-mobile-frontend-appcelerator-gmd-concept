var args = arguments[0] || {};

var model = args.model;
var navigationWindow = args.navigationWindow;

function onHomeIconItemSelected() {
	$.postEditor.close();
}