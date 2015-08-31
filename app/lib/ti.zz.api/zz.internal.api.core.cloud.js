//var zzGlobals = require('ti.zz.api/zz.internal.globals');
var zzLocalDB = require('ti.zz.api/zz.internal.local.db');
var zzLocalFS = require('ti.zz.api/zz.internal.local.fs');
var zzCloud = require('ti.zz.api/zz.internal.cloud');

var zz = {
	Internal : {
		API : {
			Core : {			
				Cloud : {}
			}
		}
	}
};

zz.Internal.API.Core.Cloud.commitPostCloud = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud.syncPostCloud unable to perform sync due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud.syncPostCloud unable to perform sync due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var _syncPostsSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._syncPostsSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._syncPostsSuccessCallback [response : " + JSON.stringify(response) + "]");
		
		if (successCallback != null)
			successCallback(response);				
						
	};
	var _syncPostsErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._syncPostsErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._syncPostsErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	var _syncPostSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._syncPostSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._syncPostSuccessCallback [response : " + JSON.stringify(response) + "]");
		
		_syncPosts(user, response, _syncPostsSuccessCallback, _syncPostsErrorCallback);				
						
	};
	var _syncPostErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._syncPostErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._syncPostErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	var _uploadPostSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._uploadPostSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._uploadPostSuccessCallback [response : " + JSON.stringify(response) + "]");
		
		_syncPost(user, post, response, _syncPostSuccessCallback, _syncPostErrorCallback);										
	};
	var _uploadPostErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._uploadPostErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._uploadPostErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};
	
	var _preparePostSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._preparePostSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._preparePostSuccessCallback [response : " + JSON.stringify(response) + "]");
		
		_uploadPost(user, response, _uploadPostSuccessCallback, _uploadPostErrorCallback);
	};
	var _preparePostErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._preparePostErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._preparePostErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};		
	
	var _uploadAttachmentsSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._uploadAttachmentsSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._uploadAttachmentsSuccessCallback [response : " + JSON.stringify(response) + "]");
		
		_preparePost(user, post, _preparePostSuccessCallback, _preparePostErrorCallback);									
	};
	var _uploadAttachmentsErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._uploadAttachmentsErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._uploadAttachmentsErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	var _lockPostSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._lockPostSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._lockPostSuccessCallback [response : " + JSON.stringify(response) + "]");
		
		_uploadAttachments(user, response, _uploadAttachmentsSuccessCallback, _uploadAttachmentsErrorCallback);									
	};
	var _lockPostErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._lockPostErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud.commitPostCloud._lockPostErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	_lockPost(user, post, _lockPostSuccessCallback, _lockPostErrorCallback);	
};

exports.ZZ = zz;
exports.version = 0.2;

var _manageError = function(error, errorCallback) {
	Ti.API.trace("ZZ.Internal.API.Core.Cloud._manageError");
	
	Ti.API.error(error.errorMessage);
	
	if (errorCallback != null)
		errorCallback(error);	
};

var _lockPost = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._lockPost");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._lockPost unable to perform lock due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._lockPost unable to perform lock due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, post.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Cloud._lockPost POST NOT STORED LOCALLY unable to perform lock [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}		
		
	var storedPost = JSON.parse(storedDataPost.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._lockPost [post : " + JSON.stringify(storedPost) + "]");
		
	var datas = [];
		
	storedDataPost.action = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.ON_SYNC;	
	datas.push(storedDataPost);
			
	var storedDataAspects = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef(user.id, post.id);
	if (storedDataAspects != null && storedDataAspects.length > 0) {
			
		_.each(storedDataAspects, function(storedDataAspect) {	
														
			var storedAspect = JSON.parse(storedDataAspect.serialized_data);					
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._lockPost [aspect : " + JSON.stringify(storedAspect) + "]");
			
			storedDataAspect.action = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.ON_SYNC;
			datas.push(storedDataAspect);	
			
			var storedDataFile = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef(user.id, storedDataAspect.id, null, null);
			if (storedDataFile != null) {		
				storedDataFile.action = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.ON_SYNC;		
				datas.push(storedDataFile);		
			}			
		});
		
	}		

	datas = zzLocalDB.ZZ.Internal.Local.DB.Datas.update(datas);	
	if (datas == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._lockPost unable to perform update [post : " + JSON.stringify(storedPost) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._lockPost locked post [post : " + JSON.stringify(storedPost) + "]");
		
	storedPost.id = (
		storedDataPost.remote_data_ref != null ?
		storedDataPost.remote_data_ref :
		storedDataPost.id
	);
		
	if (successCallback != null)
		successCallback(storedPost);	
};

var _uploadAttachments = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachments unable to perform upload due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachments unable to perform upload due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, post.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachments POST NOT STORED LOCALLY unable to perform sync [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}		
				
	var storedPost = JSON.parse(storedDataPost.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments [post (stored) : " + JSON.stringify(storedPost) + "]");	
	
	var storedDataAspects = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef(user.id, post.id);
	if (storedDataAspects == null || storedDataAspects.length == 0) {			
		
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments NO attachments to upload");
			
		if (successCallback != null)
			successCallback(storedPost);	
			
		return;	
	}	
	
	var calls = 0;
	_.each(storedDataAspects, function(storedDataAspect) {
		
		var _syncAttachmentSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments._syncAttachmentSuccessCallback success [response : " + JSON.stringify(response) + "]");								
			
			calls++;			
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments._syncAttachmentSuccessCallback [calls : " + calls + ", storedDataAspects.length : " + storedDataAspects.length + "]");
			
			if (calls == storedDataAspects.length && successCallback != null)
				successCallback();
				
		};		
		var _syncAttachmentErrorCallback = function(error){
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments._syncAttachmentErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments._syncAttachmentErrorCallback [error : " + JSON.stringify(error) + "]");
			
			calls++;
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments._syncAttachmentErrorCallback [calls : " + calls + ", storedDataAspects.length : " + storedDataAspects.length + "]");
						
			_manageError({errorMessage : error}, errorCallback);	
		};				
		
		var storedAspect = JSON.parse(storedDataAspect.serialized_data);
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachments [aspect (stored) : " + JSON.stringify(storedAspect) + "]");	
		
		_uploadAttachment(user, {id : storedDataAspect.id}, _syncAttachmentSuccessCallback, _syncAttachmentErrorCallback);				
	});	
};

var _uploadAttachment = function(user, aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachment");
	
	var online = zzGlobals.ZZ.Internal.Globals.isOnline();
	if (!online) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachment unable to perform upload due to NO connection available";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (user == null || user.id == null || user.token == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachment unable to perform upload due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}

	if (aspect == null || aspect.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachment unable to perform upload due to NULL aspect";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}

	var storedDataAspect = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, aspect.id, null, null);
	if (storedDataAspect == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachment ASPECT NOT STORED LOCALLY unable to perform upload [aspect : " + JSON.stringify(aspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}

	var storedDataFile = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef(user.id, aspect.id);
	if (storedDataFile == null) {		
		//var errorMessage = "ZZ.Internal.API.Core.Cloud._syncAttachment FILE NOT STORED LOCALLY unable to perform sync [aspect : " + JSON.stringify(aspect) + "]";
		//_manageError({errorMessage : errorMessage}, errorCallback);		
		
		if (successCallback != null)
			successCallback();
		
		return;			
	}
	
	var blob = zzLocalFS.ZZ.Internal.Local.FS.File.read(storedDataFile.local_fs_ref);
	if (blob == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachment unable to perform upload due to NULL blob";
		_manageError({errorMessage : errorMessage}, errorCallback);
		
		return;	
	}	
	
	var _uploadSuccessCallback = function(response){
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachment._uploadSuccessCallback success [response : " + JSON.stringify(response) + "]");			
					
		storedDataFile.status = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED;
		storedDataFile.remote_data_ref = response.id;
		
		var storedAspect = JSON.parse(storedDataAspect.serialized_data);	
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachment._uploadSuccessCallback [aspect (stored) : " + JSON.stringify(storedAspect) + "]");
												
		storedAspect.data.id = null;
		storedAspect.data.content = {local : response.id};
		
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachment._uploadSuccessCallback [aspect (merged) : " + JSON.stringify(storedAspect) + "]");
		
		storedDataAspect.serialized_data = JSON.stringify(storedAspect);		
		
		var datas = zzLocalDB.ZZ.Internal.Local.DB.Datas.update([storedDataAspect, storedDataFile]);	
		if (datas == null) {
			var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadAttachment._uploadSuccessCallback unable to perform sync";
			_manageError({errorMessage : errorMessage}, errorCallback);	
				
			return;						
		}						
			
		if (successCallback != null)
			successCallback(storedAspect);
			
	};		
	var _uploadErrorCallback = function(error){
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachment._uploadErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadAttachment._uploadErrorCallback [error : " + JSON.stringify(error) + "]");
	
		_manageError({errorMessage : error}, errorCallback);	
	};		
	
	zzCloud.ZZ.Internal.Cloud.Files.Attachment.upload({token : user.token}, blob, _uploadSuccessCallback, _uploadErrorCallback);
	
};

var _preparePost = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._preparePost");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._preparePost unable to perform compose due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
		
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._preparePost unable to perform compose due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, post.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Cloud._preparePost POST NOT STORED LOCALLY unable to perform compose [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}		
			
	var storedDataAspects = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef(user.id, post.id);
	if ( (storedDataAspects == null || storedDataAspects.length == 0) && storedDataPost.status == zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.SYNC) {			
		var errorMessage = "ZZ.Internal.API.Core.Cloud._preparePost POST already synchronized [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;	
	}		
			
	var storedPost = JSON.parse(storedDataPost.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._preparePost [post (stored) : " + JSON.stringify(storedPost) + "]");
		
	storedPost.id = storedDataPost.remote_data_ref;
	storedPost.aspects = [];			
	
	if (storedDataAspects != null && storedDataAspects.length > 0) {
							
		_.each(storedDataAspects, function(storedDataAspect) {	
					
			if (storedDataAspect.status == zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.DELETED)	
				return;
											
			var storedAspect = JSON.parse(storedDataAspect.serialized_data);					
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._preparePost [aspect (stored) : " + JSON.stringify(storedAspect) + "]");
					
			storedAspect.id = storedDataAspect.remote_data_ref;	
			storedPost.aspects.push(storedAspect);			
		});
		
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._preparePost [post (merged) : " + JSON.stringify(storedPost) + "]");
	}		
			
	storedDataPost.serialized_data = JSON.stringify(storedPost);
	storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.update(storedDataPost);	
	if (storedDataPost == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._preparePost unable to perform update [post : " + JSON.stringify(storedPost) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._preparePost updated post [post : " + JSON.stringify(storedPost) + "]");
		
	storedPost.id = (
		storedDataPost.remote_data_ref != null ?
		storedDataPost.remote_data_ref :
		storedDataPost.id
	);		
		
	if (successCallback != null)
		successCallback(storedPost);	

};

var _uploadPost = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadPost");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadPost unable to perform upload due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
		
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadPost unable to perform upload due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, post.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Cloud._uploadPost POST NOT STORED LOCALLY unable to perform upload [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var storedPost = JSON.parse(storedDataPost.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadPost [post (stored) : " + JSON.stringify(storedPost) + "]");	
	
	if (storedDataPost.status == zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.NEW) {
		
		var _createSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadPost._createSuccessCallback");
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadPost._createSuccessCallback [response : " + JSON.stringify(response) + "]");
										
			if (successCallback != null)
				successCallback(response);		
					
		};
		var _createErrorCallback = function(error) {
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadPost._createErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Core.Cloud._uploadPost._createErrorCallback [error : " + JSON.stringify(error) + "]");
	
			_manageError({errorMessage : error}, errorCallback);		
		};		
		
		zzCloud.ZZ.Internal.Cloud.Core.Posts.Post.create(user, storedPost, _createSuccessCallback, _createErrorCallback);
		
	} else if (storedDataPost.status == zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.UPDATED) {
		
	} else {
		Ti.API.debug("ZZ.Sync.syncPost._sync unable to perform upload due to NOT managed status : " + storedData.status);
	}	
};

var _syncPost = function(user, localPost, remotePost, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._syncPost");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost unable to perform sync due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
		
	if (localPost == null || localPost.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost unable to perform sync due to NULL localPost";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	if (remotePost == null || remotePost.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost unable to perform sync due to NULL remotePost";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}	
	
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, localPost.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost POST NOT STORED LOCALLY unable to perform sync [localPost : " + JSON.stringify(localPost) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var datas = [];
	datas.push(storedDataPost);
	
	var storedDataAspects = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef(user.id, localPost.id);	
	if (storedDataAspects != null && storedDataAspects > 0) {	
		datas = datas.concat(storedDataAspects);
	}
	
	if (remotePost.aspects != null && remotePost.aspects.length > 0) {			
				
		var canContinue = _.every(remotePost.aspects, function(aspect) {
			
			if (aspect.data != null && 
				aspect.data.content != null && 
				aspect.data.content.local != null) {
			
				var storedDataFile = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef(user.id, aspect.data.content.local);
				if (storedDataFile == null) {
					var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost FILE NOT STORED LOCALLY unable to perform sync [aspect : " + JSON.stringify(aspect) + "]";
					_manageError({errorMessage : errorMessage}, errorCallback);	
						
					return false;			
				}								
				
				var path = user.id + "/attachments-" + aspect.id; //user.id + "/attachments/" + aspect.id;	
				
				var mimeType = (aspect && aspect.data && aspect.data.format ? aspect.data.format.mimeType : null);           	              
			    if (mimeType && mimeType.length > 0) {
			    	var format = (mimeType.split("/")[1]).toLowerCase();     	
			    	if (format && format.length > 0) {
			    		path = path + "." + format;
			    	}
				}				
							
				var blob = zzLocalFS.ZZ.Internal.Local.FS.File.copy(storedDataFile.local_fs_ref, path);			
				if (blob == null) {
					var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost unable to copy attachment [aspect : " + JSON.stringify(aspect) + "]";
					_manageError({errorMessage : errorMessage}, errorCallback);	
						
					return false;
				}
				
				var done = zzLocalFS.ZZ.Internal.Local.FS.File.remove(storedDataFile.local_fs_ref);				
				if (!done) {
					var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost unable to delete attachment [aspect : " + JSON.stringify(aspect) + "]";
					_manageError({errorMessage : errorMessage}, errorCallback);	
						
					return false;
				}				
								
				storedDataFile.status = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED;
				storedDataFile.action = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE;
				storedDataFile.remote_data_ref = aspect.id;	
				storedDataFile.local_fs_ref = path;	
								
				storedDataFile = zzLocalDB.ZZ.Internal.Local.DB.Data.update(storedDataFile);				
				if (storedDataFile == null) {
					var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost FILE NOT STORED LOCALLY unable to perform sync [aspect : " + JSON.stringify(aspect) + "]";
					_manageError({errorMessage : errorMessage}, errorCallback);	
						
					return false;			
				}
								
				return true;				
			}
			
		});	
		
		Ti.API.debug("ZZ.Internal.API.Core.Cloud._syncPost [canContinue : " + canContinue + "]");
		if (!canContinue) {			
			return;
		}		
	}	
	
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._syncPost [datas : " + JSON.stringify(datas) + "]");
	var done = zzLocalDB.ZZ.Internal.Local.DB.Datas.remove(datas);	
	if (!done) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPost unable to perform sync";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}	
	
	if (successCallback != null)
		successCallback(remotePost);	
};

var _syncPosts = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._syncPosts");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPosts unable to perform sync due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
		
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPosts unable to perform sync due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var datas = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction(
		user.id,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.POSTS,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE		
	);

	var storedDataPosts = null;
	var posts = [];
	
	if (datas != null && datas.length > 0) {
		
		storedDataPosts = datas.pop();
		var cachedPosts = JSON.parse(storedDataPosts.serialized_data);

		posts = posts.concat(
			_.reject(cachedPosts, function(cachedPost) {		
				return cachedPost.id == post.id;
			})
		);
	}
	
	posts.push(post);
	
	if (storedDataPosts == null) {
		storedDataPosts = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
			type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
			alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.POSTS,
			status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
			action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
			serialized_data : JSON.stringify(posts),
			user_ref : user.id,
			local_data_ref : null,
			remote_data_ref : null,
			local_fs_ref : null
		});
		
	} else {
		storedDataPosts.serialized_data = JSON.stringify(posts);
		storedDataPosts = zzLocalDB.ZZ.Internal.Local.DB.Data.update(storedDataPosts);
	}
	
	if (storedDataPosts == null) {
		var errorMessage = "ZZ.Internal.API.Core.Cloud._syncPosts unable to perform sync [posts : " + JSON.stringify(posts) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Cloud._syncPosts updated [posts : " + JSON.stringify(posts) + "]");	
	
	if (successCallback != null)
		successCallback(posts);		
};
