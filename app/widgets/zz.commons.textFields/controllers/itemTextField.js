var value = null;

(function constructor(args) {	
	$.label.setText( args.labelTextId ? L(args.labelTextId) : args.labelText);
	
	if (OS_ANDROID) {		
		
		$.itemPickerWidget.on("itemSelected", function(args) {		
			$.trigger("itemSelected", args);	 
		});	

	}	
	
	if (OS_IOS) {
		
		$.itemPickerWidget = Alloy.createWidget("zz.commons.pickers", "itemPicker");
		
		$.itemPickerWidget.on("itemSelected", function(args) {		
				 
			$.itemField.setValue(args.title);
			
			$.trigger("itemSelected", args);
			//$.itemTextField.fireEvent("itemSelected", args);
		});	
	}	
		
})(arguments[0] || {});

function init(args) {
	value = args.value;
	
	if (OS_IOS) {
		if (value) {
			$.itemField.setValue(value.title);
		}
	}
	
	$.itemPickerWidget.init({
		value: value,
		collection: args.collection
	});

};

function onSelectItem(event) {
	
	if (OS_IOS) {
		$.itemPickerWidget.open();	
	}

};

exports.init = init;
