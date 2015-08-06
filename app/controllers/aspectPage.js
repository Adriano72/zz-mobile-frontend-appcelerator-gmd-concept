var args = arguments[0] || {};
var model = args.model;

var kind = model.get("kind").code;
if (kind === "EVENTDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.events", "eventViewer");
	
} else if (kind === "CASHFLOWDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.finance", "cashflowViewer");
	
} else if (kind === "FILEDOCUMENTDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.files", "documentViewer");
	
} else if (kind === "FILELINKDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.files", "linkViewer");
	
} else if (kind === "NOTEDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.notes", "noteViewer");
	
}
$.aspectPage.add($.widget.getView());

$.widget.init({
	model: model
});