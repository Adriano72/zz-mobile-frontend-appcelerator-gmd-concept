(function constructor(args) {
		
	var collection = new Backbone.Collection([{
		id: "eventdatatype_code",
		title: "Event",
		icon: "calendar"
	}, {
		id: "cashflowdatatype_code",
		title: "Cashflow",
		icon: "credit-card"
	}, {
		id: "filedocumentdatatype_code",
		title: "Photo from gallery",
		icon: "paperclip"
	}, {
		id: "filelinkdatatype_code",
		title: "Link",
		icon: "link"
	}, {
		id: "notedatatype_code",
		title: "Note",
		icon: "file-text"
	}]);
	var widgetCollection = new Backbone.Collection();

	widgetCollection.reset();	
	collection.forEach( function(item) {
		
		var object = item.toJSON();		
	
		widgetCollection.add({
			id: object.id,
			avatar: object.icon,
			avatarColor: "lightgray",
			avatarMode: "icon",
			title: object.title,
			//icon: "stop",
			//iconColor: "red"
		}); 
	} );	
	
	$.widget.init({collection: widgetCollection});	
	
	$.widget.on("itemSelected", function(args) {
		var model = collection.get(args.id);
    
    	$.trigger("itemSelected", model.toJSON());	
	});
		
})(arguments[0] || {});

function onCancel() {	
	$.trigger("cancel");
}