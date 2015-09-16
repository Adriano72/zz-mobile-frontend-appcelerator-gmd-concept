var zzConfig = require('ti.zz.api/zz.config');

var zz = {
	Internal : {
		Cloud : {
			Core : {
				Session : {},
				Posts : {
					/*Post : {
						Templates : {}
					}*/
				},
				Post : {
					Aspects : {},
					Templates : {}
				},				
				Aspects : {
					//Aspect : {}
				},
				Aspect : {},
				Categories : {},
				Tags : {},
				Stories : {}
			},
			Finance : {
				CashSources : {},
				PaymentModes : {},
				CashflowStatuses : {},
				PaymentTakingTools : {},
				CashflowTypes : {},
				CashflowVariabilities : {},
				CashflowCurrencies : {}				
			},
			Files : {
				Attachment : {},
				Links : {}
			}
		}
	}
};

zz.Internal.Cloud.Core.Session.logIn = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Core.Session.logIn");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Session.logIn [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/session/login/" + user.username;
	var data = {
		data : user.password
	};
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Session.logIn._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Session.logIn._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Session.logIn._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Session.logIn._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"POST",
		url,
		data,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

//zz.Internal.Cloud.Core.Posts.read = function(user, successCallback, errorCallback) {
/* options : {
 * 		user : null, 
 * 		page : 0, 
 * 		max : 0, 
 * 		successCallback : function(){}, 
 * 		errorCallback : function(){}
 * } */
zz.Internal.Cloud.Core.Posts.read = function(options) {	
	Ti.API.debug("ZZ.Internal.Cloud.Core.Posts.read");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Posts.read [user : " + JSON.stringify(options.user) + "]");
	
	//var url = zzConfig.ZZ.Config.Cloud.baseURL + "/actions/actions/" + user.token + "?from=2000-01-01&to=2014-12-01&page=0&max=100&cached=" + zzConfig.ZZ.Config.Cloud.cached;
	
	var user = options.user;
	var successCallback = options.successCallback;
	var errorCallback = options.errorCallback;	
	var page = (options.page || 0);
	var max = (options.max || zzConfig.ZZ.Config.Cloud.maxPerPage);
	
	var today = new Date();
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/actions/actions/" + user.token + "?" + 
				"from=1970-01-01T00:00:00" + 
				"&to=" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "T23:59:59" +
				"&page=" + page +
				"&max=" + max +
				"&cached=" + zzConfig.ZZ.Config.Cloud.cached;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Posts.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Posts.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Posts.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Posts.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

//zz.Internal.Cloud.Core.Posts.Post.create = function(user, post, successCallback, errorCallback) {
zz.Internal.Cloud.Core.Post.create = function(user, post, successCallback, errorCallback) {	
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.create");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.create [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.create [post : " + JSON.stringify(post) + "]");
	
	post.id = null;
	post.modules = null;
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/actions/actions/" + user.token;
	var data = {
		data : post
	};
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.create._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.create._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.create._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.create._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"POST",
		url,
		data,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

//zz.Internal.Cloud.Core.Posts.Post.update = function(user, post, successCallback, errorCallback) {
zz.Internal.Cloud.Core.Post.update = function(user, post, successCallback, errorCallback) {	
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.update");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.update [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.update [post : " + JSON.stringify(post) + "]");
	
	post.modules = null;
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/actions/actions/" + user.token;
	var data = {
		data : post
	};
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.update._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.update._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.update._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.update._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"PUT",
		url,
		data,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

//zz.Internal.Cloud.Core.Posts.Post.read = function(user, post, successCallback, errorCallback) {
zz.Internal.Cloud.Core.Post.read = function(user, post, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.read");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.read [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.read [post : " + JSON.stringify(post) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/actions/actions/" + user.token + "/" + post.id + "?cached=" + zzConfig.ZZ.Config.Cloud.cached;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

//zz.Internal.Cloud.Core.Posts.Post.delete = function(user, post, successCallback, errorCallback) {
zz.Internal.Cloud.Core.Post.delete = function(user, post, successCallback, errorCallback) {	
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.delete");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.delete [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.delete [post : " + JSON.stringify(post) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/actions/actions/" + user.token + "/" + post.id + "/delete";
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.delete._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.delete._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.delete._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.delete._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"POST",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Core.Post.Aspects.remove = function(user, post, aspects, successCallback, errorCallback) {	
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Aspects.remove");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Aspects.remove [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Aspects.remove [post : " + JSON.stringify(post) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Aspects.remove [aspects : " + JSON.stringify(aspects) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/actions/actions/" + user.token + "/" + post.id + "/relations/delete";
	var data = {
		data : _.map(aspects, function(item){
			return item.id;
		})
	};
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Aspects.remove._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Aspects.remove._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Aspects.remove._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Aspects.remove._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"PUT",
		url,
		data,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

//zz.Internal.Cloud.Core.Posts.Post.Templates.read = function(user, successCallback, errorCallback) {
zz.Internal.Cloud.Core.Post.Templates.read = function(user, successCallback, errorCallback) {	
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Templates.read");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Templates.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/actions/actions/templates/" + user.token + "?page=0&max=100&cached=" + zzConfig.ZZ.Config.Cloud.cached;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Templates.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Templates.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Templates.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Post.Templates.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Core.Aspect.delete = function(user, aspect, successCallback, errorCallback) {	
	Ti.API.debug("ZZ.Internal.Cloud.Core.Aspect.delete");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Aspect.delete [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Aspect.delete [post : " + JSON.stringify(post) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/aspects/aspects/" + user.token + "/" + aspect.id + "/delete";
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Aspect.delete._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Aspect.delete._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Aspect.delete._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Aspect.delete._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"POST",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Core.Categories.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Core.Categories.read");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Categories.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/categories/categories/getLeafs/" + user.token;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Categories.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Categories.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Categories.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Categories.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Core.Stories.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Core.Stories.read");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Stories.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/stories/stories/" + user.token + "?from=2010-01-01&to=2020-01-01&page=0&max=1";
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Stories.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Stories.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Stories.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Stories.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Core.Tags.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Core.Tags.read");
	Ti.API.debug("ZZ.Internal.Cloud.Core.Tags.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/tags/tags/" + user.token + "?from=2010-01-01&to=2020-01-01";
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Tags.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Tags.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Core.Tags.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Core.Tags.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Finance.CashSources.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashSources.read");
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashSources.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/financial/financial/fonteliquidita/" + user.token;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashSources.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashSources.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashSources.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashSources.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Finance.PaymentModes.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentModes.read");
	Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentModes.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/financial/financial/modalitapagamento/" + user.token;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentModes.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentModes.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentModes.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentModes.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Finance.CashflowStatuses.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowStatuses.read");
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowStatuses.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/financial/financial/statomovimento/" + user.token;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowStatuses.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowStatuses.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowStatuses.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowStatuses.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Finance.PaymentTakingTools.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentTakingTools.read");
	Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentTakingTools.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/financial/financial/strumentopagamentoincasso/" + user.token;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentTakingTools.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentTakingTools.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentTakingTools.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.PaymentTakingTools.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Finance.CashflowTypes.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowTypes.read");
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowTypes.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/financial/financial/tipomovimento/" + user.token;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowTypes.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowTypes.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowTypes.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowTypes.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Finance.CashflowVariabilities.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowVariabilities.read");
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowVariabilities.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/financial/financial/tipovariabilita/" + user.token;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowVariabilities.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowVariabilities.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowVariabilities.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowVariabilities.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Finance.CashflowCurrencies.read = function(user, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowCurrencies.read");
	Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowCurrencies.read [user : " + JSON.stringify(user) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/financial/financial/valuta/" + user.token;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowCurrencies.read._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowCurrencies.read._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowCurrencies.read._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Finance.CashflowCurrencies.read._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

/*
zz.Internal.Cloud.Files.Attachment.upload = function(user, blob, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload");
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload [blob.mimeType : " + blob.mimeType + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.cdnURL + "/files/attachment/upload/" + user.token;
	
	var attachment = {
		id : user.token + "-" + new Date().getTime(),
		dataUri : Ti.Utils.base64encode(blob).toString()		
	};
	
	var data = {
		data : attachment
	};
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			//successCallback(data);
			successCallback({id : attachment.id});
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_upload(
		"POST",
		url,
		data,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};
*/

zz.Internal.Cloud.Files.Attachment.upload = function(user, blob, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload");
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload [blob.mimeType : " + blob.mimeType + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.cdnURL + "/files/attachments/upload/" + user.token;
	
	var data = {};
	var key = user.token + "-" + new Date().getTime();
	data[key] = blob.file;
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload._sendSuccessCallback [data : " + JSON.stringify(data) + "]");	
		
		if (successCallback != null)
			successCallback({id : key});
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.upload._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_upload(
		url,
		data,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Files.Attachment.download = function(user, aspect, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.download");
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.download [user : " + JSON.stringify(user) + "]");
	Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.download [aspect : " + JSON.stringify(aspect) + "]");
	
	var url = zzConfig.ZZ.Config.Cloud.cdnURL + "/files/content/download/" + user.token + "/" + aspect.id + "?format=BINARY&type=FILE";
	
	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.download._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.download._sendSuccessCallback [data : " + data + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.download._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Files.Attachment.download._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_download(
		url,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

zz.Internal.Cloud.Files.Links.metadata = function(url, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Cloud.Files.Links.metadata");
	Ti.API.debug("ZZ.Internal.Cloud.Files.Links.metadata [url : " + url+ "]");
	
	var url = zzConfig.ZZ.Config.Cloud.baseURL + "/files/links/metadata" + "?url=" + encodeURIComponent(url);

	var _sendSuccessCallback = function(data) {
		Ti.API.debug("ZZ.Internal.Cloud.Files.Links.metadata._sendSuccessCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Files.Links.metadata._sendSuccessCallback [data : " + data + "]");	
		
		if (successCallback != null)
			successCallback(data);
	};
	var _sendErrorCallback = function(error) {
		Ti.API.debug("ZZ.Internal.Cloud.Files.Links.metadata._sendErrorCallback");
		Ti.API.debug("ZZ.Internal.Cloud.Files.Links.metadata._sendErrorCallback [error : " + error + "]");
		
		if (errorCallback != null)
			errorCallback(error);		
	};	
	
	_send(
		"GET",
		url,
		null,
		_sendSuccessCallback,
		_sendErrorCallback
	);

};

exports.ZZ = zz;
exports.version = 0.2;

var _send = function(method, url, json, successCallback, errorCallback) {
	Ti.API.trace("ZZ.Internal.Cloud._send");
	Ti.API.trace("ZZ.Internal.Cloud._send [method : " + method + ", url : " + url + "]");

	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    	Ti.API.trace("ZZ.Internal.Cloud._send.onload");
	    	//Ti.API.debug("ZZ.Internal.Cloud._sendPOST.onload [e : " + JSON.stringify(e) + "]");
	    	
			// this function is called when data is returned from the server and available for use
	        // this.responseText holds the raw text return of the message (used for text/JSON)
	        // this.responseXML holds any returned XML (including SOAP)
	        // this.responseData holds any returned binary data

			var json = JSON.parse(this.responseText);
			
			if (json == null)
				successCallback();

	        else if (json.type.code == "SUCCESS" && successCallback != null)
	        	successCallback(json.data);
	        	
	        else if (errorCallback != null)
	        	errorCallback(json.type.description);
	    },
	    onerror: function(e) {
	    	Ti.API.trace("ZZ.Internal.Cloud._send.onerror");
	    	Ti.API.trace("ZZ.Internal.Cloud._send.onerror [e : " + JSON.stringify(e) + "]");
	    	
			// this function is called when an error occurs, including a timeout
			
	       	if (errorCallback != null)
	        	errorCallback(e.error);
	    },
	    timeout: 0 //15000  /* in milliseconds */
	});
	xhr.open(method, url);
	
	xhr.setRequestHeader('Accept','application/json');
	xhr.setRequestHeader('Content-Type','application/json');
	
	if (method == "POST" || method == "PUT") {
		var data = JSON.stringify(json);
		Ti.API.trace("ZZ.Internal.Cloud._send [data : " + data + "]");		
		
		xhr.send(data);
	} else {
		xhr.send();
	}
	
};

var _download = function(url, successCallback, errorCallback) {
	Ti.API.trace("ZZ.Internal.Cloud._download");
	Ti.API.trace("ZZ.Internal.Cloud._download [url : " + url + "]");

	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    	Ti.API.trace("ZZ.Internal.Cloud._download.onload");
	    	//Ti.API.debug("ZZ.Internal.Cloud._sendPOST.onload [e : " + JSON.stringify(e) + "]");
	    	
			// this function is called when data is returned from the server and available for use
	        // this.responseText holds the raw text return of the message (used for text/JSON)
	        // this.responseXML holds any returned XML (including SOAP)
	        // this.responseData holds any returned binary data

			if (successCallback != null)
	        	successCallback(this.responseData);
	    },
	    onerror: function(e) {
	    	Ti.API.trace("ZZ.Internal.Cloud._download.onerror");
	    	Ti.API.trace("ZZ.Internal.Cloud._download.onerror [e : " + JSON.stringify(e) + "]");
	    	
			// this function is called when an error occurs, including a timeout
			
	       	if (errorCallback != null)
	        	errorCallback(e.error);
	    },
	    timeout: 0 //15000  /* in milliseconds */
	});
	xhr.open("GET", url);
	
	xhr.send();	
};

/*
var _upload = function(method, url, json, successCallback, errorCallback) {
	Ti.API.trace("ZZ.Internal.Cloud._upload");
	Ti.API.trace("ZZ.Internal.Cloud._upload [method : " + method + ", url : " + url + "]");

	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    	Ti.API.trace("ZZ.Internal.Cloud._upload.onload");
	       
	       	successCallback();
	    },
	    onerror: function(e) {
	    	Ti.API.trace("ZZ.Internal.Cloud._upload.onerror");
	    	Ti.API.trace("ZZ.Internal.Cloud._upload.onerror [e : " + JSON.stringify(e) + "]");
			
	       	if (errorCallback != null)
	        	errorCallback(e.error);
	    },
	    timeout: 30000
	});
	xhr.open(method, url);
	
	xhr.setRequestHeader('Content-Type','application/json');
	
	if (method == "POST" || method == "PUT") {
		var data = JSON.stringify(json);
		Ti.API.trace("ZZ.Internal.Cloud._upload [data : " + data + "]");		
		
		xhr.send(data);
	} else {
		xhr.send();
	}
	
};
*/

var _upload = function(url, data, successCallback, errorCallback) {
	Ti.API.trace("ZZ.Internal.Cloud._upload");
	Ti.API.trace("ZZ.Internal.Cloud._upload [url : " + url + "]");

	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    	Ti.API.trace("ZZ.Internal.Cloud._upload.onload");
	       
	       	successCallback();
	    },
	    onerror: function(e) {
	    	Ti.API.trace("ZZ.Internal.Cloud._upload.onerror");
	    	Ti.API.trace("ZZ.Internal.Cloud._upload.onerror [e : " + JSON.stringify(e) + "]");
			
	       	if (errorCallback != null)
	        	errorCallback(e.error);
	    },
	    timeout: 0
	});
	xhr.open("POST", url);
	
	xhr.setRequestHeader('enctype','multipart/form-data');
					
	xhr.send(data);	
};