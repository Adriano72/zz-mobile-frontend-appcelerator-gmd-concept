var collection = Alloy.Collections.instance("posts");
collection.reset();

ZZ.API.Core.Posts.list(function(posts){
	Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");
	
	collection.add(posts);
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

$.widget.on("nextPage", function(args) {
	
	ZZ.API.Core.Posts.list(function(posts){
		Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");
		
		collection.add(posts);		
		
		$.widget.init({
			collection: collection
		});		
		
	}, function(error){
		Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
	}, {
		action : ZZ.API.Core.Posts.CONSTANTS.ACTIONS.LOAD_MORE
	});	
	
});

function onAddFromScratch() {
	
	var newPostEditor = null;
	if (OS_IOS) {
	    newPostEditor = Alloy.createController("newPostEditor", {
	    	//kind: "EVENTDATATYPE_CODE"
	    	//kind: "CASHFLOWDATATYPE_CODE",
	    	kind: "FILEDOCUMENTDATATYPE_CODE",
	    	navigationWindow: $.navigationWindow
	    }).getView();		
		$.navigationWindow.openWindow(newPostEditor);
	}
	if (OS_ANDROID) {
	    newPostEditor = Alloy.createController("newPostEditor", {  
	    	//kind: "EVENTDATATYPE_CODE"
	    	//kind: "CASHFLOWDATATYPE_CODE" ,
	    	kind: "FILEDOCUMENTDATATYPE_CODE",	
	    }).getView();		
		newPostEditor.open();
	}	
		
	newPostEditor.addEventListener("created", function(post) {

		collection.add(post);
		
		$.widget.init({
			collection: collection
		});			
		
	});
	
};

function onAddFromImages() {
	
	$.bottomSheetWidget = Alloy.createWidget("zz.commons.containers", "bottomSheet");
	$.bottomSheetWidget.getView().open();
		
};
