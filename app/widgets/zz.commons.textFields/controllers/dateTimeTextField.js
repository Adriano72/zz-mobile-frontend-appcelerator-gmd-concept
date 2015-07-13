var moment = require("alloy/moment");

function onSelectDate(event) {
	
	$.datePickerWidget = Alloy.createWidget("zz.commons.pickers", "datePicker");
	$.datePickerWidget.open();
	
	$.datePickerWidget.on("dateSelected", function(args) {		
		$.trigger("dateSelected", args);	
		
		$.dateField.setValue( moment(args).format("D MMMM YYYY") ); 
	});	
};

function onSelectTime(event) {
	
	$.timePickerWidget = Alloy.createWidget("zz.commons.pickers", "timePicker");
	$.timePickerWidget.open();
	
	$.timePickerWidget.on("dateSelected", function(args) {		
		$.trigger("dateSelected", args);
		
		$.timeField.setValue( moment(args).format("hh:mm a") ); 	 
	});	
};