//var zzGlobals = require('ti.zz.api/zz.internal.globals');
var zzLocalDB = require('ti.zz.api/zz.internal.local.db');

var zz = {
	Internal : {
		API : {
			Core : {			
				Local : {}			
			}
		}
	}
};

zz.Internal.API.Core.Local.addNewPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.addNewPostLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewPostLocal unable to perform add due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewPostLocal unable to perform add due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
		type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.MODEL,
		alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.POST,
		status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.NEW,
		action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.TO_COMMIT,
		serialized_data : JSON.stringify(post),
		user_ref : user.id,
		local_data_ref : null,
		remote_data_ref : null,
		local_fs_ref : null
	});		

	if (data == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewPostLocal unable to perform add [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;				
	}
	Ti.API.debug("ZZ.Internal.API.Core.Local.addNewPostLocal [post : " + JSON.stringify(post) + "]");
	
	post.id = data.id;	
	
	data.serialized_data = JSON.stringify(post);	
	data = zzLocalDB.ZZ.Internal.Local.DB.Data.update(data);
	
	if (data == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewPostLocal unable to perform update [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;				
	}
	Ti.API.debug("ZZ.Internal.API.Core.Local.addNewPostLocal [post : " + JSON.stringify(post) + "]");
	
	if (successCallback != null)
		successCallback(post);	
};

zz.Internal.API.Core.Local.addExistingPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.addExistingPostLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addExistingPostLocal unable to perform add due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addExistingPostLocal unable to perform add due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
		type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.MODEL,
		alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.POST,
		status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.SYNC,
		action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.TO_COMMIT,
		serialized_data : JSON.stringify(post),
		user_ref : user.id,
		local_data_ref : null,
		remote_data_ref : post.id,
		local_fs_ref : null
	});		

	if (data == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addExistingPostLocal unable to perform add [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;				
	}
	Ti.API.debug("ZZ.Internal.API.Core.Local.addNewPostLocalpost [post : " + JSON.stringify(post) + "]");		
	
	if (successCallback != null)
		successCallback(post);	
};

zz.Internal.API.Core.Local.updateNewPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewPostLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewPostLocal unable to perform add due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewPostLocal unable to perform add due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndId(user.id, post.id);
	if (storedData == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewPostLocal POST NOT STORED LOCALLY unable to perform update [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var storedPost = JSON.parse(storedData.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewPostLocal [post (stored) : " + JSON.stringify(storedPost) + "]");
		
	storedPost = _.extend(storedPost, post);	
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewPostLocal [post (merged) : " + JSON.stringify(storedPost) + "]");	
		
	//storedPost.id = null;
	
	storedData.serialized_data = JSON.stringify(storedPost);
	
	storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.update(storedData);	
	if (storedData == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewPostLocal unable to perform update [post : " + JSON.stringify(storedPost) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewPostLocal updated [post : " + JSON.stringify(storedPost) + "]");	
		
	//storedPost.id = storedData.id;
			
	if (successCallback != null)
		successCallback(storedPost);	
};

zz.Internal.API.Core.Local.updateExistingPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateExistingPostLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingPostLocal unable to perform add due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingPostLocal unable to perform add due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef(user.id, post.id);
	if (storedData == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingPostLocal POST NOT STORED LOCALLY unable to perform update [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var storedPost = JSON.parse(storedData.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateExistingPostLocal [post (stored) : " + JSON.stringify(storedPost) + "]");
		
	storedPost = _.extend(storedPost, post);	
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateExistingPostLocal [post (merged) : " + JSON.stringify(storedPost) + "]");	
		
	storedData.serialized_data = JSON.stringify(storedPost);
	storedData.status = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.UPDATED;
	
	storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.update(storedData);	
	if (storedData == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingPostLocal unable to perform update [post : " + JSON.stringify(storedPost) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateExistingPostLocal updated [post : " + JSON.stringify(storedPost) + "]");	
	
	if (successCallback != null)
		successCallback(storedPost);
};

zz.Internal.API.Core.Local.addNewAspectLocal = function(user, post, aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.addNewAspectLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewAspectLocal unable to perform add due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewAspectLocal unable to perform add due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	if (aspect == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewAspectLocal unable to perform add due to NULL aspect";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
		type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.MODEL,
		alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.ASPECT,
		status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.NEW,
		action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.TO_COMMIT,
		serialized_data : JSON.stringify(aspect),
		user_ref : user.id,
		local_data_ref : post.id,
		remote_data_ref : null,
		local_fs_ref : null
	});		

	if (data == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewAspectLocal unable to perform add [aspect : " + JSON.stringify(aspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;					
	}
	Ti.API.debug("ZZ.Internal.API.Core.Local.addNewAspectLocal [aspect : " + JSON.stringify(aspect) + "]");
	
	aspect.id = data.id;	
	
	data.serialized_data = JSON.stringify(aspect);	
	data = zzLocalDB.ZZ.Internal.Local.DB.Data.update(data);
	
	if (data == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.addNewAspectLocal unable to perform update [aspect : " + JSON.stringify(aspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;				
	}
	Ti.API.debug("ZZ.Internal.API.Core.Local.addNewAspectLocal [aspect : " + JSON.stringify(aspect) + "]");	
	
	var _updatePostAspectsSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Local.addNewPostLocalpost._updatePostAspectsSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Local.addNewPostLocalpost._updatePostAspectsSuccessCallback [response : " + JSON.stringify(response) + "]");
			
		if (successCallback != null)
			successCallback(aspect);				
									
	};
	var _updatePostAspectsErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Local.addNewPostLocalpost._updatePostAspectsErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Local.addNewPostLocalpost._updatePostAspectsErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	_updatePostAspects(user, post, [aspect], null, null, _updatePostAspectsSuccessCallback, _updatePostAspectsErrorCallback);
};

zz.Internal.API.Core.Local.updateNewAspectLocal = function(user, post, aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewAspectLocal unable to perform add due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewAspectLocal unable to perform add due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	if (aspect == null || aspect.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewAspectLocal unable to perform add due to NULL aspect";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
		
	var storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndId(user.id, aspect.id);
	if (storedData == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewAspectLocal ASPECT NOT STORED LOCALLY unable to perform update [aspect : " + JSON.stringify(aspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var storedAspect = JSON.parse(storedData.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal [aspect (stored) : " + JSON.stringify(storedAspect) + "]");
		
	storedAspect = _.extend(storedAspect, aspect);	
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal [aspect (merged) : " + JSON.stringify(storedAspect) + "]");				
	
	//storedAspect.id = null;
	
	storedData.serialized_data = JSON.stringify(storedAspect);
	
	var storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.update(storedData);	
	if (storedData == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateNewAspectLocal unable to perform update [aspect : " + JSON.stringify(storedAspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal updated [aspect : " + JSON.stringify(storedAspect) + "]");	
	
	//storedAspect.id = storedData.id;
	
	var _updatePostAspectsSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal._updatePostAspectsSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal._updatePostAspectsSuccessCallback [response : " + JSON.stringify(response) + "]");
			
		if (successCallback != null)
			successCallback(storedAspect);				
									
	};
	var _updatePostAspectsErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal._updatePostAspectsErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal._updatePostAspectsErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	_updatePostAspects(user, post, null, [storedAspect], null, _updatePostAspectsSuccessCallback, _updatePostAspectsErrorCallback);		
};

zz.Internal.API.Core.Local.updateExistingAspectLocal = function(user, post, aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateExistingAspectLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingAspectLocal unable to perform add due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingAspectLocal unable to perform add due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	if (aspect == null || aspect.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingAspectLocal unable to perform add due to NULL aspect";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}	
	
	var storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef(user.id, aspect.id);
	if (storedData == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingAspectLocal ASPECT NOT STORED LOCALLY unable to perform update [aspect : " + JSON.stringify(aspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var storedAspect = JSON.parse(storedData.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateExistingAspectLocal [aspect (stored) : " + JSON.stringify(storedAspect) + "]");
		
	storedAspect = _.extend(storedAspect, aspect);	
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateExistingAspectLocal [aspect (merged) : " + JSON.stringify(storedAspect) + "]");	
		
	storedData.serialized_data = JSON.stringify(storedAspect);
	storedData.status = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.UPDATED;
	
	storedData = zzLocalDB.ZZ.Internal.Local.DB.Data.update(storedData);	
	if (storedData == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.updateExistingAspectLocal unable to perform update [aspect : " + JSON.stringify(storedAspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Local.updateExistingAspectLocal updated [aspect : " + JSON.stringify(storedPost) + "]");	
		
	var _updatePostAspectsSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal._updatePostAspectsSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal._updatePostAspectsSuccessCallback [response : " + JSON.stringify(response) + "]");
			
		if (successCallback != null)
			successCallback(storedAspect);				
									
	};
	var _updatePostAspectsErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal._updatePostAspectsErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Local.updateNewAspectLocal._updatePostAspectsErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	_updatePostAspects(user, post, null, [storedAspect], null, _updatePostAspectsSuccessCallback, _updatePostAspectsErrorCallback);			
};

zz.Internal.API.Core.Local.removeNewPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewPostLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewPostLocal unable to perform remove due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewPostLocal unable to perform remove due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}		
		
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, post.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewPostLocal POST NOT STORED LOCALLY unable to perform remove [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}		
		
	var datas = [];
	datas.push(storedDataPost);
	
	var storedDataAspects = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef(user.id, post.id);	
	if (storedDataAspects != null && storedDataAspects > 0) {	
		datas = datas.concat(storedDataAspects);
	}
	
	Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewPostLocal [datas : " + JSON.stringify(datas) + "]");
	var done = zzLocalDB.ZZ.Internal.Local.DB.Datas.remove(datas);	
	if (!done) {
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewPostLocal unable to perform remove";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}	
	
	if (successCallback != null)
		successCallback();	
};

zz.Internal.API.Core.Local.removeNewAspectLocal = function(user, post, aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewAspectLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewAspectLocal unable to perform remove due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewAspectLocal unable to perform remove due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	if (aspect == null || aspect.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewAspectLocal unable to perform remove due to NULL aspect";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var storedDataAspect = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, aspect.id);		
	if (storedDataAspect == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewAspectLocal unable to perform remove [aspect : " + JSON.stringify(aspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;					
	}
	Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewAspectLocal [aspect : " + JSON.stringify(aspect) + "]");	
	
	var done = zzLocalDB.ZZ.Internal.Local.DB.Data.remove(storedDataAspect);	
	if (!done) {
		var errorMessage = "ZZ.Internal.API.Core.Local.removeNewAspectLocal unable to perform remove";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}
	Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewAspectLocal [aspect : " + JSON.stringify(aspect) + "]");	
	
	var _updatePostAspectsSuccessCallback = function(response) {
		Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewAspectLocal._updatePostAspectsSuccessCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewAspectLocal._updatePostAspectsSuccessCallback [response : " + JSON.stringify(response) + "]");
			
		if (successCallback != null)
			successCallback();				
									
	};
	var _updatePostAspectsErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewAspectLocal._updatePostAspectsErrorCallback");
		Ti.API.debug("ZZ.Internal.API.Core.Local.removeNewAspectLocal._updatePostAspectsErrorCallback [error : " + JSON.stringify(error) + "]");

		_manageError({errorMessage : error}, errorCallback);	
	};	
	
	_updatePostAspects(user, post, null, null, [aspect], _updatePostAspectsSuccessCallback, _updatePostAspectsErrorCallback);
};

zz.Internal.API.Core.Local.removeExistingPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.removeExistingPostLocal");
	
	throw "Not yet implemented";
};

zz.Internal.API.Core.Local.removeExistingAspectLocal = function(user, post, aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.removeExistingAspectLocal");
	
	throw "Not yet implemented";
};

zz.Internal.API.Core.Local.getPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.getPostLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.getPostLocal unable to perform retrieve due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.getPostLocal unable to perform retrieve due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}		
		
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, post.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Local.getPostLocal POST NOT STORED LOCALLY unable to perform retrieve [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}		
		
	var storedPost = JSON.parse(storedDataPost.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Local.getPostLocal [post (stored) : " + JSON.stringify(storedPost) + "]");
	
	if (successCallback != null)
		successCallback(storedPost);	
};

zz.Internal.API.Core.Local.getAspectLocal = function(user, aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.getAspectLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.getAspectLocal unable to perform retrieve due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.getAspectLocal unable to perform retrieve due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	if (aspect == null || aspect.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.getAspectLocal unable to perform retrieve due to NULL aspect";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}
	
	var storedDataAspect = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, aspect.id);		
	if (storedDataAspect == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.getAspectLocal unable to perform retrieve [aspect : " + JSON.stringify(aspect) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;					
	}
	
	var storedAspect = JSON.parse(storedDataAspect.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Local.getPostLocal [aspect (stored) : " + JSON.stringify(storedAspect) + "]");
	
	if (successCallback != null)
		successCallback(storedAspect);	
};

zz.Internal.API.Core.Local.commitPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.commitPostLocal");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.commitPostLocal unable to perform commit due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
		
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.commitPostLocal unable to perform commit due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}
	
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, post.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Local.commitPostLocal POST NOT STORED LOCALLY unable to perform commit [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}		
		
	var storedPost = JSON.parse(storedDataPost.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Local.commitPostLocal [post : " + JSON.stringify(storedPost) + "]");
		
	var datas = [];
		
	storedDataPost.action = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.TO_SYNC;	
	datas.push(storedDataPost);
			
	var storedDataAspects = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef(user.id, post.id);
	if (storedDataAspects != null && storedDataAspects.length > 0) {
			
		_.each(storedDataAspects, function(storedDataAspect) {	
														
			var storedAspect = JSON.parse(storedDataAspect.serialized_data);					
			Ti.API.debug("ZZ.Internal.API.Core.Local.commitPostLocal [aspect : " + JSON.stringify(storedAspect) + "]");
			
			storedDataAspect.action = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.TO_SYNC;
			datas.push(storedDataAspect);	
			
			var storedDataFile = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef(user.id, storedDataAspect.id);
			if (storedDataFile != null) {		
				storedDataFile.action = zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.TO_SYNC;		
				datas.push(storedDataFile);		
			}			
		});
		
	}		

	datas = zzLocalDB.ZZ.Internal.Local.DB.Datas.update(datas);	
	if (datas == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local.commitPostLocal unable to perform update [post : " + JSON.stringify(storedPost) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Local.commitPostLocal committed post [post : " + JSON.stringify(storedPost) + "]");
		
	/*
	storedPost.id = (
		storedDataPost.remote_data_ref != null ?
		storedDataPost.remote_data_ref :
		storedDataPost.id
	);
	*/
	
	if (successCallback != null)
		successCallback(storedPost);
};

zz.Internal.API.Core.Local.rollbackPostLocal = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local.rollbackPostLocal");
	
	throw "Not yet implemented";
};

exports.ZZ = zz;
exports.version = 0.2;

var _manageError = function(error, errorCallback) {
	Ti.API.trace("ZZ.Internal.API.Core.Local._manageError");
	
	Ti.API.error(error.errorMessage);
	
	if (errorCallback != null)
		errorCallback(error);	
};

var _updatePostAspects = function(user, post, aspectsToAdd, aspectsToUpdate, aspectsToRemove, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Core.Local._updatePostAspects");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local._updatePostAspects unable to perform update due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;		
	}
	
	if (post == null || post.id == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local._updatePostAspects unable to perform update due to NULL post";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}	
	
	if ( (aspectsToAdd == null || aspectsToAdd.length == 0) && (aspectsToUpdate == null || aspectsToUpdate.length == 0) && (aspectsToRemove == null || aspectsToRemove.length == 0) ) {
		var errorMessage = "ZZ.Internal.API.Core.Local._updatePostAspects unable to perform update due to NULL to do";
		_manageError({errorMessage : errorMessage}, errorCallback);	

		return;			
	}	
		
	var storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef(user.id, post.id);
	if (storedDataPost == null) {		
		var errorMessage = "ZZ.Internal.API.Core.Local._updatePostAspects POST NOT STORED LOCALLY unable to perform update [post : " + JSON.stringify(post) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;			
	}		
		
	var storedPost = JSON.parse(storedDataPost.serialized_data);
	Ti.API.debug("ZZ.Internal.API.Core.Local._updatePostAspects [post (stored) : " + JSON.stringify(storedPost) + "]");	
		
	var storedAspects = (storedPost.aspects != null ? storedPost.aspects : []);
		
	if (aspectsToRemove != null && aspectsToRemove.length > 0) {
		
		storedAspects = _.reject(storedAspects, function(storedAspect) {		
			return _.find(aspectsToRemove, function(aspectToRemove) {
				return aspectToRemove.id == storedAspect.id;
			});
		});
		
	}
		
	if (aspectsToUpdate != null && aspectsToUpdate.length > 0) {
		
		storedAspects = _.reject(storedAspects, function(storedAspect) {		
			return _.find(aspectsToUpdate, function(aspectToUpdate) {
				return aspectToUpdate.id == storedAspect.id;
			});
		});		
		storedAspects = storedAspects.concat(aspectsToUpdate);
	}
		
	if (aspectsToAdd != null && aspectsToAdd.length > 0) {		
		storedAspects = storedAspects.concat(aspectsToAdd);
	}
	
	storedPost.aspects = storedAspects;
	Ti.API.debug("ZZ.Internal.API.Core.Local._updatePostAspects [post (merged) : " + JSON.stringify(storedPost) + "]");
	
	storedDataPost.serialized_data = JSON.stringify(storedPost);
	storedDataPost.status = (
		storedDataPost.status == zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.SYNC ? 
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.UPDATED : 
		storedDataPost.status
	);
	
	storedDataPost = zzLocalDB.ZZ.Internal.Local.DB.Data.update(storedDataPost);	
	if (storedDataPost == null) {
		var errorMessage = "ZZ.Internal.API.Core.Local._updatePostAspects unable to perform update [post : " + JSON.stringify(storedPost) + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return;						
	}			
	Ti.API.debug("ZZ.Internal.API.Core.Local._updatePostAspects updated [post : " + JSON.stringify(storedPost) + "]");	
	
	if (successCallback != null)
		successCallback(storedPost);	
};
