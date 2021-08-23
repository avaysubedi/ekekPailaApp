app.factory('ClientProfileService', ['$http', '$q', 'UrlConfig', function ($http, $q, UrlConfig) {
    var clientList = null;

    function fetchClients(){
        var deferred = $q.defer();

        if(clientList !== null && clientList !== undefined){
            deferred.resolve(clientList);
        } else {
            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/clients', { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    clientList = result.data;
                    deferred.resolve(result.data);
                }, function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
        }

        return deferred.promise;  
    }

    return {
        fetchClients: fetchClients
    }; 
}]);