var model = null;

(function constructor(args) {
	model = args.model;

	$.titleTextFieldWidget.init({
		text: model.get("name")
	});
	$.titleTextFieldWidget.on("textSelected", function(args) {		
		model.set("name", args);	 
	});
	
	$.categoryTextFieldWidget.init({
		category: model.get("category")
	});
	$.categoryTextFieldWidget.on("categorySelected", function(args) {		
		model.set("category", args);	 
	});
		
	if (args.options && args.options.mode == "camera") {	
		showCamera()
	} else {
		showGallery();
	}
		
})(arguments[0] || {});

function showCamera() {
	Ti.Media.showCamera({
				
		autohide: true,
		saveToPhotoGallery: true,		
		
		success: function(event) {
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				$.imageView.setImage(event.media);
				
				var blob = event.media;				
				var file = blob.file;
				
				var fileName = (
					file && file.getName() ? 
					file.getName() : 
					"".concat("media_", new Date().getTime(), ".", (blob.getMimeType().split("/")[1]).toLowerCase())
				);			
				var mimeType = blob.getMimeType();				
				var size = blob.length; //(file ? file.getSize() : blob.getSize());
				
				var data = model.get("data") || {};
				data = _.extend(data, {
                	title : fileName,                       	
                	name : fileName,
                	description : fileName,
            		format : {mimeType : mimeType},
            		size : size,
            		timestamp : new Date().getTime()
				});
				model.set("data", data);				
				
				$.trigger("mediaSelected", {blob: blob});
				
			} else {
			}
		},
		cancel: function() {
		},
		error: function(error) {
			var a = Titanium.UI.createAlertDialog({
				title: "Camera"
			});
			
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage("Please run this test on device");
			} else {
				a.setMessage("Unexpected error: " + error.code);
			}
			
			a.show();
		}
	});	
}

function showGallery() {

	Ti.Media.openPhotoGallery({
				
		autohide: true,		
		
		success: function(event) {
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				$.imageView.setImage(event.media);
				
				var blob = event.media;				
				var file = blob.file;
				
				var fileName = (
					file && file.getName() ? 
					file.getName() : 
					"".concat("media_", new Date().getTime(), ".", (blob.getMimeType().split("/")[1]).toLowerCase())
				);			
				var mimeType = blob.getMimeType();				
				var size = blob.length; //(file ? file.getSize() : blob.getSize());
				
				var data = model.get("data") || {};
				data = _.extend(data, {
                	title : fileName,                       	
                	name : fileName,
                	description : fileName,
            		format : {mimeType : mimeType},
            		size : size,
            		timestamp : new Date().getTime()
				});
				model.set("data", data);				
				
				$.trigger("mediaSelected", {blob: blob});
				
			} else {
			}
		},
		cancel: function() {
		},
		error: function(error) {
			var a = Titanium.UI.createAlertDialog({
				title: "Camera"
			});
			
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage("Please run this test on device");
			} else {
				a.setMessage("Unexpected error: " + error.code);
			}
			
			a.show();
		}
	});	
}
