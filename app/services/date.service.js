app.value('TodayDate', {
    'gfinaldt': new Date()
});



app.factory('DateService', ['$rootScope', '$http', '$q', 'UrlConfig', '$timeout', function ($rootScope, $http, $q, UrlConfig, $timeout) {

    var date = null;
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "/" + (month) + "/" + (day);
     var name= "";
     var ginitdt = now.getFullYear() + "/" + (month) + "/" + (day);
     var gfinaldt = "";


    function getInitDate() {
        return ginitdt;
    }

    function setInitDate(newinit) {
        ginitdt = newinit;
    }

    function setName(name) {
        this.name = name;
        // $timeout(function(){
        //     $rootScope.$broadcast("newname");
        // }, 0)
        //
    }

    function getName() {
        return this.name;
    }
    function adToBsToday() {
        var todayfull = new Date();
        var day = ("0" + todayfull.getDate()).slice(-2);
        var month = ("0" + (todayfull.getMonth() + 1)).slice(-2);
        var todayad = todayfull.getFullYear() + "/" + (month) + "/" + (day);

        var deferred = $q.defer();
        $http.get(UrlConfig.labReportBaseUrl() + 'api/ad2bs?ad_date=' + todayad)
            .then(function (result) {
               // console.log(result.data);
                AdToBsDateToday = result.data;
                deferred.resolve(result.data);
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function adToBs(addate) {
        var deferred = $q.defer();
        $http.get(UrlConfig.labReportBaseUrl() + 'api/ad2bs?ad_date=' + addate)
            .then(function (result) {
               // console.log(result.data);
                AdToBsDate = result.data;
                deferred.resolve(result.data);
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function bsToAd(bsdate) {
        var deferred = $q.defer();
        $http.get(UrlConfig.labReportBaseUrl() + 'api/bs2ad?bs_date=' + bsdate)
            .then(function (result) {
                console.log(result.data);
                BsToAdDate = result.data;
                deferred.resolve(result.data);
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            });
        return deferred.promise;
    }


    function getFinalDate() {
        var gfinaldt = now;
        return gfinaldt;
    }


    return {
        getInitDate: getInitDate,
        getFinalDate: getFinalDate,
        bsToAd: bsToAd,
        adToBs: adToBs,
        setName: setName,
        getName: getName,
        setInitDate : setInitDate,
        adToBsToday : adToBsToday


    };
}]);