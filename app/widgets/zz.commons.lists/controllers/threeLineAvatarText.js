var icons = require( WPATH("icons") );
var colors = require( WPATH("colors") );

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
	
	var color = colors.colorMap[ "mdc-" + object.color + "-300"];
		
	return {
		template: "template",
		avatar: icons.charMap[ "fa-" + (object.avatar || "question") ],
		color: color || "white",
		title: object.title || "",
		time: object.time || "",
		subtitle: object.subtitle || "",
		subsubtitle: object.subsubtitle || "",
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