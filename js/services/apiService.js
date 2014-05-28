(function () {

    'use strict';


    window.app.factory('apiService', ['$resource', function ($resource) {

        var url = "http://www.zoomzoomzen.com/zzz";

        return $resource(
            url,
            {
                t: Math.round(Date.now() / 10000) //always send timestamp
            },
            {
                get: {
                    method: 'GET',
                    responseType: 'json'
                },
                join: {
                    method: 'POST',
                    responseType: 'json'
                },
                refresh: {
                    method: 'POST',
                    responseType: 'json'
                }
            }
        );

    }]);

}());