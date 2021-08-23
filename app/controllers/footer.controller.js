app.controller('FooterController', ['UrlConfig', 'TokenService','ConfigurationService', '$http', '$scope', '$timeout',
    function (UrlConfig, TokenService,ConfigurationService, $http, $scope, $timeout,) {
        var vm = this;


        vm.notification = {
            message: '',
            mode: 'info'
        };

        vm.init = function () {



            vm.fetchAddressList();
            vm.fetchCompanyName();

            var nowyear = new Date();

            vm.year = nowyear.getFullYear();
        };


        vm.fetchAddressList = function () {
            ConfigurationService.fetchAddresses()
                .then(function (data) {
                    vm.address = data.value;
                    //  console.log(data.value);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
        };
        vm.fetchCompanyName = function () {
            ConfigurationService.fetchCompanyNames()
                .then(function (data) {
                    vm.companyName = data.value;
                    // console.log(data.value);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
        };

        vm.btnunhide = function () {
            $scope.uploadBtn = !$scope.uploadBtn;

        };



        vm.noalert = function () {
            $timeout(vm.resetNotification, 4000);
        };

        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };


        vm.reset = function () {

        };

    }]);