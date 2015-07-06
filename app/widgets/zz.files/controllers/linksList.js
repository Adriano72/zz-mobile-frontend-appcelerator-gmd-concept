var collection = null;
var widgetCollection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection = args.collection;
	
	widgetCollection.reset();
	args.collection.forEach( function(item) {
		
		var object = item.toJSON();
				
		widgetCollection.add({
			id: item.get("id"),
			avatar: "link",
			avatarColor: "lightgray",
			avatarMode: "icon",
			title: object.data.title,
			subtitle: object.data.content.remote
		}); 
	} );	
	
	$.widget.init({collection: widgetCollection});	
};

$.widget.on("itemSelected", function(args) {
	var model = collection.get(args.id);
    
    $.trigger("itemSelected", model.toJSON());	
});

$.widget.on("itemDeleted", function(args) {
	var model = collection.get(args.id);
    
    $.trigger("itemDeleted", model.toJSON());
});