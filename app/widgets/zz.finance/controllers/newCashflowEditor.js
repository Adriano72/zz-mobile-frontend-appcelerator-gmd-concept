var model = null;

var cashflowTypesCollection = null;

(function constructor(args) {
	model = args.model;

	ZZ.API.Finance.CashflowTypes.list(function(cashflowtypes){
			Ti.API.info("ZZ.API.Finance.CashflowTypes.list success [response : " + JSON.stringify(cashflowtypes) + "]");
			
			cashflowTypesCollection = new Backbone.Collection(cashflowtypes);
				
			$.typeTextFieldWidget.init({
				value: ( model.get("tipoMovimento") ? {id: model.get("tipoMovimento").id} : null),
				collection: new Backbone.Collection( _.map(cashflowtypes, function(item){
					return {
						id: item.id,
						title: item.descrizioneBreve
					};
				}) )
			});			
					
		}, function(error){
			Ti.API.error("ZZ.API.Finance.CashflowTypes.list error [error : " + error + "]");
	});
		
	$.typeTextFieldWidget.on("itemSelected", function(args) {						
		var data = model.get("data") || {};
		data = _.extend(data, {
			tipoMovimento: cashflowTypesCollection.get(args.id)
		});
		
		model.set("data", data);
	});

	$.titleTextFieldWidget.init({
		text: model.get("name")
	});
	$.titleTextFieldWidget.on("textSelected", function(args) {		
		model.set("name", args);	 
	});
	
	$.amountTextFieldWidget.init({
		text:  (model.get("data") ? model.get("data").importo : 0)
	});
	$.amountTextFieldWidget.on("textSelected", function(args) {		
		var data = model.get("data") || {};
		data = _.extend(data, {
			importo: args
		});
		model.set("data", data);	 
	});	
	
	$.categoryTextFieldWidget.init({
		category: model.get("category")
	});
	$.categoryTextFieldWidget.on("categorySelected", function(args) {		
		model.set("category", args);	 
	});
	
	$.operationDateTextFieldWidget.init({
		date: (model.get("data") && model.get("data").dataOperazione ? new Date(model.get("data").dataOperazione) : new Date())
	});	
	$.operationDateTextFieldWidget.on("dateSelected", function(args) {
		var data = model.get("data") || {};
		data = _.extend(data, {
			dataOperazione: args.getTime()
		});
		model.set("data", data);				 
	});
	
})(arguments[0] || {});