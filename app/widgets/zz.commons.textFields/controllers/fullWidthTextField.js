(function constructor(args) {		
	$.fullWidthTextField.setHeight( args.height ? args.height : Ti.UI.FILL );
	$.textField.setHintText( args.labelTextId ? L(args.labelTextId) : args.labelText );
	$.textField.setValue(args.text);	
})(arguments[0] || {});

function onSelectText(event) {	
	$.trigger("textSelected", event.value);	 		
};

exports.init = function(args) {
	$.textField.setValue(args.text);
};