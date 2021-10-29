app.controller('SmokingHistoryController', ['$http', 'Config', 'UrlConfig', 'TokenService',
 '$scope', '$routeParams', 'BroadcastService', '$filter', '$timeout','$anchorScroll',
    function ($http, Config, UrlConfig, TokenService, $scope, $routeParams, BroadcastService, 
        $filter, $timeout,$anchorScroll) {

        var vm = this;

        vm.pagetitle = "Smoking and Alcohol History";
        //vm.selectedTitle = null;
        //vm.selectedOpdBill = null;
        BroadcastService.notify('radioNavVisible', true);
        BroadcastService.notify('navText', 'Reporting');
        BroadcastService.notify('labNavVisible', false);
        vm.init = function () {
            $anchorScroll();
            TokenService.navigateToLoginOnInvalidToken();

            vm.showEdit = false;
            // vm.fetchTestReportList();

            //  vm.fetchTestReportList();
            $scope.loadtrue = false;


            vm.spaceabove = Config.spaceAbove;
            // vm.fetchRefererList();
            vm.today = $filter("date")(new Date(), "yyyy/MM/dd");

            $scope.mrdnum = $routeParams.mrdno;
            $scope.hospitalid = $routeParams.hospid;

            if($scope.mrdnum !== undefined && $scope.hospitalid !== undefined){
                vm.fetchUserReportList();
            }


        };

        vm.fetchUserReportList = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;


            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/SmokingHistoryDetails?mrdno=' + $scope.mrdnum, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.UserReportList = result.data;
                    if (result.data.length === 0) {
                        vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.noReport = true;
                    } else {
                        vm.userMrd = result.data[0].mrdno;
                        vm.pname = result.data[0].pname;
                        vm.address = result.data[0].address;
                        vm.contact = result.data[0].contact;
                        vm.gender = result.data[0].sex;
                        vm.age = result.data[0].age;
                        vm.reportDate = new Date(result.data[0].ddate);
                        $scope.showReport = true;
                    }
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
            $http.get(UrlConfig.labReportBaseUrl() + 'api/SmokingHistoryAll?mrdno=' + $scope.mrdnum, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.smokingHistory = result.data;
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
            vm.noalert();

        };

        vm.deleteRecord = function () {
            if (confirm('Are you sure you want to delete this record?')) {
                var userId = TokenService.getUserId();

                var mrdPayload = {
                    mrdno: vm.userMrd,
                };
                var token = localStorage.getItem('access_token');
                $http.post(UrlConfig.labReportBaseUrl() + 'api/SmokingHistoryDetails/Delete',
                    mrdPayload, { headers: { Authorization: 'Bearer ' + token } })

                    .then(function (result) {
                        // console.log(result.data);
                        vm.notification = { mode: 'success', message: 'MRD report deleted' };
                        vm.fetchUserReportList();
                        vm.reset();
                    }, function (error) {
                        var allErrors = error.data.message;
                        if (error.data.modelState) {
                            for (var msg in error.data.modelState) {
                                allErrors += ('' + error.data.modelState[msg][0]);
                            }
                        }
                        vm.notification = { mode: 'danger', message: 'Error: ' + allErrors };
                    });

            } else {
                return;
                //vm.selectedTemplate = null;
                // Do nothing!
            }
        }

        vm.submitSmokingHistory = function () {

            if (vm.showEdit === true) {
                vm.url = 'api/SmokingHistoryAll/Update';
            }
            else {
                vm.url = 'api/SmokingHistoryAll';
            }

            if ($scope.alccon_pas_cd_tick === "1") { $scope.alccon_pas_cd_tick = true; } else { $scope.alccon_pas_cd_tick = false; }
            if ($scope.alccon_pas_od_tick === "1") { $scope.alccon_pas_od_tick = true; } else { $scope.alccon_pas_od_tick = false; }
            if ($scope.alccon_pas_pan_tick === "1") { $scope.alccon_pas_pan_tick = true; } else { $scope.alccon_pas_pan_tick = false; }
            if ($scope.alccon_pas_sd_tick === "1") { $scope.alccon_pas_sd_tick = true; } else { $scope.alccon_pas_sd_tick = false; }
            if ($scope.alccon_pre_cd_tick === "1") { $scope.alccon_pre_cd_tick = true; } else { $scope.alccon_pre_cd_tick = false; }
            if ($scope.alccon_pre_od_tick === "1") { $scope.alccon_pre_od_tick = true; } else { $scope.alccon_pre_od_tick = false; }
            if ($scope.alccon_pre_sd_tick === "1") { $scope.alccon_pre_sd_tick = true; } else { $scope.alccon_pre_sd_tick = false; }
            if ($scope.househld_tick === "1") { $scope.househld_tick = true; } else { $scope.househld_tick = false; }
            if ($scope.alccon_pre_pan_tick === "1") { $scope.alccon_pre_pan_tick = true; } else { $scope.alccon_pre_pan_tick = false; }
            if ($scope.oth_pre_bd_tick === "1") { $scope.oth_pre_bd_tick = true; } else { $scope.oth_pre_bd_tick = false; }
            if ($scope.oth_pre_tm_tick === "1") { $scope.oth_pre_tm_tick = true; } else { $scope.oth_pre_tm_tick = false; }
            if ($scope.oth_pre_hka_tick === "1") { $scope.oth_pre_hka_tick = true; } else { $scope.oth_pre_hka_tick = false; }
            if ($scope.oth_pas_bd_tick === "1") { $scope.oth_pas_bd_tick = true; } else { $scope.oth_pas_bd_tick = false; }
            if ($scope.oth_pas_tm_tick === "1") { $scope.oth_pas_tm_tick = true; } else { $scope.oth_pas_tm_tick = false; }
            if ($scope.oth_pas_hka_tick === "1") { $scope.oth_pas_hka_tick = true; } else { $scope.oth_pas_hka_tick = false; }

            var smokingPayload = {
                mrdno: $scope.mrdnum,
                ddate: vm.today,
                hospid: $scope.hospitalid,
                smkcig_tick: $scope.smkcig_tick,
                smkcig_ps_age: $scope.smkcig_ps_age,
                smkcig_ps_year: $filter("date")($scope.smkcig_ps_year, "yyyy/MM/dd"),
                smkcig_ps_no: $scope.smkcig_ps_no,
                smkcig_ps_yrs: $scope.smkcig_ps_yrs,
                smkcig_ps_ddate: $filter("date")($scope.smkcig_ps_ddate, "yyyy/MM/dd"),
                smkcig_cs_age: $scope.smkcig_cs_age,
                smkcig_cs_no: $scope.smkcig_cs_no,
                smkcig_cs_yrs: $scope.smkcig_cs_yrs,
                smkcig_cs_ddate: $filter("date")($scope.smkcig_cs_ddate, "yyyy/MM/dd"),
                househld_tick: $scope.househld_tick,
                alccon_tick: $scope.alccon_tick,
                alccon_pre: $scope.alccon_pre,
                alccon_pre_od_tick: $scope.alccon_pre_od_tick,
                alccon_pre_sd_tick: $scope.alccon_pre_sd_tick,
                alccon_pre_cd_tick: $scope.alccon_pre_cd_tick,
                alccon_pre_usn: $scope.alccon_pre_usn,
                alccon_pre_noyr: $scope.alccon_pre_noyr,
                alccon_pre_qt: $scope.alccon_pre_qt,
                alccon_pre_pan_tick: $scope.alccon_pre_pan_tick,
                alccon_pre_pan: $scope.alccon_pre_pan,
                alccon_pas: $scope.alccon_pas,
                alccon_pas_od_tick: $scope.alccon_pas_od_tick,
                alccon_pas_sd_tick: $scope.alccon_pas_sd_tick,
                alccon_pas_cd_tick: $scope.alccon_pas_cd_tick,
                alccon_pas_usn: $scope.alccon_pas_usn,
                alccon_pas_stop: $scope.alccon_pas_stop,
                alccon_pas_noyr: $scope.alccon_pas_noyr,
                alccon_pas_qt: $scope.alccon_pas_qt,
                alccon_pas_pan_tick: $scope.alccon_pas_pan_tick,
                alccon_pas_pan: $scope.alccon_pas_pan,
                oth_pre_bd_tick: $scope.oth_pre_bd_tick,
                oth_pre_bd: $scope.oth_pre_bd,
                oth_pre_tm_tick: $scope.oth_pre_tm_tick,
                oth_pre_tm: $scope.oth_pre_tm,
                oth_pre_hka_tick: $scope.oth_pre_hka_tick,
                oth_pre_hka: $scope.oth_pre_hka,
                oth_pas_bd_tick: $scope.oth_pas_bd_tick,
                oth_pas_bd: $scope.oth_pas_bd,
                oth_pas_tm_tick: $scope.oth_pas_tm_tick,
                oth_pas_tm: $scope.oth_pas_tm,
                oth_pas_hka_tick: $scope.oth_pas_hka_tick,
                oth_pas_hka: $scope.oth_pas_hka,
            };
            var token = localStorage.getItem('access_token');
            $http.post(UrlConfig.labReportBaseUrl() + vm.url, smokingPayload,
                { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    console.log(result.data);

                    vm.notification = { mode: 'success', message: 'This History succcessfully submitted.' };
                    vm.reset();
                  //  vm.reload();
                    vm.showEdit = false;
                }, function (error) {
                    console.log(error);
                    vm.showEdit = false;
                 //   vm.reload()
                    var allErrors = error.data.message;
                    if (error.data.modelState) {
                        for (var msg in error.data.modelState) {
                            allErrors += ('' + error.data.modelState[msg][0]);
                        }
                    }

                    vm.notification = { mode: 'danger', message: 'Error: ' + allErrors };
                }); vm.noalert();
        };


        vm.onReportSelect = function () {
            vm.showEdit = true;



            $scope.smkcig_tick = vm.smokingHistory.smkcig_tick;
            $scope.mrdno = vm.smokingHistory.mrdno;
            $scope.smkcig_ps_age = vm.smokingHistory.smkcig_ps_age;
            $scope.smkcig_ps_year = new Date(vm.smokingHistory.smkcig_ps_year);
            $scope.smkcig_ps_no = vm.smokingHistory.smkcig_ps_no;
            $scope.smkcig_ps_yrs = vm.smokingHistory.smkcig_ps_yrs;
            $scope.smkcig_ps_ddate = new Date(vm.smokingHistory.smkcig_ps_ddate);
            $scope.smkcig_cs_age = vm.smokingHistory.smkcig_cs_age;
            $scope.smkcig_cs_no = vm.smokingHistory.smkcig_cs_no;
            $scope.smkcig_cs_yrs = vm.smokingHistory.smkcig_cs_yrs;
            $scope.smkcig_cs_ddate = new Date(vm.smokingHistory.smkcig_cs_ddate,);
            $scope.househld_tick = vm.smokingHistory.househld_tick;

            $scope.alccon_tick = vm.smokingHistory.alccon_tick;

            $scope.alccon_pre = vm.smokingHistory.alccon_pre;
            $scope.alccon_pre_od_tick = vm.smokingHistory.alccon_pre_od_tick;
            $scope.alccon_pre_sd_tick = vm.smokingHistory.alccon_pre_sd_tick;
            $scope.alccon_pre_cd_tick = vm.smokingHistory.alccon_pre_cd_tick;
            $scope.alccon_pre_usn = vm.smokingHistory.alccon_pre_usn;
            $scope.alccon_pre_noyr = vm.smokingHistory.alccon_pre_noyr;
            $scope.alccon_pre_qt = vm.smokingHistory.alccon_pre_qt;
            $scope.alccon_pre_pan_tick = vm.smokingHistory.alccon_pre_pan_tick;
            $scope.alccon_pre_pan = vm.smokingHistory.alccon_pre_pan;
            $scope.alccon_pas = vm.smokingHistory.alccon_pas;
            $scope.alccon_pas_od_tick = vm.smokingHistory.alccon_pas_od_tick;
            $scope.alccon_pas_sd_tick = vm.smokingHistory.alccon_pas_sd_tick;
            $scope.alccon_pas_cd_tick = vm.smokingHistory.alccon_pas_cd_tick;
            $scope.alccon_pas_usn = vm.smokingHistory.alccon_pas_usn;
            $scope.alccon_pas_stop = vm.smokingHistory.alccon_pas_stop;
            $scope.alccon_pas_noyr = vm.smokingHistory.alccon_pas_noyr;
            $scope.alccon_pas_qt = vm.smokingHistory.alccon_pas_qt;
            $scope.alccon_pas_pan_tick = vm.smokingHistory.alccon_pas_pan_tick;
            $scope.alccon_pas_pan = vm.smokingHistory.alccon_pas_pan;
            $scope.oth_pre_bd_tick = vm.smokingHistory.oth_pre_bd_tick;
            $scope.oth_pre_bd = vm.smokingHistory.oth_pre_bd;
            $scope.oth_pre_tm_tick = vm.smokingHistory.oth_pre_tm_tick;
            $scope.oth_pre_tm = vm.smokingHistory.oth_pre_tm;
            $scope.oth_pre_hka_tick = vm.smokingHistory.oth_pre_hka_tick;
            $scope.oth_pre_hka = vm.smokingHistory.oth_pre_hka;
            $scope.oth_pas_bd_tick = vm.smokingHistory.oth_pas_bd_tick;
            $scope.oth_pas_bd = vm.smokingHistory.oth_pas_bd;
            $scope.oth_pas_tm_tick = vm.smokingHistory.oth_pas_tm_tick;
            $scope.oth_pas_tm = vm.smokingHistory.oth_pas_tm;
            $scope.oth_pas_hka_tick = vm.smokingHistory.oth_pas_hka_tick;
            $scope.oth_pas_hka = vm.smokingHistory.oth_pas_hka;

            if ($scope.alccon_tick === "Never Drinker") {
                $scope.alccon_tick = "0";
            }
            if ($scope.alccon_tick === "present Drinker") {
                $scope.alccon_tick = "1";
            }
            if ($scope.alccon_tick === "Past Drinker") {
                $scope.alccon_tick = "2";
            }

            if ($scope.smkcig_tick === "Never Smoker") {
                $scope.smkcig_tick = "0";
            }
            if ($scope.smkcig_tick === "present smoker") {
                $scope.smkcig_tick = "1";
            }
            if ($scope.smkcig_tick === "Past Smoker") {
                $scope.smkcig_tick = "2";
            }



            if ($scope.alccon_pas_cd_tick === true) { $scope.alccon_pas_cd_tick = "1"; } else { $scope.alccon_pas_cd_tick = "0"; }
            if ($scope.alccon_pas_od_tick === true) { $scope.alccon_pas_od_tick = "1"; } else { $scope.alccon_pas_od_tick = "0"; }
            if ($scope.alccon_pas_pan_tick === true) { $scope.alccon_pas_pan_tick = "1"; } else { $scope.alccon_pas_pan_tick = "0"; }
            if ($scope.alccon_pas_sd_tick === true) { $scope.alccon_pas_sd_tick = "1"; } else { $scope.alccon_pas_sd_tick = "0"; }
            if ($scope.alccon_pre_cd_tick === true) { $scope.alccon_pre_cd_tick = "1"; } else { $scope.alccon_pre_cd_tick = "0"; }
            if ($scope.alccon_pre_od_tick === true) { $scope.alccon_pre_od_tick = "1"; } else { $scope.alccon_pre_od_tick = "0"; }
            if ($scope.alccon_pre_sd_tick === true) { $scope.alccon_pre_sd_tick = "1"; } else { $scope.alccon_pre_sd_tick = "0"; }
            if ($scope.househld_tick === true) { $scope.househld_tick = "1"; } else { $scope.househld_tick = "0"; }
            if ($scope.alccon_pre_pan_tick === true) { $scope.alccon_pre_pan_tick = "1"; } else { $scope.alccon_pre_pan_tick = "0"; }
            if ($scope.oth_pre_bd_tick === true) { $scope.oth_pre_bd_tick = "1"; } else { $scope.oth_pre_bd_tick = "0"; }
            if ($scope.oth_pre_tm_tick === true) { $scope.oth_pre_tm_tick = "1"; } else { $scope.oth_pre_tm_tick = "0"; }
            if ($scope.oth_pre_hka_tick === true) { $scope.oth_pre_hka_tick = "1"; } else { $scope.oth_pre_hka_tick = "0"; }
            if ($scope.oth_pas_bd_tick === true) { $scope.oth_pas_bd_tick = "1"; } else { $scope.oth_pas_bd_tick = "0"; }
            if ($scope.oth_pas_tm_tick === true) { $scope.oth_pas_tm_tick = "1"; } else { $scope.oth_pas_tm_tick = "0"; }
            if ($scope.oth_pas_hka_tick === true) { $scope.oth_pas_hka_tick = "1"; } else { $scope.oth_pas_hka_tick = "0"; }

        }



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
        };

        vm.noalert = function () {
            $timeout(vm.resetNotification, 9000);
        };
        vm.next = function(){
            window.open('#!/ocularexamination?mrdno=' + $scope.mrdnum +
            '&hospid=' + $scope.hospitalid,
            '_self', '');

        }

        
        vm.toDash = function(){
            window.open('#!/dashboard?mrdno=' + $scope.mrdnum,
            '_self', '');
        }

        vm.reload = function () {
            $timeout(vm.reloadfn, 3000);
        };

        vm.reloadfn = function(){
            window.open('#!/dashboard','_self', '');
    }

        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };

        vm.reset = function () {
            $scope.noReport = false;
            $scope.mdrsearch = null;

        };


    }]);