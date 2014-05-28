(function () {

    'use strict';

    window.app.controller('listController', [
        '$scope',
        '$rootScope',
        'thingService',
        '$routeParams',
        'userService',
        'thingService',
        function ($scope, $rootScope, $http, $routeParams, userService, thingService) {


            var getThings = function () {
                $rootScope.loading = true;
                thingService.get().then(function (result) {
                    $scope.things = result;
                    $rootScope.loading = false;
                });
            };

            $scope.join = function (url) {

                $rootScope.loading = true;

                thingService.join(url, function (data) {
                    $rootScope.loading = false;
                    getThings();
                });

            };

            $scope.exit = function (url) {

                $rootScope.loading = true;

                thingService.exit(url, function () {
                    $rootScope.loading = false;
                    getThings();
                });

            };


            getThings();
        }
    ]);

}());
