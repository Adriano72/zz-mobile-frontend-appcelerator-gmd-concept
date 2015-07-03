var zz = {
	Config : {
		Local : {
			DB : {
				name : "zz-mobile-frontend-titanium-db",
				schema : "/data/db/zz-mobile-frontend-titanium-db"
			}
		},
		Cloud : {
			/*
			baseURL : "http://172.30.113.10:10010/zz/api/v02",
			cdnURL : "http://172.30.113.10:10011/zz/api/v02/cdn",
			*/
			/*
			baseURL : "http://172.30.103.11:10010/zz/api/v02",
			cdnURL : "http://172.30.103.11:10011/zz/api/v02/cdn",			
			*/
			baseURL : "https://beta.ziriziri.com/zz/api/v02",
			cdnURL : "https://beta.ziriziri.com/zz/api/v02/cdn",			
			cached : true,
			maxPerPage : 50
			
		}
	}
};

exports.ZZ = zz;
exports.version = 0.2;