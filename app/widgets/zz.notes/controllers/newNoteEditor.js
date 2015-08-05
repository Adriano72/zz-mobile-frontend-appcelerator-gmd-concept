var model = null;

(function constructor(args) {
	model = args.model;

	var data = model.get("data") || {};
	data = _.extend(data, {
		title: model.get("name"),
		timestamp : model.get("referenceTime")	
	});
	model.set("data", data);

	$.titleTextFieldWidget.init({
		text: model.get("name")
	});
	$.titleTextFieldWidget.on("textSelected", function(args) {		
		var data = model.get("data") || {};
		data = _.extend(data, {
			title: args
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
	
	$.contentTextFieldWidget.init({
		text: ""
	});
	$.contentTextFieldWidget.on("textSelected", function(args) {		
		var data = model.get("data") || {};
		data = _.extend(data, {
			content: args
		});
		model.set("data", data);
	});	
	
})(arguments[0] || {});