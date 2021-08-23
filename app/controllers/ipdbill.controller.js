app.controller('IpdBillController', ['UrlConfig', 'TokenService', 'DateService', '$http', '$scope', '$filter', '$location', '$timeout',
    function (UrlConfig, TokenService, DateService, $http, $scope, $filter, $location, $timeout) {
        var vm = this;

        vm.title = 'IPD Bill ';

        vm.notification = {
            message: '',
            mode: 'info'
        };

        vm.init = function () {
            vm.loggedInUsername = TokenService.getUser();

            vm.Roles = TokenService.getUserRoles();

            //Check token presence and expiry, if not route to login
            TokenService.navigateToLoginOnInvalidToken();

            $scope.init = DateService.getInitDate();
            $scope.final = DateService.getFinalDate();

            vm.initdate = $filter("date")($scope.init, "yyyy/MM/dd");
            vm.finaldate = $filter("date")($scope.final, "yyyy/MM/dd");


            $scope.today = new Date();


            $scope.datetype = 'ad';
            $scope.by = 'date';



        };

        //AD TO BS
        vm.AdToBsInit = function (init) {
            DateService.adToBs(init)
                .then(function (bsinitdata) {
                    vm.BsInit = bsinitdata[0];
                    vm.bsdateinit = $filter("date")(bsinitdata[0].bs_date, "yyyy/MM/dd");
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };
        vm.AdToBsFinal = function (final) {
            DateService.adToBs(final)
                .then(function (bsfinaldata) {
                    vm.BsFinal = bsfinaldata[0];
                    vm.bsdatefinal = $filter("date")(bsfinaldata[0].bs_date, "yyyy/MM/dd");
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };
        //BS TO AD
        vm.BsToAdInit = function (init) {
            DateService.bsToAd(init)
                // $http.get(UrlConfig.reportBaseUrl() + 'api/bs2ad?bs_date=' + init)

                .then(function (adinitdata) {
                    vm.AdInit = adinitdata[0];
                    vm.initdate = $filter("date")(vm.AdInit.ad_date, "yyyy/MM/dd");
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };

        vm.BsToAdFinal = function (final) {
            //vm.addatefinal= '';
            //$http.get(UrlConfig.reportBaseUrl() + 'api/bs2ad?bs_date=' + final)
            DateService.bsToAd(final)
                .then(function (adfinaldata) {
                    vm.AdFinal = adfinaldata[0];
                    vm.finaldate = $filter("date")(vm.AdFinal.ad_date, "yyyy/MM/dd");
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };


        $scope.items = [
            {
                'date': $scope.today,
                'time': '12:00',
                'oraltype': 'demo',
                'oralamount': '123',
            }


        ]




        vm.fetchProfilLossReport = function () {
            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();
            $http.get(UrlConfig.labReportBaseUrl() + 'api/ProfitLossReport?init=' + vm.initdate + '&final=' + vm.finaldate +
                '&opening_inc=1&stock=0&firm=1&closing_ex=0&userid=' + userId + '&all_firm=1&pl_bs=' + vm.pl_bs + '&account_type=0', { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.ProfilLossReport = result.data;

                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
        };

        vm.onItemSelected = function (item) {
            vm.selectedItem = item;


            window.open('#!/generalledger?acCode=' + vm.selectedItem.ac_code,
                '_blank', '');
        };




        vm.PrintRecord = function () {
            printData();
        };
        function printData() {
            $scope.full = 12;
            $scope.IsHeadVisible = $scope.IsHeadVisible ? false : true;
            var divToPrint = document.getElementById("report");

            var htmlToPrint = '' +
                '<style type="text/css">' +
                'th, td {' +
                'border-bottom:0.002em solid #000;padding: 0px;font-size:12px;margin:0px;' + '}' +
                '</style>';
            htmlToPrint += divToPrint.outerHTML;
            newWin = window.open("");
            newWin.document.write(htmlToPrint);
            newWin.print();
            newWin.close();
        }


        vm.Export = function () {
            $("#report").table2excel({
                filename: "Report" + vm.initdate + "To " + vm.finaldate + ".xls"
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