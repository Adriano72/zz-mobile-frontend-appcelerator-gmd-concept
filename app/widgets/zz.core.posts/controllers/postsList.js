var moment = require("alloy/moment");
var categories = require( WPATH("categories") );
var icons = require( WPATH("icons") );

var collection = new Backbone.Collection();

exports.init = function(args) {	

	/*
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
	*/
	
	collection.add(
		args.collection.map(function(item){
			
			var object = item.toJSON();
			
			var categoryRootCode = (object.category ? object.category.code.substring(0, 2) : null);			
			
			var stories = null;
			if (object.stories) {
				stories = "";
				_.each(object.stories, function(item, index){
					stories = stories.concat((index > 0 ? ", " : ""), item.name);
				});
			}	
			
			var tags = null;		
			if (object.tags) {
				tags = "";
				_.each(object.tags, function(item, index){
					tags = tags.concat((index > 0 ? ", " : ""), item.name);
				});
			}
			
			return {
				id: object.id,
				avatar: categories.iconMap[categoryRootCode],
				color: categories.colorMap[categoryRootCode],
				title: object.name,
				time: moment(new Date(object.referenceTime)).format("DD MMM"),
				subtitle: (object.category ? object.category.name : ""),
				subsubtitle: "".concat( (stories ? stories : ""), (stories && tags ? ", " : ""), (tags ? tags : "")),
				order: -(object.referenceTime)
			};
		})
	);
	
	$.widget.init({collection: collection});	
};

exports.scrollToItem = function(args) {
	$.widget.scrollToItem(collection.get(args.id).toJSON());	
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