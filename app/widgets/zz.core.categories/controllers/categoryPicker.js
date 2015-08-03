//var icons = require( WPATH("icons") );
//var colors = require( WPATH("colors") );
var categories = require( WPATH("categories") );

var collection = null;

(function constructor(args) {
	
	ZZ.API.Core.Categories.list(function(objs){
		Ti.API.info("ZZ.API.Core.Categories.list success [response : " + JSON.stringify(objs) + "]");
		
		collection = new Backbone.Collection(objs);
		
		var tmp = new Backbone.Collection();

		_.each(objs, function(item){		
			var categoryRootCode = item.code.substring(0, 2);
	
			tmp.add({
				id: item.id,
				title: item.name,
				avatar: categories.iconMap[categoryRootCode],
				avatarColor: categories.colorMap[categoryRootCode],
				order: item.name
			});
		});
		
		$.modalItemPickerWidget.init({
			collection: tmp
		});
			
	}, function(error){
		Ti.API.error("ZZ.API.Core.Categories.list error [error : " + error + "]");
	});

})(arguments[0] || {});

/*
function icon(code) {	
	return icons.charMap["fa-" + categories.iconMap[code]];
};

function color(code) {	
	return colors.colorMap["mdc-" + categories.colorMap[code] + "-300"];
};	
*/

/*
ZZ.API.Core.Categories.list(function(objs){
	Ti.API.info("ZZ.API.Core.Categories.list success [response : " + JSON.stringify(objs) + "]");
	
	var collection = new Backbone.Collection();
	collection.comparator = function(item) { 
		return item.get("title"); 
	};
	
	_.each(objs, function(item){		
		var categoryRootCode = item.code.substring(0, 2);

		collection.add({
			id: item.id,
			title: item.name,
			avatar: categories.iconMap[categoryRootCode],
			avatarColor: categories.colorMap[categoryRootCode]
		});
	});
	
	$.modalItemPickerWidget.init({
		collection : collection
	});
		
}, function(error){
	Ti.API.error("ZZ.API.Core.Categories.list error [error : " + error + "]");
});
*/
	
function open() {
	
	$.modalItemPickerWidget = Alloy.createWidget("zz.commons.pickers", "modalItemPicker");
	$.modalItemPickerWidget.open(/*{
		collection : new Backbone.Collection([{
			id: 1,
			title: "object 1" 
		}, {
			id: 2,
			title: "object 2" 
		}, {
			id: 3,
			title: "object 3" 
		}])
	}*/);
	
	$.modalItemPickerWidget.on("itemSelected", function(args) {	
		
		var object = collection.get(args.id).toJSON();
			
		$.trigger("categorySelected", object);	 
	});
	
	/*
	$.modalItemPickerWidget.init({
		collection : new Backbone.Collection([{
			id: 1,
			title: "object 4" 
		}, {
			id: 2,
			title: "object 5" 
		}, {
			id: 3,
			title: "object 6" 
		}])
	});
	*/

};

exports.open = open;