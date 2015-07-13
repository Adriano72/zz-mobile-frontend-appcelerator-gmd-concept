var date = null;

exports.open = function() {
		
	if (OS_IOS) {
		
		$.timePicker.open();
								
		$.picker.addEventListener("change", function(e){
			date = e.value;
		});	
	}
	if (OS_ANDROID) {
		var picker = Ti.UI.createPicker({
			type:Ti.UI.PICKER_TYPE_TIME,
			value:new Date(),
		});
		
		picker.showTimePickerDialog({
			//value: new Date(),
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
