app.factory('BroadcastService', ['$rootScope', function ($rootScope) {
    return {
        subscribe: function(eventName, scope, callback) {
            var handler = $rootScope.$on(eventName, callback);
            scope.$on('$destroy', handler);
        },

        notify: function(eventName, msg) {
            $rootScope.$emit(eventName, {message: msg});
        }
    };
}]);