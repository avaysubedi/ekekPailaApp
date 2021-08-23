app.controller('TestReportController', ['$http', 'Config', 'UrlConfig', 'TokenService', '$scope', '$routeParams', 'BroadcastService',
    function ($http, Config, UrlConfig, TokenService, $scope, $routeParams, BroadcastService) {

        var vm = this;

        vm.pagetitle = "Test Report";
        //vm.selectedTitle = null;
        //vm.selectedOpdBill = null;
        BroadcastService.notify('radioNavVisible', true);
        BroadcastService.notify('navText', 'Reporting');
        BroadcastService.notify('labNavVisible', false);
        vm.init = function () {
            TokenService.navigateToLoginOnInvalidToken();

            // vm.fetchTestReportList();

            vm.sn = $routeParams.id;
            vm.fetchTestReportList();

            vm.spaceabove = Config.spaceAbove;
            // vm.fetchRefererList();

        };

        // var sn= $scope.sn;

        vm.fetchTestReportList = function () {
            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/TestReporting/' + vm.sn,
                { headers: { Authorization: 'Bearer ' + token } })


                .then(function (result) {

                    vm.TestReportingList = result.data;

                    vm.sn = result.data.sn;
                    vm.detailid = result.data.detailid;
                    vm.inv_no = result.data.inv_no;
                    //vm.qualification = result.data.qualification;
                    // vm.referer = result.data.referer;
                    vm.refid = result.data.refid;
                    vm.refid1 = result.data.refid1;
                    vm.regno = result.data.regno;
                    vm.servid = result.data.servid;
                    vm.userid = result.data.userid;
                    vm.referer = result.data.referer;
                    vm.title = result.data.title;
                    vm.report = result.data.report;
                    vm.pname = result.data.pname;
                    vm.qualification = result.data.qualification;
                    vm.address = result.data.address;
                    vm.sex = result.data.sex;
                    vm.age = result.data.age;
                    vm.bs_inv_date = result.data.bs_inv_date;
                    vm.inv_date = result.data.inv_date;
                    vm.hospid = result.data.hospid;
                    vm.reportTitle = result.data.reporttitle;
                    vm.servname = result.data.servname;





                    document.getElementById("p1").innerHTML = result.data.report;

                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
        };





        vm.PrintRecord = function () {
            if ($scope.headerInclude) {
                vm.space = '0em';
            }
            else {
                vm.space = vm.spaceabove;
            }
            printData();
            $scope.show = !$scope.show;
        }
        function printData() {
            $scope.full = 12;
            $scope.IsHeadVisible = $scope.IsHeadVisible ? false : true;
            var divToPrint = document.getElementById("report");

            var htmlToPrint = '' +
                '<style type="text/css">' +
                '@page{margin-top:' + vm.space + '!important;}' +
                'th, td {' +
                'border-bottom:0.001em solid #000;padding: 0px;font-size:13px;line-height:14px;text-align: left;margin-bottom:10px !important;}' +
                '#get {display: none;} ' +
                // 'tbody{min-height: 25em !important;}' +
                '#name{font-weight: bold;}' +
                '#right{text-align: right !important;}' +
                '#left{text-align: left !important;}' +
                '.noborder{ border-bottom:none}' +
                '</style>';
            htmlToPrint += divToPrint.outerHTML;
            newWin = window.open("");
            newWin.document.write(htmlToPrint);
            newWin.print();
            newWin.close();
        }

    }]);