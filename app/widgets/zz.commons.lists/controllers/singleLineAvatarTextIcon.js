var icons = require( WPATH("icons") );

var collection = $.dataCollection; //Widget.Collections.instance("zzCommonsListsDataModel");
collection.reset();

exports.init = function(args) {
	
	collection.reset();
	
	args.collection.forEach( function(item) {
		var model = Widget.createModel("zzCommonsListsDataModel", item.toJSON());
		collection.add(model); 
	} );	
};

function doTransform(model) {	
	var object = model.toJSON();		
	return {
		template: "template",
		avatar: icons.charMap[ "fa-" + (object.avatar || "question") ],
		color: object.color || "white",
		title: object.title || "",
		icon: icons.charMap[ "fa-" + (object.icon || "fa-question") ]
	};	
} 

function doFilter(collection) {
	return collection.models;
}

function onItemClick(event) { 
	var model = collection.at(event.itemIndex);
    
    $.trigger("itemSelected", model.toJSON());	
}

function onDelete(event) { 
	var model = collection.at(event.itemIndex);
    
    $.trigger("itemDeleted", model.toJSON());
}