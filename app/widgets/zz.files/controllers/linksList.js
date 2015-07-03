var collection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection.reset();
	
	args.collection.forEach( function(item) {
		
		var object = item.toJSON();
				
		collection.add({
			id: item.get("id"),
			avatar: "link",
			avatarColor: "lightgray",
			avatarMode: "icon",
			title: object.name,
			subtitle: object.data.content.remote
		}); 
	} );	
	
	$.widget.init({collection: collection});	
};