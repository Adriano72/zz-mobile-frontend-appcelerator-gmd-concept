//var zzGlobals = require('ti.zz.api/zz.internal.globals');
var zzLocalDB = require('ti.zz.api/zz.internal.local.db');
var zzCloud = require('ti.zz.api/zz.internal.cloud');

var zz = {
	Internal : {
		API : {
			Finance : {
				CashSources : {},
				PaymentModes : {},
				CashflowStatuses : {},
				PaymentTakingTools : {},
				CashflowTypes : {},
				CashflowVariabilities : {},
				CashflowCurrencies : {}			
			}
		}
	}
};

zz.Internal.API.Finance.CashSources.list = function(successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Finance.CashSources.list");
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null) {
		var errorMessage = "ZZ.Internal.API.Finance.CashSources.list unable to perform list due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;			
	}
	
	var online = zzGlobals.ZZ.Internal.Globals.isOnline();
	if (online) {
		
		var _readSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashSources.list._readSuccessCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashSources.list._readSuccessCallback [response : " + JSON.stringify(response) + "]");	
			
			if (successCallback != null)
				successCallback(response);
				
			var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
				type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
				alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHSOURCES,
				status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
				action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
				serialized_data : JSON.stringify(response),
				user_ref : user.id,
				local_data_ref : null,
				remote_data_ref : null,
				local_fs_ref : null
			});	
			Ti.API.debug("ZZ.Internal.API.Finance.CashSources.list added cashsources [cashsources : " + JSON.stringify(data) + "]");

		};
		var _readErrorCallback = function(error) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashSources.list._readErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashSources.list._readErrorCallback [error : " + JSON.stringify(error) + "]");
			
			var errorMessage = "ZZ.Internal.API.Finance.CashSources.list unable to perform list due to : " + error;
			_manageError({errorMessage : errorMessage});	
					
		};		
		
		zzCloud.ZZ.Internal.Cloud.Finance.CashSources.read(user, _readSuccessCallback, _readErrorCallback);
		return;		
		
	}	
	
	var storedDatas = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction(
		user.id,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHSOURCES,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE		
	);
	
	var objs = [];
	if (storedDatas != null && storedDatas.length > 0) {
			
		_.each(storedDatas, function(storedData) {												
			var obj = JSON.parse(storedData.serialized_data);
						
			Ti.API.debug("ZZ.Internal.API.Finance.CashSources.list [cashsources : " + JSON.stringify(obj) + "]");
						
			objs = objs.concat(obj);
		});
		
	}
	
	if (successCallback != null)
		successCallback(objs);	
};

zz.Internal.API.Finance.PaymentModes.list = function(successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Finance.PaymentModes.list");
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null) {
		var errorMessage = "ZZ.Internal.API.Finance.PaymentModes.list unable to perform list due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;			
	}
	
	var online = zzGlobals.ZZ.Internal.Globals.isOnline();
	if (online) {
		
		var _readSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentModes.list._readSuccessCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentModes.list._readSuccessCallback [response : " + JSON.stringify(response) + "]");	
			
			if (successCallback != null)
				successCallback(response);
				
			var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
				type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
				alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.PAYMENTMODES,
				status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
				action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
				serialized_data : JSON.stringify(response),
				user_ref : user.id,
				local_data_ref : null,
				remote_data_ref : null,
				local_fs_ref : null
			});	
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentModes.list added paymentmodes [paymentmodes : " + JSON.stringify(data) + "]");

		};
		var _readErrorCallback = function(error) {
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentModes.list._readErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentModes.list._readErrorCallback [error : " + JSON.stringify(error) + "]");
			
			var errorMessage = "ZZ.Internal.API.Finance.PaymentModes.list unable to perform list due to : " + error;
			_manageError({errorMessage : errorMessage});	
					
		};		
		
		zzCloud.ZZ.Internal.Cloud.Finance.PaymentModes.read(user, _readSuccessCallback, _readErrorCallback);
		return;		
		
	}	
	
	var storedDatas = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction(
		user.id,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.PAYMENTMODES,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE		
	);
	
	var objs = [];
	if (storedDatas != null && storedDatas.length > 0) {
			
		_.each(storedDatas, function(storedData) {												
			var obj = JSON.parse(storedData.serialized_data);
						
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentModes.list [paymentmodes : " + JSON.stringify(obj) + "]");
						
			objs = objs.concat(obj);
		});
		
	}
	
	if (successCallback != null)
		successCallback(objs);
};

zz.Internal.API.Finance.CashflowStatuses.list = function(successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Finance.CashflowStatuses.list");
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null) {
		var errorMessage = "ZZ.Internal.API.Finance.CashflowStatuses.list unable to perform list due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;			
	}
	
	var online = zzGlobals.ZZ.Internal.Globals.isOnline();
	if (online) {
		
		var _readSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowStatuses.list._readSuccessCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowStatuses.list._readSuccessCallback [response : " + JSON.stringify(response) + "]");	
			
			if (successCallback != null)
				successCallback(response);
				
			var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
				type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
				alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHFLOWSTATUSES,
				status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
				action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
				serialized_data : JSON.stringify(response),
				user_ref : user.id,
				local_data_ref : null,
				remote_data_ref : null,
				local_fs_ref : null
			});	
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowStatuses.list added cashflowstatuses [cashflowstatuses : " + JSON.stringify(data) + "]");

		};
		var _readErrorCallback = function(error) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowStatuses.list._readErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowStatuses.list._readErrorCallback [error : " + JSON.stringify(error) + "]");
			
			var errorMessage = "ZZ.Internal.API.Finance.CashflowStatuses.list unable to perform list due to : " + error;
			_manageError({errorMessage : errorMessage});	
					
		};		
		
		zzCloud.ZZ.Internal.Cloud.Finance.CashflowStatuses.read(user, _readSuccessCallback, _readErrorCallback);
		return;		
		
	}	
	
	var storedDatas = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction(
		user.id,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHFLOWSTATUSES,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE		
	);
	
	var objs = [];
	if (storedDatas != null && storedDatas.length > 0) {
			
		_.each(storedDatas, function(storedData) {												
			var obj = JSON.parse(storedData.serialized_data);
						
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowStatuses.list [cashflowstatuses : " + JSON.stringify(obj) + "]");
						
			objs = objs.concat(obj);
		});
		
	}
	
	if (successCallback != null)
		successCallback(objs);
};

zz.Internal.API.Finance.PaymentTakingTools.list = function(successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Finance.PaymentTakingTools.list");
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null) {
		var errorMessage = "ZZ.Internal.API.Finance.PaymentTakingTools.list unable to perform list due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;			
	}
	
	var online = zzGlobals.ZZ.Internal.Globals.isOnline();
	if (online) {
		
		var _readSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentTakingTools.list._readSuccessCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentTakingTools.list._readSuccessCallback [response : " + JSON.stringify(response) + "]");	
			
			if (successCallback != null)
				successCallback(response);
				
			var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
				type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
				alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.PAYMENTTAKINGTOOLS,
				status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
				action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
				serialized_data : JSON.stringify(response),
				user_ref : user.id,
				local_data_ref : null,
				remote_data_ref : null,
				local_fs_ref : null
			});	
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentTakingTools.list added paymentpakingpools [paymentpakingpools : " + JSON.stringify(data) + "]");

		};
		var _readErrorCallback = function(error) {
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentTakingTools.list._readErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentTakingTools.list._readErrorCallback [error : " + JSON.stringify(error) + "]");
			
			var errorMessage = "ZZ.Internal.API.Finance.PaymentTakingTools.list unable to perform list due to : " + error;
			_manageError({errorMessage : errorMessage});	
					
		};		
		
		zzCloud.ZZ.Internal.Cloud.Finance.PaymentTakingTools.read(user, _readSuccessCallback, _readErrorCallback);
		return;		
		
	}	
	
	var storedDatas = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction(
		user.id,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.PAYMENTTAKINGTOOLS,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE		
	);
	
	var objs = [];
	if (storedDatas != null && storedDatas.length > 0) {
			
		_.each(storedDatas, function(storedData) {												
			var obj = JSON.parse(storedData.serialized_data);
						
			Ti.API.debug("ZZ.Internal.API.Finance.PaymentTakingTools.list [paymentpakingpools : " + JSON.stringify(obj) + "]");
						
			objs = objs.concat(obj);
		});
		
	}
	
	if (successCallback != null)
		successCallback(objs);
};

zz.Internal.API.Finance.CashflowTypes.list = function(successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Finance.CashflowTypes.list");
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null) {
		var errorMessage = "ZZ.Internal.API.Finance.CashflowTypes.list unable to perform list due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;			
	}
	
	var online = zzGlobals.ZZ.Internal.Globals.isOnline();
	if (online) {
		
		var _readSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowTypes.list._readSuccessCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowTypes.list._readSuccessCallback [response : " + JSON.stringify(response) + "]");	
			
			if (successCallback != null)
				successCallback(response);
				
			var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
				type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
				alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHFLOWTYPES,
				status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
				action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
				serialized_data : JSON.stringify(response),
				user_ref : user.id,
				local_data_ref : null,
				remote_data_ref : null,
				local_fs_ref : null
			});	
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowTypes.list added cashflowtypes [cashflowtypes : " + JSON.stringify(data) + "]");

		};
		var _readErrorCallback = function(error) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowTypes.list._readErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowTypes.list._readErrorCallback [error : " + JSON.stringify(error) + "]");
			
			var errorMessage = "ZZ.Internal.API.Finance.CashflowTypes.list unable to perform list due to : " + error;
			_manageError({errorMessage : errorMessage});	
					
		};		
		
		zzCloud.ZZ.Internal.Cloud.Finance.CashflowTypes.read(user, _readSuccessCallback, _readErrorCallback);
		return;		
		
	}	
	
	var storedDatas = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction(
		user.id,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHFLOWTYPES,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE		
	);
	
	var objs = [];
	if (storedDatas != null && storedDatas.length > 0) {
			
		_.each(storedDatas, function(storedData) {												
			var obj = JSON.parse(storedData.serialized_data);
						
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowTypes.list [cashflowtypes : " + JSON.stringify(obj) + "]");
						
			objs = objs.concat(obj);
		});
		
	}
	
	if (successCallback != null)
		successCallback(objs);
};

zz.Internal.API.Finance.CashflowVariabilities.list = function(successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Finance.CashflowVariabilities.list");
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null) {
		var errorMessage = "ZZ.Internal.API.Finance.CashflowVariabilities.list unable to perform list due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;			
	}
	
	var online = zzGlobals.ZZ.Internal.Globals.isOnline();
	if (online) {
		
		var _readSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowVariabilities.list._readSuccessCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowVariabilities.list._readSuccessCallback [response : " + JSON.stringify(response) + "]");	
			
			if (successCallback != null)
				successCallback(response);
				
			var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
				type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
				alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHFLOWVARIABILITIES,
				status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
				action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
				serialized_data : JSON.stringify(response),
				user_ref : user.id,
				local_data_ref : null,
				remote_data_ref : null,
				local_fs_ref : null
			});	
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowVariabilities.list added cashflowvariabilities [cashflowvariabilities : " + JSON.stringify(data) + "]");

		};
		var _readErrorCallback = function(error) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowVariabilities.list._readErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowVariabilities.list._readErrorCallback [error : " + JSON.stringify(error) + "]");
			
			var errorMessage = "ZZ.Internal.API.Finance.CashflowVariabilities.list unable to perform list due to : " + error;
			_manageError({errorMessage : errorMessage});	
					
		};		
		
		zzCloud.ZZ.Internal.Cloud.Finance.CashflowVariabilities.read(user, _readSuccessCallback, _readErrorCallback);
		return;		
		
	}	
	
	var storedDatas = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction(
		user.id,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHFLOWVARIABILITIES,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE		
	);
	
	var objs = [];
	if (storedDatas != null && storedDatas.length > 0) {
			
		_.each(storedDatas, function(storedData) {												
			var obj = JSON.parse(storedData.serialized_data);
						
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowVariabilities.list [cashflowvariabilities : " + JSON.stringify(obj) + "]");
						
			objs = objs.concat(obj);
		});
		
	}
	
	if (successCallback != null)
		successCallback(objs);
};

zz.Internal.API.Finance.CashflowCurrencies.list = function(successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.API.Finance.CashflowCurrencies.list");
	
	var user = zzGlobals.ZZ.Internal.Globals.getCurrentUser();	
	if (user == null) {
		var errorMessage = "ZZ.Internal.API.Finance.CashflowCurrencies.list unable to perform list due to NULL user";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return null;
		return;			
	}
	
	var online = zzGlobals.ZZ.Internal.Globals.isOnline();
	if (online) {
		
		var _readSuccessCallback = function(response) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowCurrencies.list._readSuccessCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowCurrencies.list._readSuccessCallback [response : " + JSON.stringify(response) + "]");	
			
			if (successCallback != null)
				successCallback(response);
				
			var data = zzLocalDB.ZZ.Internal.Local.DB.Datas.add({
				type : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
				alias : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHFLOWCURRENCIES,
				status : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
				action : zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE,
				serialized_data : JSON.stringify(response),
				user_ref : user.id,
				local_data_ref : null,
				remote_data_ref : null,
				local_fs_ref : null
			});	
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowCurrencies.list added cashflowcurrencies [cashflowcurrencies : " + JSON.stringify(data) + "]");

		};
		var _readErrorCallback = function(error) {
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowCurrencies.list._readErrorCallback");
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowCurrencies.list._readErrorCallback [error : " + JSON.stringify(error) + "]");
			
			var errorMessage = "ZZ.Internal.API.Finance.CashflowCurrencies.list unable to perform list due to : " + error;
			_manageError({errorMessage : errorMessage});	
					
		};		
		
		zzCloud.ZZ.Internal.Cloud.Finance.CashflowCurrencies.read(user, _readSuccessCallback, _readErrorCallback);
		return;		
		
	}		
	
	var storedDatas = zzLocalDB.ZZ.Internal.Local.DB.Datas.findByUserRefAndTypeAndAliasAndStatusAndAction(
		user.id,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.TYPES.COLLECTION,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ALIASES.CASHFLOWCURRENCIES,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.STATUSES.CACHED,
		zzLocalDB.ZZ.Internal.Local.DB.Data.CONSTANTS.ACTIONS.NONE		
	);
	
	var objs = [];
	if (storedDatas != null && storedDatas.length > 0) {
			
		_.each(storedDatas, function(storedData) {												
			var obj = JSON.parse(storedData.serialized_data);
						
			Ti.API.debug("ZZ.Internal.API.Finance.CashflowCurrencies.list [cashflowcurrencies : " + JSON.stringify(obj) + "]");
						
			objs = objs.concat(obj);
		});
		
	}
	
	if (successCallback != null)
		successCallback(objs);
};

exports.ZZ = zz;
exports.version = 0.2;

var _manageError = function(error, errorCallback) {
	Ti.API.trace("ZZ.Internal.API.Finance._manageError");
	
	Ti.API.error(error.errorMessage);
	
	if (errorCallback != null)
		errorCallback(error);	
};