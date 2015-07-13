function open() {
	
	$.modalItemPickerWidget = Alloy.createWidget("zz.commons.pickers", "modalItemPicker");
	$.modalItemPickerWidget.open();
	
	$.modalItemPickerWidget.on("itemSelected", function(args) {		
		$.trigger("itemSelected", args);	 
		
		$.categoryField.setValue( args.name );
	});	
};

exports.open = open;