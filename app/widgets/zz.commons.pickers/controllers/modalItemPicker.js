var collection = null;
var widgetCollection = new Backbone.Collection();

function open(args) {
	
	if (OS_ANDROID) {
		/*
		var searchView = Ti.UI.Android.createSearchView({
		    hintText: "Search",
		    backgroundColor: "transparent"
		});
		searchView.addEventListener("change", function(e){		
			$.listWidget.searchText( e.source.value );
		});	
		
		$.modalItemPicker.addEventListener("open", function() {
		    $.modalItemPicker.activity.onCreateOptionsMenu = function(e) {
		        var menuItem = e.menu.add({
		            title: "",
		            icon: Ti.Android.R.drawable.ic_menu_search,
		            actionView: searchView,
		            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
		        });
		        //menuItem.expandActionView();
		    };
		    //$.modalItemPicker.activity.invalidateOptionsMenu();
		});	
		*/
	}
		
	/*
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
	*/
	//init(args);
	
	$.modalItemPicker.open();		
};

function init(args) {
	collection = args.collection;
	
	widgetCollection.reset();	
	/*
	collection.forEach( function(item) {
		
		var object = item.toJSON();		
				
		widgetCollection.add({
			id: object.id,
			avatar: object.avatar,
			avatarColor: object.avatarColor,
			//avatarMode: "icon",
			title: object.title,
			//icon: "stop",
			//iconColor: "red",
			order: object.order			
		}); 
	} );	
	*/
	widgetCollection.add(
		collection.map( function(item) {
			
			var object = item.toJSON();		
					
			return {
				id: object.id,
				avatar: object.avatar,
				avatarColor: object.avatarColor,
				//avatarMode: "icon",
				title: object.title,
				//icon: "stop",
				//iconColor: "red",
				order: object.order			
			}; 
		} )
	);
		
	$.listWidget.init({collection: widgetCollection});	
};

function onChange(e) {	
	$.listWidget.searchText( e.source.value );	
}

function onHomeIconItemSelected() {
	$.modalItemPicker.close();
}

function onDone() {	
	/*
	if (date) {
		$.trigger("dateSelected", date);
	}
	*/
	onCancel();
}

function onCancel() {	
	$.modalItemPicker.close();	
}

/*
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
*/

$.listWidget.on("itemSelected", function(args) {
	var model = collection.get(args.id);
    
    $.trigger("itemSelected", model.toJSON());
    
    $.modalItemPicker.close();	
});

exports.open = open;
exports.init = init;