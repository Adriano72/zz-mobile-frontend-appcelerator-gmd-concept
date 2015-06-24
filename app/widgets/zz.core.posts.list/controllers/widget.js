var icons = require( WPATH("icons") );

var collection = Widget.Collections.instance("dataModel");
collection.fetch();

function doTransform(model) {
	//return _.extend( model.toJSON(), {template: "template", iconText: icons.charMap["fa-car"]} );
	return _.extend( model.toJSON(), {template: "template"} );	
} 

function doFilter(collection) {
	return collection.models;
}

exports.init = function(args) {
	args.dataCollection.forEach( function(item) {
		var model = Widget.createModel("dataModel", item.toJSON());
		collection.add(model); 
		model.save();
	} );	
};

function onItemClick(event) { 
	var model = collection.at(event.itemIndex);
    
    $.trigger("itemSelected", model.toJSON());	
}

function onDelete(event) { 
	var model = collection.at(event.itemIndex);
    
    $.trigger("itemDeleted", model.toJSON());
}
