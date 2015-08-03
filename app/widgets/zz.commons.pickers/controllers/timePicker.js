var date = null;

(function constructor(args) {	
	date = args.date || new Date();	
})(arguments[0] || {});

exports.open = function(args) {
		
	date = args.date || new Date();
	
	if (OS_IOS) {
		
		$.timePicker.open();
						
		$.picker.setValue(date);		
		$.picker.addEventListener("change", function(e){
			date = e.value;
		});	
	}
	if (OS_ANDROID) {
		var picker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_TIME
		});
		
		picker.showTimePickerDialog({
			value: date,
			callback: function(e) {
		    	if (!e.cancel) {
		      		$.trigger("dateSelected", e.value);
				}
		  	}
		});		
	}
	
};

function onDone() {
	if (date) {
		$.trigger("dateSelected", date);
	}
	
	$.timePicker.close();
}

function onCancel() {
	$.timePicker.close();
}
