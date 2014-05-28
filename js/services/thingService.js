(function () {

    'use strict';

    /**
     * thing
     *
        thing = [
            
            {
                url: ...,
                admin: ... //OPTIONNAL. If given, the user can edit
                userInside: boolean //true if user has join
            } 
        ]
     *
     * 
     * @type {Array}
     */
    var things = [
        {
            url: 'bde01f45180efb3376d81fb9',
            admin: '3339993a',
            userInside: true
        },
        {
            url: 'd5f414b47d50b3a3e7f627f4',
            //admin: 'adab9be2',
            userInside: false
        }
    ];


    window.app.factory('thingService', ['$q', 'apiService', 'userService', function ($q, apiService, userService) {


        //Deleta a string in an array of string
        var deleteInArray = function (string, array) {

            var index = array.indexOf(string);    // <-- Not supported in <IE9
            if (index !== -1) {
                array.splice(index, 1);
            }

            return array;
        };


        /**
         * getUrls
         * 
         * @return {Array} All urls in things
         */
        var getUrls = function () {

            var result = [];

            var i = 0;
            for (i = 0; i < things.length; i++) {

                result[i] = things[i].url;
            }

            return result;
        };

        //return index of a specific thing in things, by url
        var indexByUrl = function (url) {
            return $.map(things, function (e, index) {
                if (e.url === url) {
                    return index;
                }
            });
        };

        return {

            /**
             * get
             *
             * Get all things, with ZZZ infos
             *
             * A little bit tricky because we want to parse ZZZResp.zzz ...
             * 
             * @return {Array}
             */
            get: function () {

                var result = [];

                var t;
                var i = 0;
                var nb = things.length;

                var deferred = $q.defer();

                var callback =  function (data) {

                    data.ZZZResp.zzz = JSON.parse(data.ZZZResp.zzz);

                    nb--;

                    if (!nb) {
                        deferred.resolve(result);
                    }
                };

                for (i = 0; i < things.length; i++) {

                    t = things[i];

                    result[i] = {};

                    result[i].thing = t;

                    result[i].req = apiService.get({url: t.url});
                    result[i].req.$promise.then(callback);
                }

                return deferred.promise;

            },

            /**
             * join
             *
             * Join a zzz
             * 
             * @param  {string} url
             */
            join: function (url, callback) {

                things[indexByUrl(url)[0]].userInside = true;

                var msg = {
                    url: url,
                    me: userService.me()
                };

                apiService.join(null, msg, function (data) {
                    userService.id(data.ZZZResp.id);
                    userService.key(data.ZZZResp.key);

                    callback(indexByUrl(url)[0]);
                });

            },

            /**
             * myUrls
             * 
             * @param  {Function} callback Optionnal
             * @return {Array}            Things url I've join
             */
            myUrls: function (callback) {

                var myThings = [];

                $.map(things, function (thing) {
                    if (thing.userInside) {
                        myThings.push(thing.url);
                    }
                });

                if (callback) {
                    callback(myThings);
                }

                return myThings;

            },

            /**
             * exit
             *
             * Exit a zzz
             * 
             * @param  {string} url 
             */
            exit: function (url, callback) {

                things[indexByUrl(url)[0]].userInside = false;

                var urls = getUrls();

                urls = deleteInArray(url, urls);

                var msg = {
                    id: userService.id(),
                    key: userService.key(),
                    urls: urls,
                    me: userService.me()
                };

                apiService.refresh(null, msg, function (data) {
                    callback(indexByUrl(url)[0]);
                });

            }

        };

    }]);


}());