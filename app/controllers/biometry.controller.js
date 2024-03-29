app.controller('BiometryController', ['$http', 'UrlConfig', 'TokenService', '$scope', '$routeParams', '$filter', '$timeout', 'BroadcastService',
    function ($http, UrlConfig, TokenService, $scope, $routeParams, $filter, $timeout, BroadcastService) {

        var vm = this;
        vm.selectedTitle = null;
        vm.selectedOpdBill = null;

        vm.pagetitle = "Biometry";


        vm.notification = {
            message: '',
            mode: 'info'
        };

        vm.init = function () {
            $scope.loadtrue = false;
            $scope.showEdit = false;
            TokenService.navigateToLoginOnInvalidToken('biometry');
            BroadcastService.notify('radioNavVisible', true);
            BroadcastService.notify('navText', 'Reporting');
            BroadcastService.notify('labNavVisible', false);
            vm.today = $filter("date")(new Date(), "yyyy/MM/dd");

            $scope.mrdnum = $routeParams.mrdno;
            $scope.hospitalid = $routeParams.hospid;
            vm.pname = $routeParams.pname;
            $scope.bs_fbs_tick = false;
            $scope.bs_pp_tick = false;
            $scope.bs_rbs_tick = false;

            if ($scope.mrdnum !== undefined && $scope.hospitalid !== undefined) {
             //  vm.fetchUserSummary();
                vm.fetchUserBiometrySummary()
            }

            // vm.fetchRefererList();
        };





        vm.submitBiometryDetails = function () {

            if ($scope.showEdit === true) {
                vm.url = "api/CsiAll/Update"
            }
            else {
                vm.url = "api/CsiAll"
            }


            var userId = TokenService.getUserId();
            var visionAndRefractionPayload = {
                mrdno: $scope.mrdnum,
                ddate: $filter("date")(new Date(), "yyyy/MM/dd"),
                hospid: $scope.hospitalid,

                k1od: $scope.k1od,
                k1os: $scope.k1os,
                k2od: $scope.k2od,
                k2os: $scope.k2os,
                axial_od: $scope.axial_od,
                axial_os: $scope.axial_os,
                iol_od: $scope.iol_od,
                iol_os: $scope.iol_os,
                blood_report: $scope.blood_report,
                hbsag_react_tick: $scope.hbsag_react_tick,
                hcv_react_tick: $scope.hcv_react_tick,
                hiv_tick: $scope.hiv_tick,
                bs_fbs_tick: $scope.bs_fbs_tick,
                bs_pp_tick: $scope.bs_pp_tick,
                bs_rbs_tick: $scope.bs_rbs_tick,
                remarks: $scope.remarks,

                bs_rbs_tick: $scope.bs_rbs_tick,
                bs_rbs: $scope.bs_rbs,
                bs_fbs: $scope.bs_fbs,
                bs_pp: $scope.bs_pp,
                a_constant_od: $scope.a_constant_od,
                a_constant_os: $scope.a_constant_os,

            }

            console.log(visionAndRefractionPayload);
            var token = localStorage.getItem('access_token');
            $http.post(UrlConfig.labReportBaseUrl() + vm.url,
                visionAndRefractionPayload,
                { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    console.log(result.data);
                    vm.notification = { mode: 'success', message: 'Payload submitted' };
                    $scope.showEdit = false;
                    vm.reload();
                    //console.log(visionAndRefractionPayload);
                }, function (error) {
                    console.log(error);

                    // vm.notification = { mode: 'danger', message: 'Error' +error.statusText };



                    var allErrors = error.data.message;
                    if (error.data.modelState) {
                        for (var msg in error.data.modelState) {
                            allErrors += ('' + error.data.modelState[msg][0]);
                        }
                    }

                    vm.notification = { mode: 'danger', message: 'Error: ' + allErrors };
                });
            vm.noalert();
        };

        vm.fetchUserBiometrySummary = function () {
            $scope.loadtrue = true;

            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();
//http://localhost:64705/api/customerselect?customer_id=1

            $http.get('http://localhost:64705/api/customerselect?customer_id=0', 
            //(UrlConfig.labReportBaseUrl() + 'api/CsiAll?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {

                    // $scope.noReport = false;

                    $scope.loadtrue = false;
                    vm.ocularValues = result.data;
                    $scope.showReport = true;
                    console.log(result.data);




                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };

        vm.onBiometryReportSelected = function () {
            $scope.showEdit = true;

            $scope.mdrno = vm.ocularValues.mrdno;
            $scope.k1os = vm.ocularValues.k1os;
            $scope.k1od = vm.ocularValues.k1od;

            $scope.k2od = vm.ocularValues.k2od;
            $scope.k2os = vm.ocularValues.k2os;
            $scope.axial_od = vm.ocularValues.axial_od;
            $scope.axial_os = vm.ocularValues.axial_os;
            $scope.iol_od = vm.ocularValues.iol_od;
            $scope.iol_os = vm.ocularValues.iol_os;
            $scope.blood_report = vm.ocularValues.blood_report;
            $scope.hbsag_react_tick = vm.ocularValues.hbsag_react_tick;
            $scope.hcv_react_tick = vm.ocularValues.hcv_react_tick;
            $scope.hiv_tick = vm.ocularValues.hiv_tick;
            $scope.bs_fbs_tick = vm.ocularValues.bs_fbs_tick;
            $scope.bs_pp_tick = vm.ocularValues.bs_pp_tick;
            $scope.bs_rbs_tick = vm.ocularValues.bs_rbs_tick;
            $scope.remarks = vm.ocularValues.remarks;

            $scope.bs_rbs_tick = vm.ocularValues.bs_rbs_tick;
            $scope.bs_rbs = vm.ocularValues.bs_rbs;
            $scope.bs_fbs = vm.ocularValues.bs_fbs;
            $scope.bs_pp = vm.ocularValues.bs_pp;
            $scope.a_constant_od = vm.ocularValues.a_constant_od;
            $scope.a_constant_os = vm.ocularValues.a_constant_os;


        }

        vm.deleteBiometryRecord = function () {
            if (confirm('Are you sure you want to delete this record?')) {
                var userId = TokenService.getUserId();

                var mrdPayload = {
                    mrdno: $scope.mrdnum,
                };
                var token = localStorage.getItem('access_token');
                $http.post(UrlConfig.labReportBaseUrl() + 'api/Csidetails/delete',
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

        vm.toDash = function () {
            window.open('#!/dashboard?mrdno=' + $scope.mrdnum,
                '_self', '');
        }

        vm.noalert = function () {
            $timeout(vm.resetNotification, 9000);
        };



        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };

        vm.reset = function () {
            // $scope.template = {};
            //  $scope.template.report = '';
            // vm.selectedReferer = null;

        };
    }]);





