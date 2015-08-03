/*
var args = arguments[0] || {};

var model = args.model;

var kind = model.get("kind").code;
if (kind === "EVENTDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.events", "eventEditor", {model: model});
	
} else if (kind === "CASHFLOWDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.finance", "cashflowEditor", {model: model});
	
} else if (kind === "FILEDOCUMENTDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.files", "documentEditor", {model: model});
	
} else if (kind === "FILELINKDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.files", "linkEditor", {model: model});
	
} else if (kind === "NOTEDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.notes", "noteEditor", {model: model});
	
}
$.aspectEditor.add($.widget.getView());
*/

/*
$.widget.init({
	model: model
});
*/

var blob = null;

(function constructor(args) {

	var model = args.model;
	
	$.aspectEditor.addEventListener("open", function() {
	
		var kind = model.get("kind").code;
		if (kind.toLowerCase() === "EVENTDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.events", "eventEditor", {model: model});
			
		} else if (kind.toLowerCase() === "CASHFLOWDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.finance", "cashflowEditor", {model: model});
			
		} else if (kind.toLowerCase() === "FILEDOCUMENTDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.files", "documentEditor", {model: model});
			
			$.widget.on("mediaSelected", function(args) {					
				blob = args.blob; 
			});		
			
		} else if (kind.toLowerCase() === "FILELINKDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.files", "linkEditor", {model: model});
			
		} else if (kind.toLowerCase() === "NOTEDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.notes", "noteEditor", {model: model});
			
		}
		$.aspectEditor.add($.widget.getView());	
		
	});
	
	model.on("change", function(){
		//Ti.API.info(model.toJSON());
	});	
		
})(arguments[0] || {});

function onConfirm() {
	//$.trigger("confirm");
	$.aspectEditor.fireEvent("confirm", {blob: blob});
}

function onHomeIconItemSelected() {
	$.aspectEditor.close();
}	