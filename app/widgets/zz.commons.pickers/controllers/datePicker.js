exports.open = function() {
		
	if (OS_IOS) {
		
		$.datePicker.open();
								
		$.picker.addEventListener("change", function(e){
			Ti.API.info("User selected date: " + e.value.toLocaleString());
		});	
	}
	if (OS_ANDROID) {
		var picker = Ti.UI.createPicker({
			type:Ti.UI.PICKER_TYPE_DATE,
			value:new Date(),
		});
		
		picker.showDatePickerDialog({
			//value: new Date(),
			callback: function(e) {
		    	if (e.cancel) {
		      		Ti.API.info('User canceled dialog');
				} else {
		  			Ti.API.info('User selected date: ' + e.value);
		    	}
		  	}
		});		
	}
	
};