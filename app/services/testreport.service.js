app.factory('TestReportService', ['$http', '$q', 'UrlConfig', function ($http, $q, UrlConfig) {
    var clientList = null;

    function fetchOpdBills(){
        var deferred = $q.defer();

        if(OpdBillList !== null && OpdBillList !== undefined){
            deferred.resolve(OpdBillList);
        } else {
            // var token = localStorage.getItem('access_token');
          
            $http.get('http://macbook/medipro.api.Medipro/api/opdbill/1')

            // $http.get(UrlConfig.labReportBaseUrl() + 'api/clients', { headers: { Authorization: 'Bearer ' + token } })
                
            .then(function (result) {
                OpdBillList = result.data;
                    deferred.resolve(result.data);
                }, function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
        }

        return deferred.promise;  
    }

    return {
        fetchOpdBills : fetchOpdBills
    }; 
}]);