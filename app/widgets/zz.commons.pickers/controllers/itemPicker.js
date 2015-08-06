var item = null;

var collection = $.dataCollection;
//collection.reset();

if (OS_ANDROID) {
		
	$.picker.addEventListener("change", function(e){
		Ti.API.info(e.rowIndex);
		Ti.API.info(e.selectedValue);		
		Ti.API.info(collection.at(e.rowIndex).toJSON());
		
		item = collection.at(e.rowIndex).toJSON();
	});					
}

exports.init = function(args) {
	
	collection.reset();

	/*
	args.collection.forEach( function(item) {
		var model = Widget.createModel("zzCommonsPickersModel", item.toJSON());
		collection.add(model); 
	} );
	*/
	collection.add(args.collection.models);
	
	item = args.value;	
	
	if (OS_ANDROID) {
		
		/*
		if (!item) {
			return;
		}
		
		var row = -1;
		collection.forEach( function(model, index){
			if (model.get("id") == item.id) {
				row = index;
			}
		} );
		
		$.picker.setSelectedRow(0, row);
		*/
		
		selectItem();
	}
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
			
			item = collection.at(e.rowIndex).toJSON();
		});		
		
		/*
		if (!item) {
			return;
		}
		
		var row = -1;
		collection.forEach( function(model, index){
			if (model.get("id") == item.id) {
				row = index;
			}
		} );
		
		$.picker.setSelectedRow(0, row);
		*/
		
		selectItem();		
	}
	
};

function doTransform(model) {	
	var object = model.toJSON();		
	return {
		id: object.id,
		title: object.title 
	};
} 

function doFilter(collection) {
	return collection.models;
}

function onDone() {
	if (item) {
		$.trigger("itemSelected", item);
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

function selectItem() {
	if (!item) {
		return;
	}
	
	var row = -1;
	collection.forEach( function(model, index){
		if (model.get("id") == item.id) {
			row = index;
		}
	} );
	
	if (row != -1) {
		$.picker.setSelectedRow(0, row);
	}	
}
