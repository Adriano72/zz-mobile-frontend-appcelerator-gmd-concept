var model = null;

var cashflowTypesCollection = null;

(function constructor(args) {
	model = args.model;

	var data = model.get("data") || {};
	data = _.extend(data, {
		descrizioneBreve: model.get("name"),
		descrizioneLunga: model.get("name"),		
		importo: 0,
		valoreCambio: 1,
		importoCambio: 0,
		valutaCambio: null	,			
		dataOperazione: model.get("referenceTime"),
		dataValuta: model.get("referenceTime"),
		dataScadenza: model.get("referenceTime"),
		dataPagamentoIncasso: model.get("referenceTime")
	});
	model.set("data", data);

	ZZ.API.Finance.CashflowTypes.list(function(cashflowtypes){
			Ti.API.info("ZZ.API.Finance.CashflowTypes.list success [response : " + JSON.stringify(cashflowtypes) + "]");
			
			var data = model.get("data") || {};
			data = _.extend(data, {
				tipoMovimento: cashflowtypes[0]
			});
			model.set("data", data);			
			
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
		var data = model.get("data") || {};
		data = _.extend(data, {
			descrizioneBreve: args,
			descrizioneLunga: args
		});
		model.set({
			name: args,
			description: args,
			data: data
		});			 
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
			dataOperazione: args.getTime(),
			dataValuta: args.getTime(),
			dataScadenza: args.getTime(),
			dataPagamentoIncasso: args.getTime()
		});
		model.set({
			referenceTime: args.getTime(),
			data: data
		});				 
	});
	
})(arguments[0] || {});