var collection = null;
var widgetCollection = new Backbone.Collection();

function formatSize(size) {
	if (!size || size == 0)
		return "0KB";
	
	return (size > 1024 * 1024 ? 
    		(Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB' :
            (Math.round(size * 100 / 1024) / 100).toString() + 'KB');      	
};

exports.init = function(args) {	
	
	collection = args.collection;
	
	widgetCollection.reset();
	args.collection.forEach( function(item) {
		
		var object = item.toJSON();
		
		widgetCollection.add({
			id: item.get("id"),
			avatar: "paperclip",
			avatarColor: "lightgray",
			avatarMode: "icon",
			title: object.data.title,
			subtitle: object.data.name,
			//icon: "file-image-o",
			//iconColor: "blue"
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