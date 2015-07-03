var moment = require("alloy/moment");

var collection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection.reset();
	
	args.collection.forEach( function(item) {
		
		var object = item.toJSON();		
		
		collection.add({
			id: item.get("id"),
			avatar: "file-text",
			avatarColor: "lightgray",
			avatarMode: "icon",
			title: object.data.title,
			subtitle: object.data.content
		});
	} );	
	
	$.widget.init({collection: collection});	
};