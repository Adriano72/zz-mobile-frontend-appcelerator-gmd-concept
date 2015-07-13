exports.open = function() {
	$.bottomSheet.open();
};

exports.close = function() {
	$.bottomSheet.close();
};

exports.add = function(view) {
	$.container.add(view);
};

exports.remove = function(view) {
	$.container.remove(view);
};
