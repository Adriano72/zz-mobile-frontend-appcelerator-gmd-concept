
exports.colorMap = [];
[
	["01", "red"],
	["03", "blue-grey"],
	["04", "purple"],
	["05", "deep-purple"],
	["06", "indigo"],
	["07", "blue"],
	["08", "light-blue"],
	["09", "cyan"],
	["10", "teal"],
	["11", "green"],
	["12", "light-green"],
	["13", "lime"],
	["14", "yellow"],
	["15", "amber"],
	["16", "orange"],
	["17", "deep-orange"],
	["18", "brown"]
	//["", "grey"],
	//["", "pink"]

].forEach(function (e) {
    exports.colorMap[e[0]] = e[1];
});

exports.iconMap = [];
[
	["01", "money"],
	["03", "briefcase"],
	["04", "home"],
	["05", "car"],
	["06", "plug"],
	["07", "stethoscope"],
	["08", "users"],
	["09", "glass"],
	["10", "question-circle"],
	["11", "camera"],
	["12", "graduation-cap"],
	["13", "user"],
	["14", "university"],
	["15", "money"],
	["16", "asterisk"],
	["17", "plane"],
	["18", "car"]

].forEach(function (e) {
    exports.iconMap[e[0]] = e[1];
});