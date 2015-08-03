var date = null;

(function constructor(args) {	
	date = args.date || new Date();	
})(arguments[0] || {});

exports.open = function(args) {
		
	date = args.date || new Date();
	
	if (OS_IOS) {
								
		$.bottomSheetWidget = Alloy.createWidget("zz.commons.containers", "bottomSheet");
		$.bottomSheetWidget.add($.datePicker);		
		$.bottomSheetWidget.open();		
						
		$.picker.setValue(date);		
		$.picker.addEventListener("change", function(e){
			date = e.value;
		});		
	}
	if (OS_ANDROID) {
		var picker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE
		});
		
		picker.showDatePickerDialog({
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
	
	onCancel();
}

function onCancel() {	
	if (OS_IOS) {
		$.bottomSheetWidget.close();		
	}
	
	if (OS_ANDROID) {
	}	
}
