var collection = Alloy.Collections.instance("posts");
collection.fetch();

$.widget.init({
	collection: collection
});

$.widget.on("itemSelected", function(args) {
	
    var postViewer = Alloy.createController("postViewer", args).getView();
	
	if (OS_IOS) {
		$.navigationWindow.openWindow(postViewer);
	}
	if (OS_ANDROID) {
		postViewer.open();
	}
 
});

$.widget.on("itemDeleted", function(args) {
});