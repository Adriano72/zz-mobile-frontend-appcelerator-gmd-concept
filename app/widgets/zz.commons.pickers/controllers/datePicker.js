var date = null;

exports.open = function() {
		
	if (OS_IOS) {
		
		/*		
		$.datePicker.open();
								
		$.picker.addEventListener("change", function(e){
			date = e.value;
		});	
		*/
						
		$.bottomSheetWidget = Alloy.createWidget("zz.commons.containers", "bottomSheet");
		$.bottomSheetWidget.add($.datePicker);		
		$.bottomSheetWidget.open();		
								
		$.picker.addEventListener("change", function(e){
			date = e.value;
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
	
	onCancel();
}

function onCancel() {	
	if (OS_IOS) {
		$.bottomSheetWidget.close();		
	}
	
	if (OS_ANDROID) {
		$.datePicker.close();
	}	
}
