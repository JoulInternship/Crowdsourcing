(function () {

    'use strict';

    window.app = angular.module('crowd', ['ngRoute', 'ngResource']);


    window.app.config(function ($routeProvider, $httpProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'listController'
            })
            .when('/user', {
                templateUrl: 'partials/user.html',
                controller: 'userController'
            })
            .otherwise({redirectTo: '/'});

        $httpProvider.defaults.headers.common.Accept = 'application/json, text/javascript';

    });



}());