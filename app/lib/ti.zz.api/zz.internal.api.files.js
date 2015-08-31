//var zzGlobals = require('ti.zz.api/zz.internal.globals');
var zzLocalDB = require('ti.zz.api/zz.internal.local.db');
var zzLocalFS = require('ti.zz.api/zz.internal.local.fs');
var zzCloud = require('ti.zz.api/zz.internal.cloud');

var zz = {
	Internal : {
		API : {
			Files : {
				Attachment : {},
				Links: {}			
			}
		}
	}
};

zz.Internal.API.Files.Attachment.get = function(aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Files.Attachment.get");
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null) {
		var errorMessage = "ZZ.Internal.API.Files.Attachment.get unable to perform get due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;		
	}
	
	if (aspect == null || aspect.id == null) {
		var errorMessage = "ZZ.Internal.API.Files.Attachment.get unable to perform get due to NULL aspect";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;
	}
	
	var storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndDataRef(user.id, aspect.id);
	if (storedData != null) {
		
		var blob = zzLocalFS.ZZ.Internal.Local.FS.File.read(storedData.local_fs_ref);		
		Ti.API.debug("ZZ.Internal.API.Files.Attachment.get [blob.file : " + JSON.stringify(blob.file) + "]");
		
		if (blob != null && successCallback != null) {
			successCallback(blob);			
			return;
		}
		
	}
		
	var _downloadSuccessCallback = function(response){
		Ti.API.debug("ZZ.Internal.API.Files.Attachment.get._downloadSuccessCallback success [response : " + JSON.stringify(response) + "]");
		
		//var path = user.id + "/" + aspect.id + "-" + new Date().getTime();
		var path = user.id + "/attachments-" + aspect.id; //user.id + "/attachments/" + aspect.id;
		
		var mimeType = (aspect && aspect.data && aspect.data.format ? aspect.data.format.mimeType : null);           	              
	    if (mimeType && mimeType.length > 0) {
	    	var format = (mimeType.split("/")[1]).toLowerCase();     	
	    	if (format && format.length > 0) {
	    		path = path + "." + format;
	    	}
		}		
						
		var blob = zzLocalFS.ZZ.Internal.Local.FS.File.write(path, response);	
		Ti.API.debug("ZZ.Internal.API.Files.Attachment.get._downloadSuccessCallback [blob.file : " + JSON.stringify(blob.file) + "]");
		
		var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
			type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.FILE,
			alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.IMAGE,
			status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
			action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
			serialized_data : null,
			user_ref : user.id,
			local_data_ref : null,
			remote_data_ref : aspect.id,
			local_fs_ref : path
		});	
		Ti.API.debug("ZZ.Internal.API.Files.Attachment.get [data : " + JSON.stringify(data) + "]");		
			
		if (successCallback != null)
			successCallback(blob);
	};		
	var _downloadErrorCallback = function(error){
		Ti.API.debug("ZZ.Internal.API.Files.Attachment.get._downloadErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Files.Attachment.get._downloadErrorCallback [error : " + JSON.stringify(error) + "]");
	
		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	zzCloud.ZZ.Internal.Cloud.Files.Attachment.download({token : user.token}, {id : aspect.id}, _downloadSuccessCallback, _downloadErrorCallback);
		
};

zz.Internal.API.Files.Attachment.set = function(aspect, content, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Files.Attachment.set");		
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null || user.id  == null) {
		var errorMessage = "ZZ.Internal.API.Files.Attachment.set unable to perform set due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;		
	}
	
	if (aspect == null || aspect.id == null) {
		var errorMessage = "ZZ.Internal.API.Files.Attachment.set unable to perform set due to NULL aspect";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;		
	}
	
	var path = user.id + "/tmp-attachment-" + user.token + "-" + new Date().getTime(); //user.id + "/tmp/attachments/" + user.token + "-" + new Date().getTime();

	var mimeType = (aspect && aspect.data && aspect.data.format ? aspect.data.format.mimeType : null);           	              
    if (mimeType && mimeType.length > 0) {
    	var format = (mimeType.split("/")[1]).toLowerCase();     	
    	if (format && format.length > 0) {
    		path = path + "." + format;
    	}
	}
	
	var blob = zzLocalFS.ZZ.Internal.Local.FS.File.write(path, content);	
	Ti.API.debug("ZZ.Internal.API.Files.Attachment.set [blob.file : " + JSON.stringify(blob.file) + "]");
		
	var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
		type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.FILE,
		alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.IMAGE,
		status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.NEW,
		action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.TO_COMMIT,
		serialized_data : null,
		user_ref : user.id,
		local_data_ref : aspect.id,
		remote_data_ref : null,
		local_fs_ref : path
	});	
	Ti.API.debug("ZZ.Internal.API.Files.Attachment.set [data : " + JSON.stringify(data) + "]");		
		
	if (successCallback != null)
		successCallback(blob);		
		
};

zz.Internal.API.Files.Links.metadata = function(url, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Files.Links.metadata");		
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();		
	if (url == null) {
		var errorMessage = "ZZ.Internal.API.Files.Links.metadata unable to perform metadata due to NULL url";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;		
	}
	
	var _metadataSuccessCallback = function(response){
		Ti.API.debug("ZZ.Internal.API.Files.Links.metadata._metadataSuccessCallback success [response : " + JSON.stringify(response) + "]");
					
		if (successCallback != null)
			successCallback(response);
	};		
	var _metadataErrorCallback = function(error){
		Ti.API.debug("ZZ.Internal.API.Files.Links.metadata._metadataErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Files.Links.metadata._metadataErrorCallback [error : " + JSON.stringify(error) + "]");
	
		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	zzCloud.ZZ.Internal.Cloud.Files.Links.metadata(url, _metadataSuccessCallback, _metadataErrorCallback);	
		
};

exports.ZZ = zz;
exports.version = 0.2;

var _manageError = function(error, errorCallback) {
	Ti.API.trace("ZZ.Internal.API.Files._manageError");
	
	Ti.API.error(error.errorMessage);
	
	if (errorCallback != null)
		errorCallback(error);	
};