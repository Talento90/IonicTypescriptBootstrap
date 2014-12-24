'use strict';
angular.module('ng-cordova', []).run();
'use strict';
angular.module('ng-cordova').factory('cordovaReady', function () {
  return function (fn) {
    var queue = [];
    var impl = function () {
      queue.push(Array.prototype.slice.call(arguments));
    };
    document.addEventListener('deviceready', function () {
      queue.forEach(function (args) {
        fn.apply(this, args);
      });
      impl = fn;
    }, false);
    return function () {
      return impl.apply(this, arguments);
    };
  };
});
'use strict';
var Camera = Camera || {
    PictureSourceType: {
      PHOTOLIBRARY: 0,
      CAMERA: 1,
      SAVEDPHOTOALBUM: 2
    },
    DestinationType: {
      DATA_URL: 0,
      FILE_URI: 1,
      NATIVE_URI: 2
    },
    EncodingType: {
      JPEG: 0,
      PNG: 1
    },
    MediaType: {
      PICTURE: 0,
      VIDEO: 1,
      ALLMEDIA: 2
    },
    Direction: {
      BACK: 0,
      FRONT: 1
    }
  };
angular.module('ng-cordova').factory('cordovaCamera', [
  '$rootScope',
  'cordovaReady',
  function ($rootScope, cordovaReady) {
    return {
      getPicture: cordovaReady(function (successCallback, errorCallback, options) {
        navigator.camera.getPicture(function () {
          var that = this, args = arguments;
          if (successCallback) {
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                successCallback.apply(that, args);
              });
            }
          }
        }, function () {
          var that = this, args = arguments;
          if (errorCallback) {
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                errorCallback.apply(that, args);
              });
            }
          }
        }, options);
      })
    };
  }
]);
'use strict';
angular.module('ng-cordova').factory('filesystem', [
  '$rootScope',
  '$window',
  'cordovaReady',
  function ($rootScope, $window, cordovaReady) {
    return {
      requestFileSystem: cordovaReady(function (type, size, successCallback, errorCallback) {
        var requestFileSystem = $window.requestFileSystem || $window.webkitRequestFileSystem;
        requestFileSystem(type, size, function () {
          var that = this, args = arguments;
          if (successCallback) {
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                successCallback.apply(that, args);
              });
            }
          }
        }, function () {
          var that = this, args = arguments;
          if (errorCallback) {
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                errorCallback.apply(that, args);
              });
            }
          }
        });
      })
    };
  }
]);