var moment = require("alloy/moment");

var collection = null;
var widgetCollection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection = args.collection;
	
	widgetCollection.reset();	
	args.collection.forEach( function(item) {
		
		var object = item.toJSON();		
		if (!object.data.startTime) {
			return;
		}
		
		var title = "";
		
		var startTime = new Date(object.data.startTime.time);		
		if (object.data.endTime) {		
			var endTime = new Date(object.data.endTime.time);
			
			title = title.concat(
				"Dal ",
				moment(startTime).format("DD/MM/YY"),
				" ",
				moment(startTime).format("hh:mm"),
				" al ",
				moment(endTime).format("DD/MM/YY"),
				" ",
				moment(endTime).format("hh:mm")
			);			
		} else {		
			title = title.concat(
				moment(startTime).format("D MMMM YYYY"),
				" alle ",
				moment(startTime).format("hh:mm")
			);
		}
				
		widgetCollection.add({
			id: object.id,
			avatar: "calendar",
			avatarColor: "lightgray",
			avatarMode: "icon",
			title: title,
			subtitle: object.name,
			//icon: "stop",
			//iconColor: "red"
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