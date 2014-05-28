(function () {

    'use strict';

    window.app.controller('userController', [
        '$scope',
        '$rootScope',
        '$http',
        'userService',
        'apiService',
        'thingService',
        function ($scope, $rootScope, $http, userService, apiService, thingService) {

            $scope.user = userService.get();

            $scope.save = function () {

                $rootScope.loading = true;

                var msg = $scope.user;
                msg.urls = thingService.myUrls();

                //We're already in a zzz, refresh
                if (msg.id && msg.key) {
                    console.log("ici");

                    apiService.refresh(null, msg, function (data) {

                        userService.get($scope.user, function () {
                            $rootScope.loading = false;
                        });

                    });

                } else { //Just save

                    userService.get($scope.user, function () {

                        $rootScope.loading = false;
                    });

                }

                $scope.user = userService.get();
            };

        }
    ]);

}());
