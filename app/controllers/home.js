var collection = Alloy.Collections.instance("posts");

ZZ.API.Core.Posts.list(function(posts){
	Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");
	
	collection.reset(posts);
	$.widget.init({
		collection: collection
	});		
	
}, function(error){
	Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
});	

$.widget.on("itemSelected", function(args) {
	
	var model = collection.get(args.id);	
	
	if (OS_IOS) {
	    var postViewer = Alloy.createController("postViewer", {
	    	model: model,
	    	navigationWindow: $.navigationWindow
	    }).getView();		
		$.navigationWindow.openWindow(postViewer);
	}
	if (OS_ANDROID) {
	    var postViewer = Alloy.createController("postViewer", {
	    	model: model    	
	    }).getView();		
		postViewer.open();
	}
 
});

$.widget.on("itemDeleted", function(args) {
});