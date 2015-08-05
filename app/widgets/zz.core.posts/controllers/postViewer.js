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
	
	model.set({
		avatar: icon(categoryRootCode),
		color: color(categoryRootCode),
		title: object.name,
		subtitle: (object.category ? object.category.name : ""),
		date: moment(new Date(object.referenceTime)).format("DD MMMM YYYY"),
		time: moment(new Date(object.referenceTime)).format("hh:mm a"),
		location: (object.location ? object.location.name : "")
	});

};