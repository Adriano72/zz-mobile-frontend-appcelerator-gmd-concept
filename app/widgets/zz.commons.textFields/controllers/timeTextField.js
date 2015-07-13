var moment = require("alloy/moment");

function onSelectTime(event) {
	
	$.timePickerWidget = Alloy.createWidget("zz.commons.pickers", "timePicker");
	$.timePickerWidget.open();
	
	$.timePickerWidget.on("dateSelected", function(args) {		
		$.trigger("dateSelected", args);	
		
		$.timeField.setValue( moment(args).format("hh:mm a") ); 
	});	
};