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
	
	var model = new Backbone.Model();	
	
	if (OS_IOS) {
	    var postEditor = Alloy.createController("postEditor", {
	    	model: model,
	    	navigationWindow: $.navigationWindow
	    }).getView();		
		$.navigationWindow.openWindow(postEditor);
	}
	if (OS_ANDROID) {
	    var postEditor = Alloy.createController("postEditor", {
	    	model: model    	
	    }).getView();		
		postEditor.open();
	}	
	
};

function onAddFromImages() {
	
	$.bottomSheetWidget = Alloy.createWidget("zz.commons.containers", "bottomSheet");
	$.bottomSheetWidget.getView().open();
	return;
	
	//Ti.Media.showCamera({
	Ti.Media.openPhotoGallery({
		success:function(event) {
			// called when media returned from the camera
			Ti.API.info('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				/*
				var imageView = Ti.UI.createImageView({
					width:win.width,
					height:win.height,
					image:event.media
				});
				win.add(imageView);
				*/
			} else {
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function() {
			// called when user cancels taking a picture
		},
		error:function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		
		autohide: false
		
		/*
		saveToPhotoGallery:true,
	    // allowEditing and mediaTypes are iOS-only settings
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
		*/
	});	
	
};
