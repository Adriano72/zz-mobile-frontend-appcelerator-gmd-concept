var moment = require("alloy/moment");
var accounting = require( WPATH("accounting") );

var collection = null;
var widgetCollection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection = args.collection;
	
	widgetCollection.reset();
	args.collection.forEach( function(item) {
		
		var object = item.toJSON();		
		if (!object.data.importo) {
			return;
		}						
		
		var type = object.data.tipoMovimento.codice.toLowerCase();
		
		var title = "";		
		
		var icon = null;
		var iconColor = null;		
				
		if (type === "ent") {
			icon = "arrow-up"; //"caret-up";
			iconColor = "green";
			
			title = title.concat(
				accounting.formatMoney(object.data.importo, { symbol: "EUR", decimal : ",", thousand : ".", precision : "2", format: "%v %s" }),
				" - ", 
				object.data.fonteLiquidita.descrizioneBreve,
				" - ",
				object.data.modalitaPagamento.codice
			);
		} else if (type === "usc") {
			icon = "arrow-down";//"caret-down";
			iconColor = "red";			
			
			title = title.concat(
				accounting.formatMoney(-object.data.importo, { symbol: "EUR", decimal : ",", thousand : ".", precision : "2", format: "%v %s" }),
				" - ", 
				object.data.fonteLiquidita.descrizioneBreve,
				" - ",
				object.data.modalitaPagamento.codice
			);				
		} else {
			icon = "exchange";
			
			title = title.concat(
				accounting.formatMoney(object.data.importo, { symbol: "EUR", decimal : ",", thousand : ".", precision : "2", format: "%v %s" }),
				" - ", 
				object.data.fonteLiquidita.descrizioneBreve,
				" - ",
				object.data.modalitaPagamento.codice
			);			
		}
		
		widgetCollection.add({
			id: item.get("id"),
			avatar: "credit-card",
			avatarColor: "lightgray",
			avatarMode: "icon",
			title: title,
			subtitle: item.get("name"),
			icon: icon,
			iconColor: iconColor
		}); 
	} );	
	
	$.widget.init({collection: widgetCollection});	
};

$.widget.on("itemSelected", function(args) {
	var model = collection.get(args.id);
    
    $.trigger("itemSelected", model.toJSON());	
});

$.widget.on("itemDeleted", function(args) {
	var model = collection.get(args.id);
    
    $.trigger("itemDeleted", model.toJSON());
});