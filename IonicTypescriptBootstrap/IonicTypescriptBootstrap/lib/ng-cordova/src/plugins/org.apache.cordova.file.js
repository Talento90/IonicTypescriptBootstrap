'use strict';
angular.module('ng-cordova').factory('filesystem', ['$rootScope', '$window', 'cordovaReady',
    function($rootScope, $window, cordovaReady) {
        return {
            requestFileSystem: cordovaReady(function(type, size, successCallback, errorCallback) {
                var requestFileSystem = $window.requestFileSystem || $window.webkitRequestFileSystem;
                requestFileSystem(type, size, function() {
                    var that = this,
                        args = arguments;
                    if (successCallback) {
                        if (!$rootScope.$$phase) {
                            $rootScope.$apply(function() {
                                successCallback.apply(that, args);
                            });
                        }
                    }
                }, function() {
                    var that = this,
                        args = arguments;
                    if (errorCallback) {
                        if (!$rootScope.$$phase) {
                            $rootScope.$apply(function() {
                                errorCallback.apply(that, args);
                            });
                        }
                    }
                });
            })
        };
    }
]);