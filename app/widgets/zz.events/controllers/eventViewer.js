var moment = require("alloy/moment");
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
	
	var categoryRootCode = (object.category ? object.category.code.substring(0, 2) : null);
	
	var title = "";
	
	var startTime = new Date(object.data.startTime.time);
	var endTime = null;
			
	if (object.data.endTime) {		
		var endTime = new Date(object.data.endTime.time);
		
		/*
		title = title.concat(
			"Dal ",
			moment(startTime).format("DD/MM/YY"),
			" ",
			moment(startTime).format("hh:mm"),
			" al ",
			moment(endTime).format("DD/MM/YY"),
			" ",
			moment(endTime).format("hh:mm")
		);
		*/			
	} else {
		/*		
		title = title.concat(
			moment(startTime).format("D MMMM YYYY"),
			" alle ",
			moment(startTime).format("hh:mm")
		);
		*/
	}	
	
	var type = "";
	type = type.concat(
		(object.data.isMilestone ? "Milestone, " : "Standard, "),
		(object.data.isPlanned ? "Pianificato" : "Effettivo")
	);
	
	model.set({
		avatar: icon(categoryRootCode),
		color: color(categoryRootCode),
		title: object.name, //title,
		subtitle: (object.category ? object.category.name : ""),
		startDate: moment(startTime).format("DD/MM/YY"),
		startTime: moment(startTime).format("hh:mm"),
		endDate: moment( (endTime || startTime) ).format("DD/MM/YY"),
		endTime: moment( (endTime || startTime) ).format("hh:mm"),
		type: type
	});

};