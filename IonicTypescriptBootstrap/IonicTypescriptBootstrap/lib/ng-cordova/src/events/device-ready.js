'use strict';
angular.module('ng-cordova').factory('cordovaReady', function() {
	return function(fn) {
		var queue = [];
		var impl = function() {
			queue.push(Array.prototype.slice.call(arguments));
		};
		document.addEventListener('deviceready', function() {
			queue.forEach(function(args) {
				fn.apply(this, args);
			});
			impl = fn;
		}, false);
		return function() {
			return impl.apply(this, arguments);
		};
	};
});