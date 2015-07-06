var args = arguments[0] || {};

var model = args.model;
var navigationWindow = args.navigationWindow;

$.postViewerWidget.init({
	model: model //new Backbone.Model({})
});

var aspects = model.get("aspects");

function onItemSelected(args) {
	var model = new Backbone.Model(args);
	
    var aspectViewer = Alloy.createController("aspectViewer", {
    	model: model,    	
    }).getView();
	
	if (OS_IOS) {
		navigationWindow.openWindow(aspectViewer);
	}
	if (OS_ANDROID) {
		aspectViewer.open();
	}	
};

$.eventsListWidget.init({
	collection: new Backbone.Collection( _.filter(aspects, function(item){
		return item.kind.code == "EVENTDATATYPE_CODE";
	}) )
});
$.eventsListWidget.on("itemSelected", onItemSelected);

$.cashflowsListWidget.init({
	collection: new Backbone.Collection(_.filter(aspects, function(item){
		return item.kind.code == "CASHFLOWDATATYPE_CODE";
	}))
});
$.cashflowsListWidget.on("itemSelected", onItemSelected);

$.documentsListWidget.init({
	collection: new Backbone.Collection(_.filter(aspects, function(item){
		return item.kind.code == "FILEDOCUMENTDATATYPE_CODE";
	}))
});
$.documentsListWidget.on("itemSelected", onItemSelected);

$.linksListWidget.init({
	collection: new Backbone.Collection(_.filter(aspects, function(item){
		return item.kind.code == "FILELINKDATATYPE_CODE";
	}))
});
$.linksListWidget.on("itemSelected", onItemSelected);

$.notesListWidget.init({
	collection: new Backbone.Collection(_.filter(aspects, function(item){
		return item.kind.code == "NOTEDATATYPE_CODE";
	}))
});
$.notesListWidget.on("itemSelected", onItemSelected);

function onHomeIconItemSelected() {
	$.postViewer.close();
}