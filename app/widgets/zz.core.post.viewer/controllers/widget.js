var model = $.dataModel;
model.set({
	title: "This is the post title"
});
	
exports.init = function(args) {

	var object = args.model.toJSON();
	
	model.set({
		title: "This is the post title updated"
	});	
};