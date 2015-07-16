var moment = require("alloy/moment");

if (OS_ANDROID) {

	$.itemPickerWidget.init({
		collection: new Backbone.Collection([
			{title: "option 1"},
			{title: "option 2"},
			{title: "option 3"},
			{title: "option 4"},
			{title: "option 5"}
		])
	});
	
	/*
	$.itemPickerWidget.on("itemSelected", function(args) {		
		$.trigger("itemSelected", args);	 
		
		$.itemField.setValue( "item" );
	});	
	*/
}

function onSelectItem(event) {
	
	if (OS_IOS) {
		$.itemPickerWidget = Alloy.createWidget("zz.commons.pickers", "itemPicker");

		$.itemPickerWidget.init({
			collection: new Backbone.Collection([
				{title: "option 1"},
				{title: "option 2"},
				{title: "option 3"},
				{title: "option 4"},
				{title: "option 5"}
			])
		});

		$.itemPickerWidget.open();
		
		$.itemPickerWidget.on("itemSelected", function(args) {		
			$.trigger("itemSelected", args);	 
			
			$.itemField.setValue( "item" );
		});	
	
	}
	
	
};
