app.factory("ConfigurationService", [
  "$http",
  "$q",
  "UrlConfig",
  function ($http, $q, UrlConfig) {
    var serviceList = null;
    var companyName = null;
    var addressList = null;

    function fetchConfigs() {
      var deferred = $q.defer();

      if (serviceList !== null && serviceList !== undefined) {
        deferred.resolve(serviceList);
      } else {
        var token = localStorage.getItem("access_token");

        // $http.get(UrlConfig.labReportBaseUrl() + 'api/service', { headers: { Authorization: 'Bearer ' + token } })

        // $http.get('http://macbook/medipro.api.Medipro/api/services')
        $http
          .get(UrlConfig.labReportBaseUrl() + "api/system/ConfigValue/vat")

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

    function fetchCompanyNames() {
      var deferred = $q.defer();

      if (companyName !== null && companyName !== undefined) {
        deferred.resolve(companyName);
      } else {
        var token = localStorage.getItem("access_token");
        $http
          .get(UrlConfig.labReportBaseUrl() + "api/system/ConfigValue/COMPANY1")

          .then(
            function (result) {
              companyName = result.data;
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

    function fetchAddresses() {
      var deferred = $q.defer();

      if (addressList !== null && addressList !== undefined) {
        deferred.resolve(addressList);
      } else {
        var token = localStorage.getItem("access_token");

        $http
          .get(UrlConfig.labReportBaseUrl() + "api/system/ConfigValue/ADDRESS")
          .then(
            function (result) {
              addressList = result.data;
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
      fetchConfigs: fetchConfigs,
      fetchCompanyNames: fetchCompanyNames,
      fetchAddresses: fetchAddresses,
    };
  },
]);
