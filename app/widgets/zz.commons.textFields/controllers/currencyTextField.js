var accounting = require("accounting/accounting");

(function constructor(args) {			
	$.label.setText( args.labelTextId ? L(args.labelTextId) : args.labelText);
	
	$.textField.setValue(args.text);	
})(arguments[0] || {});

function onSelectText(event) {	
	
	Ti.API.info( event.value );
	Ti.API.info( parseFloat(event.value) );
	
	$.trigger("textSelected", parseFloat(event.value) );	 
};

exports.init = function(args) {
	//$.textField.setValue(args.text);
	
	//$.textField.setValue( accounting.formatMoney(args.text) );
	$.textField.setValue( accounting.formatNumber(args.text) );
};