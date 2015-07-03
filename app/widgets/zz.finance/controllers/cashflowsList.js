var moment = require("alloy/moment");
var accounting = require( WPATH("accounting") );

var collection = new Backbone.Collection();

exports.init = function(args) {	
	
	collection.reset();
	
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
			icon = "caret-up";
			iconColor = "green";
			
			title = title.concat(
				accounting.formatMoney(object.data.importo, { symbol: "EUR", decimal : ",", thousand : ".", precision : "2", format: "%v %s" }),
				" - ", 
				object.data.fonteLiquidita.descrizioneBreve,
				" - ",
				object.data.modalitaPagamento.codice
			);
		} else if (type === "usc") {
			icon = "caret-down";
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
		
		collection.add({
			id: item.get("id"),
			avatar: "credit-card",
			avatarColor: "lightgray",
			avatarMode: "icon",
			title: title,
			subtitle: item.get("name"),
			icon: icon, //"caret-up",
			iconColor: iconColor //"red"
		}); 
	} );	
	
	$.widget.init({collection: collection});	
};