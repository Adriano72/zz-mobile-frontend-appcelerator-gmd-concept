var blob = null;

(function constructor(args) {

	var model = args.model;
	
	$.newAspectEditor.addEventListener("open", function() {
	
		var kind = model.get("kind").code;
		if (kind.toLowerCase() === "EVENTDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.events", "newEventEditor", {model: model, options: args.options});
			
		} else if (kind.toLowerCase() === "CASHFLOWDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.finance", "newCashflowEditor", {model: model, options: args.options});
			
		} else if (kind.toLowerCase() === "FILEDOCUMENTDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.files", "newDocumentEditor", {model: model, options: args.options});
			
			$.widget.on("mediaSelected", function(args) {					
				blob = args.blob; 
			});		
			
		} else if (kind.toLowerCase() === "FILELINKDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.files", "newLinkEditor", {model: model, options: args.options});
			
		} else if (kind.toLowerCase() === "NOTEDATATYPE_CODE".toLowerCase()) {
			$.widget = Alloy.createWidget("zz.notes", "newNoteEditor", {model: model, options: args.options});
			
		}
		$.newAspectEditor.add($.widget.getView());	
		
	});
	
	model.on("change", function(){
		//Ti.API.info(model.toJSON());
	});	
		
})(arguments[0] || {});

function onConfirm() {
	//$.trigger("confirm");
	$.newAspectEditor.fireEvent("confirm", {blob: blob});
}

function onHomeIconItemSelected() {
	$.newAspectEditor.close();
}	