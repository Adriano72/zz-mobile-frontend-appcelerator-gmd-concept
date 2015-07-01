var collection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection.reset();
	
	args.collection.forEach( function(item) {
		collection.add({
			id: item.get("id"),
			avatar: "user",
			color: "orange",
			title: "this is my title",
			icon: "tag"
		}); 
	} );	
	
	$.widget.init({collection: collection});	
};

$.widget.on("itemSelected", function(args) {
	
    Ti.API.info("itemSelected");
 
});

$.widget.on("itemDeleted", function(args) {
	
	Ti.API.info("itemDeleted");
	
});