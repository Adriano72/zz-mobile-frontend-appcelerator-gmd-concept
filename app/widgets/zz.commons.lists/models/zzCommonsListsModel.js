exports.definition = {
	config: {

		adapter: {
			type: "properties",
			collection_name: "zzCommonsListsModel"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			comparator: function(item) {
        	    return item.get("order");
            }
		});

		return Collection;
	}
};
