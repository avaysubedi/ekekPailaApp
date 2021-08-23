app.controller('TestListController', ['$http', 'UrlConfig', 'TokenService', 'DateService', '$scope', '$filter', '$timeout', 'BroadcastService',
    function ($http, UrlConfig, TokenService, DateService, $scope, $filter, $timeout, BroadcastService) {

        var vm = this;

        vm.pagetitle = "Print List";
        //vm.selectedTitle = null;
        //vm.selectedOpdBill = null;

        vm.init = function () {
            $scope.loadtrue = false;

            TokenService.navigateToLoginOnInvalidToken();

            BroadcastService.notify('radioNavVisible', true);
            BroadcastService.notify('navText', 'Reporting');
            BroadcastService.notify('labNavVisible', false);

            $scope.init = localStorage.getItem('init');
            $scope.final = localStorage.getItem('final');
            vm.initdate = new Date($scope.init);
            vm.finaldate = new Date($scope.final);
            vm.initFiltered = $filter("date")(vm.initdate, "yyyy/MM/dd");
            vm.finalFiltered = $filter("date")(vm.finaldate, "yyyy/MM/dd");

            $scope.datetype = 'ad';
            $scope.by = 'date';

            vm.fetchRefererList();


            vm.AdToBsInit(vm.initFiltered);
            vm.AdToBsFinal(vm.finalFiltered);
            vm.fetchUserDepartmentList();
            vm.fetchTestReportList();

            $scope.proptosis_od_tick = false;
            $scope.proptosis_os_tick = false;


        };


        $scope.dateTypes = [{
            value: 0,
            name: 'AD'
        },
        {
            value: 1,
            name: 'BS'
        },
        ];

        vm.selectedDateType = {};
        vm.selectedDateType.value = 0;
        vm.selectedDateType.name = 'AD';

        vm.onDateTypeSelected = function (x) {
            vm.selectedDateType = x;
        };

        //AD TO BS
        vm.AdToBsInit = function (init) {
            vm.setInit(init);
            if (init.length !== 10) {
                return;
            }
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
            vm.setFinal(final);
            if (final.length !== 10) {
                return;
            }
            DateService.adToBs(final)
                .then(function (bsfinaldata) {
                    vm.BsFinal = bsfinaldata[0];
                    vm.bsdatefinal = $filter("date")(bsfinaldata[0].bs_date, "yyyy/MM/dd");
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };


        vm.setInit = function (init) {
            vm.initFiltered = $filter("date")(init, "yyyy/MM/dd");

            if (vm.initFiltered.length !== 10) {
                return;
            }
            localStorage.setItem('init', vm.initFiltered);
        }
        vm.setFinal = function (final) {
            vm.finalFiltered = $filter("date")(final, "yyyy/MM/dd");
            if (vm.finalFiltered.length !== 10) {
                return;
            }
            localStorage.setItem('final', vm.finalFiltered);
        }

        //BS TO AD
        vm.BsToAdInit = function (init) {
            if (init.length !== 10) {
                return;
            }
            DateService.bsToAd(init)
                // $http.get(UrlConfig.reportBaseUrl() + 'api/bs2ad?bs_date=' + init)

                .then(function (adinitdata) {
                    vm.AdInit = adinitdata[0];
                    vm.initdate = $filter("date")(vm.AdInit.ad_date, "yyyy/MM/dd");
                    vm.setInit(vm.initdate);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };

        vm.BsToAdFinal = function (final) {
            if (final.length !== 10) {
                return;
            }
            //vm.addatefinal= '';
            //$http.get(UrlConfig.reportBaseUrl() + 'api/bs2ad?bs_date=' + final)
            DateService.bsToAd(final)
                .then(function (adfinaldata) {
                    vm.AdFinal = adfinaldata[0];
                    vm.finaldate = $filter("date")(vm.AdFinal.ad_date, "yyyy/MM/dd");
                    vm.setFinal(vm.finaldate);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        };

        $scope.refractionValues = [
            {
                name: '+ ve'
            },
            {

                name: '- ve'
            }
        ]



        $scope.nearVisionValues = [{
            name: '1(N-6)'
        },
        {
            name: '2(N-8)'
        }, {
            name: '2(N-8)'
        }, {
            name: '3(N-10)'
        }, {
            name: '4(N-12)'
        }, {
            name: '5(N-14)'
        }, {
            name: '6(N-18)'
        }, {
            name: '7(N-24)'
        }, {
            name: '8(N-36)'
        }
        ];
        $scope.distanceVisionValues = [{
            name: '6/6(0)'
        },
        {
            name: '6/9(0.18)'
        }, {
            name: '6/12(0.30)'
        }, {
            name: '6/18(0.48)'
        }, {
            name: '6/24(0.60)'
        }, {
            name: '6/36(0.78)'
        }, {
            name: '6/60(1)'
        }, {
            name: '5/60(1.08)'
        }, {
            name: '4/60(1.18)'
        }, {
            name: '3/60(1.30)'
        }, {
            name: '2/60(1.48)'
        }, {
            name: '1/60(1.78)'
        }, {
            name: '1/2/60(2.08)'
        }, {
            name: 'PL+VE, PR Inaccurate (2.50)'
        }, {
            name: 'PL+VE, PR Accurate (2.20)'
        }, {
            name: 'Counting Finger and Close to Face (2.90)'
        }, {
            name: 'Follows Light(2.20)'
        }, {
            name: 'Light Perception(3.70)'
        }, {
            name: 'Hand Movement (3.70)'
        }, {
            name: 'NPL(4.00)'
        }
        ];


        vm.sideside = true;
        vm.colvalue = 9;
        vm.sideView = function () {
            if (vm.colvalue === 9
            ) {
                vm.colvalue = 12;
            }
            else {
                vm.colvalue = 9;
            }

            vm.sideside = !vm.sideside;
        }
        vm.fetchUserDepartmentList = function () {
            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();

            $http.get(UrlConfig.labReportBaseUrl() + 'api/UserDepart/' + userId,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.UserDepartmentList = result.data;
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });

        };



        // var sn= $scope.sn;

        vm.fetchTestReportList = function () {
            $scope.loadtrue = true;

            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/TestReporting?init=' + vm.initFiltered +
                '&final=' + vm.finalFiltered,
                { headers: { Authorization: 'Bearer ' + token } })


                .then(function (result) {

                    vm.TestReportingList = result.data;
                    // vm.sn = result.data.sn;
                    // vm.detailid = result.data.detailid;
                    // vm.inv_no = result.data.inv_no;
                    // vm.qualification = result.data.qualification;
                    // vm.refid = result.data.refid;
                    // vm.refid1 = result.data.refid1;
                    // vm.regno = result.data.regno;
                    // vm.servid = result.data.servid;
                    // vm.userid = result.data.userid;
                    // vm.referer = result.data.referer;
                    // vm.title = result.data.title;
                    // vm.report = result.data.report;
                    // vm.pname = result.data.pname;
                    // vm.qualification = result.data.qualification;
                    // vm.address = result.data.address;
                    // vm.sex = result.data.sex;
                    // vm.age = result.data.age;
                    // vm.bs_inv_date = result.data.bs_inv_date;
                    // vm.inv_date = result.data.inv_date;
                    // vm.hospid = result.data.hospid;
                    //  document.getElementById("p1").innerHTML = result.data.report;
                    $scope.loadtrue = false;

                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                    $scope.loadtrue = false;

                });
        };


        vm.onReportSelected = function (report) {
            vm.selectedReport = report;
            window.open('#!/testreport?id=' + vm.selectedReport.sn,
                '_blank', '');
        };

        vm.resetFilter = function () {
            vm.selectedReferer = null;
        };

        vm.onRefererSelected = function (referer) {
            vm.selectedReferer = referer;
            // alert(referer.referer);
        };


        vm.fetchRefererList = function () {
            var token = localStorage.getItem('access_token');


            $http.get(UrlConfig.labReportBaseUrl() + 'api/referer/0', //selectedReferer
                { headers: { Authorization: 'Bearer ' + token } }) //sp_id=101&dep=a
                .then(function (result) {
                    vm.refererList = result.data;
                    if (vm.refererList.length === 1) {
                        vm.refererSelectList = result.data[0];
                        // vm.onRefererSelected = function () {
                        // vm.selectedReferer = vm.refererList[0].referer;
                        vm.selectedReferer = vm.refererSelectList;
                        vm.selectedReferer.referer = vm.refererSelectList.referer;
                        // }; 
                    }
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });

        };

        vm.PrintRecord = function () {
            printData();
        }
        function printData() {
            $scope.full = 12;
            $scope.IsHeadVisible = $scope.IsHeadVisible ? false : true;
            var divToPrint = document.getElementById("reporttable");

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
            $("#reporttable").table2excel({
                filename: vm.pagetitle + "_" + vm.initFiltered + "To " + vm.finalFiltered + ".xls"
            });
        }


        vm.noalert = function () {
            $timeout(vm.resetNotification, 4000);
        }

        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };


    }]);