'use strict';
app.config(function ($stateProvider) {

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

    $stateProvider.state('items', {
    	url: '/:dbName/:collectionName',
	    templateUrl: 'js/main/subviews/items.html',
	    controller: 'itemsController'
	});
});

app.controller('itemsController', function ($scope, $state, $stateParams, MongoDbFactory, $timeout) {
    $scope.filePathChanged = function(event){
        $scope.exportPathObj = event.target.files[0];
        $scope.$digest(); 
    };

    $scope.exportCollection = function(filePathObj){
        var rf = require('fs').readFile;
        var executeCommand = require('child_process').exec;

        var exportPath = filePathObj.path;
        var command = "mongoexport --db "+ $stateParams.dbName + " --collection "+ $stateParams.collectionName + " --out " + exportPath + "/" + $stateParams.collectionName + ".json";
        executeCommand(command, function (err, output) {

            $scope.displayMessage = "Collection " + $stateParams.collectionName + " Exported";
            $timeout(function() {
                $scope.displayMessage = null;
            }, 1000); 
            $scope.$digest();
        });
    }

	var ObjectID = require('mongodb').ObjectID;
	$scope.items;
	MongoDbFactory.getAllItemsInCollection($stateParams.dbName, $stateParams.collectionName).then(function(items){
			$scope.items = items;
			$scope.$digest();
	}).catch(function(e) {console.log(e)});

    $scope.goToCollections = function(){
        $state.go('collections', {name: $stateParams.dbName});
    };

	$scope.modifyProp = function(key, val, item){
		//bug not modifying id's properly		
		if(item[key]._bsontype){
			item[key] = new ObjectID.createFromHexString(val);	
		}else{
			item[key] = val;
		}
		MongoDbFactory.modifyItem($stateParams.dbName, $stateParams.collectionName, item, key).then(function(){
			$scope.displayMessage = "Item Updated";
            $timeout(function() {
                $scope.displayMessage = null;
            }, 1000); 
            $scope.$digest();
		});
	};

	$scope.deleteItem = function(item){
		MongoDbFactory.deleteItem($stateParams.dbName, $stateParams.collectionName, item).then(function(){
			$scope.displayMessage = "Item Deleted";
            $timeout(function() {
                $scope.displayMessage = null;
            }, 1000); 


			MongoDbFactory.getAllItemsInCollection($stateParams.dbName, $stateParams.collectionName).then(function(items){
					$scope.items = items;
					$scope.$digest();
			}).catch(function(e) {console.log(e)});

		}).catch(function(e) {console.log(e)});
	};

	$scope.deleteProp = function(key, val, item){
		MongoDbFactory.deleteProp($stateParams.dbName, $stateParams.collectionName, item, key).then(function(){			
			$scope.displayMessage = "Document Removed";
            $timeout(function() {
                $scope.displayMessage = null;
            }, 1000); 

			MongoDbFactory.getAllItemsInCollection($stateParams.dbName, $stateParams.collectionName).then(function(items){
				$scope.items = items;
				$scope.$digest();
			}).catch(function(e) {console.log(e)});


		}).catch(function(e) {console.log(e)});
	};
});
/*
app.controller('CollectionsTopController', function ($scope, $state, $stateParams, MongoDbFactory) {

	MongoDbFactory.getCollections($stateParams.name).then(function(collections){
		//$scope.collections = collections;
		console.log(collections);
		
		$scope.$digest();
	}).catch(function(e) {console.log(e)});



	var color = 'gray';
    var len = undefined;
    var nodes = [{id: 0, label: "0", group: 0},
        {id: 1, label: "1", group: 0},
        {id: 2, label: "2", group: 0},
        {id: 3, label: "3", group: 1},
        {id: 4, label: "4", group: 1},
        {id: 5, label: "5", group: 1},
        {id: 6, label: "6", group: 2},
        {id: 7, label: "7", group: 2},
        {id: 8, label: "8", group: 2},
        {id: 9, label: "9", group: 3},
        {id: 10, label: "10", group: 3},
        {id: 11, label: "11", group: 3},
        {id: 12, label: "12", group: 4},
        {id: 13, label: "13", group: 4},
        {id: 14, label: "14", group: 4},
        {id: 15, label: "15", group: 5},
        {id: 16, label: "16", group: 5},
        {id: 17, label: "17", group: 5},
        {id: 18, label: "18", group: 6},
        {id: 19, label: "19", group: 6},
        {id: 20, label: "20", group: 6},
        {id: 21, label: "21", group: 7},
        {id: 22, label: "22", group: 7},
        {id: 23, label: "23", group: 7},
        {id: 24, label: "24", group: 8},
        {id: 25, label: "25", group: 8},
        {id: 26, label: "26", group: 8},
        {id: 27, label: "27", group: 9},
        {id: 28, label: "28", group: 9},
        {id: 29, label: "29", group: 9}
    ];
    var edges = [{from: 1, to: 0},
        {from: 2, to: 0},
        {from: 4, to: 3},
        {from: 5, to: 4},
        {from: 4, to: 0},
        {from: 7, to: 6},
        {from: 8, to: 7},
        {from: 7, to: 0},
        {from: 10, to: 9},
        {from: 11, to: 10},
        {from: 10, to: 4},
        {from: 13, to: 12},
        {from: 14, to: 13},
        {from: 13, to: 0},
        {from: 16, to: 15},
        {from: 17, to: 15},
        {from: 15, to: 10},
        {from: 19, to: 18},
        {from: 20, to: 19},
        {from: 19, to: 4},
        {from: 22, to: 21},
        {from: 23, to: 22},
        {from: 22, to: 13},
        {from: 25, to: 24},
        {from: 26, to: 25},
        {from: 25, to: 7},
        {from: 28, to: 27},
        {from: 29, to: 28},
        {from: 28, to: 0}
    ]
    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            shape: 'dot',
            size: 30,
            font: {
                size: 32,
                color: '#ffffff'
            },
            borderWidth: 2
        },
        edges: {
            width: 2
        }
    };
    var network = new vis.Network(container, data, options);



});
*/


//display message
//maybe adding ability if time
//mongo import if time

app.controller('CollectionsBottomController', function ($scope, $state, $stateParams, MongoDbFactory, $timeout) {
	var rf = require('fs').readFile;
    var executeCommand = require('child_process').exec;

	MongoDbFactory.getCollections($stateParams.name).then(function(collections){
		$scope.collections = collections;
		$scope.$digest();
	}).catch(function(e) {console.log(e)});

    $scope.importFilePathChanged = function(event){
        $scope.importPathObj = event.target.files[0];
        $scope.$digest(); 
    };

    $scope.exportFilePathChanged = function(event){
        $scope.exportPathObj = event.target.files[0];
        $scope.$digest(); 
    };

    $scope.importCollection = function(importPathObj){

        var collectionName = importPathObj.name;
        var importPath = importPathObj.path;

        var command = "mongoimport --db "+ $stateParams.name + " --collection " + collectionName.split('.json')[0] + " --file " + importPath; //+ ".json";
        executeCommand(command, function (err, output) {            
            $scope.displayMessage = "Collection " + collectionName + " Imported";
            $timeout(function() {
                $scope.displayMessage = null;
            }, 1000); 
            
            MongoDbFactory.getCollections($stateParams.name).then(function(collections){
                $scope.collections = collections;
                $scope.$digest();
            }).catch(function(e) {console.log(e)});
        });
    };

    $scope.exportDatabase = function(exportPathObj){
        var Promise = require('bluebird');
        var rf = require('fs').readFile;
        var childProccess = require('child_process');

        var exportPath = exportPathObj.path;

        var commandsArr = [];
        $scope.collections.forEach(function(collection){   
            if(collection.name !== "system.indexes")         
                commandsArr.push("mongoexport --db "+ $stateParams.name + " --collection " + collection.name + " --out " + exportPath + "/" + $stateParams.name + "/" + collection.name + ".json");
        });

        commandsArr.map(function execAndPromisify(command) { 
            var executeCommand = Promise.promisify(childProccess.exec)                   
            return executeCommand.call(childProccess, command).then(function(err, output){
                return output;
            }); 
        });
        var databaseExported = Promise.all(commandsArr);

        databaseExported.then(function(){
            $scope.displayMessage = "Database " + $stateParams.name + " Exported";
            $timeout(function() {
                $scope.displayMessage = null;
            }, 1000); 
            $scope.$digest();
        });  
    };


    $scope.goToDatabases = function(){
        $state.go('main');
    };

	$scope.useCollection = function(collection){
		$state.go('items', {dbName: $stateParams.name, collectionName: collection.name});
	};

	$scope.deleteCollection = function(collection){
		MongoDbFactory.deleteCollection($stateParams.name, collection.name).then(function(){
			$scope.displayMessage = "Collection Deleted";
            $timeout(function() {
                $scope.displayMessage = null;
            }, 1000); 

			MongoDbFactory.getCollections($stateParams.name).then(function(collections){
				$scope.collections = collections;
				$scope.$digest();
			}).catch(function(e) {console.log(e)});
		}).catch(function(e) {console.log(e)});
	};
});

app.controller('MainController', function ($scope, $state, MongoDbFactory, $timeout) {
    var rf = require('fs').readFile;
    var executeCommand = require('child_process').exec;
    var Promise = require('bluebird');
    var childProccess = require('child_process');

	$scope.dbsArr;
    $scope.importPathObj = null;

	MongoDbFactory.getAllDatabases().then(function(dbsListObj){
		$scope.dbsArr = dbsListObj.databases;
		$scope.$digest();
	}).catch(function(e) {console.log(e)});

    $scope.filePathChanged = function(event){
        $scope.importPathObj = event.target.files[0];
        $scope.$digest(); 
    };

    $scope.importDatabase = function(filePathObj){   
        var dbName = filePathObj.name;
        var path = filePathObj.path;
        console.log(path);
        var executeCommand = Promise.promisify(childProccess.exec); 
        executeCommand.call(childProccess, "ls " + path).then(function(output){         
            var outputArr = output[0].split('\n');
            outputArr.pop(); 
            return outputArr;
        })
        .then(function(collections){
            var commandsArr = [];
            collections.forEach(function(collection){  
                commandsArr.push("mongoimport --db "+ dbName + " --collection "+ collection.split('.json')[0] + " --file " + path + "/" + collection);
                //commandsArr.push("mongoimport --db "+ dbName + " --collection "+ collection.split('.json')[0] + " --file exports/databases/" + dbName + "/" + collection);
            });
            
            commandsArr.map(function execAndPromisify(command) { 
                var executeCommand = Promise.promisify(childProccess.exec)                   
                return executeCommand.call(childProccess, command).then(function(err, output){
                    return output;
                }); 
            });

            var databaseImported = Promise.all(commandsArr);
            databaseImported.then(function(){
                MongoDbFactory.getAllDatabases().then(function(dbsListObj){
                    $scope.dbsArr = dbsListObj.databases;
                    $scope.displayMessage = "Database " + dbName + " Imported";
                    $timeout(function() {
                        $scope.displayMessage = null;
                    }, 1000); 
                    $scope.$digest();
                }).catch(function(e) {console.log(e)});
            });
        });  
    };

	$scope.useDatabase = function(db){
		$state.go('collections', {name: db.name});
	};

	$scope.deleteDatabase = function(db){
		MongoDbFactory.deleteDatabase(db.name).then(function(){
			$scope.displayMessage = "Database Deleted";
            $timeout(function() {
                $scope.displayMessage = null;
            }, 1000); 

			MongoDbFactory.getAllDatabases().then(function(dbsListObj){
				$scope.dbsArr = dbsListObj.databases;
				$scope.$digest();
			}).catch(function(e) {console.log(e)});
		}).catch(function(e) {console.log(e)});
	};
});
