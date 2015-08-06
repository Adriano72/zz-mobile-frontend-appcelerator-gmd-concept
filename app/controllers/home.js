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

/*
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
*/

$.widget.on("itemSelected", function(args) {
	
	var model = collection.get(args.id);	
	
	if (OS_IOS) {
	    var postsPager = Alloy.createController("postsPager", {
	    	model: model,
	    	collection: collection,
	    	navigationWindow: $.navigationWindow
	    }).getView();		
		$.navigationWindow.openWindow(postsPager);
	}
	if (OS_ANDROID) {
	    var postsPager = Alloy.createController("postsPager", {
	    	model: model,
	    	collection: collection    	
	    }).getView();		
		postsPager.open();
	}
 
 	postsPager.addEventListener("itemSelected", function(item){ 	
 		
 		/*
 		var index = collection.indexOf( collection.get(item.id) );
 		
 		if ( index > (collection.length - 5) ) {
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
 		}
 		*/
 			 		 		
 		$.widget.scrollToItem( collection.get(item.id) );
 	});
 
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
	
	$.bottomSheetWidget = Alloy.createWidget("zz.commons.containers", "bottomSheet");
	$.bottomSheetWidget.open();
	
	var newActionsMenu = Alloy.createController("newActionsMenu");
	$.bottomSheetWidget.add( newActionsMenu.getView() );
	
	newActionsMenu.on("cancel", function(){
		$.bottomSheetWidget.close();
	});
	
	newActionsMenu.on("itemSelected", function(args){
		
		/*
		var newPostEditor = null;
		if (OS_IOS) {
		    newPostEditor = Alloy.createController("newPostEditor", {
		    	//kind: "EVENTDATATYPE_CODE"
		    	//kind: "CASHFLOWDATATYPE_CODE",
		    	//kind: "FILELINKDATATYPE_CODE",
		    	//kind: "NOTEDATATYPE_CODE",
		    	kind: args.id,
		    	navigationWindow: $.navigationWindow
		    }).getView();		
			//$.navigationWindow.openWindow(newPostEditor);
			newPostEditor.open();
		}
		if (OS_ANDROID) {
		    newPostEditor = Alloy.createController("newPostEditor", {  
		    	//kind: "EVENTDATATYPE_CODE",
		    	//kind: "CASHFLOWDATATYPE_CODE"
		    	//kind: "FILELINKDATATYPE_CODE"
		    	//kind: "NOTEDATATYPE_CODE"
		    	kind: args.id
		    }).getView();		
			newPostEditor.open();
		}	
			
		newPostEditor.addEventListener("created", function(post) {
	
			collection.add(post);
			
			$.widget.init({
				collection: collection
			});			
			
		});
		*/
		
		openEditor({
	    	kind: args.id
	    });
		
		$.bottomSheetWidget.close();
	});	
};

function onAddFromImages() {
	
	/*
	var newPostEditor = null;
	if (OS_IOS) {
	    newPostEditor = Alloy.createController("newPostEditor", {
	    	kind: "FILEDOCUMENTDATATYPE_CODE",	    	
	    	navigationWindow: $.navigationWindow,
	    	options: {
	    		mode: "camera"
	    	}
	    }).getView();		
		//$.navigationWindow.openWindow(newPostEditor);
		newPostEditor.open();
	}
	if (OS_ANDROID) {
	    newPostEditor = Alloy.createController("newPostEditor", {  
	    	kind: "FILEDOCUMENTDATATYPE_CODE",
	    	options: {
	    		mode: "camera"
	    	}
	    }).getView();		
		newPostEditor.open();
	}	
		
	newPostEditor.addEventListener("created", function(post) {

		collection.add(post);
		
		$.widget.init({
			collection: collection
		});			
		
	});	
	*/
	
    openEditor({
    	kind: "FILEDOCUMENTDATATYPE_CODE",
    	options: {
    		mode: "camera"
    	}
    });		
};

function openEditor(args) {
	
	var newPostEditor = null;
	if (OS_IOS) {
	    newPostEditor = Alloy.createController("newPostEditor", {
	    	navigationWindow: $.navigationWindow,
	    	kind: args.kind,	    		    	
	    	options: args.options
	    }).getView();		
		$.navigationWindow.openWindow(newPostEditor);
	}
	if (OS_ANDROID) {
	    newPostEditor = Alloy.createController("newPostEditor", {  
	    	kind: args.kind,
	    	options: args.options
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