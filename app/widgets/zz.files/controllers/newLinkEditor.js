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
	
	$.urlTextFieldWidget.init({
		text: (model.get("data") ? new Date(model.get("data").content) : "")
	});
	$.urlTextFieldWidget.on("textSelected", function(args) {		
		var data = model.get("data") || {};
		data = _.extend(data, {
			content: {remote: args},                		
            format: {mimeType: "text/html"},
            timestamp: new Date().getTime()
		});
		model.set("data", data);
		
		ZZ.API.Files.Links.metadata(args,
			function(response){
				$.imageView.setImage(response.imageUrl);
			}, function(error){
				
			}
		);
	});	
	
})(arguments[0] || {});