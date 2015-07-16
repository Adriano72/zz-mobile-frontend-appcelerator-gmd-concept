var item = null;

var collection = $.dataCollection;
//collection.reset();

if (OS_ANDROID) {
		
	$.picker.addEventListener("change", function(e){
		Ti.API.info(e.rowIndex);
		Ti.API.info(e.selectedValue);		
		Ti.API.info(collection.at(e.rowIndex).toJSON());
		
		//date = e.value;
	});					
}

exports.init = function(args) {
	
	collection.reset();

	args.collection.forEach( function(item) {
		var model = Widget.createModel("zzCommonsPickersModel", item.toJSON());
		collection.add(model); 
	} );	
};

exports.open = function() {
		
	if (OS_IOS) {
						
		$.bottomSheetWidget = Alloy.createWidget("zz.commons.containers", "bottomSheet");
		$.bottomSheetWidget.add($.itemPicker);		
		$.bottomSheetWidget.open();		
								
		$.picker.addEventListener("change", function(e){
			Ti.API.info(e.rowIndex);
			Ti.API.info(e.selectedValue);
			Ti.API.info(collection.at(e.rowIndex).toJSON());
			
			//date = e.value;
		});		
	}
	
};

function doTransform(model) {	
	var object = model.toJSON();		
	return {
		title: object.title 
	};
} 

function doFilter(collection) {
	return collection.models;
}

function onDone() {
	if (item) {
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
