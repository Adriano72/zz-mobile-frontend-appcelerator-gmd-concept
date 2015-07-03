var zz = {
	Internal : {
		Local : {
			FS : {
				File : {},
				Directory : {}
			}	
		}
	}
};

zz.Internal.Local.FS.File.read = function(path, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.FS.File.read");
	Ti.API.debug("ZZ.Internal.Local.FS.File.read [path : " + path + "]");
	
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, path);
	var blob = file.read();
	
	if (blob == null) {
		var errorMessage = "ZZ.Internal.Local.FS.File.read unable to read file [name : " + file.name + ", nativePath : " + file.nativePath + ", blob.mimeType : " + blob.mimeType + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);
			
		//return;
		return null;		
	}
	
	Ti.API.debug("ZZ.Internal.Local.FS.File.read readed file [name : " + file.name + ", nativePath : " + file.nativePath + ", blob.mimeType : " + blob.mimeType + "]");
	
	if (successCallback != null)
		successCallback(blob);	
	
	return blob;		
};

zz.Internal.Local.FS.File.write = function(path, content, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.FS.File.write");
	Ti.API.debug("ZZ.Internal.Local.FS.File.write [path : " + path + "]");
	
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, path);
	
	file.write(content);	
	var blob = file.read();
	
	if (blob == null) {
		var errorMessage = "ZZ.Internal.Local.FS.File.write unable to write file [name : " + file.name + ", nativePath : " + file.nativePath + ", blob.mimeType : " + blob.mimeType + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	Ti.API.debug("ZZ.Internal.Local.FS.File.write written file [name : " + file.name + ", nativePath : " + file.nativePath + ", blob.mimeType : " + blob.mimeType + "]");
	
	if (successCallback != null)
		successCallback(blob);	
	
	return blob;	
};

zz.Internal.Local.FS.File.copy = function(from, to, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.FS.File.copy");
	Ti.API.debug("ZZ.Internal.Local.FS.File.copy [from : " + from + ", to : " + to + "]");
		
	var fromFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, from);
	var toFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, to);
	
	toFile.write(fromFile.read());
	var blob = toFile.read();
	
	if (blob == null) {
		var errorMessage = "ZZ.Internal.Local.FS.File.copy unable to copy file [name : " + toFile.name + ", nativePath : " + toFile.nativePath + ", blob.mimeType : " + blob.mimeType + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		//return;
		return null;		
	}
	
	Ti.API.debug("ZZ.Internal.Local.FS.File.copy copied to file [name : " + toFile.name + ", nativePath : " + toFile.nativePath + ", blob.mimeType : " + blob.mimeType + "]");
	
	if (successCallback != null)
		successCallback(blob);	
	
	return blob;	
};

//zz.Internal.Local.FS.File.remove = function(path, successCallback, errorCallback) {
zz.Internal.Local.FS.File.remove = function(path, successCallback, errorCallback) {	
	Ti.API.debug("ZZ.Internal.Local.FS.File.remove");
	Ti.API.debug("ZZ.Internal.Local.FS.File.remove [path : " + path + "]");
	
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, path);
	var done = file.deleteFile();
	
	if (done) {
		Ti.API.debug("ZZ.Internal.Local.FS.File.remove deleted file [name : " + file.name + ", nativePath : " + file.nativePath + "]");
	} else {
		var errorMessage = "ZZ.Internal.Local.FS.File.remove unable to delete file [name : " + file.name + ", nativePath : " + file.nativePath + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return false;		
	}
	
	if (successCallback != null)
		successCallback();	
	
	return true;
};

zz.Internal.Local.FS.Directory.make = function(path, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.FS.Directory.make");
	Ti.API.debug("ZZ.Internal.Local.FS.Directory.make [path : " + path + "]");
	
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, path);
	var done = dir.createDirectory();
	
	if (done) {
		Ti.API.debug("ZZ.Internal.Local.FS.Directory.make created directory [name : " + dir.name + ", nativePath : " + dir.nativePath + "]");
	} else {
		var errorMessage = "ZZ.Internal.Local.FS.Directory.make unable to create directory [name : " + dir.name + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return false;	
	}
	
	if (successCallback != null)
		successCallback();	
		
	return true;			
};

zz.Internal.Local.FS.Directory.remove = function(path, successCallback, errorCallback) {
	Ti.API.debug("ZZ.Internal.Local.FS.Directory.remove");
	
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, path);
	var done = dir.deleteDirectory();
	
	if (done) {
		Ti.API.debug("ZZ.Internal.Local.FS.Directory.remove removed directory [name : " + dir.name + ", nativePath : " + dir.nativePath + "]");
	} else {
		var errorMessage = "ZZ.Internal.Local.FS.Directory.remove unable to remove directory [name : " + dir.name + ", nativePath : " + dir.nativePath + "]";
		_manageError({errorMessage : errorMessage}, errorCallback);	
			
		return false;		
	}
	
	if (successCallback != null)
		successCallback();
		
	return true;
};

exports.ZZ = zz;
exports.version = 0.2;

var _manageError = function(error, errorCallback) {
	Ti.API.trace("ZZ.Internal.Local.FS._manageError");
	
	Ti.API.error(error.errorMessage);
	
	if (errorCallback != null)
		errorCallback(error);	
};