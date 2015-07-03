var args = arguments[0] || {};

var model = args.model;

$.postViewerWidget.init({
	model: model //new Backbone.Model({})
});

var aspects = model.get("aspects");

$.eventsListWidget.init({
	collection: new Backbone.Collection( _.filter(aspects, function(item){
		return item.kind.code == "EVENTDATATYPE_CODE";
	}) )
});

$.cashflowsListWidget.init({
	collection: new Backbone.Collection(_.filter(aspects, function(item){
		return item.kind.code == "CASHFLOWDATATYPE_CODE";
	}))
});

$.documentsListWidget.init({
	collection: new Backbone.Collection(_.filter(aspects, function(item){
		return item.kind.code == "FILEDOCUMENTDATATYPE_CODE";
	}))
});

$.linksListWidget.init({
	collection: new Backbone.Collection(_.filter(aspects, function(item){
		return item.kind.code == "FILELINKDATATYPE_CODE";
	}))
});

$.notesListWidget.init({
	collection: new Backbone.Collection(_.filter(aspects, function(item){
		return item.kind.code == "NOTEDATATYPE_CODE";
	}))
});

function onHomeIconItemSelected() {
	$.postViewer.close();
}