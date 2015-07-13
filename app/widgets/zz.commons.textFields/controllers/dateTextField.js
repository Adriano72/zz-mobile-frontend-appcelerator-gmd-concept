var moment = require("alloy/moment");

function onSelectDate(event) {
	
	$.datePickerWidget = Alloy.createWidget("zz.commons.pickers", "datePicker");
	$.datePickerWidget.open();
	
	$.datePickerWidget.on("dateSelected", function(args) {		
		$.trigger("dateSelected", args);	 
		
		$.dateField.setValue( moment(args).format("D MMMM YYYY") );
	});	
};
