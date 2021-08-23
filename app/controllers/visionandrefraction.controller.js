app.controller('VisionAndRefractionController', ['$http', 'UrlConfig', 'Config', 'TokenService', 'DateService',
    '$scope', '$filter', '$timeout', 'BroadcastService', '$routeParams', '$anchorScroll',
    function ($http, UrlConfig, Config, TokenService, DateService, $scope, $filter,
        $timeout, BroadcastService, $routeParams, $anchorScroll) {

        var vm = this;

        vm.pagetitle = "Vision And Refraction";
        //vm.selectedTitle = null;
        //vm.selectedOpdBill = null;

        vm.init = function () {
            $anchorScroll();
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
            vm.space = Config.spaceAbove;

            //   vm.fetchRefererList();


            vm.AdToBsInit(vm.initFiltered);
            vm.AdToBsFinal(vm.finalFiltered);

            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/VisionandRefraction?mrdno=0', { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.AllReportList = result.data;
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });


            $scope.anterior_segment_tick = false;
            $scope.ct_od_tick = false;
            $scope.ct_mh_od_tick = false;
            $scope.ct_mh_os_tick = false;
            $scope.ct_pc_od_tick = false;
            $scope.ct_pc_os_tick = false;
            $scope.ct_nf_od_tick = false;
            $scope.ct_nf_os_tick = false;
            $scope.ct_other_od_tick = false;
            $scope.ct_other_os_tick = false;
            $scope.ct_erpretation_od_tick = false;
            $scope.ct_erpretation_os_tick = false;
            $scope.ascan_od_tick = false;
            $scope.ascan_os_tick = false;
            $scope.ascan_mh_od_tick = false;
            $scope.ascan_mh_os_tick = false;
            $scope.ascan_pc_od_tick = false;
            $scope.ascan_pc_os_tick = false;
            $scope.ascan_nf_od_tick = false;
            $scope.ascan_nf_os_tick = false;
            $scope.ascan_other_od_tick = false;
            $scope.ascan_other_os_tick = false;
            $scope.ascan_erpretation_od_tick = false;
            $scope.ascan_erpretation_os_tick = false;
            $scope.anterioroct_od_tick = false;
            $scope.anterioroct_os_tick = false;
            $scope.anterioroct_mh_od_tick = false;
            $scope.anterioroct_mh_os_tick = false;
            $scope.anterioroct_pc_od_tick = false;
            $scope.anterioroct_pc_os_tick = false;
            $scope.anterioroct_nf_od_tick = false;
            $scope.anterioroct_nf_os_tick = false;
            $scope.anterioroct_other_od_tick = false;
            $scope.anterioroct_other_os_tick = false;


            $scope.anterioroct_erpretation_od_tick = false;
            $scope.anterioroct_erpretation_os_tick = false;



            $scope.at_od_tick = false;
            $scope.at_os_tick = false;


            $scope.at_mh_od_tick = false;
            $scope.at_mh_os_tick = false;
            $scope.at_pc_od_tick = false;
            $scope.at_pc_os_tick = false;
            $scope.at_nf_od_tick = false;
            $scope.at_nf_os_tick = false;
            $scope.at_other_od_tick = false;
            $scope.at_other_os_tick = false;


            $scope.at_erpretation_od_tick = false;
            $scope.at_erpretation_os_tick = false;


            $scope.gonioscopy_od_tick = false;
            $scope.gonioscopy_os_tick = false;
            $scope.gonioscopy_od_open_tick = false;
            $scope.gonioscopy_od_close_tick = false;
            $scope.gonioscopy_od_occludable_tick = false;
            $scope.gonioscopy_od_nonoccludable_tick = false;
            $scope.gonioscopy_os_open_tick = false;
            $scope.gonioscopy_os_close_tick = false;
            $scope.gonioscopy_os_occludable_tick = false;
            $scope.gonioscopy_os_nonoccludable_tick = false;
            $scope.gonioscopy_mh_od_tick = false;
            $scope.gonioscopy_mh_os_tick = false;
            $scope.gonioscopy_pc_od_tick = false;
            $scope.gonioscopy_pc_os_tick = false;
            $scope.gonioscopy_nf_od_tick = false;
            $scope.gonioscopy_nf_os_tick = false;
            $scope.gonioscopy_other_od_tick = false;
            $scope.gonioscopy_other_os_tick = false;


            $scope.gonioscopy_erpretation_od_tick = false;
            $scope.gonioscopy_erpretation_os_tick = false;
            $scope.gonioscopy_erpretation_od = false;
            $scope.gonioscopy_erpretation_os = false;
            $scope.normal_od_tick = false;
            $scope.refractive_error_od_tick = false;
            $scope.presbyopia_od_tick = false;
            $scope.cataract_untreated_od_tick = false;
            $scope.aphakia_od_tick = false;
            $scope.cataract_surg_complications_od_tick = false;
            $scope.tco_od_tick = false;
            $scope.phthisis_od_tick = false;
            $scope.onchcercia_od_tick = false;
            $scope.glaucoma_od_tick = false;
            $scope.diabetic_od_tick = false;
            $scope.armd_od_tick = false;
            $scope.other_posterior_od_tick = false;

            $scope.others_od_tick = false;

            $scope.normal_os_tick = false;
            $scope.refractive_error_os_tick = false;
            $scope.presbyopia_os_tick = false;
            $scope.cataract_untreated_os_tick = false;
            $scope.aphakia_os_tick = false;
            $scope.cataract_surg_complications_os_tick = false;
            $scope.tco_os_tick = false;
            $scope.phthisis_os_tick = false;
            $scope.onchcercia_os_tick = false;
            $scope.glaucoma_os_tick = false;
            $scope.diabetic_os_tick = false;
            $scope.armd_os_tick = false;
            $scope.other_posterior_os_tick = false;

            $scope.others_os_tick = false;

            $scope.medical_treatment_od_tick = false;

            $scope.surgrical_treatment_od_tick = false;

            $scope.medical_treatment_os_tick = false;

            $scope.surgrical_treatment_os_tick = false;

            $scope.bscan_od_tick = false;




            $scope.bscan_nf_od_tick = false;
            $scope.bscan_mh_od_tick = false;
            $scope.bscan_pc_od_tick = false;
            $scope.bscan_os_tick = false;




            $scope.bscan_mh_os_tick = false;
            $scope.bscan_pc_os_tick = false;
            $scope.bscan_nf_os_tick = false;
            $scope.bscan_other_od_tick = false;
            $scope.bscan_other_os_tick = false;


            $scope.bscan_erpretation_od_tick = false;
            $scope.bscan_erpretation_os_tick = false;


            $scope.fundus_od_tick = false;
            $scope.fundus_mh_od_tick = false;
            $scope.fundus_pc_od_tick = false;
            $scope.fundus_nf_od_tick = false;
            $scope.fundus_others_od_tick = false;

            $scope.fundus_os_tick = false;
            $scope.fundus_mh_os_tick = false;
            $scope.fundus_pc_os_tick = false;
            $scope.fundus_nf_os_tick = false;
            $scope.fundus_others_os_tick = false;

            $scope.funudus_erpretation_od_tick = false;

            $scope.funudus_erpretation_os_tick = false;

            $scope.disc_od_tick = false;
            $scope.disc_mh_od_tick = false;
            $scope.disc_pc_od_tick = false;
            $scope.disc_nf_od_tick = false;
            $scope.disc_others_od_tick = false;

            $scope.disc_os_tick = false;
            $scope.disc_mh_os_tick = false;
            $scope.disc_pc_os_tick = false;
            $scope.disc_nf_os_tick = false;
            $scope.disc_others_os_tick = false;

            $scope.disc_erpretation_od_tick = false;
            $scope.disc_erpretation_os_tick = false;
            $scope.post_od_tick = false;
            $scope.post_os_tick = false;
            $scope.post_mh_od_tick = false;
            $scope.post_pc_od_tick = false;
            $scope.post_nf_od_tick = false;
            $scope.post_others_od_tick = false;

            $scope.post_mh_os_tick = false;
            $scope.post_pc_os_tick = false;
            $scope.post_nf_os_tick = false;
            $scope.post_others_os_tick = false;

            $scope.post_erpretation_od_tick = false;

            $scope.post_erpretation_os_tick = false;

            $scope.fdp_od_tick = false;
            $scope.fdp_mh_od_tick = false;
            $scope.fdp_pc_od_tick = false;
            $scope.fdp_nf_od_tick = false;
            $scope.fdp_others_od_tick = false;

            $scope.fdp_os_tick = false;
            $scope.fdp_mh_os_tick = false;
            $scope.fdp_pc_os_tick = false;
            $scope.fdp_nf_os_tick = false;
            $scope.fdp_others_os_tick = false;

            $scope.fdp_erpretation_od_tick = false;

            $scope.fdp_erpretation_os_tick = false;


            $scope.mrdnum = $routeParams.mrdno;
            $scope.hospitalid = $routeParams.hospid;
            vm.pname = $routeParams.pname;

            if ($scope.mrdnum !== undefined && $scope.hospitalid !== undefined) {
                vm.fetchVisionReport();
                vm.fetchUserReportList();
            }
            $scope.axis_distance_od = 0;
            $scope.axis_distance_os = 0;
            $scope.cylindrical_distance_od_value = 0;
            $scope.cylindrical_distance_os_value = 0;
            $scope.pg_axis_distance_od = 0;
            $scope.pg_axis_distance_os = 0;
            $scope.pg_cylindrical_distance_od_value = 0;
            $scope.pg_cylindrical_distance_os_value = 0;
            $scope.pg_spherical_distance_od_value = 0;
            $scope.pg_spherical_distance_os_value = 0;
            $scope.pg_spherical_near_od_value = 0;
            $scope.pg_spherical_near_os_value = 0;
            $scope.spherical_distance_od_value = 0;
            $scope.spherical_distance_os_value = 0;
            $scope.spherical_near_od_value = 0;
            $scope.spherical_near_os_value = 0;
            $scope.sphericaldistanceodvalue = 0;
            $scope.sphericaldistanceosvalue = 0;
            $scope.cylindricaldistanceodvalue = 0;
            $scope.cylindricaldistanceosvalue = 0;
            $scope.axisdistanceod = 0;
            $scope.axisdistanceos = 0;
            $scope.sphericalnearodvalue = 0;
            $scope.sphericalnearosvalue = 0;


        };

        $scope.hospid = 11417;
        vm.today = $filter("date")(new Date(), "yyyy/MM/dd");




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

        $scope.refractionValues = [{
            name: '+'
        },
        {

            name: '-'
        }
        ]

        $scope.nearVisionValues = [{
            name: '1(N-6)',
            value: '(N-6)'
        },
        {
            name: '2(N-8)',
            value: '(N-8)'
        }, {
            name: '3(N-10)',
            value: '(N-10)'
        }, {
            name: '4(N-12)',
            value: '(N-12)'
        }, {
            name: '5(N-14)',
            value: '(N-14)'
        }, {
            name: '6(N-18)',
            value: '(N-18)'
        }, {
            name: '7(N-24)',
            value: '(N-24)'
        }, {
            name: '8(N-36)',
            value: '(N-36)'
        }
        ];

        $scope.distanceVisionValues = [{
            name: '6/6(0)',
            value: '1(6/6(0))'
        },
        {
            name: '6/9(0.18)',
            value: '2(6/9(0.18))'
        }, {
            name: '6/12(0.30)',
            value: '3(6/12(0.30))'
        }, {
            name: '6/18(0.48)',
            value: '4(6/18(0.48))'
        }, {
            name: '6/24(0.60)',
            value: '5(6/24(0.60))'
        }, {
            name: '6/36(0.78)',
            value: '6(6/36(0.78))'
        }, {
            name: '6/60(1)',
            value: '7(6/60(1))'
        }, {
            name: '5/60(1.08)',
            value: '8(5/60(1.08))'
        }, {
            name: '4/60(1.18)',
            value: '9(4/60(1.18))'
        }, {
            name: '3/60(1.30)',
            value: '10(3/60(1.30))'
        }, {
            name: '2/60(1.48)',
            value: '11(2/60(1.48))'
        }, {
            name: '1/60(1.78)',
            value: '12(1/60(1.78))'
        }, {
            name: '1/2/60(2.08)',
            value: '13(1/2/60(2.08))'
        }, {
            name: 'PL+VE, PR Inaccurate (2.50)',
            value: '14(PL+VE, PR Inaccurate (2.50))'
        }, {
            name: 'PL+VE, PR Accurate (2.20)',
            value: '15(PL+VE, PR Accurate (2.20))'
        }, {
            name: 'Counting Finger and Close to Face (2.90)',
            value: '16(CFCF(2.90))'
        }, {
            name: 'Follows Light(2.20)',
            value: '17(FL(2.20))'
        }, {
            name: 'Light Perception(3.70)',
            value: '18(PL(3.70))'
        }, {
            name: 'Hand Movement (3.70)',
            value: '19(HM(3.70))'
        }, {
            name: 'NPL(4.00)',
            value: '20(NPL(4.00))'
        }
        ];



        vm.fetchVisionReport = function () {
            $scope.loadtrue = true;
            var token = localStorage.getItem('access_token');
            // var userId = TokenService.getUserId(); 
            $http.get(UrlConfig.labReportBaseUrl() + 'api/VisionandRefractionDetails?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.UserVisionList = result.data;

                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
            vm.noalert();

        };





        // PRINT

        vm.fetchUserReportList = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;

            vm.fetchUserSummary();
            // if ($scope.newmdr === null || $scope.newmdr === undefined) {
            //     $scope.newmdr = 0;
            // }
            var token = localStorage.getItem('access_token');
            //   $scope.mdrsearch = 8;
            // var userId = TokenService.getUserId(); 
            $http.get(UrlConfig.labReportBaseUrl() + 'api/VisionandRefractionDetails?mrdno=' + $scope.mrdnum, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.UserReportList = result.data;
                    if (result.data.length === 0) {
                        vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.showNew = true;
                        $scope.noReport = true;
                    } else {
                        vm.userMrd = result.data[0].mrdno;
                        //   vm.pname = result.data[0].pname;
                        vm.address = result.data[0].address;
                        vm.contact = result.data[0].contact;
                        vm.gender = result.data[0].sex;
                        vm.age = result.data[0].age;
                        $scope.showReport = true;


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

                        if (vm.sphericalDistanceOd === "-") {
                            vm.sphericalDistanceOdValue = "-" + result.data[12].result;
                        } else {
                            vm.sphericalDistanceOdValue = "+" + result.data[12].result;

                        }

                        vm.cylindricalDistanceOd = result.data[13].result;
                        vm.cylindricalDistanceOdV = result.data[14].result
                        if (vm.cylindricalDistanceOd === "-") {
                            vm.cylindricalDistanceOdValue = "-" + result.data[14].result;
                        } else {
                            vm.cylindricalDistanceOdValue = "+" + result.data[14].result;
                        }


                        vm.axisDistanceOd = result.data[15].result;
                        vm.axisDistanceOs = result.data[16].result;

                        vm.sphericalDistanceOs = result.data[17].result;
                        vm.sphericalDistanceOsV = result.data[18].result;

                        if (vm.sphericalDistanceOs === "-") {
                            vm.sphericalDistanceOsValue = "-" + result.data[18].result;
                        } else {
                            vm.sphericalDistanceOsValue = "+" + result.data[18].result;

                        }


                        vm.cylindricalDistanceOs = result.data[19].result;
                        vm.cylindricalDistanceOsV = result.data[20].result;

                        if (vm.cylindricalDistanceOs === "-") {
                            vm.cylindricalDistanceOsValue = "-" + result.data[20].result;
                        } else {
                            vm.cylindricalDistanceOsValue = "+" + result.data[20].result;
                        }
                        vm.cylindricalDistanceOsValue = result.data[20].result;

                        vm.sphericalNearOd = result.data[21].result;
                        vm.sphericalNearOdV = result.data[22].result;

                        if (vm.sphericalNearOd === "-") {
                            vm.sphericalNearOdValue = "-" + result.data[22].result;
                        } else {
                            vm.sphericalNearOdValue = "+" + result.data[22].result;

                        }

                        vm.sphericalNearOs = result.data[23].result;
                        vm.sphericalNearOsV = result.data[24].result;

                        if (vm.sphericalNearOs === "-") {
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

                        if (vm.pgSpherDistOd === "-") {
                            vm.pgSpherDistOdValue = "-" + result.data[30].result;
                        } else {
                            vm.pgSpherDistOdValue = "+" + result.data[30].result;
                        }
                        vm.pgCylDistOd = result.data[31].result;
                        vm.pgCylDistOdV = result.data[32].result;

                        if (vm.pgCylDistOd === "-") {
                            vm.pgCylDistOdValue = "-" + result.data[32].result;
                        } else {
                            vm.pgCylDistOdValue = "+" + result.data[32].result;
                        }
                        vm.pgAxisDistanceOd = result.data[33].result;
                        vm.pgAxisDistanceOs = result.data[34].result;

                        vm.pgSpherDistOs = result.data[35].result;
                        vm.pgSpherDistOsV = result.data[36].result;

                        if (vm.pgSpherDistOs === "-") {
                            vm.pgSpherDistOsValue = "-" + result.data[36].result;
                        } else {
                            vm.pgSpherDistOsValue = "+" + result.data[36].result;
                        }
                        vm.pgCylDistOs = result.data[37].result;
                        vm.pgCylDistOsV = result.data[38].result;
                        if (vm.pgCylDistOs === "-") {
                            vm.pgCylDistOsValue = "-" + result.data[38].result;
                        } else {
                            vm.pgCylDistOsValue = "+" + result.data[38].result;
                        }
                        vm.pgSphNearOd = result.data[39].result;
                        vm.pgSphNearOdV = result.data[40].result;
                        if (vm.pgSphNearOd === "-") {
                            vm.pgSphNearOdValue = "-" + result.data[40].result;
                        } else {
                            vm.pgSphNearOdValue = "+" + result.data[40].result;
                        }
                        vm.pgSphNearOs = result.data[41].result;
                        vm.pgSphNearOsV = result.data[42].result;
                        if (vm.pgSphNearOs === "-") {
                            vm.pgSphNearOsValue = "-" + result.data[42].result;
                        } else {
                            vm.pgSphNearOsValue = "+" + result.data[42].result;
                        }

                    }
                    console.log(result.data);
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

            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationSummary?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.UserSummaryList = result.data;
                    console.log(result.data);
                    //  alert(vm.result.data[0]);
                    if (vm.UserSummaryList.normal_od_tick) { vm.normal_od_tick = true; } else { vm.normal_od_tick = false; }
                    if (vm.UserSummaryList.refractive_error_od_tick) { vm.refractive_error_od_tick = true; } else { vm.refractive_error_od_tick = false; }
                    if (vm.UserSummaryList.presbyopia_od_tick) { vm.presbyopia_od_tick = true; } else { vm.presbyopia_od_tick = false; }
                    if (vm.UserSummaryList.cataract_untreated_od_tick) { vm.cataract_untreated_od_tick = true; } else { vm.cataract_untreated_od_tick = false; }
                    if (vm.UserSummaryList.aphakia_od_tick) { vm.aphakia_od_tick = true; } else { vm.aphakia_od_tick = false; }
                    if (vm.UserSummaryList.cataract_surg_complications_od_tick) { vm.cataract_surg_complications_od_tick = true; } else { vm.cataract_surg_complications_od_tick = false; }
                    if (vm.UserSummaryList.tco_od_tick) { vm.tco_od_tick = true; } else { vm.tco_od_tick = false; }
                    if (vm.UserSummaryList.phthisis_od_tick) { vm.phthisis_od_tick = true; } else { vm.phthisis_od_tick = false; }
                    if (vm.UserSummaryList.onchcercia_od_tick) { vm.onchcercia_od_tick = true; } else { vm.onchcercia_od_tick = false; }
                    if (vm.UserSummaryList.glaucoma_od_tick) { vm.glaucoma_od_tick = true; } else { vm.glaucoma_od_tick = false; }
                    if (vm.UserSummaryList.diabetic_od_tick) { vm.diabetic_od_tick = true; } else { vm.diabetic_od_tick = false; }
                    if (vm.UserSummaryList.armd_od_tick) { vm.armd_od_tick = true; } else { vm.armd_od_tick = false; }
                    if (vm.UserSummaryList.other_posterior_od_tick) { vm.other_posterior_od_tick = true; } else { vm.other_posterior_od_tick = false; }
                    if (vm.UserSummaryList.cns_od === "true") { vm.cns_od = true; } else { vm.cns_od = false; }

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
                    if (vm.UserSummaryList.presbyopia_os_tick) { vm.presbyopia_os_tick = true; } else { vm.presbyopia_os_tick = false; }
                    if (vm.UserSummaryList.cataract_untreated_os_tick) { vm.cataract_untreated_os_tick = true; } else { vm.cataract_untreated_os_tick = false; }
                    if (vm.UserSummaryList.aphakia_os_tick) { vm.aphakia_os_tick = true; } else { vm.aphakia_os_tick = false; }
                    if (vm.UserSummaryList.cataract_surg_complications_os_tick) { vm.cataract_surg_complications_os_tick = true; } else { vm.cataract_surg_complications_os_tick = false; }
                    if (vm.UserSummaryList.tco_os_tick) { vm.tco_os_tick = true; } else { vm.tco_os_tick = false; }
                    if (vm.UserSummaryList.phthisis_os_tick) { vm.phthisis_os_tick = true; } else { vm.phthisis_os_tick = false; }
                    if (vm.UserSummaryList.onchcercia_os_tick) { vm.onchcercia_os_tick = true; } else { vm.onchcercia_os_tick = false; }
                    if (vm.UserSummaryList.glaucoma_os_tick) { vm.glaucoma_os_tick = true; } else { vm.glaucoma_os_tick = false; }
                    if (vm.UserSummaryList.diabetic_os_tick) { vm.diabetic_os_tick = true; } else { vm.diabetic_os_tick = false; }
                    if (vm.UserSummaryList.armd_os_tick) { vm.armd_os_tick = true; } else { vm.armd_os_tick = false; }
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


        vm.onDistanceAcuiltySelected = function (x) {
            vm.selectedDistanceAcuilty = x;
            vm.distancevisualacuilty = x.name;
        }

        $scope.pvadistanceod = [];
        $scope.pvadistanceod.name = 0;

        $scope.pvdistanceod = [];
        $scope.pvdistanceod.name = 0;

        $scope.pvadistanceos = [];
        $scope.pv = 0;

        $scope.pvdistanceos = [];
        $scope.pvdistanceos.name = 0;

        $scope.pvanearod = [];
        $scope.pvanearod.name = 0;
        $scope.pvnearod = [];
        $scope.pvnearod.name = 0;

        $scope.pvanearos = [];
        $scope.pvanearos.name = 0;
        $scope.pvnearos = [];
        $scope.pvnearos.name = 0;

        $scope.vancdistanceod = [];
        $scope.vancdistanceod.name = 0;
        $scope.vancdistanceos = [];
        $scope.vancdistanceos.name = 0;
        $scope.vancnearod = [];
        $scope.vancnearod.name = 0;
        $scope.vancnearos = [];
        $scope.vancnearos.name = 0;
        $scope.uvadistanceos = {};
        //SUBMIT  TEST REPORT

        vm.submiVIsionAndRefractionDetails = function () {

            if ($scope.pvadistanceod.name === 0) {
                $scope.pvadistanceod.name.name = " ";
            } else $scope.pvadistanceod.name.name = $scope.pvadistanceod.name.name;
            // if ($scope.uvadistanceod.name === 0) {
            //     $scope.uvadistanceod.name.name = " ";
            // } else $scope.uvadistanceod.name.name = $scope.uvadistanceod.name.name;
            if ($scope.pvdistanceod.name === 0) {
                $scope.pvdistanceod.name.name = " ";
            } else $scope.pvdistanceod.name.name = $scope.pvdistanceod.name.name;

            if ($scope.pv === 0) {
                $scope.pv.name = " ";
            } else $scope.pvadistanceos.name.name = $scope.pvadistanceos.name.name;
            // if ($scope.uvadistanceos.name === 0) {
            //     $scope.uvadistanceos.name.name = " ";
            // } else $scope.uvadistanceos.name.name = $scope.uvadistanceos.name.name;
            if ($scope.pvdistanceos.name === 0) {
                $scope.pvdistanceos.name.name = " ";
            } else $scope.pvdistanceos.name.name = $scope.pvdistanceos.name.name;

            if ($scope.pvanearod.name === 0) {
                $scope.pvanearod.name.value = " ";
            } else $scope.pvanearod.name.value = $scope.pvanearod.name.value;
            // if ($scope.uvanearod.name === 0) {
            //     $scope.uvanearod.name.value = " ";
            // } else $scope.uvanearod.name.value = $scope.uvanearod.name.value;
            if ($scope.pvnearos.name === 0) {
                $scope.pvnearos.name.value = " ";
            } else $scope.pvnearos.name.value = $scope.pvnearos.name.value;

            if ($scope.pvanearod.name === 0) {
                $scope.pvanearod.name.value = " ";
            } else $scope.pvanearod.name.value = $scope.pvanearod.name.value;
            // if ($scope.uvanearod.name === 0) {
            //     $scope.uvanearod.name.value = " ";
            // } else $scope.uvanearod.name.value = $scope.uvanearod.name.value;
            if ($scope.pvnearos.name === 0) {
                $scope.pvnearos.name.value = " ";
            } else $scope.pvnearos.name.value = $scope.pvnearos.name.value;


            if ($scope.pvnearos.name === 0) {
                $scope.pvnearos.name.value = " ";
            } else $scope.pvnearos.name.value = $scope.pvnearos.name.value;

            if ($scope.vancdistanceod.name === 0) {
                $scope.vancdistanceod.name.name = " ";
            } else $scope.vancdistanceod.name.name = $scope.vancdistanceod.name.name;
            if ($scope.vancdistanceos.name === 0) {
                $scope.vancdistanceos.name.name = " ";
            } else $scope.vancdistanceos.name.name = $scope.vancdistanceos.name.name;
            if ($scope.vancnearod.name === 0) {
                $scope.vancnearod.name.value = " ";
            } else $scope.vancnearod.name.value = $scope.vancnearod.name.value;
            if ($scope.vancnearos.name === 0) {
                $scope.vancnearos.name.name = " ";
            } else $scope.vancnearos.name.value = $scope.vancnearos.name.value;


            var userId = TokenService.getUserId();

            var visionAndRefractionPayload = {
                distance_glasses_tick: $scope.distanceglassestick,
                near_glasses_tick: $scope.nearglassestick,
                glasses_regularity_tick: $scope.glassesregularitytick,

                pva_distance_od: $scope.pvadistanceod.name.name,
                // uva_distance_od: $scope.uvadistanceod.name.name,
                pv_distance_od: $scope.pvdistanceod.name.name,

                pva_distance_os: $scope.pvadistanceos.name.name,
                // uva_distance_os: $scope.uvadistanceos.name.name,
                pv_distance_os: $scope.pvdistanceos.name.name,

                pva_near_od: $scope.pvanearod.name.value,
                //  uva_near_od: $scope.uvanearod.name.value,
                pv_near_od: $scope.pvnearod.name.value,

                pva_near_os: $scope.pvanearos.name.value,
                // uva_near_os: $scope.uvanearos.name.value,
                pv_near_os: $scope.pvnearos.name.value,

                //PRESENTING GLASSES NEW ADD
                pg_spherical_distance_od: $scope.pg_spherical_distance_od,
                pg_spherical_distance_od_value: $scope.pg_spherical_distance_od_value,
                pg_cylindrical_distance_od: $scope.pg_cylindrical_distance_od,
                pg_cylindrical_distance_od_value: $scope.pg_cylindrical_distance_od_value,
                pg_axis_distance_od: $scope.pg_axis_distance_od,
                pg_axis_distance_os: $scope.pg_axis_distance_os,
                pg_spherical_distance_os: $scope.pg_spherical_distance_os,
                pg_spherical_distance_os_value: $scope.pg_spherical_distance_os_value,
                pg_cylindrical_distance_os: $scope.pg_cylindrical_distance_os,
                pg_cylindrical_distance_os_value: $scope.pg_cylindrical_distance_os_value,
                pg_spherical_near_od: $scope.pg_spherical_near_od,
                pg_spherical_near_od_value: $scope.pg_spherical_near_od_value,
                pg_spherical_near_os: $scope.pg_spherical_near_os,
                pg_spherical_near_os_value: $scope.pg_spherical_near_os_value,


                spherical_distance_od: $scope.sphericaldistanceod,
                spherical_distance_od_value: $scope.sphericaldistanceodvalue,
                cylindrical_distance_od: $scope.cylindricaldistanceod,
                cylindrical_distance_od_value: $scope.cylindricaldistanceodvalue,

                axis_distance_od: $scope.axisdistanceod,
                axis_distance_os: $scope.axisdistanceos,

                spherical_distance_os: $scope.sphericaldistanceos,
                spherical_distance_os_value: $scope.sphericaldistanceosvalue,

                cylindrical_distance_os: $scope.cylindricaldistanceos,
                cylindrical_distance_os_value: $scope.cylindricaldistanceosvalue,

                spherical_near_od: $scope.sphericalnearod,
                spherical_near_od_value: $scope.sphericalnearodvalue,
                spherical_near_os: $scope.sphericalnearos,
                spherical_near_os_value: $scope.sphericalnearosvalue,

                vanc_distance_od: $scope.vancdistanceod.name.name,
                vanc_distance_os: $scope.vancdistanceos.name.name,
                vanc_near_od: $scope.vancnearod.name.value,
                vanc_near_os: $scope.vancnearos.name.value,

                mrdno: $scope.mrdnum,
                ddate: $filter("date")(new Date(), "yyyy/MM/dd"),
                hospid: $scope.hospitalid

            };
            var token = localStorage.getItem('access_token');
            $http.post(UrlConfig.labReportBaseUrl() + //'http://192.168.50.126/medipro.api.medicom/api/VisionandRefractionAll',   //
                'api/VisionandRefractionAll',
                visionAndRefractionPayload, { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    console.log(result.data);
                    vm.notification = { mode: 'success', message: 'Payload submitted' };

                    console.log(visionAndRefractionPayload);
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



        vm.onReportSelected = function () {
            vm.edit = true;
            vm.selectedReport = vm.UserReportList;
            $scope.newmdr = vm.userMrd;
            $scope.distanceglassestick = vm.disGlass;
            $scope.nearglassestick = vm.nearGlass;
            $scope.glassesregularitytick = vm.regularGlasses;

            $scope.pvadistanceod.name.name = vm.pvaDistanceOd;

            $scope.PvaDistanceOd = vm.pvaDistanceOd;
            // if($scope.PvaDistanceOd === "Counting Finger and Close to Face (2.90)"){
            //     $scope.pvadistanceod.name = $scope.distanceVisionValues[15];
            // }

            if ($scope.pvadistanceod.name.name === "6/6(0)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[0];
            }
            if ($scope.pvadistanceod.name.name === "6/9(0.18)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[1];
            }
            if ($scope.pvadistanceod.name.name === "6/12(0.30)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[2];
            }
            if ($scope.pvadistanceod.name.name == "6/18(0.48)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[3];
            }
            if ($scope.pvadistanceod.name.name === "6/24(0.60)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[4];
            }
            if ($scope.pvadistanceod.name.name === "6/36(0.78)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[5];
            }
            if ($scope.pvadistanceod.name.name === "6/60(1)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[6];
            }
            if ($scope.pvadistanceod.name.name === "5/60(1.08)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[7];
            }
            if ($scope.pvadistanceod.name.name === "4/60(1.18)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[8];
            }
            if ($scope.pvadistanceod.name.name === "3/60(1.30)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[9];
            }
            if ($scope.pvadistanceod.name.name === "2/60(1.48)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[10];
            }
            if ($scope.pvadistanceod.name.name === "1/60(1.78)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[11];
            }
            if ($scope.pvadistanceod.name.name === "1/2/60(2.08)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[12];
            }
            if ($scope.pvadistanceod.name.name === "PL+VE, PR Inaccurate (2.50)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[13];
            }
            if ($scope.pvadistanceod.name.name === "PL+VE, PR Accurate (2.20)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[14];
            }
            if ($scope.pvadistanceod.name.name === "Counting Finger and Close to Face (2.90)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[15];
            }
            if ($scope.pvadistanceod.name.name === "Follows Light(2.20)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[16];
            }
            if ($scope.pvadistanceod.name.name === "Light Perception(3.70)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[17];
            }
            if ($scope.pvadistanceod.name.name === "Hand Movement (3.70)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[18];
            }
            if ($scope.pvadistanceod.name.name === "NPL(4.00)") {
                $scope.pvadistanceod.name = $scope.distanceVisionValues[19];
            }

            $scope.pvdistanceod.name.name = vm.pvDistanceOd;

            if ($scope.pvdistanceod.name.name === "6/6(0)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[0];
            }
            if ($scope.pvdistanceod.name.name === "6/9(0.18)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[1];
            }
            if ($scope.pvdistanceod.name.name === "6/12(0.30)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[2];
            }
            if ($scope.pvdistanceod.name.name == "6/18(0.48)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[3];
            }
            if ($scope.pvdistanceod.name.name === "6/24(0.60)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[4];
            }
            if ($scope.pvdistanceod.name.name === "6/36(0.78)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[5];
            }
            if ($scope.pvdistanceod.name.name === "6/60(1)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[6];
            }
            if ($scope.pvdistanceod.name.name === "5/60(1.08)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[7];
            }
            if ($scope.pvdistanceod.name.name === "4/60(1.18)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[8];
            }
            if ($scope.pvdistanceod.name.name === "3/60(1.30)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[9];
            }
            if ($scope.pvdistanceod.name.name === "2/60(1.48)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[10];
            }
            if ($scope.pvdistanceod.name.name === "1/60(1.78)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[11];
            }
            if ($scope.pvdistanceod.name.name === "1/2/60(2.08)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[12];
            }
            if ($scope.pvdistanceod.name.name === "PL+VE, PR Inaccurate (2.50)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[13];
            }
            if ($scope.pvdistanceod.name.name === "PL+VE, PR Accurate (2.20)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[14];
            }
            if ($scope.pvdistanceod.name.name === "Counting Finger and Close to Face (2.90)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[15];
            }
            if ($scope.pvdistanceod.name.name === "Follows Light(2.20)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[16];
            }
            if ($scope.pvdistanceod.name.name === "Light Perception(3.70)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[17];
            }
            if ($scope.pvdistanceod.name.name === "Hand Movement (3.70)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[18];
            }
            if ($scope.pvdistanceod.name.name === "NPL(4.00)") {
                $scope.pvdistanceod.name = $scope.distanceVisionValues[19];
            }

            $scope.pvadistanceos.name.name = vm.pvaDistanceOs;

            if ($scope.pvadistanceos.name.name === "6/6(0)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[0];
            }
            if ($scope.pvadistanceos.name.name === "6/9(0.18)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[1];
            }
            if ($scope.pvadistanceos.name.name === "6/12(0.30)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[2];
            }
            if ($scope.pvadistanceos.name.name == "6/18(0.48)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[3];
            }
            if ($scope.pvadistanceos.name.name === "6/24(0.60)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[4];
            }
            if ($scope.pvadistanceos.name.name === "6/36(0.78)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[5];
            }
            if ($scope.pvadistanceos.name.name === "6/60(1)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[6];
            }
            if ($scope.pvadistanceos.name.name === "5/60(1.08)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[7];
            }
            if ($scope.pvadistanceos.name.name === "4/60(1.18)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[8];
            }
            if ($scope.pvadistanceos.name.name === "3/60(1.30)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[9];
            }
            if ($scope.pvadistanceos.name.name === "2/60(1.48)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[10];
            }
            if ($scope.pvadistanceos.name.name === "1/60(1.78)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[11];
            }
            if ($scope.pvadistanceos.name.name === "1/2/60(2.08)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[12];
            }
            if ($scope.pvadistanceos.name.name === "PL+VE, PR Inaccurate (2.50)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[13];
            }
            if ($scope.pvadistanceos.name.name === "PL+VE, PR Accurate (2.20)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[14];
            }
            if ($scope.pvadistanceos.name.name === "Counting Finger and Close to Face (2.90)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[15];
            }
            if ($scope.pvadistanceos.name.name === "Follows Light(2.20)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[16];
            }
            if ($scope.pvadistanceos.name.name === "Light Perception(3.70)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[17];
            }
            if ($scope.pvadistanceos.name.name === "Hand Movement (3.70)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[18];
            }
            if ($scope.pvadistanceos.name.name === "NPL(4.00)") {
                $scope.pvadistanceos.name = $scope.distanceVisionValues[19];
            }


            $scope.pvdistanceos.name.name = vm.pvDistanceOs;

            if ($scope.pvdistanceos.name.name === "6/6(0)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[0];
            }
            if ($scope.pvdistanceos.name.name === "6/9(0.18)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[1];
            }
            if ($scope.pvdistanceos.name.name === "6/12(0.30)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[2];
            }
            if ($scope.pvdistanceos.name.name == "6/18(0.48)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[3];
            }
            if ($scope.pvdistanceos.name.name === "6/24(0.60)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[4];
            }
            if ($scope.pvdistanceos.name.name === "6/36(0.78)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[5];
            }
            if ($scope.pvdistanceos.name.name === "6/60(1)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[6];
            }
            if ($scope.pvdistanceos.name.name === "5/60(1.08)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[7];
            }
            if ($scope.pvdistanceos.name.name === "4/60(1.18)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[8];
            }
            if ($scope.pvdistanceos.name.name === "3/60(1.30)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[9];
            }
            if ($scope.pvdistanceos.name.name === "2/60(1.48)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[10];
            }
            if ($scope.pvdistanceos.name.name === "1/60(1.78)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[11];
            }
            if ($scope.pvdistanceos.name.name === "1/2/60(2.08)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[12];
            }
            if ($scope.pvdistanceos.name.name === "PL+VE, PR Inaccurate (2.50)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[13];
            }
            if ($scope.pvdistanceos.name.name === "PL+VE, PR Accurate (2.20)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[14];
            }
            if ($scope.pvdistanceos.name.name === "Counting Finger and Close to Face (2.90)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[15];
            }
            if ($scope.pvdistanceos.name.name === "Follows Light(2.20)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[16];
            }
            if ($scope.pvdistanceos.name.name === "Light Perception(3.70)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[17];
            }
            if ($scope.pvdistanceos.name.name === "Hand Movement (3.70)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[18];
            }
            if ($scope.pvdistanceos.name.name === "NPL(4.00)") {
                $scope.pvdistanceos.name = $scope.distanceVisionValues[19];
            }

            $scope.pvanearod.name.name = vm.pvaNearOd;
            if ($scope.pvanearod.name.name === "(N-6)") {
                $scope.pvanearod.name = $scope.nearVisionValues[0];
            }
            if ($scope.pvanearod.name.name === "(N-8)") {
                $scope.pvanearod.name = $scope.nearVisionValues[1];
            }
            if ($scope.pvanearod.name.name === "(N-10)") {
                $scope.pvanearod.name = $scope.nearVisionValues[2];
            }
            if ($scope.pvanearod.name.name === "(N-12)") {
                $scope.pvanearod.name = $scope.nearVisionValues[3];
            }
            if ($scope.pvanearod.name.name === "(N-14)") {
                $scope.pvanearod.name = $scope.nearVisionValues[4];
            }
            if ($scope.pvanearod.name.name === "(N-18)") {
                $scope.pvanearod.name = $scope.nearVisionValues[5];
            }
            if ($scope.pvanearod.name.name === "(N-24)") {
                $scope.pvanearod.name = $scope.nearVisionValues[6];
            }
            if ($scope.pvanearod.name.name === "(N-36)") {
                $scope.pvanearod.name = $scope.nearVisionValues[7];
            }

            $scope.pvnearod.name.name = vm.pvNearOd;
            if ($scope.pvnearod.name.name === "(N-6)") {
                $scope.pvnearod.name = $scope.nearVisionValues[0];
            }
            if ($scope.pvnearod.name.name === "(N-8)") {
                $scope.pvnearod.name = $scope.nearVisionValues[1];
            }
            if ($scope.pvnearod.name.name === "(N-10)") {
                $scope.pvnearod.name = $scope.nearVisionValues[2];
            }
            if ($scope.pvnearod.name.name === "(N-12)") {
                $scope.pvnearod.name = $scope.nearVisionValues[3];
            }
            if ($scope.pvnearod.name.name === "(N-14)") {
                $scope.pvnearod.name = $scope.nearVisionValues[4];
            }
            if ($scope.pvnearod.name.name === "(N-18)") {
                $scope.pvnearod.name = $scope.nearVisionValues[5];
            }
            if ($scope.pvnearod.name.name === "(N-24)") {
                $scope.pvnearod.name = $scope.nearVisionValues[6];
            }
            if ($scope.pvnearod.name.name === "(N-36)") {
                $scope.pvnearod.name = $scope.nearVisionValues[7];
            }

            $scope.pvanearos.name.name = vm.pvaNearOs;
            if ($scope.pvanearos.name.name === "(N-6)") {
                $scope.pvanearos.name = $scope.nearVisionValues[0];
            }
            if ($scope.pvanearos.name.name === "(N-8)") {
                $scope.pvanearos.name = $scope.nearVisionValues[1];
            }
            if ($scope.pvanearos.name.name === "(N-10)") {
                $scope.pvanearos.name = $scope.nearVisionValues[2];
            }
            if ($scope.pvanearos.name.name === "(N-12)") {
                $scope.pvanearos.name = $scope.nearVisionValues[3];
            }
            if ($scope.pvanearos.name.name === "(N-14)") {
                $scope.pvanearos.name = $scope.nearVisionValues[4];
            }
            if ($scope.pvanearos.name.name === "(N-18)") {
                $scope.pvanearos.name = $scope.nearVisionValues[5];
            }
            if ($scope.pvanearos.name.name === "(N-24)") {
                $scope.pvanearos.name = $scope.nearVisionValues[6];
            }
            if ($scope.pvanearos.name.name === "(N-36)") {
                $scope.pvanearos.name = $scope.nearVisionValues[7];
            }

            $scope.pvnearos.name.name = vm.pvNearOs;
            if ($scope.pvnearos.name.name === "(N-6)") {
                $scope.pvnearos.name = $scope.nearVisionValues[0];
            }
            if ($scope.pvnearos.name.name === "(N-8)") {
                $scope.pvnearos.name = $scope.nearVisionValues[1];
            }
            if ($scope.pvnearos.name.name === "(N-10)") {
                $scope.pvnearos.name = $scope.nearVisionValues[2];
            }
            if ($scope.pvnearos.name.name === "(N-12)") {
                $scope.pvnearos.name = $scope.nearVisionValues[3];
            }
            if ($scope.pvnearos.name.name === "(N-14)") {
                $scope.pvnearos.name = $scope.nearVisionValues[4];
            }
            if ($scope.pvnearos.name.name === "(N-18)") {
                $scope.pvnearos.name = $scope.nearVisionValues[5];
            }
            if ($scope.pvnearos.name.name === "(N-24)") {
                $scope.pvnearos.name = $scope.nearVisionValues[6];
            }
            if ($scope.pvnearos.name.name === "(N-36)") {
                $scope.pvnearos.name = $scope.nearVisionValues[7];
            }


            $scope.sphericaldistanceod = vm.sphericalDistanceOd;
            $scope.sphericaldistanceodvalue = vm.sphericalDistanceOdV;
            $scope.cylindricaldistanceod = vm.cylindricalDistanceOd;
            $scope.cylindricaldistanceodvalue = vm.cylindricalDistanceOdV;
            $scope.axisdistanceod = vm.axisDistanceOd;
            $scope.axisdistanceos = vm.axisDistanceOs;
            $scope.sphericaldistanceos = vm.sphericalDistanceOs;
            $scope.sphericaldistanceosvalue = vm.sphericalDistanceOsV;
            $scope.cylindricaldistanceos = vm.cylindricalDistanceOs;
            $scope.cylindricaldistanceosvalue = vm.cylindricalDistanceOsV;
            $scope.sphericalnearod = vm.sphericalNearOd;
            $scope.sphericalnearodvalue = vm.sphericalNearOdV;
            $scope.sphericalnearos = vm.sphericalNearOs;
            $scope.sphericalnearosvalue = vm.sphericalNearOsV;


            $scope.vancdistanceod.name.name = vm.vancDistanceOd;
            if ($scope.vancdistanceod.name.name === "6/6(0)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[0];
            }
            if ($scope.vancdistanceod.name.name === "6/9(0.18)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[1];
            }
            if ($scope.vancdistanceod.name.name === "6/12(0.30)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[2];
            }
            if ($scope.vancdistanceod.name.name == "6/18(0.48)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[3];
            }
            if ($scope.vancdistanceod.name.name === "6/24(0.60)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[4];
            }
            if ($scope.vancdistanceod.name.name === "6/36(0.78)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[5];
            }
            if ($scope.vancdistanceod.name.name === "6/60(1)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[6];
            }
            if ($scope.vancdistanceod.name.name === "5/60(1.08)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[7];
            }
            if ($scope.vancdistanceod.name.name === "4/60(1.18)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[8];
            }
            if ($scope.vancdistanceod.name.name === "3/60(1.30)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[9];
            }
            if ($scope.vancdistanceod.name.name === "2/60(1.48)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[10];
            }
            if ($scope.vancdistanceod.name.name === "1/60(1.78)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[11];
            }
            if ($scope.vancdistanceod.name.name === "1/2/60(2.08)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[12];
            }
            if ($scope.vancdistanceod.name.name === "PL+VE, PR Inaccurate (2.50)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[13];
            }
            if ($scope.vancdistanceod.name.name === "PL+VE, PR Accurate (2.20)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[14];
            }
            if ($scope.vancdistanceod.name.name === "Counting Finger and Close to Face (2.90)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[15];
            }
            if ($scope.vancdistanceod.name.name === "Follows Light(2.20)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[16];
            }
            if ($scope.vancdistanceod.name.name === "Light Perception(3.70)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[17];
            }
            if ($scope.vancdistanceod.name.name === "Hand Movement (3.70)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[18];
            }
            if ($scope.vancdistanceod.name.name === "NPL(4.00)") {
                $scope.vancdistanceod.name = $scope.distanceVisionValues[19];
            }


            $scope.vancdistanceos.name.name = vm.vancDistanceOs;

            if ($scope.vancdistanceos.name.name === "6/6(0)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[0];
            }
            if ($scope.vancdistanceos.name.name === "6/9(0.18)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[1];
            }
            if ($scope.vancdistanceos.name.name === "6/12(0.30)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[2];
            }
            if ($scope.vancdistanceos.name.name == "6/18(0.48)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[3];
            }
            if ($scope.vancdistanceos.name.name === "6/24(0.60)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[4];
            }
            if ($scope.vancdistanceos.name.name === "6/36(0.78)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[5];
            }
            if ($scope.vancdistanceos.name.name === "6/60(1)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[6];
            }
            if ($scope.vancdistanceos.name.name === "5/60(1.08)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[7];
            }
            if ($scope.vancdistanceos.name.name === "4/60(1.18)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[8];
            }
            if ($scope.vancdistanceos.name.name === "3/60(1.30)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[9];
            }
            if ($scope.vancdistanceos.name.name === "2/60(1.48)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[10];
            }
            if ($scope.vancdistanceos.name.name === "1/60(1.78)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[11];
            }
            if ($scope.vancdistanceos.name.name === "1/2/60(2.08)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[12];
            }
            if ($scope.vancdistanceos.name.name === "PL+VE, PR Inaccurate (2.50)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[13];
            }
            if ($scope.vancdistanceos.name.name === "PL+VE, PR Accurate (2.20)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[14];
            }
            if ($scope.vancdistanceos.name.name === "Counting Finger and Close to Face (2.90)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[15];
            }
            if ($scope.vancdistanceos.name.name === "Follows Light(2.20)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[16];
            }
            if ($scope.vancdistanceos.name.name === "Light Perception(3.70)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[17];
            }
            if ($scope.vancdistanceos.name.name === "Hand Movement (3.70)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[18];
            }
            if ($scope.vancdistanceos.name.name === "NPL(4.00)") {
                $scope.vancdistanceos.name = $scope.distanceVisionValues[19];
            }

            $scope.vancnearod.name.name = vm.vancNearOd;
            if ($scope.vancnearod.name.name === "(N-6)") {
                $scope.vancnearod.name = $scope.nearVisionValues[0];
            }
            if ($scope.vancnearod.name.name === "(N-8)") {
                $scope.vancnearod.name = $scope.nearVisionValues[1];
            }
            if ($scope.vancnearod.name.name === "(N-10)") {
                $scope.vancnearod.name = $scope.nearVisionValues[2];
            }
            if ($scope.vancnearod.name.name === "(N-12)") {
                $scope.vancnearod.name = $scope.nearVisionValues[3];
            }
            if ($scope.vancnearod.name.name === "(N-14)") {
                $scope.vancnearod.name = $scope.nearVisionValues[4];
            }
            if ($scope.vancnearod.name.name === "(N-18)") {
                $scope.vancnearod.name = $scope.nearVisionValues[5];
            }
            if ($scope.vancnearod.name.name === "(N-24)") {
                $scope.vancnearod.name = $scope.nearVisionValues[6];
            }
            if ($scope.vancnearod.name.name === "(N-36)") {
                $scope.vancnearod.name = $scope.nearVisionValues[7];
            }

            $scope.vancnearos.name.name = vm.vancNearOs;
            if ($scope.vancnearos.name.name === "(N-6)") {
                $scope.vancnearos.name = $scope.nearVisionValues[0];
            }
            if ($scope.vancnearos.name.name === "(N-8)") {
                $scope.vancnearos.name = $scope.nearVisionValues[1];
            }
            if ($scope.vancnearos.name.name === "(N-10)") {
                $scope.vancnearos.name = $scope.nearVisionValues[2];
            }
            if ($scope.vancnearos.name.name === "(N-12)") {
                $scope.vancnearos.name = $scope.nearVisionValues[3];
            }
            if ($scope.vancnearos.name.name === "(N-14)") {
                $scope.vancnearos.name = $scope.nearVisionValues[4];
            }
            if ($scope.vancnearos.name.name === "(N-18)") {
                $scope.vancnearos.name = $scope.nearVisionValues[5];
            }
            if ($scope.vancnearos.name.name === "(N-24)") {
                $scope.vancnearos.name = $scope.nearVisionValues[6];
            }
            if ($scope.vancnearos.name.name === "(N-36)") {
                $scope.vancnearos.name = $scope.nearVisionValues[7];
            }


            $scope.pg_spherical_distance_od = vm.pgSpherDistOd;
            $scope.pg_spherical_distance_od_value = vm.pgSpherDistOdV;
            $scope.pg_cylindrical_distance_od = vm.pgCylDistOd;
            $scope.pg_cylindrical_distance_od_value = vm.pgCylDistOdV;
            $scope.pg_axis_distance_od = vm.pgAxisDistanceOd;
            $scope.pg_axis_distance_os = vm.pgAxisDistanceOs;
            $scope.pg_spherical_distance_os = vm.pgSpherDistOs;
            $scope.pg_spherical_distance_os_value = vm.pgSpherDistOsV;
            $scope.pg_cylindrical_distance_os = vm.pgCylDistOs;
            $scope.pg_cylindrical_distance_os_value = vm.pgCylDistOsV;
            $scope.pg_spherical_near_od = vm.pgSphNearOd;
            $scope.pg_spherical_near_od_value = vm.pgSphNearOdV;
            $scope.pg_spherical_near_os = vm.pgSphNearOs;
            $scope.pg_spherical_near_os_value = vm.pgSphNearOsV;

        };

        //edit
        vm.editReport = function () {


            var userId = TokenService.getUserId();

            var visionAndRefractionPayload = {
                distance_glasses_tick: $scope.distanceglassestick,
                near_glasses_tick: $scope.nearglassestick,
                glasses_regularity_tick: $scope.glassesregularitytick,

                pva_distance_od: $scope.pvadistanceod.name.name,
                // uva_distance_od: $scope.uvadistanceod.name.name,
                pv_distance_od: $scope.pvdistanceod.name.name,

                pva_distance_os: $scope.pvadistanceos.name.name,
                // uva_distance_os: $scope.uvadistanceos.name.name,
                pv_distance_os: $scope.pvdistanceos.name.name,

                pva_near_od: $scope.pvanearod.name.value,
                //  uva_near_od: $scope.uvanearod.name.value,
                pv_near_od: $scope.pvnearod.name.value,

                pva_near_os: $scope.pvanearos.name.value,
                // uva_near_os: $scope.uvanearos.name.value,
                pv_near_os: $scope.pvnearos.name.value,

                //PRESENTING GLASSES NEW ADD
                pg_spherical_distance_od: $scope.pg_spherical_distance_od,
                pg_spherical_distance_od_value: $scope.pg_spherical_distance_od_value,
                pg_cylindrical_distance_od: $scope.pg_cylindrical_distance_od,
                pg_cylindrical_distance_od_value: $scope.pg_cylindrical_distance_od_value,
                pg_axis_distance_od: $scope.pg_axis_distance_od,
                pg_axis_distance_os: $scope.pg_axis_distance_os,
                pg_spherical_distance_os: $scope.pg_spherical_distance_os,
                pg_spherical_distance_os_value: $scope.pg_spherical_distance_os_value,
                pg_cylindrical_distance_os: $scope.pg_cylindrical_distance_os,
                pg_cylindrical_distance_os_value: $scope.pg_cylindrical_distance_os_value,
                pg_spherical_near_od: $scope.pg_spherical_near_od,
                pg_spherical_near_od_value: $scope.pg_spherical_near_od_value,
                pg_spherical_near_os: $scope.pg_spherical_near_os,
                pg_spherical_near_os_value: $scope.pg_spherical_near_os_value,


                spherical_distance_od: $scope.sphericaldistanceod,
                spherical_distance_od_value: $scope.sphericaldistanceodvalue,
                cylindrical_distance_od: $scope.cylindricaldistanceod,
                cylindrical_distance_od_value: $scope.cylindricaldistanceodvalue,

                axis_distance_od: $scope.axisdistanceod,
                axis_distance_os: $scope.axisdistanceos,

                spherical_distance_os: $scope.sphericaldistanceos,
                spherical_distance_os_value: $scope.sphericaldistanceosvalue,

                cylindrical_distance_os: $scope.cylindricaldistanceos,
                cylindrical_distance_os_value: $scope.cylindricaldistanceosvalue,

                spherical_near_od: $scope.sphericalnearod,
                spherical_near_od_value: $scope.sphericalnearodvalue,
                spherical_near_os: $scope.sphericalnearos,
                spherical_near_os_value: $scope.sphericalnearosvalue,

                vanc_distance_od: $scope.vancdistanceod.name.name,
                vanc_distance_os: $scope.vancdistanceos.name.name,
                vanc_near_od: $scope.vancnearod.name.value,
                vanc_near_os: $scope.vancnearos.name.value,

                mrdno: $scope.mrdnum,
                ddate: $filter("date")(new Date(), "yyyy/MM/dd"),
                hospid: $scope.hospitalid

            };

            var token = localStorage.getItem('access_token');
            $http.post(UrlConfig.labReportBaseUrl() + //'http://192.168.50.126/medipro.api.medicom/api/VisionandRefractionAll',   //
                'api/VisionandRefractionAll/Update',
                visionAndRefractionPayload, { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    console.log(result.data);
                    vm.notification = { mode: 'success', message: 'Payload submitted' };
                    //  vm.reload();
                    console.log(visionAndRefractionPayload);
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


        vm.PrintRecord = function () {
            // $scope.printFalse = false;
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
                'border:0.0001em solid #000;padding: 0px;font-size:12px;line-height:13px;text-align: left;font-weight:100 !important;margin-bottom:2px !important;}' +
                '#get {display: none !important; visibility: hidden !important;} ' +
                // 'tbody{min-height: 25em !important;}' +
                '#name{font-weight: bold;}' +
                '#right{text-align: right !important;}' +
                '#left{text-align: left !important;}' +
                '#center{text-align: center !important;}' +
                '.text-center{text-align: center !important;}' +
                '.rightonly{text-align: right !important;margin-left:60% !important;}' +
                '.floatr{float: right !important}' +
                '.pp{font-size:11px !important;}' +
                '.f-0{margin:2px 0px !important;padding:2px 0px !important;font-weight:bold !important;}' +
                '.b-0{margin:2px 0px !important;padding:2px 0px !important;}' +


                // 'strong{font-weight:300 !important;text-align:left !important;}' +
                'table {border-collapse: collapse;}' +
                '.noborder{ border-bottom:none;}' +
                '#noborder tr td{ border:none !important;}' +
                '#noborder tr th{ border:none !important;}' +
                '#bottomborder{ border-bottom:1px solid black !important;}' +
                'span{font-size:10px !important;margin-top:10px !important;}' +
                // '.textr{ text-align:right !important;margin-right:0px !important;right:0 !important;}' +





                '</style>';
            htmlToPrint += divToPrint.outerHTML;
            newWin = window.open("");
            newWin.document.write(htmlToPrint);
            newWin.print();
            newWin.close();
        }

        vm.next = function () {
            vm.reloadfn();
        }

        vm.Export = function () {
            $("#reporttable").table2excel({
                filename: vm.pagetitle + "_" + vm.initFiltered + "To " + vm.finalFiltered + ".xls"
            });
        }




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
                });
            vm.noalert();

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
                });
            vm.noalert();

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
                });
            vm.noalert();

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
                });
            vm.noalert();
        };

        vm.goToComplain = function () {
            //    vm.selectedReport = report;
            window.open('#!/chiefeyecomplain?mrdno=' + $scope.mrdnum +
                '&hospid=' + $scope.hospitalid,
                '_self', '');
        }


        vm.noalert = function () {
            $timeout(vm.resetNotification, 4000);
        }

        vm.reload = function () {
            $timeout(vm.reloadfn, 3000);
        };

        vm.reloadfn = function () {
            window.open('#!/chiefeyecomplain?mrdno=' + $scope.mrdnum +
                '&hospid=' + $scope.hospitalid,
                '_self', '');
        }

        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };
        vm.reset = function () {
            $scope.showReport = false;
            $scope.mdrsearch = null;
            $scope.noReport = false;

        }


    }
]);