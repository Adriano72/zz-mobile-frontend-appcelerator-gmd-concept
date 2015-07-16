var args = arguments[0] || {};var model = args.model;

var kind = model.get("kind").code;
if (kind === "EVENTDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.events", "eventEditor");
	
} else if (kind === "CASHFLOWDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.finance", "cashflowEditor");
	
} else if (kind === "FILEDOCUMENTDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.files", "documentEditor");
	
} else if (kind === "FILELINKDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.files", "linkEditor");
	
} else if (kind === "NOTEDATATYPE_CODE") {
	$.widget = Alloy.createWidget("zz.notes", "noteEditor");
	
}
$.aspectEditor.add($.widget.getView());

/*
$.widget.init({
	model: model
});
*/

function onConfirm() {
	//$.trigger("confirm");
	$.aspectEditor.fireEvent("confirm");
}

function onHomeIconItemSelected() {
	$.aspectViewer.close();
}