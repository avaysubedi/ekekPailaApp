app.controller('DashboardController', ['$http', 'UrlConfig', 'Config', 'TokenService', 'DateService',
    '$scope', '$filter', '$timeout', 'BroadcastService', '$routeParams',
    function ($http, UrlConfig, Config, TokenService, DateService, $scope, $filter, $timeout, BroadcastService, $routeParams) {

        var vm = this;


        vm.pagetitle = "Dashboard";
        BroadcastService.notify('radioNavVisible', true);
        BroadcastService.notify('navText', 'Lab Report');
        BroadcastService.notify('labNavVisible', false);


        vm.init = function () {
            vm.space = Config.spaceAbove;
            vm.loggedInAsAdmin = TokenService.getUserRoles().includes(Config.AdministratorRole);
            vm.loggedInAsEyeDoctor = TokenService.getUserRoles().includes(Config.EyeDoctorRole);
            vm.loggedInAsNurse = TokenService.getUserRoles().includes(Config.NurseRole);
            vm.loggedInAsDentalDoctor = TokenService.getUserRoles().includes(Config.DentalDoctotRole);

            $scope.mdrsearch = $routeParams.mrdno;

            TokenService.navigateToLoginOnInvalidToken('dashboard');

            // vm.fetchTestReportList();

            $scope.init = localStorage.getItem('init');
            $scope.final = localStorage.getItem('final');
            vm.initdate = new Date($scope.init);
            vm.finaldate = new Date($scope.final);
            vm.initFiltered = $filter("date")(vm.initdate, "yyyy/MM/dd");
            vm.finalFiltered = $filter("date")(vm.finaldate, "yyyy/MM/dd");
            vm.today = new Date();
            vm.fetchUserInfo();

            $scope.datetype = 'ad';
            $scope.by = 'date';
            $scope.publicKey = "test_public_key_dc74e0fd57cb46cd93832aee0a390234";
            $scope.productNumber = "1234567890";
            $scope.productName = "check product";
            $scope.urlProduct = "https://mediprocomputers.com",
                $scope.amount = 20000;

            vm.grpid = Config.groupid;
            // vm.fetchMainList();

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
                    vm.initDate = $filter("date")(vm.AdInit.ad_date, "yyyy-MM-dd");
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
                    vm.finalDate = $filter("date")(vm.AdFinal.ad_date, "yyyy-MM-dd");
                    vm.setFinal(vm.finaldate);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        };



        vm.fetchUserInfo = function () {
            $scope.loadtrue = true;

            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();
            $http.get(UrlConfig.labReportBaseUrl() + 'api/accounts/users/' + userId, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.userInfoList = result.data;
                    vm.refid = result.data.user.refid;


                    ////console.log(result.data);
                    if (vm.refid !== undefined) {
                        vm.fetchMainList();

                        $http.get(UrlConfig.labReportBaseUrl() + 'api/referer/' + vm.refid,
                            { headers: { Authorization: 'Bearer ' + token } }) //sp_id=101&dep=a
                            .then(function (result) {
                                vm.refererList = result.data;
                                $scope.loadtrue = false;

                                ////console.log(result.data);
                            }, function (error) {
                                console.log(error);
                                // vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                                $scope.loadtrue = false;

                            });
                    }
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                    $scope.loadtrue = false;

                });
        };



        vm.fetchMainList = function () {

            $scope.loadtrue = true;
            var token = localStorage.getItem('access_token');
            //   vm.refid = 830;
            $scope.initFil = $filter("date")(vm.initdate, "yyyy-MM-dd");
            $scope.finalFil = $filter("date")(vm.finaldate, "yyyy-MM-dd");

            //EKPAILA-HUB
            //working 
            // $http.get(UrlConfig.labReportBaseUrl() + 'api/OPDBillForPrescriptionSelect/' + vm.refid + '/' +
            //     $scope.initFil + '/' + $scope.finalFil + '/' + vm.grpid,

            // $http.get(UrlConfig.labReportBaseUrl() + 'api/OPDBillForPrescriptionSelect/' + 0 + '/' +
            // $scope.initFil + '/' + $scope.finalFil + '/' + vm.grpid,


            //DEV-MEDIPRO 
            //consid=0&init=2021/08/14&final=2021/08/14&grpid=124

            $http.get('http://192.168.50.126/medipro.api.medipro/api/OPDBillForPrescriptionSelect/0/2021-01-06/2021-08-26/124',

                // $http.get(UrlConfig.labReportBaseUrl() + 'api/OPDBillForPrescriptionSelect?consid=0&' 
                //     + 'init=' +
                //     $scope.initFil + '&final=' + $scope.finalFil + '&grpid=' + vm.grpid,

                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.mainList = result.data;
                    $scope.loadtrue = false;

                 //   console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        }


        vm.fetchUserReportList = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;
            $scope.loadtrue = true;
            vm.UserReportList = null;

            // if ($scope.newmdr === null || $scope.newmdr === undefined) {
            //     $scope.newmdr = 0;
            // }
            var token = localStorage.getItem('access_token');
            // vm.refid = 830;
            // vm.grpid = 124;

            var userId = TokenService.getUserId();
            http://192.168.50.126/medipro.api.medipro/api/OPDBillForPrescriptionSelect/830/2021-06-30/2021-06-30/124


            $http.get(UrlConfig.labReportBaseUrl() + 'api/VisionandRefractionDetails?mrdno=' + vm.selectedRep.mrdno,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.UserReportList = result.data;
                    if (result.data.length === 0) {
                        //    vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.showNew = true;
                        $scope.noReport = true;
                    } else {
                        vm.userMrd = result.data[0].mrdno;
                        vm.pname = result.data[0].pname;
                        vm.address = result.data[0].address;
                        vm.contact = result.data[0].contact;
                        vm.gender = result.data[0].sex;
                        vm.age = result.data[0].age;


                        vm.reportDate = result.data[0].ddate;


                        vm.distanceGlasses = result.data[0].tick_mark;
                        if (vm.distanceGlasses === true) {
                            vm.distanceGlasses = "Yes";
                        }
                        if (vm.distanceGlasses === false) {
                            vm.distanceGlasses = "No";
                        }
                        vm.nearGlasses = result.data[1].tick_mark;
                        if (vm.nearGlasses === true) {
                            vm.nearGlasses = "Yes";
                        }
                        if (vm.nearGlasses === false) {
                            vm.nearGlasses = "No";
                        }
                        vm.regularGlasses = result.data[2].tick_mark;

                        vm.pvaDistanceOd = result.data[3].result;
                        vm.pvDistanceOd = result.data[4].result;

                        vm.pvaDistanceOs = result.data[5].result;
                        vm.pvDistanceOs = result.data[6].result;

                        vm.pvaNearOd = result.data[7].result;
                        vm.pvNearOd = result.data[8].result;

                        vm.pvaNearOs = result.data[9].result;
                        vm.pvNearOs = result.data[10].result;

                        vm.sphericalDistanceOd = result.data[11].result;
                        vm.sphericalDistanceOdV = result.data[12].result;

                        if (vm.sphericalDistanceOd === "-ve") {
                            vm.sphericalDistanceOdValue = "-" + result.data[12].result;
                        } else {
                            vm.sphericalDistanceOdValue = "+" + result.data[12].result;

                        }

                        vm.cylindricalDistanceOd = result.data[13].result;
                        vm.cylindricalDistanceOdV = result.data[14].result
                        if (vm.cylindricalDistanceOd === "-ve") {
                            vm.cylindricalDistanceOdValue = "-" + result.data[14].result;
                        } else {
                            vm.cylindricalDistanceOdValue = "+" + result.data[14].result;
                        }


                        vm.axisDistanceOd = result.data[15].result;
                        vm.axisDistanceOs = result.data[16].result;

                        vm.sphericalDistanceOs = result.data[17].result;
                        vm.sphericalDistanceOsV = result.data[18].result;

                        if (vm.sphericalDistanceOs === "-ve") {
                            vm.sphericalDistanceOsValue = "-" + result.data[18].result;
                        } else {
                            vm.sphericalDistanceOsValue = "+" + result.data[18].result;

                        }


                        vm.cylindricalDistanceOs = result.data[19].result;
                        vm.cylindricalDistanceOsV = result.data[20].result;

                        if (vm.cylindricalDistanceOs === "-ve") {
                            vm.cylindricalDistanceOsValue = "-" + result.data[20].result;
                        } else {
                            vm.cylindricalDistanceOsValue = "+" + result.data[20].result;
                        }
                        vm.cylindricalDistanceOsValue = result.data[20].result;

                        vm.sphericalNearOd = result.data[21].result;
                        vm.sphericalNearOdV = result.data[22].result;

                        if (vm.sphericalNearOd === "-ve") {
                            vm.sphericalNearOdValue = "-" + result.data[22].result;
                        } else {
                            vm.sphericalNearOdValue = "+" + result.data[22].result;

                        }

                        vm.sphericalNearOs = result.data[23].result;
                        vm.sphericalNearOsV = result.data[24].result;

                        if (vm.sphericalNearOs === "-ve") {
                            vm.sphericalNearOsValue = "-" + result.data[24].result;
                        } else {
                            vm.sphericalNearOsValue = "+" + result.data[24].result;
                        }

                        vm.vancDistanceOd = result.data[25].result;
                        vm.vancDistanceOs = result.data[26].result;
                        vm.vancNearOd = result.data[27].result;
                        vm.vancNearOs = result.data[28].result;

                        vm.pgSpherDistOd = result.data[29].result;
                        vm.pgSpherDistOdV = result.data[30].result;

                        if (vm.pgSpherDistOd === "-ve") {
                            vm.pgSpherDistOdValue = "-" + result.data[30].result;
                        } else {
                            vm.pgSpherDistOdValue = "+" + result.data[30].result;
                        }
                        vm.pgCylDistOd = result.data[31].result;
                        vm.pgCylDistOdV = result.data[32].result;

                        if (vm.pgCylDistOd === "-ve") {
                            vm.pgCylDistOdValue = "-" + result.data[32].result;
                        } else {
                            vm.pgCylDistOdValue = "+" + result.data[32].result;
                        }
                        vm.pgAxisDistanceOd = result.data[33].result;
                        vm.pgAxisDistanceOs = result.data[34].result;

                        vm.pgSpherDistOs = result.data[35].result;
                        vm.pgSpherDistOsV = result.data[36].result;

                        if (vm.pgSpherDistOs === "-ve") {
                            vm.pgSpherDistOsValue = "-" + result.data[36].result;
                        } else {
                            vm.pgSpherDistOsValue = "+" + result.data[36].result;
                        }
                        vm.pgCylDistOs = result.data[37].result;
                        vm.pgCylDistOsV = result.data[38].result;
                        if (vm.pgCylDistOs === "-ve") {
                            vm.pgCylDistOsValue = "-" + result.data[38].result;
                        } else {
                            vm.pgCylDistOsValue = "+" + result.data[38].result;
                        }
                        vm.pgSphNearOd = result.data[39].result;
                        vm.pgSphNearOdV = result.data[40].result;
                        if (vm.pgSphNearOd === "-ve") {
                            vm.pgSphNearOdValue = "-" + result.data[40].result;
                        } else {
                            vm.pgSphNearOdValue = "+" + result.data[40].result;
                        }
                        vm.pgSphNearOs = result.data[41].result;
                        vm.pgSphNearOsV = result.data[42].result;
                        if (vm.pgSphNearOs === "-ve") {
                            vm.pgSphNearOsValue = "-" + result.data[42].result;
                        } else {
                            vm.pgSphNearOsValue = "+" + result.data[42].result;
                        }

                        $scope.showReport = true;
                    }
                    //  console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
            vm.noalert();

        };


        vm.fetchUserSummary = function () {
            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();

        
            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationAll?mrdno=' + vm.selectedRep.mrdno,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.UserSummaryList = result.data;
                    console.log(result.data);
                    //  alert(vm.result.data[0]);
                    if (vm.UserSummaryList.normal_od_tick) { vm.normal_od_tick = true; } else { vm.normal_od_tick = false; }
                    if (vm.UserSummaryList.refractive_error_od_tick) { vm.refractive_error_od_tick = true; } else { vm.refractive_error_od_tick = false; }
                    if (vm.UserSummaryList.cataract_untreated_od_tick) { vm.cataract_untreated_od_tick = true; } else { vm.cataract_untreated_od_tick = false; }
                    if (vm.UserSummaryList.phthisis_od_tick) { vm.phthisis_od_tick = true; } else { vm.phthisis_od_tick = false; }
                    if (vm.UserSummaryList.glaucoma_od_tick) { vm.glaucoma_od_tick = true; } else { vm.glaucoma_od_tick = false; }
                    if (vm.UserSummaryList.diabetic_od_tick) { vm.diabetic_od_tick = true; } else { vm.diabetic_od_tick = false; }
                    if (vm.UserSummaryList.other_posterior_od_tick) { vm.other_posterior_od_tick = true; } else { vm.other_posterior_od_tick = false; }

                    if (vm.UserSummaryList.others_od_tick) {
                        vm.others_od_tick = true;
                        vm.others_od = vm.UserSummaryList.others_od;
                    } else { vm.others_od_tick = false; }

                    if (vm.UserSummaryList.medical_treatment_od_tick || vm.medical_treatment_od !== undefined) {
                        vm.medical_treatment_od_tick = true;
                        vm.medical_treatment_od = vm.UserSummaryList.medical_treatment_od;
                    } else { vm.medical_treatment_od_tick = false; }

                    if (vm.UserSummaryList.surgrical_treatment_od_tick) {
                        vm.surgrical_treatment_od_tick = true;
                        vm.surgrical_treatment_od = vm.UserSummaryList.surgrical_treatment_od;
                    }
                    else { vm.surgrical_treatment_od_tick = false; }
                    if (vm.UserSummaryList.followup_od !== null || vm.UserSummaryList.followup_od !== undefined) {
                        vm.followup_od = vm.UserSummaryList.followup_od;
                    } else { vm.followup_od = false; }

                    if (vm.UserSummaryList.normal_os_tick) { vm.normal_os_tick = true; } else { vm.normal_os_tick = false; }
                    if (vm.UserSummaryList.refractive_error_os_tick) { vm.refractive_error_os_tick = true; } else { vm.refractive_error_os_tick = false; }
                    if (vm.UserSummaryList.cataract_untreated_os_tick) { vm.cataract_untreated_os_tick = true; } else { vm.cataract_untreated_os_tick = false; }
                    if (vm.UserSummaryList.phthisis_os_tick) { vm.phthisis_os_tick = true; } else { vm.phthisis_os_tick = false; }
                    if (vm.UserSummaryList.glaucoma_os_tick) { vm.glaucoma_os_tick = true; } else { vm.glaucoma_os_tick = false; }
                    if (vm.UserSummaryList.diabetic_os_tick) { vm.diabetic_os_tick = true; } else { vm.diabetic_os_tick = false; }
                    if (vm.UserSummaryList.other_posterior_os_tick) { vm.other_posterior_os_tick = true; } else { vm.other_posterior_os_tick = false; }
                    if (vm.UserSummaryList.cns_os === "true") { vm.cns_os = true; } else { vm.cns_os = false; }

                    if (vm.UserSummaryList.others_os_tick) {
                        vm.others_os_tick = true;
                        vm.others_os = vm.UserSummaryList.others_os;
                    } else { vm.others_os_tick = false; }

                    if (vm.UserSummaryList.medical_treatment_os_tick) {
                        vm.medical_treatment_os_tick = true;
                        vm.medical_treatment_os = vm.UserSummaryList.medical_treatment_os;
                    } else { vm.medical_treatment_os_tick = false; }
                    if (vm.UserSummaryList.surgrical_treatment_os_tick) {
                        vm.surgrical_treatment_os_tick = true;
                        vm.surgrical_treatment_os = vm.UserSummaryList.surgrical_treatment_os;
                    } else { vm.surgrical_treatment_os_tick = false; }

                    if (vm.UserSummaryList.followup_os !== null || vm.UserSummaryList.followup_os !== undefined) {
                        vm.followup_os = vm.UserSummaryList.followup_os;
                    }
                    else { vm.followup_os = false; }


                    if (vm.UserSummaryList.laser_treatment_od_tick === true) {
                        vm.laser_treatment_od_tick = true;
                        vm.laser_treatment_od = vm.UserSummaryList.laser_treatment_od;
                    } else { vm.laser_treatment_od_tick = false; }


                    if (vm.UserSummaryList.laser_treatment_os_tick === true) {
                        vm.laser_treatment_os_tick = true;
                        vm.laser_treatment_os = vm.UserSummaryList.laser_treatment_os;
                    } else { vm.laser_treatment_os_tick = false; }


                    if (vm.UserSummaryList.subspeciality_referal_od_tick === true) {
                        vm.subspeciality_referal_od_tick = true;
                    } else { vm.subspeciality_referal_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_referal_os_tick === true) { vm.subspeciality_referal_os_tick = true; }
                    else { vm.subspeciality_referal_os_tick = false; }
                    if (vm.UserSummaryList.subspec_corena_od_tick === true) { vm.subspec_corena_od_tick = true; }
                    else { vm.subspec_corena_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_retina_od_tick === true) { vm.subspeciality_retina_od_tick = true; }
                    else { vm.subspeciality_retina_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_glaucoma_od_tick === true) { vm.subspeciality_glaucoma_od_tick = true; }
                    else { vm.subspeciality_glaucoma_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_opal_od_tick === true) { vm.subspeciality_opal_od_tick = true; }
                    else { vm.subspeciality_opal_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_referr_od_tick === true) { vm.subspeciality_referr_od_tick = true; }
                    else { vm.subspeciality_referr_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_squint_od_tick === true) { vm.subspeciality_squint_od_tick = true; }
                    else { vm.subspeciality_squint_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_uvea_od_tick === true) { vm.subspeciality_uvea_od_tick = true; }
                    else { vm.subspeciality_uvea_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_neuropthalmo_od_tick === true) { vm.subspeciality_neuropthalmo_od_tick = true; }
                    else { vm.subspeciality_neuropthalmo_od_tick = false; }
                    if (vm.UserSummaryList.subspeciality_none_od_tick === true) { vm.subspeciality_none_od_tick = true; }
                    else { vm.subspeciality_none_od_tick = false; }
                    if (vm.UserSummaryList.subspec_corena_os_tick === true) { vm.subspec_corena_os_tick = true; }
                    else { vm.subspec_corena_os_tick = false; }
                    if (vm.UserSummaryList.subspeciality_retina_os_tick === true) { vm.subspeciality_retina_os_tick = true; }
                    else { vm.subspeciality_retina_os_tick = false; }
                    if (vm.UserSummaryList.subspeciality_glaucoma_os_tick === true) { vm.subspeciality_glaucoma_os_tick = true; }
                    else { vm.subspeciality_glaucoma_os_tick = false; }
                    if (vm.UserSummaryList.subspeciality_opal_os_tick === true) { vm.subspeciality_opal_os_tick = true; }
                    else { vm.subspeciality_opal_os_tick = false; }
                    if (vm.UserSummaryList.subspeciality_referr_os_tick === true) { vm.subspeciality_referr_os_tick = true; }
                    else { vm.subspeciality_referr_os_tick = false; }
                    if (vm.UserSummaryList.subspeciality_squint_os_tick === true) { vm.subspeciality_squint_os_tick = true; }
                    else { vm.subspeciality_squint_os_tick = false; }
                    if (vm.UserSummaryList.subspeciality_uvea_os_tick === true) { vm.subspeciality_uvea_os_tick = true; }
                    else { vm.subspeciality_uvea_os_tick = false; }
                    if (vm.UserSummaryList.subspeciality_neuropthalmo_os_tick === true) { vm.subspeciality_neuropthalmo_os_tick = true; }
                    else { vm.subspeciality_neuropthalmo_os_tick = false; }
                    if (vm.UserSummaryList.subspeciality_none_os_tick === true) { vm.subspeciality_none_os_tick = true; }
                    else { vm.subspeciality_none_os_tick = false; }

                    // if (vm.UserSummaryList.tx_plan !== undefined ||vm.UserSummaryList.tx_plan !== null || vm.UserSummaryList.tx_plan.length !== 0)
                    //  { vm.tx_planShow = true; 
                    // vm.tx_plan = vm.UserSummaryList.tx_plan;}
                    // else { vm.tx_planShow = false; }


                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });

        };


        vm.deleteRecord = function () {
            if (confirm('Are you sure you want to delete this record?')) {
                var userId = TokenService.getUserId();

                var mrdPayload = {
                    mrdno: vm.userMrd,
                };
                var token = localStorage.getItem('access_token');
                $http.post(UrlConfig.labReportBaseUrl() + 'api/VisionandRefractionDetails/Delete',
                    mrdPayload, { headers: { Authorization: 'Bearer ' + token } })

                    .then(function (result) {
                        // console.log(result.data);
                        vm.notification = { mode: 'success', message: 'MRD report deleted' };
                        vm.fetchUserReportList();

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

                // Save it!
            } else {
                return;
                //vm.selectedTemplate = null;
                // Do nothing!
            }
        }




        vm.onReportSelected = function () {
            vm.selectedReport = vm.UserReportList;
            $scope.newmdr = vm.userMrd;
            vm.fetchUserSummary();

        };



        vm.createMrd = function () {
            // if ($scope.newmdr === null || $scope.newmdr === undefined) {
            //     vm.notification = { mode: 'danger', message: 'Error: ' + allErrors };
            //     return;
            // }
            var userId = TokenService.getUserId();

            var mrdPayload = {
                mrdno: vm.selectedRep.inv_no,
                ddate: vm.today,
                userid: userId,
                biltime: vm.today,
                hospid: vm.selectedRep.hospid
            };
            var token = localStorage.getItem('access_token');
            $http.post(UrlConfig.labReportBaseUrl() + 'api/VisionAndRefraction', mrdPayload, { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    vm.notification = { mode: 'success', message: 'MRD number added' };


                }, function (error) {
                    console.log(error);
                    var allErrors = error.data.message;
                    if (error.data.modelState) {
                        for (var msg in error.data.modelState) {
                            allErrors += ('' + error.data.modelState[msg][0]);
                        }
                    }

                    //   vm.notification = { mode: 'danger', message: 'Error: ' + allErrors };
                });
            vm.noalert();
        };


        // Selected Report
        vm.onRepSelected = function (selected) {
            vm.selectedRep = selected;
            vm.selectedRep.mrdno = selected.inv_no;

            vm.createMrd();


            vm.noOcular = false;
            vm.noVision = false;
            vm.noPast = false;
            vm.noComplain = false;
            vm.noSmoke = false;
            vm.noDental = false;
            vm.noOcularExam = false;
            vm.noDerma = false;
            vm.noBiometry = false;
            console.log(selected);
            vm.fetchUserSummary();
            vm.fetchUserReportList();


            vm.getOcular();
            vm.getVision();
            vm.getPastEye();
            vm.getChiefComplain();
            vm.getSmoking();
            vm.getDental();
            vm.getOcularExam();
            vm.getDerma();
            vm.getBiometry();
        }



        vm.getOcularExam = function () {
            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularExaminationdetail?mrdno=' + vm.selectedRep.mrdno,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {

                    if (result.data.length === 0) {
                        //    vm.notification = { mode: 'danger', message: 'No report found' };
                        // $scope.noReport = true;
                        vm.noOcularExam = true;
                        $scope.loadtrue = false;
                    }
                    // else {
                    //     $scope.noReport = false;

                    //     $scope.loadtrue = false;
                    //     vm.UserReportList = result.data;
                    //     $scope.showReport = true;
                    //     console.log(result.data);
                    //     vm.userMrd = result.data[0].mrdno;
                    //     vm.pname = result.data[0].pname;
                    //     vm.address = result.data[0].address;
                    //     vm.contact = result.data[0].contact;
                    //     vm.gender = result.data[0].sex;
                    //     vm.age = result.data[0].age;
                    //     vm.reportDate = result.data[0].ddate;

                    // }


                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        }



        vm.getOcular = function () {
            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationdetail?mrdno=' + vm.selectedRep.mrdno,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {

                    if (result.data.length === 0) {
                        //    vm.notification = { mode: 'danger', message: 'No report found' };
                        // $scope.noReport = true;
                        vm.noOcular = true;
                        $scope.loadtrue = false;
                    }
                    // else {
                    //     $scope.noReport = false;

                    //     $scope.loadtrue = false;
                    //     vm.UserReportList = result.data;
                    //     $scope.showReport = true;
                    //     console.log(result.data);
                    //     vm.userMrd = result.data[0].mrdno;
                    //     vm.pname = result.data[0].pname;
                    //     vm.address = result.data[0].address;
                    //     vm.contact = result.data[0].contact;
                    //     vm.gender = result.data[0].sex;
                    //     vm.age = result.data[0].age;
                    //     vm.reportDate = result.data[0].ddate;

                    // }


                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        }

        vm.getVision = function () {
            var token = localStorage.getItem('access_token');
            //   $scope.mdrsearch = 8;
            // var userId = TokenService.getUserId(); 
            $http.get(UrlConfig.labReportBaseUrl() + 'api/VisionandRefractionDetails?mrdno=' + vm.selectedRep.mrdno, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.visionRefraction = result.data;
                    if (result.data.length === 0 || result.data.length !== 47) {
                        //     vm.notification = { mode: 'danger', message: 'No report found' };
                        // $scope.showNew = true;
                        vm.noVision = true;
                        // $scope.noReport = true;
                    } else {
                        vm.userMrd = result.data[0].mrdno;
                        vm.pname = result.data[0].pname;
                        vm.address = result.data[0].address;
                        vm.contact = result.data[0].contact;
                        vm.gender = result.data[0].sex;
                        vm.age = result.data[0].age;


                        vm.reportDate = result.data[0].ddate;

                        vm.disGlass = result.data[0].tick_mark;
                        vm.distanceGlasses = result.data[0].tick_mark;
                        if (vm.distanceGlasses === true) {
                            vm.distanceGlasses = "Yes";
                        }
                        if (vm.distanceGlasses === false) {
                            vm.distanceGlasses = "No";
                        }
                        vm.nearGlass = result.data[0].tick_mark;
                        vm.nearGlasses = result.data[1].tick_mark;
                        if (vm.nearGlasses === true) {
                            vm.nearGlasses = "Yes";
                        }
                        if (vm.nearGlasses === false) {
                            vm.nearGlasses = "No";
                        }
                        vm.regularGlasses = result.data[2].tick_mark;

                        vm.pvaDistanceOd = result.data[3].result;
                        vm.pvDistanceOd = result.data[4].result;

                        vm.pvaDistanceOs = result.data[5].result;
                        vm.pvDistanceOs = result.data[6].result;

                        vm.pvaNearOd = result.data[7].result;
                        vm.pvNearOd = result.data[8].result;

                        vm.pvaNearOs = result.data[9].result;
                        vm.pvNearOs = result.data[10].result;

                        vm.sphericalDistanceOd = result.data[11].result;
                        vm.sphericalDistanceOdV = result.data[12].result;

                        if (vm.sphericalDistanceOd === "-ve") {
                            vm.sphericalDistanceOdValue = "-" + result.data[12].result;
                        } else {
                            vm.sphericalDistanceOdValue = "+" + result.data[12].result;

                        }

                        vm.cylindricalDistanceOd = result.data[13].result;
                        vm.cylindricalDistanceOdV = result.data[14].result
                        if (vm.cylindricalDistanceOd === "-ve") {
                            vm.cylindricalDistanceOdValue = "-" + result.data[14].result;
                        } else {
                            vm.cylindricalDistanceOdValue = "+" + result.data[14].result;
                        }


                        vm.axisDistanceOd = result.data[15].result;
                        vm.axisDistanceOs = result.data[16].result;

                        vm.sphericalDistanceOs = result.data[17].result;
                        vm.sphericalDistanceOsV = result.data[18].result;

                        if (vm.sphericalDistanceOs === "-ve") {
                            vm.sphericalDistanceOsValue = "-" + result.data[18].result;
                        } else {
                            vm.sphericalDistanceOsValue = "+" + result.data[18].result;

                        }


                        vm.cylindricalDistanceOs = result.data[19].result;
                        vm.cylindricalDistanceOsV = result.data[20].result;

                        if (vm.cylindricalDistanceOs === "-ve") {
                            vm.cylindricalDistanceOsValue = "-" + result.data[20].result;
                        } else {
                            vm.cylindricalDistanceOsValue = "+" + result.data[20].result;
                        }
                        vm.cylindricalDistanceOsValue = result.data[20].result;

                        vm.sphericalNearOd = result.data[21].result;
                        vm.sphericalNearOdV = result.data[22].result;

                        if (vm.sphericalNearOd === "-ve") {
                            vm.sphericalNearOdValue = "-" + result.data[22].result;
                        } else {
                            vm.sphericalNearOdValue = "+" + result.data[22].result;

                        }

                        vm.sphericalNearOs = result.data[23].result;
                        vm.sphericalNearOsV = result.data[24].result;

                        if (vm.sphericalNearOs === "-ve") {
                            vm.sphericalNearOsValue = "-" + result.data[24].result;
                        } else {
                            vm.sphericalNearOsValue = "+" + result.data[24].result;
                        }

                        vm.vancDistanceOd = result.data[25].result;
                        vm.vancDistanceOs = result.data[26].result;
                        vm.vancNearOd = result.data[27].result;
                        vm.vancNearOs = result.data[28].result;

                        vm.pgSpherDistOd = result.data[29].result;
                        vm.pgSpherDistOdV = result.data[30].result;

                        if (vm.pgSpherDistOd === "-ve") {
                            vm.pgSpherDistOdValue = "-" + result.data[30].result;
                        } else {
                            vm.pgSpherDistOdValue = "+" + result.data[30].result;
                        }
                        vm.pgCylDistOd = result.data[31].result;
                        vm.pgCylDistOdV = result.data[32].result;

                        if (vm.pgCylDistOd === "-ve") {
                            vm.pgCylDistOdValue = "-" + result.data[32].result;
                        } else {
                            vm.pgCylDistOdValue = "+" + result.data[32].result;
                        }
                        vm.pgAxisDistanceOd = result.data[33].result;
                        vm.pgAxisDistanceOs = result.data[34].result;

                        vm.pgSpherDistOs = result.data[35].result;
                        vm.pgSpherDistOsV = result.data[36].result;

                        if (vm.pgSpherDistOs === "-ve") {
                            vm.pgSpherDistOsValue = "-" + result.data[36].result;
                        } else {
                            vm.pgSpherDistOsValue = "+" + result.data[36].result;
                        }
                        vm.pgCylDistOs = result.data[37].result;
                        vm.pgCylDistOsV = result.data[38].result;
                        if (vm.pgCylDistOs === "-ve") {
                            vm.pgCylDistOsValue = "-" + result.data[38].result;
                        } else {
                            vm.pgCylDistOsValue = "+" + result.data[38].result;
                        }
                        vm.pgSphNearOd = result.data[39].result;
                        vm.pgSphNearOdV = result.data[40].result;
                        if (vm.pgSphNearOd === "-ve") {
                            vm.pgSphNearOdValue = "-" + result.data[40].result;
                        } else {
                            vm.pgSphNearOdValue = "+" + result.data[40].result;
                        }
                        vm.pgSphNearOs = result.data[41].result;
                        vm.pgSphNearOsV = result.data[42].result;
                        if (vm.pgSphNearOs === "-ve") {
                            vm.pgSphNearOsValue = "-" + result.data[42].result;
                        } else {
                            vm.pgSphNearOsValue = "+" + result.data[42].result;
                        }

                        $scope.showReport = true;
                    }
                 //   console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
            vm.noalert();

        }

        vm.getPastEye = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;
            //api/PastEyeHistoryAll

            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/PastEyeHistoryDetails?mrdno=' + vm.selectedRep.mrdno, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.pastEye = result.data;
                    if (result.data.length === 0) {
                        //   vm.notification = { mode: 'danger', message: 'No report found' };
                        //  $scope.noReport = true;
                        vm.noPast = true;
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
                  //  console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });


            vm.noalert();

        };

        vm.getChiefComplain = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;


            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/ChiefComplainDetails?mrdno=' + vm.selectedRep.mrdno, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.chiefComplain = result.data;
                    if (result.data.length === 0) {
                        //     vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.noReport = true;
                        vm.noComplain = true;
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
                    //  console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });


            vm.noalert();

        };

        vm.getSmoking = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;


            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/SmokingHistoryDetails?mrdno=' + vm.selectedRep.mrdno, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.smokingInfo = result.data;
                    if (result.data.length === 0) {
                        //   vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.noReport = true;
                        vm.noSmoke = true;
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
                  //  console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });

            vm.noalert();

        };

        vm.getDental = function () {
            $scope.loadtrue = true;
            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/DentalInformationDetails?mrdno=' + vm.selectedRep.mrdno,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.DentalInfoList = result.data;
                    if (result.data.length === 0) {
                        //  vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.noReport = true;
                        vm.noDental = true;
                    } else {
                        vm.userMrd = result.data[0].mrdno;
                        vm.pname = result.data[0].pname;
                        vm.address = result.data[0].address;
                        vm.contact = result.data[0].contact;
                        vm.gender = result.data[0].sex;
                        vm.age = result.data[0].age;
                        vm.reportDate = result.data[0].ddate;
                    }
                    $scope.showReport = true;
                   // console.log(result.data);
                    $scope.loadtrue = false;
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });


        };


        vm.getDerma = function () {

            $scope.loadtrue = true;
            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/DermatologyDetails?mrdno=' + vm.selectedRep.mrdno,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.DermoReportList = result.data;
                    if (result.data.length === 0) {
                        //         vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.showReport = true;
                        $scope.noReport = true;
                        vm.noDerma = true;
                    } else {
                        vm.userMrd = result.data[0].mrdno;
                        vm.pname = result.data[0].pname;
                        vm.address = result.data[0].address;
                        vm.contact = result.data[0].contact;
                        vm.gender = result.data[0].sex;
                        vm.age = result.data[0].age;
                        vm.reportDate = result.data[0].ddate;
                        vm.maritialstatus = result.data[0].maritialstatus;


                        $scope.showReport = true;
                    }
                    //  console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
            vm.noalert();


        }

        vm.getBiometry = function () {
            $scope.loadtrue = true;

            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();


            $http.get(UrlConfig.labReportBaseUrl() + 'api/CsiAll?mrdno=' + vm.selectedRep.mrdno,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {

                    // $scope.noReport = false;

                    $scope.loadtrue = false;
                    vm.biometryList = result.data;
                  console.log(result.data)
                    if (vm.biometryList.mrdno !== undefined) {
                        vm.k1od = vm.biometryList.k1od
                        vm.k1os = vm.biometryList.k1os
                        vm.k2od = vm.biometryList.k2od
                        vm.k2os = vm.biometryList.k2os
                        vm.axial_od = vm.biometryList.axial_od
                        vm.axial_os = vm.biometryList.axial_os
                        vm.iol_od = vm.biometryList.iol_od
                        vm.iol_os = vm.biometryList.iol_os
                        vm.blood_report = vm.biometryList.blood_report
                        vm.hbsag_react_tick = vm.biometryList.hbsag_react_tick
                        vm.hcv_react_tick = vm.biometryList.hcv_react_tick
                        vm.hiv_tick = vm.biometryList.hiv_tick
                        vm.bs_fbs_tick = vm.biometryList.bs_fbs_tick
                        vm.bs_pp_tick = vm.biometryList.bs_pp_tick
                        vm.mrdno = vm.biometryList.mrdno
                        vm.bs_rbs_tick = vm.biometryList.bs_rbs_tick
                        vm.bs_rbs = vm.biometryList.bs_rbs
                        vm.bs_fbs = vm.biometryList.bs_fbs
                        vm.bs_pp = vm.biometryList.bs_pp
                        vm.a_constant_od = vm.biometryList.a_constant_od
                        vm.a_constant_os = vm.biometryList.a_constant_os
                        vm.bioremarks=vm.biometryList.remarks

                        // console.log("AconsOD" +vm.a_constant_od)
                        // console.log("AconsOD from table" +vm.biometryList.a_constant_od)
                        // console.log("AconsOs" +vm.a_constant_os)
                        // console.log("AconsOs table" +vm.biometryList.a_constant_os)

                    }
                    if (vm.biometryList.mrdno === null || vm.biometryList.mrdno === undefined) {
                        vm.noBiometry = true;
                    }


                    //$scope.showReport = true;
                    // console.log(result.data);




                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };


        vm.goToOcular = function () {
            //    vm.selectedReport = report;
            window.open('#!/ocularinvestigation?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname,

                '_self', '');
        }
        vm.goToOcularExam = function () {
            //    vm.selectedReport = report;
            window.open('#!/ocularexamination?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname,

                '_self', '');
        }


        vm.goToVision = function () {
            //    vm.selectedReport = report;
            window.open('#!/visionandrefraction?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname,

                '_self', '');
        }
        vm.goToPast = function () {
            //    vm.selectedReport = report;
            window.open('#!/pasteyehistory?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname,
                '_self', '');
        }
        vm.goToComplain = function () {
            //    vm.selectedReport = report;
            window.open('#!/chiefeyecomplain?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname,
                '_self', '');
        }

        vm.goToSmoke = function () {
            //    vm.selectedReport = report;
            window.open('#!/smokinghistory?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname,

                '_self', '');
        }

        vm.goToDental = function () {
            //    vm.selectedReport = report;
            window.open('#!/dentalinfo?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname,

                '_self', '');
        }
        vm.goToDerma = function () {
            //    vm.selectedReport = report;
            window.open('#!/dermatology?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname +
                '&date=' + vm.selectedRep.ddate,

                '_self', '');
        }

        vm.goToBiometry = function () {
            //    vm.selectedReport = report;
            window.open('#!/biometry?mrdno=' + vm.selectedRep.inv_no +
                '&hospid=' + vm.selectedRep.hospid + '&pname=' + vm.selectedRep.pname +
                '&date=' + vm.selectedRep.ddate,

                '_self', '');
        }

        $scope.rowHighilited = function (row) {
            $scope.selectedRow = row;
        }





        vm.config = {
            // replace this key with yours
            "publicKey": $("#key").val(), //document.getElementById("key"),              //$scope.publicKey,  // key "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
            "productIdentity": $("#prodnum").val(),    // document.getElementById("prodnum"),  //$scope.productNumber,//"1234567890",
            "productName": $("#prodname").val(),    //document.getElementById("prodname"), // prodname $scope.productName,//"Drogon",
            "productUrl": $("#produrl").val(),    //"http://gameofthrones.com/buy/Dragons",
            "eventHandler": {
                onSuccess(payload) {
                    // hit merchant api for initiating verfication
                    console.log(payload);
                },
                // onError handler is optional
                onError(error) {
                    // handle errors
                    console.log(error);
                },
                onClose() {
                    console.log('widget is closing');
                }
            },
            "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
        };

        // var checkout = new KhaltiCheckout(vm.config);
        // var btn = document.getElementById("payment-button");
        // btn.onclick = function () {
        //     // minimum transaction amount must be 10, i.e 1000 in paisa.
        //     checkout.show({ amount: $scope.amount });
        // };


        vm.noalert = function () {
            $timeout(vm.resetNotification, 4000);
        }


        vm.PrintRecord = function () {
            if (window.confirm("Do you want to include Biometry?")) {
                vm.biometryPrint=true;

            } else {
                vm.biometryPrint=false;
            }
            printData();
        }

        function printData() {
            $scope.full = 12;
            $scope.IsHeadVisible = $scope.IsHeadVisible ? false : true;
            var divToPrint = document.getElementById("report");

            var htmlToPrint = '' +
                '<style type="text/css">' +
                '@page{margin-top:' + vm.space + '!important;}' +
                'th, td {' +
                'border:0.0001em solid #000;padding: 0px;font-size:13px;line-height:14px;text-align: left;font-weight:100 !important;margin-bottom:2px !important;}' +
                '#get {display: none !important; visibility: hidden !important;} ' +
                // 'tbody{min-height: 25em !important;}' +
                '#name{font-weight: bold;}' +
                '#right{text-align: right !important;}' +
                '#left{text-align: left !important;}' +
                '#center{text-align: center !important;}' +
                '.text-center{text-align: center !important;}' +
                '.rightonly{text-align: right !important;margin-left:60% !important;}' +
                '.floatr{float: right !important}' +
                '.pp{font-size:13px !important;}' +
                '.f-0{margin:2px 0px !important;padding:2px 0px !important;font-weight:bold !important;}' +
                '.b-0{margin:2px 0px !important;padding:2px 0px !important;}' +


                // 'strong{font-weight:300 !important;text-align:left !important;}' +
                'table {border-collapse: collapse;}' +
                '.noborder{ border-bottom:none;}' +
                '#noborder tr td{ border:none !important;}' +
                '#noborder tr th{ border:none !important;}' +
                '#bottomborder{ border-bottom:1px solid black !important;}' +
                'span{font-size:13px !important;margin-top:10px !important;}' +
                '.pagebreak { page-break-before: always; }' +
                // '.col-md-6 {width:50%;}'+
                ' #sameline,#sameline1{display:inline;}'+
                // '.col-md {width:50%;float:right}'+

                // '.col-md-4{width:40%}'+
                // '.textr{ text-align:right !important;margin-right:0px !important;right:0 !important;}' +
                '</style>';
            htmlToPrint += divToPrint.outerHTML;
            newWin = window.open("");
            newWin.document.write(htmlToPrint);
            newWin.print();
            newWin.close();
        }



        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };

        vm.reset = function () {
            $scope.mdrsearch = undefined;
            vm.fetchMainList()
        };


    }]);