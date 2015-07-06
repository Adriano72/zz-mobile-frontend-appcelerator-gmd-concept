var moment = require("alloy/moment");
var accounting = require( WPATH("accounting") );

var icons = require( WPATH("icons") );
var colors = require( WPATH("colors") );
var categories = require( WPATH("categories") );

var model = $.dataModel;
	
function icon(code) {	
	return icons.charMap["fa-" + categories.iconMap[code]];
};

function color(code) {	
	return colors.colorMap["mdc-" + categories.colorMap[code] + "-300"];
};
	
exports.init = function(args) {

	var object = args.model.toJSON();
	
	var categoryRootCode = object.category.code.substring(0, 2);
	
	var type = object.data.tipoMovimento.codice.toLowerCase();
	
	var title = "";	
	var iconImage = null;
	var iconColor = null;		
	if (type === "ent") {
		iconImage = "caret-up";
		iconColor = "green";
		
		title = title.concat(
			accounting.formatMoney(object.data.importo, { symbol: "EUR", decimal : ",", thousand : ".", precision : "2", format: "%v %s" })
			/*
			" - ", 
			object.data.fonteLiquidita.descrizioneBreve,
			" - ",
			object.data.modalitaPagamento.codice
			*/
		);
	} else if (type === "usc") {
		iconImage = "caret-down";
		iconColor = "red";		
		
		title = title.concat(
			accounting.formatMoney(-object.data.importo, { symbol: "EUR", decimal : ",", thousand : ".", precision : "2", format: "%v %s" })
			/*
			" - ", 
			object.data.fonteLiquidita.descrizioneBreve,
			" - ",
			object.data.modalitaPagamento.codice
			*/
		);				
	} else {
		iconImage = "exchange";
		iconColor = "black";
		
		title = title.concat(
			accounting.formatMoney(object.data.importo, { symbol: "EUR", decimal : ",", thousand : ".", precision : "2", format: "%v %s" })
			/*
			" - ", 
			object.data.fonteLiquidita.descrizioneBreve,
			" - ",
			object.data.modalitaPagamento.codice
			*/
		);			
	}
			
	model.set({
		avatar: icon(categoryRootCode),
		avatarColor: color(categoryRootCode),
		icon: icons.charMap["fa-" + iconImage],
		iconColor: iconColor,		
		title: title,
		subtitle: object.category.name,
		description: object.name,
		operationDate: moment(new Date(object.data.dataOperazione)).format("DD/MM/YY"),
		operationTime: moment(new Date(object.data.dataOperazione)).format("hh:mm"),
		valueDate: moment(new Date(object.data.dataValuta)).format("DD/MM/YY"),
		valueTime: moment(new Date(object.data.dataValuta)).format("hh:mm"),
		cashsource: object.data.fonteLiquidita.descrizioneBreve,
		mode: object.data.modalitaPagamento.descrizioneBreve,
		tool: object.data.strumentoPagamentoIncasso.descrizioneBreve,
		status: object.data.statoMovimento.descrizioneBreve,
		variability: object.data.tipoVariabilita.descrizioneBreve,
		tax: "".concat( (!object.data.flagDichiarazioneRedditi ? "Non " : ""),"Rilevante"),
		extra: (object.data.flagOrdinarioStraordinario ? "Straordinario" : "Ordinario")
	});

};