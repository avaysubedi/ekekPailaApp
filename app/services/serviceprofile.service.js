app.factory("ServiceProfileService", [
  "$http",
  "$q",
  "UrlConfig",
  function ($http, $q, UrlConfig) {
    var serviceList = null;

    function fetchServices() {
      var deferred = $q.defer();

      if (serviceList !== null && serviceList !== undefined) {
        deferred.resolve(serviceList);
      } else {
        var token = localStorage.getItem("access_token");

        // $http.get(UrlConfig.labReportBaseUrl() + 'api/service', { headers: { Authorization: 'Bearer ' + token } })

        // $http.get('http://macbook/medipro.api.Medipro/api/services')
        $http
          .get(UrlConfig.labReportBaseUrl() + "api/services")

          // $http.get('http://192.168.60.165/medipro.api.Medipro/api/services')

          .then(
            function (result) {
              serviceList = result.data;
              deferred.resolve(result.data);
            },
            function (error) {
              console.log(error);
              deferred.reject(error);
            }
          );
      }

      return deferred.promise;
    }

    return {
      fetchServices: fetchServices,
    };
  },
]);
