var moment = require("alloy/moment");
var categories = require( WPATH("categories") );

var collection = new Backbone.Collection();

exports.init = function(args) {	

	args.collection.forEach( function(item) {
		
		var object = item.toJSON();
		
		var categoryRootCode = (object.category ? object.category.code.substring(0, 2) : null);
		
		collection.add({
			id: object.id,
			avatar: categories.iconMap[categoryRootCode],
			color: categories.colorMap[categoryRootCode],
			title: object.name,
			time: moment(new Date(object.referenceTime)).format("DD MMM"),
			subtitle: (object.category ? object.category.name : ""),
			subsubtitle: "",
			order: -(object.referenceTime)
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

$.widget.on("lastItemShown", function(args) {   
    $.trigger("nextPage");	
});