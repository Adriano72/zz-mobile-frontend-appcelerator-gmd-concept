var collection = null;
var widgetCollection = new Backbone.Collection();

function open() {
	
	if (OS_ANDROID) {

		var searchView = Ti.UI.Android.createSearchView({
		    hintText: "Search",
		    backgroundColor: "transparent"
		});
		
		searchView.addEventListener("change", function(){		
			$.listWidget.searchText( searchView.value );
		});
				
		$.modalItemPicker.addEventListener("open", function() {
		    $.modalItemPicker.activity.onCreateOptionsMenu = function(e) {
		        e.menu.add({
		            title: "",
		            icon: Ti.Android.R.drawable.ic_menu_search,
		            actionView: searchView,
		            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
		        });
		    };
		    //$.modalItemPicker.activity.invalidateOptionsMenu();
		});	

	}
		
	$.modalItemPicker.open();
};

function init(args) {
	collection = args.collection;
	
	widgetCollection.reset();	
	args.collection.forEach( function(item) {
		
		var object = item.toJSON();		
				
		widgetCollection.add({
			id: object.id,
			avatar: "calendar",
			avatarColor: "lightgray",
			//avatarMode: "icon",
			title: object.title,
			//icon: "stop",
			//iconColor: "red"
		}); 
	} );	
	
	$.listWidget.init({collection: widgetCollection});	
};

function onChange() {
	$.listWidget.searchText( $.searchBar.value );
}

function onHomeIconItemSelected() {
	$.modalItemPicker.close();
}

$.listWidget.on("itemSelected", function(args) {
	var model = collection.get(args.id);
    
    $.trigger("itemSelected", model.toJSON());	
});

init({
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
});

exports.open = open;
exports.init = init;