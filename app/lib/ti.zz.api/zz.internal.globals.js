var zz = {
	Internal : {
		Globals : {
		}
	}
};

var currentUser = null;
var currentPost = null;
var currentAspect = null;

zz.Internal.Globals.isOnline = function() {
	Ti.API.trace("ZZ.Internal.Globals.isOnline");	
	Ti.API.trace("ZZ.Internal.Globals.isOnline " + (Ti.Network.online ? "ONLINE" : "OFFLINE") + " [Ti.Network.networkTypeName : " + Ti.Network.networkTypeName + "]");
	
	return Ti.Network.online;
};

zz.Internal.Globals.setCurrentUser = function(user) {
	Ti.API.trace("ZZ.Internal.Globals.setCurrentUser");
	
	currentUser = user;
	Ti.API.trace("ZZ.Internal.Globals.setCurrentUser [currentUser : " + JSON.stringify(currentUser) + "]");
};

zz.Internal.Globals.getCurrentUser = function() {
	Ti.API.trace("ZZ.Internal.Globals.getCurrentUser");
	
	Ti.API.trace("ZZ.Internal.Globals.getCurrentUser [currentUser : " + JSON.stringify(currentUser) + "]");
	return currentUser;
};

zz.Internal.Globals.setCurrentPost = function(post) {
	Ti.API.trace("ZZ.Internal.Globals.setCurrentPost");
	
	currentPost = post;
	Ti.API.trace("ZZ.Internal.Globals.setCurrentPost [currentPost : " + JSON.stringify(currentPost) + "]");
};

zz.Internal.Globals.getCurrentPost = function() {
	Ti.API.trace("ZZ.Internal.Globals.getCurrentPost");
	
	Ti.API.trace("ZZ.Internal.Globals.getCurrentPost [currentPost : " + JSON.stringify(currentPost) + "]");
	return currentPost;
};

zz.Internal.Globals.setCurrentAspect = function(aspect) {
	Ti.API.trace("ZZ.Internal.Globals.setCurrentAspect");
	
	currentAspect = aspect;
	Ti.API.trace("ZZ.Internal.Globals.setCurrentAspect [currentAspect : " + JSON.stringify(currentAspect) + "]");
};

zz.Internal.Globals.getCurrentAspect = function() {
	Ti.API.trace("ZZ.Internal.Globals.getCurrentAspect");
	
	Ti.API.trace("ZZ.Internal.Globals.getCurrentAspect [currentAspect : " + JSON.stringify(currentAspect) + "]");
	return currentAspect;
};

exports.ZZ = zz;
exports.version = 0.2;