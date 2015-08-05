var moment = require("alloy/moment");
var icons = require( WPATH("icons") );
var colors = require( WPATH("colors") );
var categories = require( WPATH("categories") );
var documents = require( WPATH("documents") );

var model = $.dataModel;
	
function formatSize(size) {
	if (!size || size == 0) {
		return "0 KB";
	}
	
	return (size > 1024 * 1024 ? 
    		(Math.round(size * 100 / (1024 * 1024)) / 100).toString() + " MB" :
            (Math.round(size * 100 / 1024) / 100).toString() + " KB");      	
};
	
function categoryIcon(code) {	
	return icons.charMap["fa-" + categories.iconMap[code]];
};

function categoryColor(code) {	
	return colors.colorMap["mdc-" + categories.colorMap[code] + "-300"];
};
	
function documentIcon(code) {	
	return icons.charMap["fa-" + documents.iconMap[code]];
};

function documentColor(code) {	
	return colors.colorMap["mdc-" + documents.colorMap[code] + "-300"];
};
	
exports.init = function(args) {

	var object = args.model.toJSON();
	
	var categoryRootCode = (object.category ? object.category.code.substring(0, 2) : null);
	
    var mimeType = object.data.format.mimeType;           
    var format = null;           
    if (mimeType) {
    	format = mimeType.substring( mimeType.lastIndexOf("/") + 1 ); 
	}
	
	model.set({
		avatar: categoryIcon(categoryRootCode),
		avatarColor: categoryColor(categoryRootCode),
		icon: documentIcon(format),
		iconColor: documentColor(format),		
		title: object.data.title,
		subtitle: (object.category ? object.category.name : ""),
		date: moment(new Date(object.referenceTime)).format("DD MMMM YYYY"),
		time: moment(new Date(object.referenceTime)).format("hh:mm a"),
		location: (object.location ? object.location.name : ""),
		name: object.data.name,
		size: formatSize(object.data.size)
	});

	if (object.data.format.type === "IMAGE") {
		ZZ.API.Files.Attachment.get(object,
			function(response){
				$.imageView.setImage(response);
			}, function(error){
				
			}
		);
	}
};