/*
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
*/

var collection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection.reset();
	
	args.collection.forEach( function(item) {
		collection.add({
			id: item.get("id"),
			avatar: "user",
			color: "green",
			title: "This is my title",
			time: "5 giu",
			subtitle: "a sub-title",
			subsubtitle: "a sub-sub-title"
		}); 
	} );	
	
	$.widget.init({collection: collection});	
};

$.widget.on("itemSelected", function(args) {
    
    $.trigger("itemSelected", args);	
 
});

$.widget.on("itemDeleted", function(args) {
    
    $.trigger("itemDeleted", args);
	
});