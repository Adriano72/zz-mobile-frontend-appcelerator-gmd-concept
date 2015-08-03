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
					
	//Ti.Media.showCamera({
	Ti.Media.openPhotoGallery({
				
		autohide: true,
		//saveToPhotoGallery: true		
		
		success: function(event) {
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				$.imageView.setImage(event.media);
				
				var blob = event.media;
				
				var data = model.get("data") || {};
				data = _.extend(data, {
                	title : "",                       	
                	name : "",
                	description : "",
            		format : {mimeType : blob.getMimeType()},
            		size : blob.size, //blob.getSize(),
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

})(arguments[0] || {});