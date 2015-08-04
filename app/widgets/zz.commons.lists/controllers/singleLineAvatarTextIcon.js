var icons = require( WPATH("icons") );
var colors = require( WPATH("colors") );

var collection = $.dataCollection; //Widget.Collections.instance("zzCommonsListsModel");
collection.reset();

(function constructor(args) {			
	if (args.separator == "false") {
		$.listView.setSeparatorColor("white");
	}		
})(arguments[0] || {});

exports.init = function(args) {
	
	collection.reset();
	
	/*
	args.collection.forEach( function(item, index) {
		var model = Widget.createModel("zzCommonsListsModel", item.toJSON());
		collection.add(model);
		
		Ti.API.info(index + "/" + args.collection.length);
	} );
	*/	
	collection.add(
		args.collection.models
	);
};

exports.searchText = function(text) {	
	$.listView.searchText = text;	
};

function doTransform(model) {	
	var object = model.toJSON();
	
	var avatarColor = colors.colorMap[ "mdc-" + object.avatarColor + "-300"];
	var iconColor = colors.colorMap[ "mdc-" + object.iconColor + "-300"];
			
	return {
		template: "template",
		avatar: icons.charMap[ "fa-" + (object.avatar || "question") ],
		avatarColor: (object.avatarMode && object.avatarMode == "icon" ? (avatarColor || "lightgray") : "white"),
		avatarBoxColor: (object.avatarMode && object.avatarMode == "icon" ?  "white" : (avatarColor || "white")),
		title: object.title || "",
		icon: icons.charMap[ "fa-" + (object.icon || "") ],
		iconColor: iconColor || "lightgray",
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