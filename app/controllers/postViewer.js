$.postViewerWidget.init({
	model: new Backbone.Model({})
});

$.eventsListWidget.init({
	collection: new Backbone.Collection([{}, {}])
});

$.cashflowsListWidget.init({
	collection: new Backbone.Collection([{}, {}, {}])
});

$.documentsListWidget.init({
	collection: new Backbone.Collection([{}, {}, {}, {}])
});

$.linksListWidget.init({
	collection: new Backbone.Collection([{}, {}])
});

$.notesListWidget.init({
	collection: new Backbone.Collection([{}])
});

function onHomeIconItemSelected() {
	$.postViewer.close();
}