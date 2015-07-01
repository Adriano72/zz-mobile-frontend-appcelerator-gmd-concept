var collection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection.reset();
	
	args.collection.forEach( function(item) {
		collection.add({
			id: item.get("id"),
			avatar: "user",
			color: "pink",
			title: "this is my title",
			icon: "tag"
		}); 
	} );	
	
	$.widget.init({collection: collection});	
};