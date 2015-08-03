var moment = require("alloy/moment");

var date = null;

(function constructor(args) {	
	$.label.setText( args.labelTextId ? L(args.labelTextId) : args.labelText);
	
	date = args.date || new Date();		
})(arguments[0] || {});

function onSelectDate(event) {
	
	$.datePickerWidget = Alloy.createWidget("zz.commons.pickers", "datePicker");
	$.datePickerWidget.open({
		date: date
	});
	
	$.datePickerWidget.on("dateSelected", function(args) {		
		$.trigger("dateSelected", args);	
		
		$.dateField.setValue( moment(args).format("D MMMM YYYY") ); 
	});	
};

function onSelectTime(event) {
	
	$.timePickerWidget = Alloy.createWidget("zz.commons.pickers", "timePicker");
	$.timePickerWidget.open({
		date: date
	});
	
	$.timePickerWidget.on("dateSelected", function(args) {		
		$.trigger("dateSelected", args);
		
		$.timeField.setValue( moment(args).format("hh:mm a") ); 	 
	});	
};

exports.init = function(args) {
	date = args.date;
	$.dateField.setValue( moment(date).format("D MMMM YYYY") );
	$.timeField.setValue( moment(date).format("hh:mm a") );
};