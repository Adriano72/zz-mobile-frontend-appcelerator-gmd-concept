(function constructor(args) {	
	
	var model = args.model;
	var collection = args.collection;
						
	collection.forEach(function(item){		
	    var aspectPage = Alloy.createController("aspectPage", {
	    	model: item
	    }).getView();		
		
		$.scrollableView.addView(aspectPage);
	});	
	
	var index = collection.indexOf( collection.get(model.get("id")) );
	$.scrollableView.setCurrentPage(index);
		
})(arguments[0] || {});

function onHomeIconItemSelected() {
	$.aspectsPager.close();
}