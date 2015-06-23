app.factory('MongoDbFactory', function(){
	var Promise = require('bluebird');
	var MongoClient = require('mongodb').MongoClient;

	var removeAngularProps = function(obj, excludeProp){
		var newObj = {};
		var prop;
		for (prop in obj) {
			if (Object.hasOwnProperty.call(obj, prop)) {
				if(prop !== "$$hashKey" ){
					if(!excludeProp || prop !== excludeProp){
						newObj[prop] = obj[prop];
					}					
				}
			}
		}
		return newObj;
	}

	return{
		deleteDatabase:function(name){
			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/' + name).then(function(db) {
				//remove db
				var dropDatabase = Promise.promisify(db.dropDatabase)					
				return dropDatabase.call(db).then(function(){
					return "Database Removed";
				}).catch(function(e) {console.log(e)});
			}).catch(function(e) {console.log(e)});
		},
		deleteCollection:function(name, collectionName){
			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/' + name).then(function(db) {
				var dropCollection = Promise.promisify(db.dropCollection)					
				return dropCollection.call(db, collectionName).then(function(){
					return "Collection Removed";
				}).catch(function(e) {console.log(e)});
			}).catch(function(e) {console.log(e)});
		},
		deleteProp:function(name, collectionName, item, key){
			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/' + name).then(function(db) {
				var getCollection = Promise.promisify(db.collection);
				return getCollection.call(db, collectionName).then(function(collection){
					  	var newItem = removeAngularProps(item, key);
					  	var updateCollection = Promise.promisify(collection.updateOne);
						return updateCollection.call(collection, newItem, newItem).then(function() {
					 		return "Document Item Removed";
					 }).catch(function(e) {console.log(e)});
				}).catch(function(e) {console.log(e)});
			}).catch(function(e) {console.log(e)});
		},
		deleteItem:function(name, collectionName, item){
			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/' + name).then(function(db) {
				var getCollection = Promise.promisify(db.collection);
				return getCollection.call(db, collectionName).then(function(collection){
					var removeCollection = Promise.promisify(collection.removeOne);
					return removeCollection.call(collection, removeAngularProps(item)).then(function() {	
					 	return "Collection Item was Removed";
					 }).catch(function(e) {console.log(e)});
				}).catch(function(e) {console.log(e)});
			}).catch(function(e) {console.log(e)});
		},
		modifyItem:function(name, collectionName, item, key){
			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/' + name).then(function(db) {
				var getCollection = Promise.promisify(db.collection);				
				return getCollection.call(db, collectionName).then(function(collection){
					//exlcude key for query then use it to update
					var updateCollection = Promise.promisify(collection.updateOne);
					return updateCollection.call(collection, removeAngularProps(item, key), removeAngularProps(item), {upsert:true}).then(function() {				
					 	return "Document Item Updated";
					}).catch(function(e) {console.log(e)});
				}).catch(function(e) {console.log(e)});
			}).catch(function(e) {console.log(e)});
		},
		getAllDatabases: function () {
			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/*').then(function(mongoConnect) {
				var adminDb = mongoConnect.admin();
			    var databaseList = Promise.promisify(adminDb.listDatabases);
			    return databaseList.call(adminDb).then(function(dbsList) {	
			    	return dbsList;
			    }).catch(function(e) {console.log(e)}); 
			}).catch(function(e) {console.log(e)});
		},
		getCollections: function(name){
			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/' + name).then(function(db) {
				var listCollections = db.listCollections({});
				var collectionArr = Promise.promisify(listCollections.toArray);
				return collectionArr.call(listCollections).then(function(names){
					return names;					
				}).catch(function(e) {console.log(e)});
			}).catch(function(e) {console.log(e)});
		},
		getAllItemsInCollection: function(name, collectionName){
			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/' + name).then(function(db) {
				var getCollection = Promise.promisify(db.collection);
				return getCollection.call(db, collectionName).then(function(collection){
					var itemsInCollection = collection.find();
					var itemsArr = Promise.promisify(itemsInCollection.toArray); 
					return itemsArr.call(itemsInCollection).then(function(items){
						
						var itemsWithIds=[];
						items.forEach(function(item){
							var propsArr = Object.getOwnPropertyNames(item)
							var obj = {};
							itemsWithIds.push(obj);
							
			    			propsArr.forEach(function(key){
			    				var objToPush = item[key];

								// if(objToPush && objToPush._bsontype)  {
								// 	objToPush = item[key].toString()
								// }	


								// else if(Array.isArray(objToPush)){
								// 	objToPush.forEach(function(possibleId){
								// 		console.log("possibleId", possibleId);
								// 		//using orders for exampe problem is it could be an array of objects or ids or maybe anything


								// 		//if(possibleIds._bsontype)  {
								// 			//possibleId = "test"//possibleId.toString()
								// 		//}
								// 	});
								// }
			    				obj[key] = objToPush;
			    			});
						});
						//console.log(itemsWithIds);
						return itemsWithIds;
					}).catch(function(e) {console.log(e)});
				}).catch(function(e) {console.log(e)});
			}).catch(function(e) {console.log(e)});
		}
	};
});