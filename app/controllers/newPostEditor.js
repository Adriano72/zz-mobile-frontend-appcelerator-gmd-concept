(function constructor(args) {				
	
	var location = null;
	if (Ti.Geolocation.locationServicesEnabled) {
		
		var _reverseGeocoderCallback = function(args){
        	if (args.error) {
	            Ti.API.error("Error: " + args.error);
	        } else {	           
	           location = _.extend(location, {
					name: (args.places[0]).address,
	            	description: (args.places[0]).address	           
	           });         		           
	        }			
		};
		
		var _getCurrentPositionCallback = function(args) {
			if (args.error) {
	            Ti.API.error("Error: " + args.error);
	        } else {	           
	        	
				location = {
	            	latitude: args.coords.latitude,
	            	longitude: args.coords.longitude,
	            	timestamp: args.coords.timestamp			            	
	            };	        	
	        	
	            Ti.Geolocation.reverseGeocoder(args.coords.latitude, args.coords.longitude, _reverseGeocoderCallback);
	        }			
		};
		
	    Ti.Geolocation.getCurrentPosition(_getCurrentPositionCallback);
	} else {
	    alert("Please enable location services");
	}	
	
	var navigationWindow = args.navigationWindow;
	var kind = args.kind;
	
	var postModel = new Backbone.Model(); //args.model;
	var aspectModel = new Backbone.Model(); //args.model;				
		
	//$.newPostEditor.addEventListener("open", function() {
		
		ZZ.API.Core.Post.Templates.list(function(templates){
			Ti.API.info("ZZ.API.Core.Post.Templates.list success [response : " + JSON.stringify(templates) + "]");
									
			var postTemplate = templates.pop();
			Ti.API.info("ZZ.API.Core.Post.Templates.list success [template : " + JSON.stringify(postTemplate) + "]");
			
			postTemplate.id = null;
			postTemplate.name = "";
			postTemplate.referenceTime = new Date().getTime();			
			
			postModel.set(postTemplate);
					
			if (kind) {
				var aspectTemplate = _.find(postTemplate.modules, function(module) {
					return module.kind.code.toLowerCase() == kind.toLowerCase();
				});	
				
				if (aspectTemplate) {
					aspectTemplate.id = null;
					aspectTemplate.name = "";
					aspectTemplate.referenceTime = new Date().getTime();
					
					aspectModel.set(aspectTemplate);				
				}			
			}	
			
			var newAspectEditor = Alloy.createController("newAspectEditor", {
				model: aspectModel, 
				options: args.options   	
			}).getView();
			
			if (OS_IOS) {
				navigationWindow.openWindow(newAspectEditor);
			}
			if (OS_ANDROID) {
				newAspectEditor.open();
			}		
			
			newAspectEditor.addEventListener("confirm", function(args) {
				
				var blob = args.blob;
				
				postModel.set({
					name: aspectModel.get("name"),
					description: aspectModel.get("description"),
					referenceTime: aspectModel.get("referenceTime"),
					category: aspectModel.get("category"),
					location: location
				});
																			
				var _corePostsAddCallback = function(post){
					Ti.API.info("ZZ.API.Core.Posts.add success [response : " + JSON.stringify(post) + "]");
					
					var _corePostAspectsAddCallback = function(addedAspect){
						Ti.API.info("ZZ.API.Core.Post.Aspects.add success [response : " + JSON.stringify(addedAspect) + "]");
								
						if (blob) {							
							ZZ.API.Files.Attachment.set(addedAspect, blob, 
								function(response){
									Ti.API.info("ZZ.API.Files.Attachment.set success [response : " + response + "]");						
								}, function(error){
									Ti.API.error("ZZ.API.Files.Attachment.set error [error : " + error + "]");
								}
							);							
						}																
								
						ZZ.API.Core.Post.commit(post, function(response){
							Ti.API.info("ZZ.API.Core.Post.commit success [response : " + JSON.stringify(response) + "]");
							
							$.newPostEditor.fireEvent("created", response);
							
							newAspectEditor.close();
							$.newPostEditor.close();														
							
						}, function(error){
							Ti.API.error("ZZ.API.Core.Post.commit error [error : " + error + "]");
						});
						
						/*
						post.name = post.name + " - UPDATED";
						
						ZZ.API.Core.Post.update(post, function(updatedPost){
							
							ZZ.API.Core.Post.commit(updatedPost, function(response){
								Ti.API.info("ZZ.API.Core.Post.commit success [response : " + JSON.stringify(response) + "]");
								
								$.newPostEditor.fireEvent("created", response);
								
								newAspectEditor.close();
								$.newPostEditor.close();														
								
							}, function(error){
								Ti.API.error("ZZ.API.Core.Post.commit error [error : " + error + "]");
							});							
							
						}, function(error){
							Ti.API.error("ZZ.API.Core.Post.get error [error : " + error + "]");
						});	
						*/					
					};
					
					aspectModel.set({
						location: location
					});					
					Ti.API.info(location);
					
					ZZ.API.Core.Post.Aspects.add(aspectModel.toJSON(), null, _corePostAspectsAddCallback, function(error){
						Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
					});	
				};
				
				ZZ.API.Core.Posts.add(postModel.toJSON(), _corePostsAddCallback, function(error){
					Ti.API.error("ZZ.API.Core.Posts.add error [error : " + error + "]");
				});
						
			});				
					
			newAspectEditor.addEventListener("close", function(args) {
				$.newPostEditor.close();
			});
					
		}, function(error){
			Ti.API.error("ZZ.API.Core.Post.Templates.list error [error : " + error + "]");
		});					
				
	//});

})(arguments[0] || {});

function onHomeIconItemSelected() {
	$.newPostEditor.close();
}