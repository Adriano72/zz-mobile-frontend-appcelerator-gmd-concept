var model = null;

(function constructor(args) {
	model = args.model;

	var data = model.get("data") || {};
	data = _.extend(data, {
		title: model.get("name"),
		name: model.get("name"),
		description: model.get("name"),
		timestamp : model.get("referenceTime")	
	});
	model.set("data", data);

	$.titleTextFieldWidget.init({
		text: model.get("name")
	});
	$.titleTextFieldWidget.on("textSelected", function(args) {		
		var data = model.get("data") || {};
		data = _.extend(data, {
			title: args,
			description: args
		});			
		model.set({
			name: args,
			description: args,
			data: data
		});	 
	});
	
	$.categoryTextFieldWidget.init({
		category: model.get("category")
	});
	$.categoryTextFieldWidget.on("categorySelected", function(args) {		
		model.set("category", args);	 
	});
	
	$.urlTextFieldWidget.init({
		text: ""
	});
	$.urlTextFieldWidget.on("textSelected", function(args) {		
		var data = model.get("data") || {};
		data = _.extend(data, {
			title: args,
			name: args,
			description: args,
			content: {remote: args},                		
            format: {mimeType: "text/html"},
            timestamp: new Date().getTime()
		});
		model.set({
			name: args,
			description: args,
			data: data
		});
		
		ZZ.API.Files.Links.metadata(args,
			function(response){
				$.imageView.setImage(response.imageUrl);
				
				var data = model.get("data") || {};
				data = _.extend(data, {
					title: response.title,
					description: response.description
				});
				model.set({
					name: response.title,
					description: response.description,
					data: data
				});				
				
			}, function(error){
				
			}
		);
	});	
	
})(arguments[0] || {});