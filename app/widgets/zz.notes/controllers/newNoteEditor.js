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
	
	$.contentTextFieldWidget.init({
		text: (model.get("data") ? new Date(model.get("data").content) : "")
	});
	$.contentTextFieldWidget.on("textSelected", function(args) {		
		var data = model.get("data") || {};
		data = _.extend(data, {
			content: args,
            timestamp: new Date().getTime()
		});
		model.set("data", data);
	});	
	
})(arguments[0] || {});