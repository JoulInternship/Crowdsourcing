(function () {

    'use strict';

    window.app.factory('userService', function () {

        var user = {
            id: null,
            key: null,
            me : {
                nick: 'Guigui',
                mood: 'Ça roule'
            }
        };

        return {

            get: function (u, callback) {

                if (u) {
                    user = u;
                }

                if (callback) {
                    callback(user);
                }

                return user;
            },

            id: function (id, callback) {

                if (id) {
                    user.id = id;
                }

                if (callback) {
                    callback(user.id);
                }

                return user.id;
            },

            key: function (key, callback) {
                if (key) {
                    user.key = key;
                }

                if (callback) {
                    callback(user.key);
                }

                return user.key;
            },

            me : function (me, callback) {

                if (me) {
                    user.me = me;
                }

                if (callback) {
                    callback(user.me);
                }

                return user.me;
            }
        };

    });

}());