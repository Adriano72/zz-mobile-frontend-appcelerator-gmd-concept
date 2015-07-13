function onSelectCategory(event) {
	
	$.categoryPickerWidget = Alloy.createWidget("zz.core.categories", "categoryPicker");
	$.categoryPickerWidget.open();
	
	$.categoryPickerWidget.on("categorySelected", function(args) {		
		$.trigger("categorySelected", args);	 
		
		$.categoryField.setValue( args.name );
	});	
};