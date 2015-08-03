(function constructor(args) {				

	var model = args.model;
	var navigationWindow = args.navigationWindow;
	
	$.postEditor.addEventListener("open", function() {
		
		var aspectModel = new Backbone.Model({
			kind: {
				code: "EVENTDATATYPE_CODE"
				//code: "CASHFLOWDATATYPE_CODE"
				//code: "FILEDOCUMENTDATATYPE_CODE"
				//code: "NOTEDATATYPE_CODE"
			}
		});
		var aspectEditor = Alloy.createController("aspectEditor", {
			model: aspectModel,    	
		}).getView();
		
		if (OS_IOS) {
			navigationWindow.openWindow(aspectEditor);
		}
		if (OS_ANDROID) {
			aspectEditor.open();
		}
		
		aspectEditor.addEventListener("confirm", function(args) {
			aspectEditor.close();
			$.postEditor.close();
			
			var _corePostsAddCallback = function(post){
				Ti.API.info("ZZ.API.Core.Posts.add success [response : " + JSON.stringify(post) + "]");
						
				var aspect = _.find(post.modules, function(module) {
					return module.kind.code == "CASHFLOWDATATYPE_CODE";
				});			
				Ti.API.info("ZZ.API.Core.Posts.add success [aspect : " + JSON.stringify(aspect) + "]");		
				
				aspect.id = null;
				aspect.name = "An Aspect From Titanium Starting From The Default Template " + aspect.kind.code;
				aspect.referenceTime = new Date().getTime();
				
				aspect.category = {
					id: 623978
				};
				
				var _corePostAspectsAddCallback = function(addedAspect){
					Ti.API.info("ZZ.API.Core.Post.Aspects.add success [response : " + JSON.stringify(addedAspect) + "]");
							
					ZZ.API.Core.Post.commit(post, function(response){
						Ti.API.info("ZZ.API.Core.Post.commit success [response : " + JSON.stringify(response) + "]");
					}, function(error){
						Ti.API.error("ZZ.API.Core.Post.commit error [error : " + error + "]");
					});
				
				};		
				
				//ZZ.API.Core.Post.Aspects.add(aspect, null, _corePostAspectsAddCallback, function(error){
				ZZ.API.Core.Post.Aspects.add(aspectModel.toJSON(), null, _corePostAspectsAddCallback, function(error){
					Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
				});	
			};		
			
			ZZ.API.Core.Post.Templates.list(function(templates){
				Ti.API.info("ZZ.API.Core.Post.Templates.list success [response : " + JSON.stringify(templates) + "]");
										
				var template = templates.pop();
				Ti.API.info("ZZ.API.Core.Post.Templates.list success [template : " + JSON.stringify(template) + "]");
				
				template.id = null;
				template.name = "A Post From Titanium Starting From The Default Template";
				template.referenceTime = new Date().getTime();
				
				template.category = aspectModel.get("category");
				
				ZZ.API.Core.Posts.add(template, _corePostsAddCallback, function(error){
					Ti.API.error("ZZ.API.Core.Posts.add error [error : " + error + "]");
				});			
				
			}, function(error){
				Ti.API.error("ZZ.API.Core.Post.Templates.list error [error : " + error + "]");
			});		
		});
	});

})(arguments[0] || {});

function onHomeIconItemSelected() {
	$.postEditor.close();
}