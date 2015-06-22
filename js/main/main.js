'use strict';
app.config(function ($stateProvider) {
    // $stateProvider.state('main', {
    //     url: '/',
    //     //templateUrl:'js/main/subviews/main.html',
    //     // ,
    //     views: {
    //     	'': {
		  //       abstract: true,
		  //       templateUrl: 'js/main/subviews/main.html'
		  //       //,
		  //       // controller: function() {

		  //       // }
		  //   },
    //         'top-view@main': {
    //             templateUrl: 'js/main/subviews/top.html',
    //             controller: 'TopViewController'
    //         },
    //         'bottom-view@main': {
    //             templateUrl: 'js/main/subviews/bottom.html',
    //             controller: 'BottomViewController'
    //         }
    //     }
    // });

	$stateProvider.state('main', {
    	url: '/',
	    templateUrl: 'js/main/subviews/main.html',
	    controller: 'MainController'
	});

    $stateProvider.state('collections', {
        url: '/:name',
        views: {
        	'': {
		        abstract: true,
		        templateUrl: 'js/main/subviews/collections.html'
		    },
            'top-view@collections': {
                templateUrl: 'js/main/subviews/top.html',
                controller: 'CollectionsTopController'
            },
            'bottom-view@collections': {
                templateUrl: 'js/main/subviews/bottom.html',
                controller: 'CollectionsBottomController'
            }
        }
    });

//$state.go('items', {dbName: $stateParams.name, collectionName: collection.name});
    $stateProvider.state('items', {
    	url: '/:dbName/:collectionName',
    	//params: ['collectionName','dbName'],
	    templateUrl: 'js/main/subviews/items.html',
	    controller: 'itemsController'
	});



 //    $stateProvider.state('collectionsTopView', {
 //    	url: '/test',
	//     templateUrl: 'js/main/subviews/collections.html',
	//     controller: 'collectionsTopController'
	// });


	// $stateProvider.state('random', {
	// 	url: '/random',
	//     templateUrl: 'js/main/subviews/collections.html',
	//     controller: 'RandomController'
	// });


 //    $stateProvider.state('main.top-view', {
 //    	//abstract: true,
	//     templateUrl: 'js/main/subviews/top.html'
	//     // views: {
	//     //     "main.top-view": { template: '<ui-view/>' }
	//     // }
	// });

 //    $stateProvider.state('main.bottom-view', {
 //    	//abstract: true,
	//     templateUrl: 'js/main/subviews/bottom.html'
	//     // views: {
	//     //     "main.bottom-view": { template: '<ui-view/>' }
	//     // }
	// });


 //    $stateProvider.state('main.top-view', {
 //    	//abstract: true,
	//     url: '/top-view'//,
	//     // views: {
	//     //     "main.top-view": { template: '<ui-view/>' }
	//     // }
	// });

 //    $stateProvider.state('main.bottom-view', {
 //    	//abstract: true,
	//     url: '/bottom-view'//,
	//     // views: {
	//     //     "main.bottom-view": { template: '<ui-view/>' }
	//     // }
	// });
});

app.controller('itemsController', function ($scope, $state, $stateParams, MongoDbFactory) {
	$scope.items;
	MongoDbFactory.getAllItemsInCollection($stateParams.dbName, $stateParams.collectionName).then(function(items){
			console.log("items", items);
			$scope.items = items;

			$scope.$digest();
	}).catch(function(e) {console.log(e)});

	$scope.modifyProp = function(key, val){
		console.log(key);
		console.log(val);
	};
});

app.controller('CollectionsTopController', function ($scope, $state, $stateParams) {
	console.log($stateParams.name);

	//var MongoClient = require('mongodb').MongoClient;

	//MongoClient.connect('mongodb://127.0.0.1:27017/artsy_store', function(err, db) {

	//MongoClient.connect('mongodb://127.0.0.1:27017/' + $stateParams.name, function(err, db) {
		// db.collection('events', function(err, collection) {
		// 			collection.find().toArray(function(err, docs) {
		// 				var propsArr = Object.getOwnPropertyNames(docs[0])
		//     			console.log(propsArr);
		//     			var newArr=[];
		//     			propsArr.forEach(function(key){
		//     				var objToPush = docs[0][key];
		// 					if(objToPush._bsontype)  {
		// 						objToPush = docs[0][key].toString()
		// 					}
		// 					// else if(Array.isArray(objToPush)){
		// 					// 	objToPush.forEach(function(possibleId){
		// 					// 		//if(possibleIds._bsontype)  {
		// 					// 			possibleId = "test"//possibleId.toString()
		// 					// 		//}
		// 					// 	});
		// 					// }  		
		//     				newArr.push(objToPush);
		//     			});
		//     			console.log(newArr);
		//     			//return newArr;
		// 			});
		// 		});



		// db.stats(function(err, stats) {
  //   		console.log(stats);
  //   		//db.close();
  // 		})


		// db.collections(function(err, collections) {
		//     console.log(collections);

		//    //  collections.stats(function(err, stats) {
  //   	// 		console.log(stats);
  // 			// })
		// });

		// // Grab a collection with a callback but no safe operation
  // 		db.collection('events', function(err, collection) {
  //   		console.log(collection);
    		

    		
  //   		collection.find().toArray(function(err, docs) {
  //   			console.log("events");
  //   			console.log(docs);

  //   			var propsArr = Object.getOwnPropertyNames(docs[0])

  //   			console.log(propsArr);

  //   			var newArr=[];
  //   			propsArr.forEach(function(key){
  //   				var objToPush = docs[0][key];
		// 			if(objToPush._bsontype)  {
		// 				objToPush = docs[0][key].toString()
		// 			}
		// 			else if(Array.isArray(objToPush)){
		// 				objToPush.forEach(function(possibleId){
		// 					if(possibleIds._bsontype)  {
		// 						possibleId = possibleId.toString()
		// 					}
		// 				});
		// 			}  		


    				
  //   				newArr.push(objToPush);
  //   			})
  //   			console.log(newArr);
    			
    			
    			
  //   		});
    		


  //   		collection.stats(function(err, stats) {
  //   			console.log(stats);
  // 			})
  //   	})

  //   	db.indexInformation("users", function(err, indexInfo) {
  //   		console.log("collection info");
    		
  //   		console.log(indexInfo);	
  //   	});







	//});



});

app.controller('CollectionsBottomController', function ($scope, $state, $stateParams, MongoDbFactory) {
	$scope.collections;
	MongoDbFactory.getCollections($stateParams.name).then(function(collections){
		$scope.collections = collections;
		$scope.$digest();
	}).catch(function(e) {console.log(e)});



	$scope.useCollection = function(collection){
		// MongoDbFactory.getAllItemsInCollection($stateParams.name, collection.name).then(function(items){
		// 	console.log("items", items);
			
		// 	//$scope.$digest();
		// }).catch(function(e) {console.log(e)});

		
		//$state.go('items');
		$state.go('items', {dbName: $stateParams.name, collectionName: collection.name});
	}
	

// 	var Db = require('mongodb').Db,
// 	    MongoClient = require('mongodb').MongoClient,
// 	    Server = require('mongodb').Server;
// 	    //ReplSetServers = require('mongodb').ReplSetServers,
// 	    //ObjectID = require('mongodb').ObjectID,
// 	    //Binary = require('mongodb').Binary,
// 	    //GridStore = require('mongodb').GridStore,
// 	    //Grid = require('mongodb').Grid,
// 	    //Code = require('mongodb').Code,
// 	    //BSON = require('mongodb').pure().BSON,
// 	    //assert = require('assert');


// // var client = new MongoClient("mongodb://localhost/artsy_store");
// // var db = MongoClient.GetServer().GetDatabase("artsy_store");

// // console.log(db);



// // var collection = db.GetCollection("artsy_store");


// // 	console.log(collection);


// var Db = require('mongodb').Db,
// Server = require('mongodb').Server,
// Client = new Db('test', new Server('127.0.0.1', 27017, {}))

// console.log(Client.admin());
// console.log(MongoClient);

/*
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/' + $stateParams.name, function(err, db) {

	// console.log(db.listCollections());
	
	// db.listCollections(function(err, dbs) {
	// 	console.log(dbs);
		
	// })
	
	//db.listCollections({name:"arts"}).toArray(function(err, names) {


	// db.listCollections({}).toArray(function(err, names) {
 //    	console.log(names);
    	          
 //    })


	// Establish connection to db
	//db.open(function(err, db) {
		
		console.log(db);
		
	  // Use the admin database for the operation
	  var adminDb = db.admin();


	  //console.log(adminDb.getMongo());

	  console.log(adminDb);
	  // List all the available databases
	  adminDb.listDatabases(function(err, dbs) {
	    //assert.equal(null, err);
	    //assert.ok(dbs.databases.length > 0);

	    console.log(dbs);




	    

	    db.close();
	  //});



	 });


});
*/

// var db = new Db('test', new Server('localhost', 27017));


// 	//var dbs = Server.getMongo()

// 	db.getSiblingDB('artsy_store', function(err, names){
// 		console.log("Test");
		
// 		console.log(names);
		
// 	})

	
	//console.log(db.getMongo().getDB('test'));



// var db = new Db('artsy_store', new Server('localhost', 27017));

// console.log(db);

// db.collectionNames(function(err, db) {
// 	console.log(db);
	
// });

/*

	var db = new Db('test', new Server('localhost', 27017));


	//var dbs = Server.getMongo()

	
	db = db.getSiblingDB('artsy_store')
	console.log(db);
	//console.log(db.getMongo().getDB('test'));
	
	//db = db.getSiblingDB('main');
	// var db2 = db.getSiblingDB('test');
	// console.log(db2);
	// console.log(db2.getCollectionNames());
	

	// Establish connection to db
	db.open(function(err, db) {
		
		console.log(db);
		
	  // Use the admin database for the operation
	  var adminDb = db.admin();


	  //console.log(adminDb.getMongo());

	  console.log(adminDb);
	  // List all the available databases
	  adminDb.listDatabases(function(err, dbs) {
	    //assert.equal(null, err);
	    //assert.ok(dbs.databases.length > 0);

	    console.log(dbs);




	    

	    db.close();
	  });



	 });

	*/
});

app.controller('MainController', function ($scope, $state, MongoDbFactory) {
	//console.log("BottomViewController");
	$scope.dbsArr;
	$scope.totalSize;

	MongoDbFactory.getAllDatabases().then(function(dbsListObj){
		$scope.dbsArr = dbsListObj.databases;
		$scope.totalSize = dbsListObj.totalSize;

		$scope.$digest();
	}).catch(function(e) {console.log(e)});

	$scope.useDatabase = function(db){
		//console.log(db.name);
		
		//$state.go('collections/' + db.name);
		//$state.go('collections');
		

		//$state.go('collections/name' + db.name, { dbName: db.name });




		$state.go('collections', {name: db.name});

		// $state.go('collections', {name: db.name});
	}


		// console.log(dbs);
	 //    console.log(dbs.databases[0].name);
	 //    console.log(dbs.databases[0].sizeOnDisk);



	//var Promise = require('bluebird');

	//var getAllDbs = Promise.promisify(MongoDbFactory.getAllDatabases);
	// var getAllDbs = Promise.promisify(MongoDbFactory.getAllDatabases);
	
	//console.log(MongoDbFactory.getAllDatabases());
	
	//console.log(getAllDbs());




	// var testFunc = function(){
	// 	var test = function(){
	// 		return "test";
	// 	}
	// 	return test;
	// };

	// var testFuncPromise = Promise.promisify(testFunc);

	// console.log(testFuncPromise());

	// testFuncPromise().then(function(v) {
	//  	console.log("BottomViewController");
 //    	console.log(v);
	// })


	//console.log(getAllDbs());

	// console.log(MongoDbFactory.getAllDatabases());
	

	// MongoDbFactory.getAllDatabases()
	// .then(function(v) {
	// 	console.log("BottomViewController");
	//     console.log(v);
	// })

	//MongoDbFactory.getAllDatabases();




	// .catch(function(e) {

	// });
	//console.dir(getAllDatabases);
	
	// getAllDatabases().then(function(err, dbsArr){
	// 	console.log("BottomViewController", err;
	// });


	//var dbsArr = MongoDbFactory.getAllDatabases();
	//console.log("BottomViewController", dbsArr());

	// MongoDbFactory.getAllDatabases().then(function(dbsArr){
	// 	console.log("BottomViewController", dbsArr);
	// })
	
	
/*
	var Db = require('mongodb').Db,
	    MongoClient = require('mongodb').MongoClient,
	    Server = require('mongodb').Server;
	    //ReplSetServers = require('mongodb').ReplSetServers,
	    //ObjectID = require('mongodb').ObjectID,
	    //Binary = require('mongodb').Binary,
	    //GridStore = require('mongodb').GridStore,
	    //Grid = require('mongodb').Grid,
	    //Code = require('mongodb').Code,
	    //BSON = require('mongodb').pure().BSON,
	    //assert = require('assert');

	var db = new Db('trip', new Server('localhost', 27017));
	// Establish connection to db
	db.open(function(err, db) {

	  // Use the admin database for the operation
	  var adminDb = db.admin();

	  // List all the available databases
	  adminDb.listDatabases(function(err, dbs) {
	    //assert.equal(null, err);
	    //assert.ok(dbs.databases.length > 0);




	    console.log(dbs);
	    console.log(dbs.databases[0].name);
	    console.log(dbs.databases[0].sizeOnDisk);

	    

	    db.close();
	  });



	});
*/


// var MongoClient = require('mongodb').Mongos
// 	  , Server = require('mongodb').Server;

// 	console.log(MongoClient);
	

/*
	var MongoClient = require('mongodb').MongoClient
	  , Server = require('mongodb').Server;

	  // console.dir(MongoClient);
	  // console.dir(Server);
	  
	MongoClient.connect('mongodb://127.0.0.1:27017/trip', function (err, db) {
	    if (err) {
	        throw err;
	    } else {
	    	// var arr = db.adminCommand('listDatabases');
	    	//  console.log(arr);




	    	 // var arr = db.getCollectionNames();
	      //    console.log(arr);

	    	 





	      	console.dir(db);
	    	var collection = db.collection('trip');
	    	console.dir(collection);//console.dir(collection.collectionName);
	    	
		    // collection.insert({a:2}, function(err, docs) {
		    //     collection.count(function(err, count) {
		    //         console.log("count = %s", count));
		    //         db.close();
		    //     });
		    // });
	    	
	    	// var arr = db.getCollectionNames();
	    	// console.log(arr);
	    }
	    //db.close();
	});
*/
	// var mongoClient = new MongoClient(new Server('localhost', 27017));
	// console.log(mongoClient);
	
	// mongoClient.open(function(err, mongoClient) {
	// //   	//var db1 = mongoClient.db("mydb");

	//    	console.log("opened mongoClient");
	  
	//    	mongoClient.close();
	// });
	
});
