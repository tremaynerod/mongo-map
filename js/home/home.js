'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        // template: '<h1>Welcome Home</h1>'
        templateUrl: 'js/home/home.html'
    });
});