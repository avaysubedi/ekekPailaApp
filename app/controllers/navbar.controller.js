app.controller('NavbarController', ['UrlConfig','Config', 'TokenService', '$http', '$scope', '$filter', '$location', '$interval', 'ConfigurationService',
    function (UrlConfig,Config, TokenService, $http, $scope, $filter, $location, $interval, ConfigurationService) {
        var vm = this;


        vm.notification = {
            message: '',
            mode: 'info'
        };

        vm.init = function () {
            vm.loggedIn = TokenService.checkTokenValidity();

            //Check token presence and expiry, if not route to login
            // TokenService.navigateToLoginOnInvalidToken();
            if(vm.loggedIn){
            vm.loggedInAsAdmin = TokenService.getUserRoles().includes(Config.AdministratorRole);
            vm.loggedInUsername = TokenService.getUser();
            vm.Roles = TokenService.getUserRoles();
        }

            var today = new Date();
            $scope.date = $filter("date")(today, "yyyy/MM/dd");

            $scope.search = 'a';
            
            vm.closeShow = false;
            vm.openShow = true;

            vm.fetchCompanyName();
        };

     //   $interval(vm.init(),4000);



   $interval(vm.init, 4000);
        vm.company = true;
        vm.product = false;
        vm.sector = false;
        vm.party = false;


        vm.showModal = function () {
            $scope.isModalVisible = !$scope.isModalVisible;

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



        //STATEMENTS

        //STOCK MIS
        vm.showCompany = function () {
            vm.company = true;
            vm.product = false;
            vm.sector = false;
            vm.party = false;
        };
        vm.showProduct = function () {
            vm.company = false;
            vm.product = true;
            vm.sector = false;
            vm.party = false;
        };
        vm.showSector = function () {
            vm.company = false;
            vm.product = false;
            vm.sector = true;
            vm.party = false;
        };
        vm.showParty = function () {
            vm.company = false;
            vm.product = false;
            vm.sector = false;
            vm.party = true;
        };




        vm.showClose = function () {
            vm.openShow = false;
            vm.closeShow = true;
        };

        vm.showOpen = function () {
            vm.openShow = true;
            vm.closeShow = false;

        }

        vm.changePage = function (link) {
            //  console.log(newplace);   
            window.open('#!/' + link,
                '_self', '');
            $('.modal').modal('hide'); // hides all modals

        }









        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };



        vm.tryLogOff = function () {
            vm.loggedIn = false;
            TokenService.navigateToLoginOnClearToken();
        };


        vm.reset = function () {
            // $scope.date = null;
            // $scope.time = null;
            // $scope.email = null;
            // $scope.pname = null;
            // $scope.address = null;
            // $scope.mobile = null;
            // $scope.age = null;
            // $scope.sex = null;
            // $scope.dpid = null;
            // $scope.remarks = null;
            // $scope.referer = null;

        };

    }]);