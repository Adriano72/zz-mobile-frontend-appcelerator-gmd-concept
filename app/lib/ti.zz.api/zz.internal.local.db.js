var zzConfig = require('ti.zz.api/zz.config');

var zz = {
	Internal : {
		Local : {
			DB : {
				Users : {},
				User : {},
				Datas : {},
				Data : {
					CONSTANTS : {
						TYPES : {
							COLLECTION : "COLLECTION",
							MODEL : "MODEL",
							FILE : "FILE"
						},
						ALIASES : {
							POSTS : "POSTS",
							POST : "POST",
							POSTTEMPLATES : "POSTTEMPLATES",
							ASPECTS : "ASPECTS",
							ASPECT : "ASPECT",
							CATEGORIES : "CATEGORIES",
							TAGS : "TAGS",
							STORIES : "STORIES",
							CASHSOURCES : "CASHSOURCES",
							PAYMENTMODES : "PAYMENTMODES",
							CASHFLOWSTATUSES : "CASHFLOWSTATUSES",
							PAYMENTTAKINGTOOLS : "PAYMENTTAKINGTOOLS",
							CASHFLOWTYPES : "CASHFLOWTYPES",
							CASHFLOWVARIABILITIES : "CASHFLOWVARIABILITIES",
							CASHFLOWCURRENCIES : "CASHFLOWCURRENCIES",						
							IMAGE : "IMAGE",
							VIDEO : "VIDEO",
							AUDIO : "AUDIO"
						},
						STATUSES : {
							SYNC : "SYNC",
							NEW : "NEW",
							UPDATED : "UPDATED",
							DELETED : "DELETED",
							CACHED : "CACHED"
						},
						ACTIONS : {
							NONE : "NONE",
							TO_COMMIT : "TO_COMMIT",
							TO_SYNC : "TO_SYNC",
							ON_SYNC : "ON_SYNC"
						}
					}				
				}			
			}	
		}
	}
};

zz.Internal.Local.DB.init = function() {
	Ti.API.debug("ZZ.Internal.Local.DB.init");
	
	//var db = Ti.Database.install(zzConfig.ZZ.Config.Local.DB.schema, zzConfig.ZZ.Config.Local.DB.name);
	//db.close();
	
	var db = Ti.Database.open(zzConfig.ZZ.Config.Local.DB.name);
	try {
		db.execute("BEGIN");		

		db.execute(
			"CREATE TABLE IF NOT EXISTS 'users' ('id' INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , 'username' TEXT NOT NULL  UNIQUE , 'password' TEXT NOT NULL , 'token' TEXT);"
		);
		db.execute(
			"CREATE TABLE IF NOT EXISTS 'datas' ('id' INTEGER PRIMARY KEY  NOT NULL ,'user_ref' INTEGER NOT NULL ,'type' TEXT NOT NULL ,'alias' TEXT NOT NULL ,'status' TEXT NOT NULL ,'action' TEXT NOT NULL ,'timestamp' DATETIME NOT NULL  DEFAULT (CURRENT_TIMESTAMP) ,'local_data_ref' INTEGER,'remote_data_ref' INTEGER, 'serialized_data' BLOB, 'local_fs_ref' TEXT);"
		);

		db.execute("COMMIT");	
		
		Ti.API.trace("ZZ.Internal.Local.DB.init init performed");
				
	} catch(ex) {
		Ti.API.error("ZZ.Internal.Local.DB.init unable to perform init due to " + ex);	
		
		db.execute("ROLLBACK");	
	} finally {
		db.close();
	}			
};

zz.Internal.Local.DB.Users.add = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Users.add");

	if (user == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Users.add unable to add user due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;
	}

	var id = _insert(
		"INSERT INTO users (username, password, token) VALUES (?,?,?)", 
		[user.username, user.password, user.token]
	);	
	Ti.API.debug("ZZ.Internal.Local.DB.Users.add [id : " + id + "]");
	
	if (id != null) {
		user.id = id;
		
		Ti.API.debug("ZZ.Internal.Local.DB.Users.add inserted user : " + JSON.stringify(user));
		
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Users.add unable to insert user : " + JSON.stringify(user);
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;	
	}	
	
	if (successCallback != null)
		successCallback(user);
	
	return user;
};

zz.Internal.Local.DB.Users.remove = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Users.remove");
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Users.remove unable to remove user due to NULL user";		
		_manageError({errorMessage : errorMessage}, errorCallback);
		
		//return;
		return null;		
	}
	
	var done = _delete(
		"DELETE FROM users WHERE id=?", 
		[user.id]
	);	
	if (done) {
		Ti.API.debug("ZZ.Internal.Local.DB.Users.remove deleted user : " + JSON.stringify(user));

	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Users.remove unable to delete user : " + JSON.stringify(user);
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;		
	}
	
	if (successCallback != null)
		successCallback();
};

zz.Internal.Local.DB.User.update = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.User.update");	
	
	if (user == null || user.id == null) {
		var errorMessage = "ZZ.Internal.Local.DB.User.update unable to update user due to NULL user";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;
	}
	
	var done = _update(
		"UPDATE users SET username=?, password=?, token=? WHERE id=?", 
		[user.username, user.password, user.token, user.id]
	);	
	if (done) {
		Ti.API.debug("ZZ.Internal.Local.DB.User.update updated user : " + JSON.stringify(user));

	} else {
		var errorMessage = "ZZ.Internal.Local.DB.User.update unable to update user : " + JSON.stringify(user);		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (successCallback != null)
		successCallback(user);	
	
	return user;
};

zz.Internal.Local.DB.User.get = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.User.get");	
	
	if (user == null && (user.id == null || user.username == null) ) {
		var errorMessage = "ZZ.Internal.Local.DB.User.get unable to get user due to NULL user";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;			
	}
	
	var objs = null;
	
	if (user.id != null) {
		objs = _select(
			"SELECT * FROM users WHERE id=?", 
			[user.id]
		);
	} else {
		objs = _select(
			"SELECT * FROM users WHERE username=?", 
			[user.username]
		);
	}
	
	Ti.API.debug("ZZ.Internal.Local.DB.User.get [objs : " + JSON.stringify(objs) + "]");
				
	if (objs != null && objs.length == 1) {
								
		user = objs.pop();
					
		Ti.API.debug("ZZ.Internal.Local.DB.User.get found user : " + JSON.stringify(user));	
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.User.get user NOT found : " + JSON.stringify(user);		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;			
	}									
	
	if (successCallback != null)
		successCallback(user);	
		
	return user;	
};

zz.Internal.Local.DB.Datas.add = function(data, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.add");
	
	if (data == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.add unable to add data due to NULL data";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;			
	}

	var serializedData = (data.serialized_data != null ? Ti.Utils.base64encode(data.serialized_data) : null);
	var id = _insert(
		"INSERT INTO datas (type, alias, status, action, serialized_data, user_ref, local_data_ref, remote_data_ref, local_fs_ref) VALUES (?,?,?,?,?,?,?,?, ?)", 
		[data.type, data.alias, data.status, data.action, serializedData, data.user_ref, data.local_data_ref, data.remote_data_ref, data.local_fs_ref]
	);	
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.add [id : " + id + "]");
	
	if (id != null) {
		data.id = id;
		
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.add inserted data : " + JSON.stringify(data));
		
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.add unable to insert data : " + JSON.stringify(data);		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (successCallback != null)
		successCallback(data);
			
	return data;		
};

zz.Internal.Local.DB.Datas.remove = function(data, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.remove");	
	
	if (data instanceof Array) {
		
		var datas = data;
		
		if (datas == null || datas.length == 0) {
			var errorMessage = "ZZ.Internal.Local.DB.Datas.remove unable to delete datas due to NULL datas";		
			_manageError({errorMessage : errorMessage}, errorCallback);	
				
			return false;		
		}	
		 
		var canRemove = _.all(datas, function(data) {
			return !(data == null || data.id == null);
		});	
		if (!canRemove) {
			var errorMessage = "ZZ.Internal.Local.DB.Datas.remove unable to delete datas due to some NULL data";		
			_manageError({errorMessage : errorMessage}, errorCallback);	
				
			return false;		
		}
		
		var params = [];
		_.each(datas, function(data) {			
			params.push([data.id]);
		});
		
		var done = _batchDelete(
			"DELETE FROM datas WHERE id=?",
			params
		);	
		if (done) {
			Ti.API.debug("ZZ.Internal.Local.DB.Datas.remove updated datas");

		} else {
			var errorMessage = "ZZ.Internal.Local.DB.Data.remove unable to delete datas";		
			_manageError({errorMessage : errorMessage}, errorCallback);	
				
			return false;		
		}		
		
		if (successCallback != null)
			successCallback();
		
		return true;
	}
	
	if (data == null || data.id == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.remove unable to remove data due to NULL data";		
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		return false;		
	}
	
	var done = _delete(
		"DELETE FROM datas WHERE id=?", 
		[data.id]
	);	
	if (done) {
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.remove deleted data : " + JSON.stringify(data));
		
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.remove unable to delete data : " + JSON.stringify(data);		
		_manageError({errorMessage : errorMessage}, errorCallback);	
		
		return false;								
	}
	
	if (successCallback != null)
		successCallback();
		
	return true;
};

zz.Internal.Local.DB.Datas.update = function(datas, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.update");	
	
	//if (datas == null || datas.length == 0) {
	if (datas == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.update unable to update datas due to NULL datas";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	 
	if (datas.length == 0) {
		if (successCallback != null)
			successCallback([]);	
		return [];		
	}	 
	 
	var canUpdate = _.all(datas, function(data) {
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.update [data : " + JSON.stringify(data) + "]");
		return !(data == null || data.id == null);
	});	
	
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.update [canUpdate : " + canUpdate+ "]");
	
	if (!canUpdate) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.update unable to update datas due to some NULL data";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var params = [];
	_.each(datas, function(data) {	
		var serializedData = (data.serialized_data != null ? Ti.Utils.base64encode(data.serialized_data) : null);		
		params.push([data.type, data.alias, data.status, data.action, serializedData, data.user_ref, data.local_data_ref, data.remote_data_ref, data.local_fs_ref, data.id]);
	});
	
	var done = _batchUpdate(
		"UPDATE datas SET type=?, alias=?, status=?, action=?, serialized_data=?, user_ref=?, local_data_ref=?, remote_data_ref=?, local_fs_ref=? WHERE id=?", 
		params
	);	
	if (done) {
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.update updated datas");

	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Data.update unable to update datas";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (successCallback != null)
		successCallback(datas);	
	
	return datas;	
};

zz.Internal.Local.DB.Datas.list = function(successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.list");	
	
};

zz.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef = function(userRef, localDataRef, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef");	
	
	if (userRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef unable to find datas due to NULL userRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (localDataRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef unable to find datas due to NULL localDataRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(
		"SELECT * FROM datas WHERE user_ref=? AND local_data_ref=?", 
		[userRef, localDataRef]
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef [datas : " + JSON.stringify(datas) + "]");
		
	if (datas != null && datas.length > 0) {
						
		_.each(datas, function(data){
			if (data.serialized_data) {
				data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
			}
		});					
				
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef found datas : " + JSON.stringify(datas));	
	} else {
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef datas NOT found");
		
		//var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndLocalDataRef datas NOT found";		
		//_manageError({errorMessage : errorMessage});			
			
		//return;
		return null;			
	}								
	
	if (successCallback != null)
		successCallback(datas);	
	
	return datas;

};

zz.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction = function(userRef, type, alias, status, action, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction");	
	
	if (userRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction unable to find datas due to NULL userRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	//if (type == null || alias == null || status == null || action == null) {
	if (type == null || alias == null || action == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction unable to find datas due to NULL type OR alias OR status OR action";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(
		/*
		"SELECT * FROM datas WHERE user_ref=? AND type=? AND alias=? AND status=? AND action=?", 
		[userRef, type, alias, status, action]
		*/		
		"SELECT * FROM datas WHERE user_ref=? AND type=? AND alias=? AND action=?", 
		[userRef, type, alias, action]		
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction [datas : " + JSON.stringify(datas) + "]");
		

	if (datas != null && datas.length > 0) {
						
		_.each(datas, function(data){
			if (data.serialized_data) {
				data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
			}			
		});					
				
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction found datas : " + JSON.stringify(datas));	
	} else {
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction datas NOT found");
		
		//var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction datas NOT found";		
		//_manageError({errorMessage : errorMessage});			
			
		//return;
		return null;			
	}								
	
	if (successCallback != null)
		successCallback(datas);	
	
	return datas;

};

zz.Internal.Local.DB.Datas.findByUserRefAndTypeAndAlias = function(userRef, type, alias, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAlias");	
	
	if (userRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAlias unable to find datas due to NULL userRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (type == null || alias == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAlias unable to find datas due to NULL type OR alias";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(	
		"SELECT * FROM datas WHERE user_ref=? AND type=? AND alias=?", 
		[userRef, type, alias]		
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAlias [datas : " + JSON.stringify(datas) + "]");
		

	if (datas != null && datas.length > 0) {
						
		_.each(datas, function(data){
			if (data.serialized_data) {
				data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
			}		
		});					
				
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAlias found datas : " + JSON.stringify(datas));	
	} else {
		Ti.API.debug("ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAlias datas NOT found");
		
		//var errorMessage = "ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction datas NOT found";		
		//_manageError({errorMessage : errorMessage});			
			
		//return;
		return null;			
	}								
	
	if (successCallback != null)
		successCallback(datas);	
	
	return datas;

};

zz.Internal.Local.DB.Data.update = function(data, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Data.update");	
	
	if (data == null || data.id == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.update unable to update data due to NULL data";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var serializedData = (data.serialized_data != null ? Ti.Utils.base64encode(data.serialized_data) : null);
	var done = _update(
		"UPDATE datas SET type=?, alias=?, status=?, action=?, serialized_data=?, user_ref=?, local_data_ref=?, remote_data_ref=?, local_fs_ref=? WHERE id=?", 
		[data.type, data.alias, data.status, data.action, serializedData, data.user_ref, data.local_data_ref, data.remote_data_ref, data.local_fs_ref, data.id]
	);	
	if (done) {
		Ti.API.debug("ZZ.Internal.Local.DB.Data.update updated data : " + JSON.stringify(data));

	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Data.update unable to update data : " + JSON.stringify(data);		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (successCallback != null)
		successCallback(data);	
	
	return data;	
};

zz.Internal.Local.DB.Data.get = function(data, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Data.get");	
	
	if (data == null || data.id == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.get unable to get data due to NULL data";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(
		"SELECT * FROM datas WHERE id=?", 
		[data.id]
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Data.get [datas : " + JSON.stringify(datas) + "]");
				
	if (datas != null && datas.length == 1) {
								
		data = datas.pop();
		//data.serialized_data = (data.serialized_data != null ? Ti.Utils.base64decode(data.serialized_data) : null);
		if (data.serialized_data) {
			data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
		}		
						
		Ti.API.debug("ZZ.Internal.Local.DB.Data.get found data : " + JSON.stringify(data));	
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Data.get data NOT found : " + JSON.stringify(data);		
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;			
	}									
	
	if (successCallback != null)
		successCallback(data);	
	
	return data;		
};

zz.Internal.Local.DB.Data.getByUserRefAndLocalDataRef = function(userRef, localDataRef, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef");	
	
	if (userRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef unable to find datas due to NULL userRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (localDataRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef unable to find datas due to NULL localDataRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(
		"SELECT * FROM datas WHERE user_ref=? AND local_data_ref=?", 
		[userRef, localDataRef]
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef [datas : " + JSON.stringify(datas) + "]");	
		
	var data = null;		
	if (datas != null && datas.length == 1) {
								
		data = datas.pop();
		//data.serialized_data = (data.serialized_data != null ? Ti.Utils.base64decode(data.serialized_data) : null);
		if (data.serialized_data) {
			data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
		}		
						
		Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef found data : " + JSON.stringify(data));	
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndLocalDataRef data NOT found [userRef : " + userRef + ", localDataRef : " + localDataRef + "]";		
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;			
	}									
	
	if (successCallback != null)
		successCallback(data);	
	
	return data;		
};

zz.Internal.Local.DB.Data.getByUserRefAndDataRef = function(userRef, dataRef, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndDataRef");	
	
	if (userRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndDataRef unable to find datas due to NULL userRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (dataRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndDataRef unable to find datas due to NULL dataRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(
		"SELECT * FROM datas WHERE user_ref=? AND (local_data_ref=? OR remote_data_ref=?)", 
		[userRef, dataRef, dataRef]
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndDataRef [datas : " + JSON.stringify(datas) + "]");	
		
	var data = null;		
	if (datas != null && datas.length == 1) {
								
		data = datas.pop();
		//data.serialized_data = (data.serialized_data != null ? Ti.Utils.base64decode(data.serialized_data) : null);
		if (data.serialized_data) {
			data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
		}		
						
		Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndDataRef found data : " + JSON.stringify(data));	
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndDataRef data NOT found : " + JSON.stringify(data);		
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;			
	}									
	
	if (successCallback != null)
		successCallback(data);	
	
	return data;		
};

zz.Internal.Local.DB.Data.getByUserRefAndId = function(userRef, id, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndId");	
	
	if (userRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndId unable to find datas due to NULL userRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (id == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndId unable to find datas due to NULL id";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(
		"SELECT * FROM datas WHERE user_ref=? AND id=?", 
		[userRef, id]
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndId [datas : " + JSON.stringify(datas) + "]");	
		
	var data = null;		
	if (datas != null && datas.length == 1) {
								
		data = datas.pop();
		//data.serialized_data = (data.serialized_data != null ? Ti.Utils.base64decode(data.serialized_data) : null);
		if (data.serialized_data) {
			data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
		}		
						
		Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndId found data : " + JSON.stringify(data));	
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndId data NOT found : " + JSON.stringify(data);		
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;			
	}									
	
	if (successCallback != null)
		successCallback(data);	
	
	return data;		
};

zz.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef = function(userRef, id, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef");	
	
	if (userRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef unable to find datas due to NULL userRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (id == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef unable to find datas due to NULL id";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(
		"SELECT * FROM datas WHERE user_ref=? AND (id=? OR remote_data_ref=?)", 
		[userRef, id, id]
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef [datas : " + JSON.stringify(datas) + "]");	
		
	var data = null;		
	if (datas != null && datas.length == 1) {
								
		data = datas.pop();
		//data.serialized_data = (data.serialized_data != null ? Ti.Utils.base64decode(data.serialized_data) : null);
		if (data.serialized_data) {
			data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
		}		
						
		Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef found data : " + JSON.stringify(data));	
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndIdOrRemoteDataRef data NOT found : " + JSON.stringify(data);		
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;			
	}									
	
	if (successCallback != null)
		successCallback(data);	
	
	return data;		
};

zz.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef = function(userRef, remoteDataRef, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef");	
	
	if (userRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef unable to find datas due to NULL userRef";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}	
	
	if (remoteDataRef == null) {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef unable to find datas due to NULL id";		
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	var datas = _select(
		"SELECT * FROM datas WHERE user_ref=? AND remote_data_ref=?", 
		[userRef, remoteDataRef]
	);
	Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef [datas : " + JSON.stringify(datas) + "]");	
		
	var data = null;		
	if (datas != null && datas.length == 1) {
								
		data = datas.pop();
		//data.serialized_data = (data.serialized_data != null ? Ti.Utils.base64decode(data.serialized_data) : null);
		if (data.serialized_data) {
			data.serialized_data = Ti.Utils.base64decode(data.serialized_data);
		}		
						
		Ti.API.debug("ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef found data : " + JSON.stringify(data));	
	} else {
		var errorMessage = "ZZ.Internal.Local.DB.Data.getByUserRefAndRemoteDataRef data NOT found : " + JSON.stringify(data);		
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;			
	}									
	
	if (successCallback != null)
		successCallback(data);	
	
	return data;		
};

exports.ZZ = zz;
exports.version = 0.2;

var _manageError = function(error, errorCallback) {
	Ti.API.trace("ZZ.Internal.Local.DB._manageError");
	
	Ti.API.error(error.errorMessage);
	
	if (errorCallback != null)
		errorCallback(error);	
};

var _insert = function(query, params) {
	Ti.API.trace("ZZ.Internal.Local.DB._insert");
	Ti.API.trace("ZZ.Internal.Local.DB._insert [query : " + query + "]");
	Ti.API.trace("ZZ.Internal.Local.DB._insert [params : " + params + "]");
	
	if (query == null) {
		Ti.API.error("ZZ.Internal.Local.DB._insert unable to perform insert due to NULL query");
		
		return null;		
	}

	var db = Ti.Database.open(zzConfig.ZZ.Config.Local.DB.name);
	var id = null;
	
	try { 
		db.execute(query, params);
		
		Ti.API.trace("ZZ.Internal.Local.DB._insert [db.rowsAffected : " + db.rowsAffected + "]");
		if (db.rowsAffected > 0) {			
			Ti.API.trace("ZZ.Internal.Local.DB._insert insert performed [db.lastInsertRowId : " + db.lastInsertRowId + "]");
			
			id = db.lastInsertRowId;
		} else {
			Ti.API.error("ZZ.Internal.Local.DB._insert unable to perform insert due to an unknown error");
		}
				
	} catch(ex) {
		Ti.API.error("ZZ.Internal.Local.DB._insert unable to perform insert due to " + ex);		
	} finally {
		db.close();
	}	
	
	return id;
};

var _delete = function(query, params) {
	Ti.API.trace("ZZ.Internal.Local.DB._delete");
	Ti.API.trace("ZZ.Internal.Local.DB._delete [query : " + query + "]");
	Ti.API.trace("ZZ.Internal.Local.DB._delete [params : " + params + "]");
	
	if (query == null) {
		Ti.API.error("ZZ.Internal.Local.DB._delete unable to perform delete due to NULL query");
		
		return false;		
	}

	var db = Ti.Database.open(zzConfig.ZZ.Config.Local.DB.name);
	var done = false;
	
	try { 
		db.execute(query, params);
		
		Ti.API.trace("ZZ.Internal.Local.DB._delete [db.rowsAffected : " + db.rowsAffected + "]");
		if (db.rowsAffected > 0) {
			Ti.API.trace("ZZ.Internal.Local.DB._delete delete performed");
			
			done = true;
		} else {
			Ti.API.error("ZZ.Internal.Local.DB._delete unable to perform delete due to an unknown error");
		}
				
	} catch(ex) {
		Ti.API.error("ZZ.Internal.Local.DB._delete unable to perform delete due to " + ex);		
	} finally {
		db.close();
	}	

	return done;
};

var _update = function(query, params) {
	Ti.API.trace("ZZ.Internal.Local.DB._update");
	Ti.API.trace("ZZ.Internal.Local.DB._update [query : " + query + "]");
	Ti.API.trace("ZZ.Internal.Local.DB._update [params : " + params + "]");
	
	if (query == null) {
		Ti.API.error("ZZ.Internal.Local.DB._update unable to perform update due to NULL query");
		
		return null;		
	}

	var db = Ti.Database.open(zzConfig.ZZ.Config.Local.DB.name);
	var done = false;
	
	try { 
		db.execute(query, params);
		
		Ti.API.trace("ZZ.Internal.Local.DB._update [db.rowsAffected : " + db.rowsAffected + "]");
		if (db.rowsAffected > 0) {
			Ti.API.trace("ZZ.Internal.Local.DB._update update performed");
			
			done = true;
		} else {
			Ti.API.error("ZZ.Internal.Local.DB._update unable to perform update due to an unknown error");
		}
				
	} catch(ex) {
		Ti.API.error("ZZ.Internal.Local.DB._update unable to perform update due to " + ex);		
	} finally {
		db.close();
	}	
	
	return done;	
};

var _select = function(query, params) {
	Ti.API.trace("ZZ.Internal.Local.DB._select");
	Ti.API.trace("ZZ.Internal.Local.DB._select [query : " + query + "]");
	Ti.API.trace("ZZ.Internal.Local.DB._select [params : " + params + "]");
	
	if (query == null) {
		Ti.API.error("ZZ.Internal.Local.DB._select unable to perform select due to NULL query");
		
		return null;		
	}

	var db = Ti.Database.open(zzConfig.ZZ.Config.Local.DB.name);
	var objs = [];
	
	try { 
		var rs = db.execute(query, params);
				
		Ti.API.trace("ZZ.Internal.Local.DB._select [rs.rowCount : " + rs.rowCount + "]");				
		while (rs.isValidRow()) {	
			
			var obj = {};
						
			Ti.API.trace("ZZ.Internal.Local.DB._select [rs.fieldCount : " + rs.fieldCount + "]");
			for (var i=0; i<rs.fieldCount; i++) {
				Ti.API.trace("ZZ.Internal.Local.DB._select [rs.fieldName : " + rs.fieldName(i) + ", rs.field : " + rs.field(i) + "]");
				obj[rs.fieldName(i)] = rs.field(i);
			}				
		
			Ti.API.trace("ZZ.Internal.Local.DB._select found obj : " + JSON.stringify(obj));			
			objs.push(obj);
			
			rs.next();
		}									
		rs.close();
								
	} catch(ex) {
		Ti.API.error("ZZ.Internal.Local.DB._select unable to perform select due to " + ex);
	} finally {
		db.close();
	}	
	
	Ti.API.trace("ZZ.Internal.Local.DB._select found objs : " + JSON.stringify(objs));
	return objs;	
};

var _batchUpdate = function(query, params) {
	Ti.API.trace("ZZ.Internal.Local.DB._batchUpdate");
	Ti.API.trace("ZZ.Internal.Local.DB._batchUpdate [query : " + query + "]");
	Ti.API.trace("ZZ.Internal.Local.DB._batchUpdate [params : " + params + "]");
	
	if (query == null) {
		Ti.API.error("ZZ.Internal.Local.DB._batchUpdate unable to perform update due to NULL query");
		
		return null;		
	}

	if (params == null) {
		Ti.API.error("ZZ.Internal.Local.DB._batchUpdate unable to perform update due to NULL params");
		
		return null;		
	}

	var db = Ti.Database.open(zzConfig.ZZ.Config.Local.DB.name);	
	var done = false;
	
	try {
		db.execute("BEGIN");		
		_.each(params, function(item) {
			db.execute(query, item);
		});
		db.execute("COMMIT");	
		
		Ti.API.trace("ZZ.Internal.Local.DB._batchUpdate [db.rowsAffected : " + db.rowsAffected + "]");
		if (db.rowsAffected > 0) {
			Ti.API.trace("ZZ.Internal.Local.DB._batchUpdate update performed");
			
			done = true;
		} else {
			Ti.API.error("ZZ.Internal.Local.DB._batchUpdate unable to perform update due to an unknown error");
		}
				
	} catch(ex) {
		Ti.API.error("ZZ.Internal.Local.DB._batchUpdate unable to perform update due to " + ex);	
		
		db.execute("ROLLBACK");	
	} finally {
		db.close();
	}	
	
	return done;	
};

var _batchDelete = function(query, params) {
	Ti.API.trace("ZZ.Internal.Local.DB._batchDelete");
	Ti.API.trace("ZZ.Internal.Local.DB._batchDelete [query : " + query + "]");
	Ti.API.trace("ZZ.Internal.Local.DB._batchDelete [params : " + params + "]");
	
	if (query == null) {
		Ti.API.error("ZZ.Internal.Local.DB._batchDelete unable to perform delete due to NULL query");
		
		return null;		
	}

	if (params == null) {
		Ti.API.error("ZZ.Internal.Local.DB._batchDelete unable to perform delete due to NULL params");
		
		return null;		
	}

	var db = Ti.Database.open(zzConfig.ZZ.Config.Local.DB.name);	
	var done = false;
	
	try {
		db.execute("BEGIN");		
		_.each(params, function(item) {
			db.execute(query, item);
		});
		db.execute("COMMIT");	
		
		Ti.API.trace("ZZ.Internal.Local.DB._batchDelete [db.rowsAffected : " + db.rowsAffected + "]");
		if (db.rowsAffected > 0) {
			Ti.API.trace("ZZ.Internal.Local.DB._batchDelete delete performed");
			
			done = true;
		} else {
			Ti.API.error("ZZ.Internal.Local.DB._batchDelete unable to perform delete due to an unknown error");
		}
				
	} catch(ex) {
		Ti.API.error("ZZ.Internal.Local.DB._batchDelete unable to perform delete due to " + ex);	
		
		db.execute("ROLLBACK");	
	} finally {
		db.close();
	}	
	
	return done;
};