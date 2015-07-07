
exports.colorMap = [];
[

	["document", "blue"],	
	["doc", "blue"],
	["pdf", "red"],
	["xls", "green"],
	["ppt", "brown"],
	["image", "green"],
	["png", "green"],
	["jpg", "brown"],
	["jpeg", "brown"],
	["gif", "green"]

].forEach(function (e) {
    exports.colorMap[e[0]] = e[1];
});

exports.iconMap = [];
[
	["document", "file-text-o"],	
	["doc", "file-word-o"],
	["pdf", "file-pdf-o"],
	["xls", "file-excel-o"],
	["ppt", "file-powerpoint-o"],
	["image", "file-image-o"],
	["png", "file-image-o"],
	["jpg", "file-image-o"],
	["jpeg", "file-image-o"],
	["gif", "file-image-o"]

].forEach(function (e) {
    exports.iconMap[e[0]] = e[1];
});