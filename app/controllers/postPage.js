var args = arguments[0] || {};

var model = args.model;
var navigationWindow = args.navigationWindow;

$.postViewerWidget.init({
	model: model //new Backbone.Model({})
});

var aspects = model.get("aspects");

/*
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
*/

function onItemSelected(args) {
	var model = new Backbone.Model(args);
	
	var sortedAspects = _.sortBy(aspects, function(item){
		if (item.kind.code == "EVENTDATATYPE_CODE") {
			return 1;
		} else if (item.kind.code == "CASHFLOWDATATYPE_CODE") {
			return 2;
		} else if (item.kind.code == "FILEDOCUMENTDATATYPE_CODE") {
			return 3;
		} else if (item.kind.code == "FILELINKDATATYPE_CODE") {
			return 4;
		} else if (item.kind.code == "NOTEDATATYPE_CODE") {
			return 5;
		} else {
			return -1;
		}
	}); 
	
    var aspectsPager = Alloy.createController("aspectsPager", {
    	model: model,
    	collection: new Backbone.Collection(sortedAspects)   	
    }).getView();
	
	if (OS_IOS) {
		navigationWindow.openWindow(aspectsPager);
	}
	if (OS_ANDROID) {
		aspectsPager.open();
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