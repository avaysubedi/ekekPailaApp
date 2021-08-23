app.controller('ChiefEyeComplainController', ['$http', 'UrlConfig', 'TokenService', '$scope', '$routeParams', '$timeout', 
'BroadcastService', '$filter','$anchorScroll',
    function ($http, UrlConfig, TokenService, $scope, $routeParams, $timeout, BroadcastService, $filter,$anchorScroll) {

        var vm = this;
        vm.selectedTitle = null;
        vm.selectedOpdBill = null;

        vm.pagetitle = "Chief Eye Complain";


        vm.notification = {
            message: '',
            mode: 'info'
        };

        vm.init = function () {
            $anchorScroll();
            $scope.loadtrue = false;

            TokenService.navigateToLoginOnInvalidToken('chiefeyecomplain');
            BroadcastService.notify('radioNavVisible', true);
            BroadcastService.notify('navText', 'Reporting');
            BroadcastService.notify('labNavVisible', false);
            //    vm.fetchTitleList();

            $scope.mrdnum = $routeParams.mrdno;
            $scope.hospitalid = $routeParams.hospid;

            if($scope.mrdnum !== undefined && $scope.hospitalid !== undefined){
                vm.fetchUserReportList();
            }
            vm.oldReport = true;
            vm.today = $filter("date")(new Date(), "yyyy/MM/dd");

            vm.showEdit = false;
            // vm.fetchOpdBillList();

            // vm.fetchTestReportList();
            // // vm.fetchRefererList();
        };


        vm.fetchUserReportList = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;


            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/ChiefComplainDetails?mrdno=' + $scope.mrdnum, { headers: { Authorization: 'Bearer ' + token } })
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
                        vm.reportDate = result.data[0].ddate;
                        $scope.showReport = true;
                    }
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });

            $http.get(UrlConfig.labReportBaseUrl() + 'api/ChiefComplainAll?mrdno=' + $scope.mrdnum, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.chiefComplains = result.data;
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
                $http.post(UrlConfig.labReportBaseUrl() + 'api/ChiefComplainDetails/Delete',
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



        vm.submitChiefComplain = function () {
            if ($scope.mrdnum === undefined || $scope.mrdnum === null) {
                vm.notification = { mode: 'danger', message: 'No MRD found please check MRD number ' };

                return;
            }
            if (vm.showEdit) {
                vm.url = 'api/ChiefComplainAll/Update';
            } else {
                vm.url = 'api/ChiefComplainAll';
            }
            if ($scope.cheye_devi_od_tick === "1") { $scope.cheye_devi_od_tick = true; } else { $scope.cheye_devi_od_tick = false; }
            if ($scope.cheye_pain_od_tick === "1") { $scope.cheye_pain_od_tick = true; } else { $scope.cheye_pain_od_tick = false; }
            if ($scope.cheye_water_od_tick === "1") { $scope.cheye_water_od_tick = true; } else { $scope.cheye_water_od_tick = false; }
            if ($scope.cheye_fbsen_od_tick === "1") { $scope.cheye_fbsen_od_tick = true; } else { $scope.cheye_fbsen_od_tick = false; }
            if ($scope.cheye_itch_od_tick === "1") { $scope.cheye_itch_od_tick = true; } else { $scope.cheye_itch_od_tick = false; }
            if ($scope.cheye_itch_od_tick === "1") { $scope.cheye_itch_od_tick = true; } else { $scope.cheye_itch_od_tick = false; }
            if ($scope.cheye_ptb_od_tick === "1") { $scope.cheye_ptb_od_tick = true; } else { $scope.cheye_ptb_od_tick = false; }
            if ($scope.cheye_flo_od_tick === "1") { $scope.cheye_flo_od_tick = true; } else { $scope.cheye_flo_od_tick = false; }
            if ($scope.cheye_fla_od_tick === "1") { $scope.cheye_fla_od_tick = true; } else { $scope.cheye_fla_od_tick = false; }
            if ($scope.cheye_dip_od_tick === "1") { $scope.cheye_dip_od_tick = true; } else { $scope.cheye_dip_od_tick = false; }
            if ($scope.cheye_sco_od_tick === "1") { $scope.cheye_sco_od_tick = true; } else { $scope.cheye_sco_od_tick = false; }
            if ($scope.cheye_colha_od_tick === "1") { $scope.cheye_colha_od_tick = true; } else { $scope.cheye_colha_od_tick = false; }
            if ($scope.cheye_colha_od_tick === "1") { $scope.cheye_colha_od_tick = true; } else { $scope.cheye_colha_od_tick = false; }
            if ($scope.cheye_oth_od_tick === "1") { $scope.cheye_oth_od_tick = true; } else { $scope.cheye_oth_od_tick = false; }
            if ($scope.cheye_devi_os_tick === "1") { $scope.cheye_devi_os_tick = true; } else { $scope.cheye_devi_os_tick = false; }
            if ($scope.cheye_pain_os_tick === "1") { $scope.cheye_pain_os_tick = true; } else { $scope.cheye_pain_os_tick = false; }
            if ($scope.cheye_water_os_tick === "1") { $scope.cheye_water_os_tick = true; } else { $scope.cheye_water_os_tick = false; }
            if ($scope.cheye_fbsen_os_tick === "1") { $scope.cheye_fbsen_os_tick = true; } else { $scope.cheye_fbsen_os_tick = false; }
            if ($scope.cheye_itch_os_tick === "1") { $scope.cheye_itch_os_tick = true; } else { $scope.cheye_itch_os_tick = false; }
            if ($scope.cheye_ptb_os_tick === "1") { $scope.cheye_ptb_os_tick = true; } else { $scope.cheye_ptb_os_tick = false; }
            if ($scope.cheye_flo_os_tick === "1") { $scope.cheye_flo_os_tick = true; } else { $scope.cheye_flo_os_tick = false; }
            if ($scope.cheye_fla_os_tick === "1") { $scope.cheye_fla_os_tick = true; } else { $scope.cheye_fla_os_tick = false; }
            if ($scope.cheye_dip_os_tick === "1") { $scope.cheye_dip_os_tick = true; } else { $scope.cheye_dip_os_tick = false; }
            if ($scope.cheye_sco_os_tick === "1") { $scope.cheye_sco_os_tick = true; } else { $scope.cheye_sco_os_tick = false; }
            if ($scope.cheye_colha_os_tick === "1") { $scope.cheye_colha_os_tick = true; } else { $scope.cheye_colha_os_tick = false; }
            if ($scope.cheye_oth_os_tick === "1") { $scope.cheye_oth_os_tick = true; } else { $scope.cheye_oth_os_tick = false; }
            if ($scope.eyeconsult_tick === "1") { $scope.eyeconsult_tick = true; } else { $scope.eyeconsult_tick = false; }




            var chiefComplainPayload = {
                mrdno: $scope.mrdnum,
                ddate: vm.today,
                hospid: $scope.hospitalid,
                cheye_devi_od_tick: $scope.cheye_devi_od_tick,
                cheye_devi_od: $scope.cheye_devi_od,
                cheye_pain_od_tick: $scope.cheye_pain_od_tick,
                cheye_red_od: $scope.cheye_red_od,
                cheye_water_od_tick: $scope.cheye_water_od_tick,
                cheye_water_od: $scope.cheye_water_od,
                cheye_fbsen_od_tick: $scope.cheye_fbsen_od_tick,
                cheye_fbsen_od: $scope.cheye_fbsen_od,
                cheye_itch_od_tick: $scope.cheye_itch_od_tick,
                cheye_itch_od: $scope.cheye_itch_od,
                cheye_ptb_od_tick: $scope.cheye_ptb_od_tick,
                cheye_ptb_od: $scope.cheye_ptb_od,
                cheye_flo_od_tick: $scope.cheye_flo_od_tick,
                cheye_flo_od: $scope.cheye_flo_od,
                cheye_fla_od_tick: $scope.cheye_fla_od_tick,
                cheye_fla_od: $scope.cheye_fla_od,
                cheye_dip_od_tick: $scope.cheye_dip_od_tick,
                cheye_dip_od: $scope.cheye_dip_od,
                cheye_sco_od_tick: $scope.cheye_sco_od_tick,
                cheye_sco_od: $scope.cheye_sco_od,
                cheye_colha_od_tick: $scope.cheye_colha_od_tick,
                cheye_colha_od: $scope.cheye_colha_od,
                cheye_oth_od_tick: $scope.cheye_oth_od_tick,
                cheye_oth_od: $scope.cheye_oth_od,
                cheye_devi_os_tick: $scope.cheye_devi_os_tick,
                cheye_devi_os: $scope.cheye_devi_os,
                cheye_pain_os_tick: $scope.cheye_pain_os_tick,
                cheye_red_os: $scope.cheye_red_os,
                cheye_water_os_tick: $scope.cheye_water_os_tick,
                cheye_water_os: $scope.cheye_water_os,
                cheye_fbsen_os_tick: $scope.cheye_fbsen_os_tick,
                cheye_fbsen_os: $scope.cheye_fbsen_os,
                cheye_itch_os_tick: $scope.cheye_itch_os_tick,
                cheye_itch_os: $scope.cheye_itch_os,
                cheye_ptb_os_tick: $scope.cheye_ptb_os_tick,
                cheye_ptb_os: $scope.cheye_ptb_os,
                cheye_flo_os_tick: $scope.cheye_flo_os_tick,
                cheye_flo_os: $scope.cheye_flo_os,
                cheye_fla_os_tick: $scope.cheye_fla_os_tick,
                cheye_fla_os: $scope.cheye_fla_os,
                cheye_dip_os_tick: $scope.cheye_dip_os_tick,
                cheye_dip_os: $scope.cheye_dip_os,
                cheye_sco_os_tick: $scope.cheye_sco_os_tick,
                cheye_sco_os: $scope.cheye_sco_os,
                cheye_colha_os_tick: $scope.cheye_colha_os_tick,
                cheye_colha_os: $scope.cheye_colha_os,
                cheye_oth_os_tick: $scope.cheye_oth_os_tick,
                cheye_oth_os: $scope.cheye_oth_os,
                eyeconsult_tick: $scope.eyeconsult_tick,
                eyeconsult_no_lt: $scope.eyeconsult_no_lt,
                eyeconsult_no_lm: $scope.eyeconsult_no_lm,
                eyeconsult_no_lc: $scope.eyeconsult_no_lc,
                eyeconsult_no_o: $scope.eyeconsult_no_o,

                eyeconsult_yes_pharmacy_tick: $scope.eyeconsult_yes_pharmacy_tick,
                eyeconsult_yes_health_i_tick: $scope.eyeconsult_yes_health_i_tick,
                eyeconsult_eye_clinic_tick: $scope.eyeconsult_eye_clinic_tick,
                eyeconsult_eye_hospital_tick: $scope.eyeconsult_eye_hospital_tick



            };


            var token = localStorage.getItem('access_token');

            $http.post(UrlConfig.labReportBaseUrl() + vm.url,
                chiefComplainPayload,
                { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    vm.notification = { mode: 'success', message: 'This Complain succcessfully saved.' };
                    console.log(result.data);
                    vm.reset();
                  //  vm.reload();
                }, function (error) {
                    console.log(error);
                    vm.showEdit = false;


                    var allErrors = error.data.message;
                    if (error.data.modelState) {
                        for (var msg in error.data.modelState) {
                            allErrors += ('' + error.data.modelState[msg][0]);
                        }
                    }

                    vm.notification = { mode: 'danger', message: 'Error: ' + allErrors };
                }); vm.noalert();


        };





        vm.onReportSelected = function () {

            vm.showEdit = true;
            $scope.mrdno = vm.userMrd;
            $scope.cheye_devi_od_tick = vm.chiefComplains.cheye_devi_od_tick;
            $scope.cheye_devi_od = vm.chiefComplains.cheye_devi_od;
            $scope.cheye_pain_od_tick = vm.chiefComplains.cheye_pain_od_tick;
            $scope.cheye_red_od = vm.chiefComplains.cheye_red_od;
            $scope.cheye_water_od_tick = vm.chiefComplains.cheye_water_od_tick;
            $scope.cheye_water_od = vm.chiefComplains.cheye_water_od;
            $scope.cheye_fbsen_od_tick = vm.chiefComplains.cheye_fbsen_od_tick;
            $scope.cheye_fbsen_od = vm.chiefComplains.cheye_fbsen_od;
            $scope.cheye_itch_od_tick = vm.chiefComplains.cheye_itch_od_tick;
            $scope.cheye_itch_od = vm.chiefComplains.cheye_itch_od;
            $scope.cheye_ptb_od_tick = vm.chiefComplains.cheye_ptb_od_tick;
            $scope.cheye_ptb_od = vm.chiefComplains.cheye_ptb_od;
            $scope.cheye_flo_od_tick = vm.chiefComplains.cheye_flo_od_tick;
            $scope.cheye_flo_od = vm.chiefComplains.cheye_flo_od;
            $scope.cheye_fla_od_tick = vm.chiefComplains.cheye_fla_od_tick;
            $scope.cheye_fla_od = vm.chiefComplains.cheye_fla_od;
            $scope.cheye_dip_od_tick = vm.chiefComplains.cheye_dip_od_tick;
            $scope.cheye_dip_od = vm.chiefComplains.cheye_dip_od;
            $scope.cheye_sco_od_tick = vm.chiefComplains.cheye_sco_od_tick;
            $scope.cheye_sco_od = vm.chiefComplains.cheye_sco_od;
            $scope.cheye_colha_od_tick = vm.chiefComplains.cheye_colha_od_tick;
            $scope.cheye_colha_od = vm.chiefComplains.cheye_colha_od;
            $scope.cheye_oth_od_tick = vm.chiefComplains.cheye_oth_od_tick;
            $scope.cheye_oth_od = vm.chiefComplains.cheye_oth_od;
            $scope.cheye_devi_os_tick = vm.chiefComplains.cheye_devi_os_tick;
            $scope.cheye_devi_os = vm.chiefComplains.cheye_devi_os;
            $scope.cheye_pain_os_tick = vm.chiefComplains.cheye_pain_os_tick;
            $scope.cheye_red_os = vm.chiefComplains.cheye_red_os;
            $scope.cheye_water_os_tick = vm.chiefComplains.cheye_water_os_tick;
            $scope.cheye_water_os = vm.chiefComplains.cheye_water_os;
            $scope.cheye_fbsen_os_tick = vm.chiefComplains.cheye_fbsen_os_tick;
            $scope.cheye_fbsen_os = vm.chiefComplains.cheye_fbsen_os;
            $scope.cheye_itch_os_tick = vm.chiefComplains.cheye_itch_os_tick;
            $scope.cheye_itch_os = vm.chiefComplains.cheye_itch_os;
            $scope.cheye_ptb_os_tick = vm.chiefComplains.cheye_ptb_os_tick;
            $scope.cheye_ptb_os = vm.chiefComplains.cheye_ptb_os;
            $scope.cheye_flo_os_tick = vm.chiefComplains.cheye_flo_os_tick;
            $scope.cheye_flo_os = vm.chiefComplains.cheye_flo_os;
            $scope.cheye_fla_os_tick = vm.chiefComplains.cheye_fla_os_tick;
            $scope.cheye_fla_os = vm.chiefComplains.cheye_fla_os;
            $scope.cheye_dip_os_tick = vm.chiefComplains.cheye_dip_os_tick;
            $scope.cheye_dip_os = vm.chiefComplains.cheye_dip_os;
            $scope.cheye_sco_os_tick = vm.chiefComplains.cheye_sco_os_tick;
            $scope.cheye_sco_os = vm.chiefComplains.cheye_sco_os;
            $scope.cheye_colha_os_tick = vm.chiefComplains.cheye_colha_os_tick;
            $scope.cheye_colha_os = vm.chiefComplains.cheye_colha_os;
            $scope.cheye_oth_os_tick = vm.chiefComplains.cheye_oth_os_tick;
            $scope.cheye_oth_os = vm.chiefComplains.cheye_oth_os;
            $scope.eyeconsult_tick = vm.chiefComplains.eyeconsult_tick;
            $scope.eyeconsult_no_lt = vm.chiefComplains.eyeconsult_no_lt;
            $scope.eyeconsult_no_lm = vm.chiefComplains.eyeconsult_no_lm;
            $scope.eyeconsult_no_lc = vm.chiefComplains.eyeconsult_no_lc;
            $scope.eyeconsult_no_o = vm.chiefComplains.eyeconsult_no_o;
            $scope.eyeconsult_yes_pharmacy_tick = vm.chiefComplains.eyeconsult_yes_pharmacy_tick;
            $scope.eyeconsult_yes_health_i_tick = vm.chiefComplains.eyeconsult_yes_health_i_tick;
            $scope.eyeconsult_eye_clinic_tick = vm.chiefComplains.eyeconsult_eye_clinic_tick;
            $scope.eyeconsult_eye_hospital_tick = vm.chiefComplains.eyeconsult_eye_hospital_tick;


            if ($scope.cheye_devi_od_tick === true) { $scope.cheye_devi_od_tick = "1" } else { $scope.cheye_devi_od_tick = "0"; }
            if ($scope.cheye_pain_od_tick === true) { $scope.cheye_pain_od_tick = "1" } else { $scope.cheye_pain_od_tick = "0"; }
            if ($scope.cheye_water_od_tick === true) { $scope.cheye_water_od_tick = "1" } else { $scope.cheye_water_od_tick = "0"; }
            if ($scope.cheye_fbsen_od_tick === true) { $scope.cheye_fbsen_od_tick = "1" } else { $scope.cheye_fbsen_od_tick = "0"; }
            if ($scope.cheye_itch_od_tick === true) { $scope.cheye_itch_od_tick = "1" } else { $scope.cheye_itch_od_tick = "0"; }
            if ($scope.cheye_itch_od_tick === true) { $scope.cheye_itch_od_tick = "1" } else { $scope.cheye_itch_od_tick = "0"; }
            if ($scope.cheye_ptb_od_tick === true) { $scope.cheye_ptb_od_tick = "1" } else { $scope.cheye_ptb_od_tick = "0"; }
            if ($scope.cheye_flo_od_tick === true) { $scope.cheye_flo_od_tick = "1" } else { $scope.cheye_flo_od_tick = "0"; }
            if ($scope.cheye_fla_od_tick === true) { $scope.cheye_fla_od_tick = "1" } else { $scope.cheye_fla_od_tick = "0"; }
            if ($scope.cheye_dip_od_tick === true) { $scope.cheye_dip_od_tick = "1" } else { $scope.cheye_dip_od_tick = "0"; }
            if ($scope.cheye_sco_od_tick === true) { $scope.cheye_sco_od_tick = "1" } else { $scope.cheye_sco_od_tick = "0"; }
            if ($scope.cheye_colha_od_tick === true) { $scope.cheye_colha_od_tick = "1" } else { $scope.cheye_colha_od_tick = "0"; }
            if ($scope.cheye_colha_od_tick === true) { $scope.cheye_colha_od_tick = "1" } else { $scope.cheye_colha_od_tick = "0"; }
            if ($scope.cheye_oth_od_tick === true) { $scope.cheye_oth_od_tick = "1" } else { $scope.cheye_oth_od_tick = "0"; }
            if ($scope.cheye_devi_os_tick === true) { $scope.cheye_devi_os_tick = "1" } else { $scope.cheye_devi_os_tick = "0"; }
            if ($scope.cheye_pain_os_tick === true) { $scope.cheye_pain_os_tick = "1" } else { $scope.cheye_pain_os_tick = "0"; }
            if ($scope.cheye_water_os_tick === true) { $scope.cheye_water_os_tick = "1" } else { $scope.cheye_water_os_tick = "0"; }
            if ($scope.cheye_fbsen_os_tick === true) { $scope.cheye_fbsen_os_tick = "1" } else { $scope.cheye_fbsen_os_tick = "0"; }
            if ($scope.cheye_itch_os_tick === true) { $scope.cheye_itch_os_tick = "1" } else { $scope.cheye_itch_os_tick = "0"; }
            if ($scope.cheye_ptb_os_tick === true) { $scope.cheye_ptb_os_tick = "1" } else { $scope.cheye_ptb_os_tick = "0"; }
            if ($scope.cheye_flo_os_tick === true) { $scope.cheye_flo_os_tick = "1" } else { $scope.cheye_flo_os_tick = "0"; }
            if ($scope.cheye_fla_os_tick === true) { $scope.cheye_fla_os_tick = "1" } else { $scope.cheye_fla_os_tick = "0"; }
            if ($scope.cheye_dip_os_tick === true) { $scope.cheye_dip_os_tick = "1" } else { $scope.cheye_dip_os_tick = "0"; }
            if ($scope.cheye_sco_os_tick === true) { $scope.cheye_sco_os_tick = "1" } else { $scope.cheye_sco_os_tick = "0"; }
            if ($scope.cheye_colha_os_tick === true) { $scope.cheye_colha_os_tick = "1" } else { $scope.cheye_colha_os_tick = "0"; }
            if ($scope.cheye_oth_os_tick === true) { $scope.cheye_oth_os_tick = "1" } else { $scope.cheye_oth_os_tick = "0"; }
            if ($scope.eyeconsult_tick === true) { $scope.eyeconsult_tick = "1" } else { $scope.eyeconsult_tick = "0"; }

            if ($scope.eyeconsult_no_lc === "true") { $scope.eyeconsult_no_lc = true; } else { $scope.eyeconsult_no_lc = false; }
            if ($scope.eyeconsult_no_lm === "true") { $scope.eyeconsult_no_lm = true; } else { $scope.eyeconsult_no_lm = false; }
            if ($scope.eyeconsult_no_lt === "true") { $scope.eyeconsult_no_lt = true; } else { $scope.eyeconsult_no_lt = false; }
            if ($scope.eyeconsult_no_o === "true") { $scope.eyeconsult_no_o = true; } else { $scope.eyeconsult_no_o = false; }

        }


        vm.next = function(){
            window.open('#!/pasteyehistory?mrdno=' + $scope.mrdnum +
            '&hospid=' + $scope.hospitalid,
            '_self', '');

        }

        vm.reload = function () {
            $timeout(vm.reloadfn, 3000);
        };

        vm.reloadfn = function(){
            location.reload();
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
            $scope.noReport = false;
            $scope.mdrsearch = null;

            // $scope.template = {};
            //  $scope.template.report = '';
            // vm.selectedReferer = null;

        };
    }]);





