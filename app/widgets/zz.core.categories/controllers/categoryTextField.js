var category = null;

(function constructor(args) {
	//$.label.setTextid(args.labelTextId);
	//$.label.setText(args.labelText);	
	$.label.setText( args.labelTextId ? L(args.labelTextId) : args.labelText);	
	
	category = args.category;
	$.categoryField.setValue( category ? category.name : "");
})(arguments[0] || {});

function onSelectCategory(event) {
	
	$.categoryPickerWidget = Alloy.createWidget("zz.core.categories", "categoryPicker");
	$.categoryPickerWidget.open();
	
	$.categoryPickerWidget.on("categorySelected", function(args) {		
		$.trigger("categorySelected", args);	 
		
		$.categoryField.setValue(args.name);				
	});	
};

exports.init = function(args) {
	category = args.category;
	$.categoryField.setValue( category ? category.name : "");
};
