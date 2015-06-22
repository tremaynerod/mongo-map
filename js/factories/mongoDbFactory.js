app.factory('MongoDbFactory', function(){
	var Promise = require('bluebird');
	var MongoClient = require('mongodb').MongoClient;

	return{
		getAllDatabases: function () {
			//var mongo = require('mongodb');
			// var Db = mongo.Db,
	  //   	Server = mongo.Server;

			// var mongoDb = new Db('*', new Server('localhost', 27017));
			// var openMongoConnect = Promise.promisify(mongoDb.open);
			// return openMongoConnect.call(mongoDb).then(function(mongoConnect) {
			//     var adminDb = mongoConnect.admin();
			//     var databaseList = Promise.promisify(adminDb.listDatabases);
			//     return databaseList.call(adminDb).then(function(dbsList) {
			//     	return dbsList;
			//     }).catch(function(e) {}); 
			// })
			// .catch(function(e) {});

			MongoConnect = Promise.promisify(MongoClient.connect);
			return MongoConnect.call(MongoClient, 'mongodb://127.0.0.1:27017/*').then(function(mongoConnect) {
				var adminDb = mongoConnect.admin();
			    var databaseList = Promise.promisify(adminDb.listDatabases);
			    return databaseList.call(adminDb).then(function(dbsList) {	
			    	console.log(dbsList);		    	
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
						console.log("before", items);
						
						var itemsWithIds=[];
						items.forEach(function(item){
							var propsArr = Object.getOwnPropertyNames(item)
							var obj = {};
							itemsWithIds.push(obj);
							
			    			propsArr.forEach(function(key){
			    				var objToPush = item[key];
								if(objToPush && objToPush._bsontype)  {
									objToPush = item[key].toString()
								}	
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
						return itemsWithIds;
					}).catch(function(e) {console.log(e)});
				}).catch(function(e) {console.log(e)});
			}).catch(function(e) {console.log(e)});
		}
	};
});