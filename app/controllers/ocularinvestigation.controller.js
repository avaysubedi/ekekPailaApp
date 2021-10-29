app.controller('OcularInvestigationController', ['$http', 'UrlConfig', 'Config', 'TokenService', 'DateService',
    '$scope', '$filter', '$timeout', 'BroadcastService', '$routeParams', '$anchorScroll',
    function ($http, UrlConfig, Config, TokenService, DateService, $scope, $filter, $timeout,
        BroadcastService, $routeParams, $anchorScroll) {

        var vm = this;

        vm.pagetitle = "Ocular Investigation";
        //vm.selectedTitle = null;
        //vm.selectedOpdBill = null;

        vm.init = function () {
            vm.space = Config.spaceAbove;
            $anchorScroll();
            $scope.loadtrue = false;
            $scope.showEdit = false;

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

            //   vm.fetchRefererList();


            vm.AdToBsInit(vm.initFiltered);
            vm.AdToBsFinal(vm.finalFiltered);
            // vm.fetchUserDepartmentList();
            // vm.fetchTestReportList();

            $scope.ctodtick = false;
            $scope.ctostick = false;


            $scope.mrdnum = $routeParams.mrdno;
            $scope.hospitalid = $routeParams.hospid;
            vm.pname = $routeParams.pname;


            if ($scope.mrdnum !== undefined && $scope.hospitalid !== undefined) {
                vm.fetchUserSummary();
                vm.fetchPrintOcularList();
            }

        };
        //    $scope.hospid = 11417;
        vm.today = $filter("date")(new Date(), "yyyy/MM/dd");

        $scope.showEdit = false;

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

        $scope.check = function () {
            alert($scope.visual_field_od_tick)
        }
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




        vm.fetchUserSummary = function () {
            $scope.loadtrue = true;

            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();

            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationdetail?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {

                    if (result.data.length === 0) {
                        vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.noReport = true;
                        $scope.loadtrue = false;
                    }
                    else {
                        $scope.noReport = false;
                        $scope.loadtrue = false;
                        vm.UserReportList = result.data;
                        $scope.showReport = true;
                        // console.log(result.data);
                        vm.userMrd = result.data[0].mrdno;
                        //vm.pname = result.data[0].pname;
                        vm.address = result.data[0].address;
                        vm.contact = result.data[0].contact;
                        vm.gender = result.data[0].sex;
                        vm.age = result.data[0].age;
                        vm.reportDate = result.data[0].ddate;

                    }


                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();


            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationAll?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {

                    // $scope.noReport = false;

                    $scope.loadtrue = false;
                    vm.ocularValues = result.data;
                    $scope.showReport = true;
                    //  console.log(result.data);




                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };



        vm.sideside = true;
        vm.colvalue = 9;
        vm.sideView = function () {
            if (vm.colvalue === 9) {
                vm.colvalue = 12;
            } else {
                vm.colvalue = 9;
            }

            vm.sideside = !vm.sideside;
        }


        vm.submitOcularExaminationDetails = function () {

            if ($scope.showEdit === true) {
                vm.url = "api/OcularInvestigationAll/Update"
            }
            else {
                vm.url = "api/OcularInvestigationAll"
            }

            if ($scope.at_od_tick === 1 || $scope.at_od_tick === "1") { $scope.at_od_tick = true; } if ($scope.at_od_tick === "0" || $scope.at_od_tick === 0) { $scope.at_od_tick = false; }
            if ($scope.at_os_tick === 1 || $scope.at_os_tick === "1") { $scope.at_os_tick = true; } if ($scope.at_os_tick === "0" || $scope.at_os_tick === 0) { $scope.at_os_tick = false; }
            if ($scope.gonioscopy_od_tick === 1 || $scope.gonioscopy_od_tick === "1") { $scope.gonioscopy_od_tick = true; } if ($scope.gonioscopy_od_tick === "0" || $scope.gonioscopy_od_tick === 0) { $scope.gonioscopy_od_tick = false; }
            if ($scope.gonioscopy_os_tick === 1 || $scope.gonioscopy_os_tick === "1") { $scope.gonioscopy_os_tick = true; } if ($scope.gonioscopy_os_tick === "0" || $scope.gonioscopy_os_tick === 0) { $scope.gonioscopy_os_tick = false; }
            if ($scope.anterior_segment_tick === 1 || $scope.anterior_segment_tick === "1") { $scope.anterior_segment_tick = true; } if ($scope.anterior_segment_tick === "0" || $scope.anterior_segment_tick === 0) { $scope.anterior_segment_tick = false; }
            if ($scope.ct_od_tick === 1 || $scope.ct_od_tick === "1") { $scope.ct_od_tick = true; } if ($scope.ct_od_tick === "0" || $scope.ct_od_tick === 0) { $scope.ct_od_tick = false; }
            if ($scope.ct_os_tick === 1 || $scope.ct_os_tick === "1") { $scope.ct_os_tick = true; } if ($scope.ct_os_tick === "0" || $scope.ct_os_tick === 0) { $scope.ct_os_tick = false; }
            if ($scope.ct_erpretation_od_tick === 1 || $scope.ct_erpretation_od_tick === "1") { $scope.ct_erpretation_od_tick = true; } if ($scope.ct_erpretation_od_tick === "0" || $scope.ct_erpretation_od_tick === 0) { $scope.ct_erpretation_od_tick = false; }
            if ($scope.ct_erpretation_os_tick === 1 || $scope.ct_erpretation_os_tick === "1") { $scope.ct_erpretation_os_tick = true; } if ($scope.ct_erpretation_os_tick === "0" || $scope.ct_erpretation_os_tick === 0) { $scope.ct_erpretation_os_tick = false; }
            if ($scope.ascan_od_tick === 1 || $scope.ascan_od_tick === "1") { $scope.ascan_od_tick = true; } if ($scope.ascan_od_tick === "0" || $scope.ascan_od_tick === 0) { $scope.ascan_od_tick = false; }
            if ($scope.ascan_os_tick === 1 || $scope.ascan_os_tick === "1") { $scope.ascan_os_tick = true; } if ($scope.ascan_os_tick === "0" || $scope.ascan_os_tick === 0) { $scope.ascan_os_tick = false; }
            if ($scope.ascan_erpretation_od_tick === 1 || $scope.ascan_erpretation_od_tick === "1") { $scope.ascan_erpretation_od_tick = true; } if ($scope.ascan_erpretation_od_tick === "0" || $scope.ascan_erpretation_od_tick === 0) { $scope.ascan_erpretation_od_tick = false; }
            if ($scope.ascan_erpretation_os_tick === 1 || $scope.ascan_erpretation_os_tick === "1") { $scope.ascan_erpretation_os_tick = true; } if ($scope.ascan_erpretation_os_tick === "0" || $scope.ascan_erpretation_os_tick === 0) { $scope.ascan_erpretation_os_tick = false; }
            if ($scope.anterioroct_od_tick === 1 || $scope.anterioroct_od_tick === "1") { $scope.anterioroct_od_tick = true; } if ($scope.anterioroct_od_tick === "0" || $scope.anterioroct_od_tick === 0) { $scope.anterioroct_od_tick = false; }
            if ($scope.anterioroct_os_tick === 1 || $scope.anterioroct_os_tick === "1") { $scope.anterioroct_os_tick = true; } if ($scope.anterioroct_os_tick === "0" || $scope.anterioroct_os_tick === 0) { $scope.anterioroct_os_tick = false; }
            if ($scope.anterioroct_erpretation_od_tick === 1 || $scope.anterioroct_erpretation_od_tick === "1") { $scope.anterioroct_erpretation_od_tick = true; } if ($scope.anterioroct_erpretation_od_tick === "0" || $scope.anterioroct_erpretation_od_tick === 0) { $scope.anterioroct_erpretation_od_tick = false; }
            if ($scope.anterioroct_erpretation_os_tick === 1 || $scope.anterioroct_erpretation_os_tick === "1") { $scope.anterioroct_erpretation_os_tick = true; } if ($scope.anterioroct_erpretation_os_tick === "0" || $scope.anterioroct_erpretation_os_tick === 0) { $scope.anterioroct_erpretation_os_tick = false; }
            if ($scope.posterior_segment_tick === 1 || $scope.posterior_segment_tick === "1") { $scope.posterior_segment_tick = true; } if ($scope.posterior_segment_tick === "0" || $scope.posterior_segment_tick === 0) { $scope.posterior_segment_tick = false; }
            if ($scope.bscan_od_tick === 1 || $scope.bscan_od_tick === "1") { $scope.bscan_od_tick = true; } if ($scope.bscan_od_tick === "0" || $scope.bscan_od_tick === 0) { $scope.bscan_od_tick = false; }
            if ($scope.bscan_os_tick === 1 || $scope.bscan_os_tick === "1") { $scope.bscan_os_tick = true; } if ($scope.bscan_os_tick === "0" || $scope.bscan_os_tick === 0) { $scope.bscan_os_tick = false; }
            if ($scope.bscan_erpretation_od_tick === 1 || $scope.bscan_erpretation_od_tick === "1") { $scope.bscan_erpretation_od_tick = true; } if ($scope.bscan_erpretation_od_tick === "0" || $scope.bscan_erpretation_od_tick === 0) { $scope.bscan_erpretation_od_tick = false; }
            if ($scope.bscan_erpretation_os_tick === 1 || $scope.bscan_erpretation_os_tick === "1") { $scope.bscan_erpretation_os_tick = true; } if ($scope.bscan_erpretation_os_tick === "0" || $scope.bscan_erpretation_os_tick === 0) { $scope.bscan_erpretation_os_tick = false; }
            if ($scope.fundus_od_tick === 1 || $scope.fundus_od_tick === "1") { $scope.fundus_od_tick = true; } if ($scope.fundus_od_tick === "0" || $scope.fundus_od_tick === 0) { $scope.fundus_od_tick = false; }
            if ($scope.fundus_os_tick === 1 || $scope.fundus_os_tick === "1") { $scope.fundus_os_tick = true; } if ($scope.fundus_os_tick === "0" || $scope.fundus_os_tick === 0) { $scope.fundus_os_tick = false; }
            if ($scope.funudus_erpretation_od_tick === 1 || $scope.funudus_erpretation_od_tick === "1") { $scope.funudus_erpretation_od_tick = true; } if ($scope.funudus_erpretation_od_tick === "0" || $scope.funudus_erpretation_od_tick === 0) { $scope.funudus_erpretation_od_tick = false; }
            if ($scope.funudus_erpretation_os_tick === 1 || $scope.funudus_erpretation_os_tick === "1") { $scope.funudus_erpretation_os_tick = true; } if ($scope.funudus_erpretation_os_tick === "0" || $scope.funudus_erpretation_os_tick === 0) { $scope.funudus_erpretation_os_tick = false; }
            if ($scope.disc_od_tick === 1 || $scope.disc_od_tick === "1") { $scope.disc_od_tick = true; } if ($scope.disc_od_tick === "0" || $scope.disc_od_tick === 0) { $scope.disc_od_tick = false; }
            if ($scope.disc_os_tick === 1 || $scope.disc_os_tick === "1") { $scope.disc_os_tick = true; } if ($scope.disc_os_tick === "0" || $scope.disc_os_tick === 0) { $scope.disc_os_tick = false; }
            if ($scope.disc_erpretation_od_tick === 1 || $scope.disc_erpretation_od_tick === "1") { $scope.disc_erpretation_od_tick = true; } if ($scope.disc_erpretation_od_tick === "0" || $scope.disc_erpretation_od_tick === 0) { $scope.disc_erpretation_od_tick = false; }
            if ($scope.disc_erpretation_os_tick === 1 || $scope.disc_erpretation_os_tick === "1") { $scope.disc_erpretation_os_tick = true; } if ($scope.disc_erpretation_os_tick === "0" || $scope.disc_erpretation_os_tick === 0) { $scope.disc_erpretation_os_tick = false; }
            if ($scope.fdp_od_tick === 1 || $scope.fdp_od_tick === "1") { $scope.fdp_od_tick = true; } if ($scope.fdp_od_tick === "0" || $scope.fdp_od_tick === 0) { $scope.fdp_od_tick = false; }
            if ($scope.fdp_os_tick === 1 || $scope.fdp_os_tick === "1") { $scope.fdp_os_tick = true; } if ($scope.fdp_os_tick === "0" || $scope.fdp_os_tick === 0) { $scope.fdp_os_tick = false; }
            if ($scope.fdp_erpretation_od_tick === 1 || $scope.fdp_erpretation_od_tick === "1") { $scope.fdp_erpretation_od_tick = true; } if ($scope.fdp_erpretation_od_tick === "0" || $scope.fdp_erpretation_od_tick === 0) { $scope.fdp_erpretation_od_tick = false; }
            if ($scope.fdp_erpretation_os_tick === 1 || $scope.fdp_erpretation_os_tick === "1") { $scope.fdp_erpretation_os_tick = true; } if ($scope.fdp_erpretation_os_tick === "0" || $scope.fdp_erpretation_os_tick === 0) { $scope.fdp_erpretation_os_tick = false; }
            if ($scope.post_od_tick === 1 || $scope.post_od_tick === "1") { $scope.post_od_tick = true; } if ($scope.post_od_tick === "0" || $scope.post_od_tick === 0) { $scope.post_od_tick = false; }
            if ($scope.post_os_tick === 1 || $scope.post_os_tick === "1") { $scope.post_os_tick = true; } if ($scope.post_os_tick === "0" || $scope.post_os_tick === 0) { $scope.post_os_tick = false; }
            if ($scope.post_erpretation_od_tick === 1 || $scope.post_erpretation_od_tick === "1") { $scope.post_erpretation_od_tick = true; } if ($scope.post_erpretation_od_tick === "0" || $scope.post_erpretation_od_tick === 0) { $scope.post_erpretation_od_tick = false; }
            if ($scope.post_erpretation_os_tick === 1 || $scope.post_erpretation_os_tick === "1") { $scope.post_erpretation_os_tick = true; } if ($scope.post_erpretation_os_tick === "0" || $scope.post_erpretation_os_tick === 0) { $scope.post_erpretation_os_tick = false; }
            if ($scope.treatment_od_tick === 1 || $scope.treatment_od_tick === "1") { $scope.treatment_od_tick = true; } if ($scope.treatment_od_tick === "0" || $scope.treatment_od_tick === 0) { $scope.treatment_od_tick = false; }
            if ($scope.treatment_os_tick === 1 || $scope.treatment_os_tick === "1") { $scope.treatment_os_tick = true; } if ($scope.treatment_os_tick === "0" || $scope.treatment_os_tick === 0) { $scope.treatment_os_tick = false; }




            var userId = TokenService.getUserId();
            var visionAndRefractionPayload = {
                mrdno: $scope.mrdnum,
                ddate: $filter("date")(new Date(), "yyyy/MM/dd"),
                hospid: $scope.hospitalid,
                at_od_tick: $scope.at_od_tick,
                at_os_tick: $scope.at_os_tick,
                at_od: $scope.at_od,
                at_os: $scope.at_os,
                at_mh_od_tick: $scope.at_mh_od_tick,
                at_mh_os_tick: $scope.at_mh_os_tick,
                at_pc_od_tick: $scope.at_pc_od_tick,
                at_pc_os_tick: $scope.at_pc_os_tick,
                at_nf_od_tick: $scope.at_nf_od_tick,
                at_nf_os_tick: $scope.at_nf_os_tick,
                at_other_od_tick: $scope.at_other_od_tick,
                at_other_os_tick: $scope.at_other_os_tick,
                at_other_od: $scope.at_other_od,
                at_other_os: $scope.at_other_os,
                at_erpretation_od_tick: $scope.at_erpretation_od_tick,
                at_erpretation_os_tick: $scope.at_erpretation_os_tick,
                at_erpretation_od: $scope.at_erpretation_od,
                at_erpretation_os: $scope.at_erpretation_os,
                gonioscopy_od_tick: $scope.gonioscopy_od_tick,
                gonioscopy_os_tick: $scope.gonioscopy_os_tick,
                gonioscopy_od_open_tick: $scope.gonioscopy_od_open_tick,
                gonioscopy_od_close_tick: $scope.gonioscopy_od_close_tick,
                gonioscopy_od_occludable_tick: $scope.gonioscopy_od_occludable_tick,
                gonioscopy_od_nonoccludable_tick: $scope.gonioscopy_od_nonoccludable_tick,
                gonioscopy_os_open_tick: $scope.gonioscopy_os_open_tick,
                gonioscopy_os_close_tick: $scope.gonioscopy_os_close_tick,
                gonioscopy_os_occludable_tick: $scope.gonioscopy_os_occludable_tick,
                gonioscopy_os_nonoccludable_tick: $scope.gonioscopy_os_nonoccludable_tick,
                gonioscopy_mh_od_tick: $scope.gonioscopy_mh_od_tick,
                gonioscopy_mh_os_tick: $scope.gonioscopy_mh_os_tick,
                gonioscopy_pc_od_tick: $scope.gonioscopy_pc_od_tick,
                gonioscopy_pc_os_tick: $scope.gonioscopy_pc_os_tick,
                gonioscopy_nf_od_tick: $scope.gonioscopy_nf_od_tick,
                gonioscopy_nf_os_tick: $scope.gonioscopy_nf_os_tick,
                gonioscopy_other_od_tick: $scope.gonioscopy_other_od_tick,
                gonioscopy_other_os_tick: $scope.gonioscopy_other_os_tick,
                gonioscopy_other_od: $scope.gonioscopy_other_od,
                gonioscopy_other_os: $scope.gonioscopy_other_os,
                gonioscopy_erpretation_od_tick: $scope.gonioscopy_erpretation_od_tick,
                gonioscopy_erpretation_os_tick: $scope.gonioscopy_erpretation_os_tick,
                gonioscopy_erpretation_od: $scope.gonioscopy_erpretation_od,
                gonioscopy_erpretation_os: $scope.gonioscopy_erpretation_os,

                normal_od_tick: $scope.normal_od_tick,
                refractive_error_od_tick: $scope.refractive_error_od_tick,
                presbyopia_od_tick: $scope.presbyopia_od_tick,
                cataract_untreated_od_tick: $scope.cataract_untreated_od_tick,
                phthisis_od_tick: $scope.phthisis_od_tick,
                glaucoma_od_tick: $scope.glaucoma_od_tick,
                diabetic_od_tick: $scope.diabetic_od_tick,
                other_posterior_od_tick: $scope.other_posterior_od_tick,
                others_od_tick: $scope.others_od_tick,
                others_od: $scope.others_od,

                normal_os_tick: $scope.normal_os_tick,
                refractive_error_os_tick: $scope.refractive_error_os_tick,
                presbyopia_os_tick: $scope.presbyopia_os_tick,
                cataract_untreated_os_tick: $scope.cataract_untreated_os_tick,
                phthisis_os_tick: $scope.phthisis_os_tick,
                glaucoma_os_tick: $scope.glaucoma_os_tick,
                diabetic_os_tick: $scope.diabetic_os_tick,
                other_posterior_os_tick: $scope.other_posterior_os_tick,
                others_os_tick: $scope.others_os_tick,
                others_os: $scope.others_os,
                //EDIT 
                medical_treatment_od_tick: $scope.medical_treatment_od_tick,
                medical_treatment_od: $scope.medical_treatment_od,
                surgrical_treatment_od_tick: $scope.surgrical_treatment_od_tick,
                surgrical_treatment_od: $scope.surgrical_treatment_od,
                medical_treatment_os_tick: $scope.medical_treatment_os_tick,
                medical_treatment_os: $scope.medical_treatment_os,
                surgrical_treatment_os_tick: $scope.surgrical_treatment_os_tick,
                surgrical_treatment_os: $scope.surgrical_treatment_os,
                followup_od: $scope.followup_od,
                followup_os: $scope.followup_os,
                followup_od_tick: $scope.followup_od_tick,
                followup_os_tick: $scope.followup_os_tick,
                fundus_od_tick: $scope.fundus_od_tick,
                fundus_mh_od_tick: $scope.fundus_mh_od_tick,
                fundus_pc_od_tick: $scope.fundus_pc_od_tick,
                fundus_nf_od_tick: $scope.fundus_nf_od_tick,
                fundus_others_od_tick: $scope.fundus_others_od_tick,
                fundus_others_od: $scope.fundus_others_od,
                fundus_os_tick: $scope.fundus_os_tick,
                fundus_mh_os_tick: $scope.fundus_mh_os_tick,
                fundus_pc_os_tick: $scope.fundus_pc_os_tick,
                fundus_nf_os_tick: $scope.fundus_nf_os_tick,
                fundus_others_os_tick: $scope.fundus_others_os_tick,
                fundus_others_os: $scope.fundus_others_os,
                funudus_erpretation_od_tick: $scope.funudus_erpretation_od_tick,
                funudus_erpretation_od: $scope.funudus_erpretation_od,
                funudus_erpretation_os_tick: $scope.funudus_erpretation_os_tick,
                funudus_erpretation_os: $scope.funudus_erpretation_os,
                disc_od_tick: $scope.disc_od_tick,
                disc_mh_od_tick: $scope.disc_mh_od_tick,
                disc_pc_od_tick: $scope.disc_pc_od_tick,
                disc_nf_od_tick: $scope.disc_nf_od_tick,
                disc_others_od_tick: $scope.disc_others_od_tick,
                disc_others_od: $scope.disc_others_od,
                disc_os_tick: $scope.disc_os_tick,
                disc_mh_os_tick: $scope.disc_mh_os_tick,
                disc_pc_os_tick: $scope.disc_pc_os_tick,
                disc_nf_os_tick: $scope.disc_nf_os_tick,
                disc_others_os_tick: $scope.disc_others_os_tick,
                disc_others_os: $scope.disc_others_os,
                disc_erpretation_od_tick: $scope.disc_erpretation_od_tick,
                disc_erpretation_od: $scope.disc_erpretation_od,
                disc_erpretation_os_tick: $scope.disc_erpretation_os_tick,
                disc_erpretation_os: $scope.disc_erpretation_os,
                post_od_tick: $scope.post_od_tick,
                post_sga_od: $scope.post_sga_od,
                post_it1_od: $scope.post_it1_od,
                post_it2_od: $scope.post_it2_od,
                post_ac_od: $scope.post_ac_od,
                post_acw_od: $scope.post_acw_od,
                post_lv_od: $scope.post_lv_od,
                post_ara_od: $scope.post_ara_od,
                post_aod500_od: $scope.post_aod500_od,
                post_aod7500_od: $scope.post_aod7500_od,
                post_tisa_od: $scope.post_tisa_od,
                post_tia_od: $scope.post_tia_od,
                post_os_tick: $scope.post_os_tick,
                post_sga_os: $scope.post_sga_os,
                post_it1_os: $scope.post_it1_os,
                post_it2_os: $scope.post_it2_os,
                post_ac_os: $scope.post_ac_os,
                post_acw_os: $scope.post_acw_os,
                post_lv_os: $scope.post_lv_os,
                post_ara_os: $scope.post_ara_os,
                post_aod500_os: $scope.post_aod500_os,
                post_aod7500_os: $scope.post_aod7500_os,
                post_tisa_os: $scope.post_tisa_os,
                post_tia_os: $scope.post_tia_os,
                post_od_tick: $scope.post_od_tick,
                post_mh_od_tick: $scope.post_mh_od_tick,
                post_pc_od_tick: $scope.post_pc_od_tick,
                post_nf_od_tick: $scope.post_nf_od_tick,
                post_others_od_tick: $scope.post_others_od_tick,
                post_others_od: $scope.post_others_od,
                post_os_tick: $scope.post_os_tick,
                post_mh_os_tick: $scope.post_mh_os_tick,
                post_pc_os_tick: $scope.post_pc_os_tick,
                post_nf_os_tick: $scope.post_nf_os_tick,
                post_others_os_tick: $scope.post_others_os_tick,
                post_others_os: $scope.post_others_os,
                post_erpretation_od_tick: $scope.post_erpretation_od_tick,
                post_erpretation_od: $scope.post_erpretation_od,
                post_erpretation_os_tick: $scope.post_erpretation_os_tick,
                post_erpretation_os: $scope.post_erpretation_os,
                fdp_od_tick: $scope.fdp_od_tick,
                fdp_mh_od_tick: $scope.fdp_mh_od_tick,
                fdp_pc_od_tick: $scope.fdp_pc_od_tick,
                fdp_nf_od_tick: $scope.fdp_nf_od_tick,
                fdp_others_od_tick: $scope.fdp_others_od_tick,
                fdp_others_od: $scope.fdp_others_od,
                fdp_os_tick: $scope.fdp_os_tick,
                fdp_mh_os_tick: $scope.fdp_mh_os_tick,
                fdp_pc_os_tick: $scope.fdp_pc_os_tick,
                fdp_nf_os_tick: $scope.fdp_nf_os_tick,
                fdp_others_os_tick: $scope.fdp_others_os_tick,
                fdp_others_os: $scope.fdp_others_os,
                fdp_erpretation_od_tick: $scope.fdp_erpretation_od_tick,
                fdp_erpretation_od: $scope.fdp_erpretation_od,
                fdp_erpretation_os_tick: $scope.fdp_erpretation_os_tick,
                fdp_erpretation_os: $scope.fdp_erpretation_os,
                anterior_segment_tick: $scope.anterior_segment_tick,
                ct_od_tick: $scope.ct_od_tick,
                ct_os_tick: $scope.ct_os_tick,
                cct_od: $scope.cct_od,
                k1_od: $scope.k1_od,
                k2_od: $scope.k2_od,
                cct_os: $scope.cct_os,
                k1_os: $scope.k1_os,
                k2_os: $scope.k2_os,
                ct_mh_od_tick: $scope.ct_mh_od_tick,
                ct_mh_os_tick: $scope.ct_mh_os_tick,
                ct_pc_od_tick: $scope.ct_pc_od_tick,
                ct_pc_os_tick: $scope.ct_pc_os_tick,
                ct_nf_od_tick: $scope.ct_nf_od_tick,
                ct_nf_os_tick: $scope.ct_nf_os_tick,
                ct_other_od_tick: $scope.ct_other_od_tick,
                ct_other_os_tick: $scope.ct_other_os_tick,
                ct_other_od: $scope.ct_other_od,
                ct_other_os: $scope.ct_other_os,
                ct_erpretation_od_tick: $scope.ct_erpretation_od_tick,
                ct_erpretation_os_tick: $scope.ct_erpretation_os_tick,
                ct_erpretation_od: $scope.ct_erpretation_od,
                ct_erpretation_os: $scope.ct_erpretation_os,
                ascan_od_tick: $scope.ascan_od_tick,
                ascan_os_tick: $scope.ascan_os_tick,
                ascan_acp_od: $scope.ascan_acp_od,
                ascan_al_od: $scope.ascan_al_od,
                ascan_iolpower_od: $scope.ascan_iolpower_od,
                ascan_lt_od: $scope.ascan_lt_od,
                ascan_acp_os: $scope.ascan_acp_os,
                ascan_al_os: $scope.ascan_al_os,
                ascan_iolpower_os: $scope.ascan_iolpower_os,
                ascan_lt_os: $scope.ascan_lt_os,
                ascan_mh_od_tick: $scope.ascan_mh_od_tick,
                ascan_mh_os_tick: $scope.ascan_mh_os_tick,
                ascan_pc_od_tick: $scope.ascan_pc_od_tick,
                ascan_pc_os_tick: $scope.ascan_pc_os_tick,
                ascan_nf_od_tick: $scope.ascan_nf_od_tick,
                ascan_nf_os_tick: $scope.ascan_nf_os_tick,
                ascan_other_od_tick: $scope.ascan_other_od_tick,
                ascan_other_os_tick: $scope.ascan_other_os_tick,
                ascan_other_od: $scope.ascan_other_od,
                ascan_other_os: $scope.ascan_other_os,
                ascan_erpretation_od_tick: $scope.ascan_erpretation_od_tick,
                ascan_erpretation_os_tick: $scope.ascan_erpretation_os_tick,
                ascan_erpretation_od: $scope.ascan_erpretation_od,
                ascan_erpretation_os: $scope.ascan_erpretation_os,
                anterioroct_od_tick: $scope.anterioroct_od_tick,
                anterioroct_os_tick: $scope.anterioroct_os_tick,
                anteriorsga_od: $scope.anteriorsga_od,
                anteriorit1_od: $scope.anteriorit1_od,
                anteriorit2_od: $scope.anteriorit2_od,
                anterioracdepth_od: $scope.anterioracdepth_od,
                anterioracwidth_od: $scope.anterioracwidth_od,
                anteriorlv_od: $scope.anteriorlv_od,
                anteriorara_od: $scope.anteriorara_od,
                anterioraod500_od: $scope.anterioraod500_od,
                anterioraod750_od: $scope.anterioraod750_od,
                anteriortisa_od: $scope.anteriortisa_od,
                anteriortia_od: $scope.anteriortia_od,
                anteriorsga_os: $scope.anteriorsga_os,
                anteriorit1_os: $scope.anteriorit1_os,
                anteriorit2_os: $scope.anteriorit2_os,
                anterioracdepth_os: $scope.anterioracdepth_os,
                anterioracwidth_os: $scope.anterioracwidth_os,
                anteriorlv_os: $scope.anteriorlv_os,
                anteriorara_os: $scope.anteriorara_os,
                anterioraod500_os: $scope.anterioraod500_os,
                anterioraod750_os: $scope.anterioraod750_os,
                anteriortisa_os: $scope.anteriortisa_os,
                anterior_tia_os: $scope.anterior_tia_os,
                anterioroct_mh_od_tick: $scope.anterioroct_mh_od_tick,
                anterioroct_mh_os_tick: $scope.anterioroct_mh_os_tick,
                anterioroct_pc_od_tick: $scope.anterioroct_pc_od_tick,
                anterioroct_pc_os_tick: $scope.anterioroct_pc_os_tick,
                anterioroct_nf_od_tick: $scope.anterioroct_nf_od_tick,
                anterioroct_nf_os_tick: $scope.anterioroct_nf_os_tick,
                anterioroct_other_od_tick: $scope.anterioroct_other_od_tick,
                anterioroct_other_os_tick: $scope.anterioroct_other_os_tick,
                anterioroct_other_od: $scope.anterioroct_other_od,
                anterioroct_other_os: $scope.anterioroct_other_os,
                anterioroct_erpretation_od_tick: $scope.anterioroct_erpretation_od_tick,
                anterioroct_erpretation_os_tick: $scope.anterioroct_erpretation_os_tick,
                anterioroct_erpretation_od: $scope.anterioroct_erpretation_od,
                anterioroct_erpretation_os: $scope.anterioroct_erpretation_os,
                laser_treatment_od_tick: $scope.laser_treatment_od_tick,
                laser_treatment_od: $scope.laser_treatment_od,
                laser_treatment_os_tick: $scope.laser_treatment_os_tick,
                laser_treatment_os: $scope.laser_treatment_os,
                subspeciality_referal_od_tick: $scope.subspeciality_referal_od_tick,
                subspeciality_referal_os_tick: $scope.subspeciality_referal_os_tick,
                subspec_corena_od_tick: $scope.subspec_corena_od_tick,
                subspeciality_retina_od_tick: $scope.subspeciality_retina_od_tick,
                subspeciality_glaucoma_od_tick: $scope.subspeciality_glaucoma_od_tick,
                subspeciality_opal_od_tick: $scope.subspeciality_opal_od_tick,
                subspeciality_referr_od_tick: $scope.subspeciality_referr_od_tick,
                subspeciality_squint_od_tick: $scope.subspeciality_squint_od_tick,
                subspeciality_uvea_od_tick: $scope.subspeciality_uvea_od_tick,
                subspeciality_neuropthalmo_od_tick: $scope.subspeciality_neuropthalmo_od_tick,
                subspeciality_none_od_tick: $scope.subspeciality_none_od_tick,
                subspec_corena_os_tick: $scope.subspec_corena_os_tick,
                subspeciality_retina_os_tick: $scope.subspeciality_retina_os_tick,
                subspeciality_glaucoma_os_tick: $scope.subspeciality_glaucoma_os_tick,
                subspeciality_opal_os_tick: $scope.subspeciality_opal_os_tick,
                subspeciality_referr_os_tick: $scope.subspeciality_referr_os_tick,
                subspeciality_squint_os_tick: $scope.subspeciality_squint_os_tick,
                subspeciality_uvea_os_tick: $scope.subspeciality_uvea_os_tick,
                subspeciality_neuropthalmo_os_tick: $scope.subspeciality_neuropthalmo_os_tick,
                subspeciality_none_os_tick: $scope.subspeciality_none_os_tick,
                followup_od_tick: $scope.followup_od_tick,
                followup_os_tick: $scope.followup_os_tick,

                visual_field_od_tick: $scope.visual_field_od_tick,
                visual_field_interpret_od_tick: $scope.visual_field_interpret_od_tick,
                visual_field_interpret_od: $scope.visual_field_interpret_od,
                visual_field_os_tick: $scope.visual_field_os_tick,
                visual_field_interpret_os_tick: $scope.visual_field_interpret_os_tick,
                visual_field_interpret_os: $scope.visual_field_interpret_os,

                schirmer_od_tick: $scope.schirmer_od_tick,
                schirmer_od: $scope.schirmer_od,
                schirmer_os_tick: $scope.schirmer_os_tick,
                schirmer_os: $scope.schirmer_os,

                tx_plan: $scope.tx_plan,
                conjunc_od_tick: $scope.conjunc_od_tick,
                conjunc_od: $scope.conjunc_od,
                conjunc_os_tick: $scope.conjunc_os_tick,
                conjunc_os: $scope.conjunc_os,
                glaucoma_od: $scope.glaucoma_od,
                glaucoma_os: $scope.glaucoma_os,
                catar_od: $scope.catar_od,
                catar_os: $scope.catar_os,
                diabe_ret_od: $scope.diabe_ret_od,
                DIabete_ret_os: $scope.diabete_ret_os,
                hpt_od_tick: $scope.hpt_od_tick,
                hpt_od: $scope.hpt_od,
                hpt_os_tick: $scope.hpt_os_tick,
                hpt_os: $scope.hpt_os,
                poster_od: $scope.poster_od,
                poster_os: $scope.poster_os,
                uveal_od: $scope.uveal_od,
                uveal_os: $scope.uveal_os,
                pthisis_od: $scope.pthisis_od,
                pthsis_os: $scope.pthsis_os,

                anterior_od_tick: $scope.anterior_od_tick,
                anterior_os_tick: $scope.anterior_os_tick,
                anterior_od_text: $scope.anterior_od_text,
                anterior_os_text: $scope.anterior_os_text,

                anteriorint_os_tick: $scope.anteriorint_os_tick,
                anteriorint_od_tick: $scope.anteriorint_od_tick,

                referror_od: $scope.referror_od,
                referror_os: $scope.referror_os,
                uveal_od_tick: $scope.uveal_od_tick,
                uveal_os_tick: $scope.uveal_os_tick,

                treatment_od_tick: $scope.treatment_od_tick,
                treatment_os_tick: $scope.treatment_os_tick,


            }

            console.log(visionAndRefractionPayload);
            var token = localStorage.getItem('access_token');
            $http.post(UrlConfig.labReportBaseUrl() + vm.url,
                visionAndRefractionPayload,
                { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    //   console.log(result.data);
                    vm.notification = { mode: 'success', message: 'Payload submitted' };
                    $scope.showEdit = false;
                    vm.fetchPrintOcularList();
                    vm.fetchPrintVisionList();

                    vm.PrintRecord();
                    // vm.reload();
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

        vm.fetchUserSummary = function () {
            $scope.loadtrue = true;

            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();

            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationdetail?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {

                    if (result.data.length === 0) {
                        vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.noReport = true;
                        $scope.loadtrue = false;
                    }
                    else {
                        $scope.noReport = false;
                        $scope.loadtrue = false;
                        vm.UserReportList = result.data;
                        $scope.showReport = true;
                        // console.log(result.data);
                        vm.userMrd = result.data[0].mrdno;
                        vm.pname = result.data[0].pname;
                        vm.address = result.data[0].address;
                        vm.contact = result.data[0].contact;
                        vm.gender = result.data[0].sex;
                        vm.age = result.data[0].age;
                        vm.reportDate = result.data[0].ddate;

                    }


                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();


            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationAll?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {

                    // $scope.noReport = false;

                    $scope.loadtrue = false;
                    vm.ocularValues = result.data;
                    $scope.showReport = true;
                    //  console.log(result.data);




                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };

        vm.onReportSelected = function () {
            $scope.mdrno = vm.ocularValues.mrdno;
            console.log(vm.ocularValues)

            $scope.showEdit = true;
            $scope.at_od_tick = vm.ocularValues.at_od_tick;
            $scope.at_os_tick = vm.ocularValues.at_os_tick;
            $scope.at_od = vm.ocularValues.at_od;
            $scope.at_os = vm.ocularValues.at_os;
            $scope.at_mh_od_tick = vm.ocularValues.at_mh_od_tick;
            $scope.at_mh_os_tick = vm.ocularValues.at_mh_os_tick;
            $scope.at_pc_od_tick = vm.ocularValues.at_pc_od_tick;
            $scope.at_pc_os_tick = vm.ocularValues.at_pc_os_tick;
            $scope.at_nf_od_tick = vm.ocularValues.at_nf_od_tick;
            $scope.at_nf_os_tick = vm.ocularValues.at_nf_os_tick;
            $scope.at_other_od_tick = vm.ocularValues.at_other_od_tick;
            $scope.at_other_os_tick = vm.ocularValues.at_other_os_tick;
            $scope.at_other_od = vm.ocularValues.at_other_od;
            $scope.at_other_os = vm.ocularValues.at_other_os;
            $scope.at_erpretation_od_tick = vm.ocularValues.at_erpretation_od_tick;
            $scope.at_erpretation_os_tick = vm.ocularValues.at_erpretation_os_tick;
            $scope.at_erpretation_od = vm.ocularValues.at_erpretation_od;
            $scope.at_erpretation_os = vm.ocularValues.at_erpretation_os;
            $scope.gonioscopy_od_tick = vm.ocularValues.gonioscopy_od_tick;
            $scope.gonioscopy_os_tick = vm.ocularValues.gonioscopy_os_tick;
            $scope.gonioscopy_od_open_tick = vm.ocularValues.gonioscopy_od_open_tick;
            $scope.gonioscopy_od_close_tick = vm.ocularValues.gonioscopy_od_close_tick;
            $scope.gonioscopy_od_occludable_tick = vm.ocularValues.gonioscopy_od_occludable_tick;
            $scope.gonioscopy_od_nonoccludable_tick = vm.ocularValues.gonioscopy_od_nonoccludable_tick;
            $scope.gonioscopy_os_open_tick = vm.ocularValues.gonioscopy_os_open_tick;
            $scope.gonioscopy_os_close_tick = vm.ocularValues.gonioscopy_os_close_tick;
            $scope.gonioscopy_os_occludable_tick = vm.ocularValues.gonioscopy_os_occludable_tick;
            $scope.gonioscopy_os_nonoccludable_tick = vm.ocularValues.gonioscopy_os_nonoccludable_tick;
            $scope.gonioscopy_mh_od_tick = vm.ocularValues.gonioscopy_mh_od_tick;
            $scope.gonioscopy_mh_os_tick = vm.ocularValues.gonioscopy_mh_os_tick;
            $scope.gonioscopy_pc_od_tick = vm.ocularValues.gonioscopy_pc_od_tick;
            $scope.gonioscopy_pc_os_tick = vm.ocularValues.gonioscopy_pc_os_tick;
            $scope.gonioscopy_nf_od_tick = vm.ocularValues.gonioscopy_nf_od_tick;
            $scope.gonioscopy_nf_os_tick = vm.ocularValues.gonioscopy_nf_os_tick;
            $scope.gonioscopy_other_od_tick = vm.ocularValues.gonioscopy_other_od_tick;
            $scope.gonioscopy_other_os_tick = vm.ocularValues.gonioscopy_other_os_tick;
            $scope.gonioscopy_other_od = vm.ocularValues.gonioscopy_other_od;
            $scope.gonioscopy_other_os = vm.ocularValues.gonioscopy_other_os;
            $scope.gonioscopy_erpretation_od_tick = vm.ocularValues.gonioscopy_erpretation_od_tick;
            $scope.gonioscopy_erpretation_os_tick = vm.ocularValues.gonioscopy_erpretation_os_tick;
            $scope.gonioscopy_erpretation_od = vm.ocularValues.gonioscopy_erpretation_od;
            $scope.gonioscopy_erpretation_os = vm.ocularValues.gonioscopy_erpretation_os;

            $scope.normal_od_tick = vm.ocularValues.normal_od_tick;
            $scope.refractive_error_od_tick = vm.ocularValues.refractive_error_od_tick;
            $scope.presbyopia_od_tick = vm.ocularValues.presbyopia_od_tick;
            $scope.cataract_untreated_od_tick = vm.ocularValues.cataract_untreated_od_tick;
            $scope.phthisis_od_tick = vm.ocularValues.phthisis_od_tick;
            $scope.glaucoma_od_tick = vm.ocularValues.glaucoma_od_tick;
            $scope.diabetic_od_tick = vm.ocularValues.diabetic_od_tick;
            $scope.other_posterior_od_tick = vm.ocularValues.other_posterior_od_tick;
            $scope.others_od_tick = vm.ocularValues.others_od_tick;
            $scope.others_od = vm.ocularValues.others_od;

            $scope.normal_os_tick = vm.ocularValues.normal_os_tick;
            $scope.refractive_error_os_tick = vm.ocularValues.refractive_error_os_tick;
            $scope.presbyopia_os_tick = vm.ocularValues.presbyopia_os_tick;
            $scope.cataract_untreated_os_tick = vm.ocularValues.cataract_untreated_os_tick;
            $scope.phthisis_os_tick = vm.ocularValues.phthisis_os_tick;
            $scope.glaucoma_os_tick = vm.ocularValues.glaucoma_os_tick;
            $scope.diabetic_os_tick = vm.ocularValues.diabetic_os_tick;
            $scope.other_posterior_os_tick = vm.ocularValues.other_posterior_os_tick;

            $scope.others_os_tick = vm.ocularValues.others_os_tick;
            $scope.others_os = vm.ocularValues.others_os;


            $scope.medical_treatment_od_tick = vm.ocularValues.medical_treatment_od_tick;
            $scope.medical_treatment_od = vm.ocularValues.medical_treatment_od;
            $scope.surgrical_treatment_od_tick = vm.ocularValues.surgrical_treatment_od_tick;
            $scope.surgrical_treatment_od = vm.ocularValues.surgrical_treatment_od;
            $scope.medical_treatment_os_tick = vm.ocularValues.medical_treatment_os_tick;
            $scope.medical_treatment_os = vm.ocularValues.medical_treatment_os;
            $scope.surgrical_treatment_os_tick = vm.ocularValues.surgrical_treatment_os_tick;
            $scope.surgrical_treatment_os = vm.ocularValues.surgrical_treatment_os;
            $scope.followup_od = vm.ocularValues.followup_od;
            $scope.followup_os = vm.ocularValues.followup_os;
            $scope.followup_od_tick = vm.ocularValues.followup_od_tick;
            $scope.followup_os_tick = vm.ocularValues.followup_os_tick;
            $scope.fundus_od_tick = vm.ocularValues.fundus_od_tick;
            $scope.fundus_mh_od_tick = vm.ocularValues.fundus_mh_od_tick;
            $scope.fundus_pc_od_tick = vm.ocularValues.fundus_pc_od_tick;
            $scope.fundus_nf_od_tick = vm.ocularValues.fundus_nf_od_tick;
            $scope.fundus_others_od_tick = vm.ocularValues.fundus_others_od_tick;
            $scope.fundus_others_od = vm.ocularValues.fundus_others_od;
            $scope.fundus_os_tick = vm.ocularValues.fundus_os_tick;
            $scope.fundus_mh_os_tick = vm.ocularValues.fundus_mh_os_tick;
            $scope.fundus_pc_os_tick = vm.ocularValues.fundus_pc_os_tick;
            $scope.fundus_nf_os_tick = vm.ocularValues.fundus_nf_os_tick;
            $scope.fundus_others_os_tick = vm.ocularValues.fundus_others_os_tick;
            $scope.fundus_others_os = vm.ocularValues.fundus_others_os;
            $scope.funudus_erpretation_od_tick = vm.ocularValues.funudus_erpretation_od_tick;
            $scope.funudus_erpretation_od = vm.ocularValues.funudus_erpretation_od;
            $scope.funudus_erpretation_os_tick = vm.ocularValues.funudus_erpretation_os_tick;
            $scope.funudus_erpretation_os = vm.ocularValues.funudus_erpretation_os;
            $scope.disc_od_tick = vm.ocularValues.disc_od_tick;
            $scope.disc_mh_od_tick = vm.ocularValues.disc_mh_od_tick;
            $scope.disc_pc_od_tick = vm.ocularValues.disc_pc_od_tick;
            $scope.disc_nf_od_tick = vm.ocularValues.disc_nf_od_tick;
            $scope.disc_others_od_tick = vm.ocularValues.disc_others_od_tick;
            $scope.disc_others_od = vm.ocularValues.disc_others_od;
            $scope.disc_os_tick = vm.ocularValues.disc_os_tick;
            $scope.disc_mh_os_tick = vm.ocularValues.disc_mh_os_tick;
            $scope.disc_pc_os_tick = vm.ocularValues.disc_pc_os_tick;
            $scope.disc_nf_os_tick = vm.ocularValues.disc_nf_os_tick;
            $scope.disc_others_os_tick = vm.ocularValues.disc_others_os_tick;
            $scope.disc_others_os = vm.ocularValues.disc_others_os;
            $scope.disc_erpretation_od_tick = vm.ocularValues.disc_erpretation_od_tick;
            $scope.disc_erpretation_od = vm.ocularValues.disc_erpretation_od;
            $scope.disc_erpretation_os_tick = vm.ocularValues.disc_erpretation_os_tick;
            $scope.disc_erpretation_os = vm.ocularValues.disc_erpretation_os;
            $scope.post_od_tick = vm.ocularValues.post_od_tick;
            $scope.post_sga_od = vm.ocularValues.post_sga_od;
            $scope.post_it1_od = vm.ocularValues.post_it1_od;
            $scope.post_it2_od = vm.ocularValues.post_it2_od;
            $scope.post_ac_od = vm.ocularValues.post_ac_od;
            $scope.post_acw_od = vm.ocularValues.post_acw_od;
            $scope.post_lv_od = vm.ocularValues.post_lv_od;
            $scope.post_ara_od = vm.ocularValues.post_ara_od;
            $scope.post_aod500_od = vm.ocularValues.post_aod500_od;
            $scope.post_aod7500_od = vm.ocularValues.post_aod7500_od;
            $scope.post_tisa_od = vm.ocularValues.post_tisa_od;
            $scope.post_tia_od = vm.ocularValues.post_tia_od;
            $scope.post_os_tick = vm.ocularValues.post_os_tick;
            $scope.post_sga_os = vm.ocularValues.post_sga_os;
            $scope.post_it1_os = vm.ocularValues.post_it1_os;
            $scope.post_it2_os = vm.ocularValues.post_it2_os;
            $scope.post_ac_os = vm.ocularValues.post_ac_os;
            $scope.post_acw_os = vm.ocularValues.post_acw_os;
            $scope.post_lv_os = vm.ocularValues.post_lv_os;
            $scope.post_ara_os = vm.ocularValues.post_ara_os;
            $scope.post_aod500_os = vm.ocularValues.post_aod500_os;
            $scope.post_aod7500_os = vm.ocularValues.post_aod7500_os;
            $scope.post_tisa_os = vm.ocularValues.post_tisa_os;
            $scope.post_tia_os = vm.ocularValues.post_tia_os;
            $scope.post_od_tick = vm.ocularValues.post_od_tick;
            $scope.post_mh_od_tick = vm.ocularValues.post_mh_od_tick;
            $scope.post_pc_od_tick = vm.ocularValues.post_pc_od_tick;
            $scope.post_nf_od_tick = vm.ocularValues.post_nf_od_tick;
            $scope.post_others_od_tick = vm.ocularValues.post_others_od_tick;
            $scope.post_others_od = vm.ocularValues.post_others_od;
            $scope.post_os_tick = vm.ocularValues.post_os_tick;
            $scope.post_mh_os_tick = vm.ocularValues.post_mh_os_tick;
            $scope.post_pc_os_tick = vm.ocularValues.post_pc_os_tick;
            $scope.post_nf_os_tick = vm.ocularValues.post_nf_os_tick;
            $scope.post_others_os_tick = vm.ocularValues.post_others_os_tick;
            $scope.post_others_os = vm.ocularValues.post_others_os;
            $scope.post_erpretation_od_tick = vm.ocularValues.post_erpretation_od_tick;
            $scope.post_erpretation_od = vm.ocularValues.post_erpretation_od;
            $scope.post_erpretation_os_tick = vm.ocularValues.post_erpretation_os_tick;
            $scope.post_erpretation_os = vm.ocularValues.post_erpretation_os;
            $scope.fdp_od_tick = vm.ocularValues.fdp_od_tick;
            $scope.fdp_mh_od_tick = vm.ocularValues.fdp_mh_od_tick;
            $scope.fdp_pc_od_tick = vm.ocularValues.fdp_pc_od_tick;
            $scope.fdp_nf_od_tick = vm.ocularValues.fdp_nf_od_tick;
            $scope.fdp_others_od_tick = vm.ocularValues.fdp_others_od_tick;
            $scope.fdp_others_od = vm.ocularValues.fdp_others_od;
            $scope.fdp_os_tick = vm.ocularValues.fdp_os_tick;
            $scope.fdp_mh_os_tick = vm.ocularValues.fdp_mh_os_tick;
            $scope.fdp_pc_os_tick = vm.ocularValues.fdp_pc_os_tick;
            $scope.fdp_nf_os_tick = vm.ocularValues.fdp_nf_os_tick;
            $scope.fdp_others_os_tick = vm.ocularValues.fdp_others_os_tick;
            $scope.fdp_others_os = vm.ocularValues.fdp_others_os;
            $scope.fdp_erpretation_od_tick = vm.ocularValues.fdp_erpretation_od_tick;
            $scope.fdp_erpretation_od = vm.ocularValues.fdp_erpretation_od;
            $scope.fdp_erpretation_os_tick = vm.ocularValues.fdp_erpretation_os_tick;
            $scope.fdp_erpretation_os = vm.ocularValues.fdp_erpretation_os;
            $scope.anterior_segment_tick = vm.ocularValues.anterior_segment_tick;
            $scope.ct_od_tick = vm.ocularValues.ct_od_tick;
            $scope.ct_os_tick = vm.ocularValues.ct_os_tick;
            $scope.cct_od = vm.ocularValues.cct_od;
            $scope.k1_od = vm.ocularValues.k1_od;
            $scope.k2_od = vm.ocularValues.k2_od;
            $scope.cct_os = vm.ocularValues.cct_os;
            $scope.k1_os = vm.ocularValues.k1_os;
            $scope.k2_os = vm.ocularValues.k2_os;
            $scope.ct_mh_od_tick = vm.ocularValues.ct_mh_od_tick;
            $scope.ct_mh_os_tick = vm.ocularValues.ct_mh_os_tick;
            $scope.ct_pc_od_tick = vm.ocularValues.ct_pc_od_tick;
            $scope.ct_pc_os_tick = vm.ocularValues.ct_pc_os_tick;
            $scope.ct_nf_od_tick = vm.ocularValues.ct_nf_od_tick;
            $scope.ct_nf_os_tick = vm.ocularValues.ct_nf_os_tick;
            $scope.ct_other_od_tick = vm.ocularValues.ct_other_od_tick;
            $scope.ct_other_os_tick = vm.ocularValues.ct_other_os_tick;
            $scope.ct_other_od = vm.ocularValues.ct_other_od;
            $scope.ct_other_os = vm.ocularValues.ct_other_os;
            $scope.ct_erpretation_od_tick = vm.ocularValues.ct_erpretation_od_tick;
            $scope.ct_erpretation_os_tick = vm.ocularValues.ct_erpretation_os_tick;
            $scope.ct_erpretation_od = vm.ocularValues.ct_erpretation_od;
            $scope.ct_erpretation_os = vm.ocularValues.ct_erpretation_os;
            $scope.ascan_od_tick = vm.ocularValues.ascan_od_tick;
            $scope.ascan_os_tick = vm.ocularValues.ascan_os_tick;
            $scope.ascan_acp_od = vm.ocularValues.ascan_acp_od;
            $scope.ascan_al_od = vm.ocularValues.ascan_al_od;
            $scope.ascan_iolpower_od = vm.ocularValues.ascan_iolpower_od;
            $scope.ascan_lt_od = vm.ocularValues.ascan_lt_od;
            $scope.ascan_acp_os = vm.ocularValues.ascan_acp_os;
            $scope.ascan_al_os = vm.ocularValues.ascan_al_os;
            $scope.ascan_iolpower_os = vm.ocularValues.ascan_iolpower_os;
            $scope.ascan_lt_os = vm.ocularValues.ascan_lt_os;
            $scope.ascan_mh_od_tick = vm.ocularValues.ascan_mh_od_tick;
            $scope.ascan_mh_os_tick = vm.ocularValues.ascan_mh_os_tick;
            $scope.ascan_pc_od_tick = vm.ocularValues.ascan_pc_od_tick;
            $scope.ascan_pc_os_tick = vm.ocularValues.ascan_pc_os_tick;
            $scope.ascan_nf_od_tick = vm.ocularValues.ascan_nf_od_tick;
            $scope.ascan_nf_os_tick = vm.ocularValues.ascan_nf_os_tick;
            $scope.ascan_other_od_tick = vm.ocularValues.ascan_other_od_tick;
            $scope.ascan_other_os_tick = vm.ocularValues.ascan_other_os_tick;
            $scope.ascan_other_od = vm.ocularValues.ascan_other_od;
            $scope.ascan_other_os = vm.ocularValues.ascan_other_os;
            $scope.ascan_erpretation_od_tick = vm.ocularValues.ascan_erpretation_od_tick;
            $scope.ascan_erpretation_os_tick = vm.ocularValues.ascan_erpretation_os_tick;
            $scope.ascan_erpretation_od = vm.ocularValues.ascan_erpretation_od;
            $scope.ascan_erpretation_os = vm.ocularValues.ascan_erpretation_os;
            $scope.anterioroct_od_tick = vm.ocularValues.anterioroct_od_tick;
            $scope.anterioroct_os_tick = vm.ocularValues.anterioroct_os_tick;
            $scope.anteriorsga_od = vm.ocularValues.anteriorsga_od;
            $scope.anteriorit1_od = vm.ocularValues.anteriorit1_od;
            $scope.anteriorit2_od = vm.ocularValues.anteriorit2_od;
            $scope.anterioracdepth_od = vm.ocularValues.anterioracdepth_od;
            $scope.anterioracwidth_od = vm.ocularValues.anterioracwidth_od;
            $scope.anteriorlv_od = vm.ocularValues.anteriorlv_od;
            $scope.anteriorara_od = vm.ocularValues.anteriorara_od;
            $scope.anterioraod500_od = vm.ocularValues.anterioraod500_od;
            $scope.anterioraod750_od = vm.ocularValues.anterioraod750_od;
            $scope.anteriortisa_od = vm.ocularValues.anteriortisa_od;
            $scope.anteriortia_od = vm.ocularValues.anteriortia_od;
            $scope.anteriorsga_os = vm.ocularValues.anteriorsga_os;
            $scope.anteriorit1_os = vm.ocularValues.anteriorit1_os;
            $scope.anteriorit2_os = vm.ocularValues.anteriorit2_os;
            $scope.anterioracdepth_os = vm.ocularValues.anterioracdepth_os;
            $scope.anterioracwidth_os = vm.ocularValues.anterioracwidth_os;
            $scope.anteriorlv_os = vm.ocularValues.anteriorlv_os;
            $scope.anteriorara_os = vm.ocularValues.anteriorara_os;
            $scope.anterioraod500_os = vm.ocularValues.anterioraod500_os;
            $scope.anterioraod750_os = vm.ocularValues.anterioraod750_os;
            $scope.anteriortisa_os = vm.ocularValues.anteriortisa_os;
            $scope.anterior_tia_os = vm.ocularValues.anterior_tia_os;
            $scope.anterioroct_mh_od_tick = vm.ocularValues.anterioroct_mh_od_tick;
            $scope.anterioroct_mh_os_tick = vm.ocularValues.anterioroct_mh_os_tick;
            $scope.anterioroct_pc_od_tick = vm.ocularValues.anterioroct_pc_od_tick;
            $scope.anterioroct_pc_os_tick = vm.ocularValues.anterioroct_pc_os_tick;
            $scope.anterioroct_nf_od_tick = vm.ocularValues.anterioroct_nf_od_tick;
            $scope.anterioroct_nf_os_tick = vm.ocularValues.anterioroct_nf_os_tick;
            $scope.anterioroct_other_od_tick = vm.ocularValues.anterioroct_other_od_tick;
            $scope.anterioroct_other_os_tick = vm.ocularValues.anterioroct_other_os_tick;
            $scope.anterioroct_other_od = vm.ocularValues.anterioroct_other_od;
            $scope.anterioroct_other_os = vm.ocularValues.anterioroct_other_os;
            $scope.anterioroct_erpretation_od_tick = vm.ocularValues.anterioroct_erpretation_od_tick;
            $scope.anterioroct_erpretation_os_tick = vm.ocularValues.anterioroct_erpretation_os_tick;
            $scope.anterioroct_erpretation_od = vm.ocularValues.anterioroct_erpretation_od;
            $scope.anterioroct_erpretation_os = vm.ocularValues.anterioroct_erpretation_os;
            $scope.laser_treatment_od_tick = vm.ocularValues.laser_treatment_od_tick;
            $scope.laser_treatment_od = vm.ocularValues.laser_treatment_od;
            $scope.laser_treatment_os_tick = vm.ocularValues.laser_treatment_os_tick;
            $scope.laser_treatment_os = vm.ocularValues.laser_treatment_os;
            $scope.subspeciality_referal_od_tick = vm.ocularValues.subspeciality_referal_od_tick;
            $scope.subspeciality_referal_os_tick = vm.ocularValues.subspeciality_referal_os_tick;
            $scope.subspec_corena_od_tick = vm.ocularValues.subspec_corena_od_tick;
            $scope.subspeciality_retina_od_tick = vm.ocularValues.subspeciality_retina_od_tick;
            $scope.subspeciality_glaucoma_od_tick = vm.ocularValues.subspeciality_glaucoma_od_tick;
            $scope.subspeciality_opal_od_tick = vm.ocularValues.subspeciality_opal_od_tick;
            $scope.subspeciality_referr_od_tick = vm.ocularValues.subspeciality_referr_od_tick;
            $scope.subspeciality_squint_od_tick = vm.ocularValues.subspeciality_squint_od_tick;
            $scope.subspeciality_uvea_od_tick = vm.ocularValues.subspeciality_uvea_od_tick;
            $scope.subspeciality_neuropthalmo_od_tick = vm.ocularValues.subspeciality_neuropthalmo_od_tick;
            $scope.subspeciality_none_od_tick = vm.ocularValues.subspeciality_none_od_tick;
            $scope.subspec_corena_os_tick = vm.ocularValues.subspec_corena_os_tick;
            $scope.subspeciality_retina_os_tick = vm.ocularValues.subspeciality_retina_os_tick;
            $scope.subspeciality_glaucoma_os_tick = vm.ocularValues.subspeciality_glaucoma_os_tick;
            $scope.subspeciality_opal_os_tick = vm.ocularValues.subspeciality_opal_os_tick;
            $scope.subspeciality_referr_os_tick = vm.ocularValues.subspeciality_referr_os_tick;
            $scope.subspeciality_squint_os_tick = vm.ocularValues.subspeciality_squint_os_tick;
            $scope.subspeciality_uvea_os_tick = vm.ocularValues.subspeciality_uvea_os_tick;
            $scope.subspeciality_neuropthalmo_os_tick = vm.ocularValues.subspeciality_neuropthalmo_os_tick;
            $scope.subspeciality_none_os_tick = vm.ocularValues.subspeciality_none_os_tick;
            $scope.followup_od_tick = vm.ocularValues.followup_od_tick;
            $scope.followup_os_tick = vm.ocularValues.followup_os_tick;

            $scope.visual_field_od_tick = vm.ocularValues.visual_field_od_tick;
            $scope.visual_field_interpret_od_tick = vm.ocularValues.visual_field_interpret_od_tick;
            $scope.visual_field_interpret_od = vm.ocularValues.visual_field_interpret_od;
            $scope.visual_field_os_tick = vm.ocularValues.visual_field_os_tick;
            $scope.visual_field_interpret_os_tick = vm.ocularValues.visual_field_interpret_os_tick;
            $scope.visual_field_interpret_os = vm.ocularValues.visual_field_interpret_os;


            $scope.schirmer_od_tick = vm.ocularValues.schirmer_od_tick;
            $scope.schirmer_od = vm.ocularValues.schirmer_od;
            $scope.schirmer_os_tick = vm.ocularValues.schirmer_os_tick;
            $scope.schirmer_os = vm.ocularValues.schirmer_os;
            $scope.tx_plan = vm.ocularValues.tx_plan;
            $scope.conjunc_od_tick = vm.ocularValues.conjunc_od_tick;
            $scope.conjunc_od = vm.ocularValues.conjunc_od;
            $scope.conjunc_os_tick = vm.ocularValues.conjunc_os_tick;
            $scope.conjunc_os = vm.ocularValues.conjunc_os;
            $scope.glaucoma_od = vm.ocularValues.glaucoma_od;
            $scope.glaucoma_os = vm.ocularValues.glaucoma_os;
            $scope.catar_od = vm.ocularValues.catar_od;
            $scope.catar_os = vm.ocularValues.catar_os;
            $scope.diabe_ret_od = vm.ocularValues.diabe_ret_od;
            $scope.diabete_ret_os = vm.ocularValues.dIabete_ret_os;
            $scope.hpt_od_tick = vm.ocularValues.hpt_od_tick;
            $scope.hpt_od = vm.ocularValues.hpt_od;
            $scope.hpt_os_tick = vm.ocularValues.hpt_os_tick;
            $scope.hpt_os = vm.ocularValues.hpt_os;
            $scope.poster_od = vm.ocularValues.poster_od;
            $scope.poster_os = vm.ocularValues.poster_os;
            $scope.uveal_od_tick = vm.ocularValues.uveal_od_tick;
            $scope.uveal_os_tick = vm.ocularValues.uveal_os_tick;
            $scope.uveal_od = vm.ocularValues.uveal_od;
            $scope.uveal_os = vm.ocularValues.uveal_os;
            $scope.pthisis_od = vm.ocularValues.pthisis_od;
            $scope.pthsis_os = vm.ocularValues.pthsis_os;

            $scope.refractive_error_od_tick = vm.ocularValues.refractive_error_od_tick;
            $scope.refractive_error_os_tick = vm.ocularValues.refractive_error_os_tick;
            $scope.referror_od = vm.ocularValues.referror_od;
            $scope.referror_os = vm.ocularValues.referror_os;

            $scope.treatment_od_tick = vm.ocularValues.treatment_od_tick;
            $scope.treatment_os_tick = vm.ocularValues.treatment_os_tick;


            $scope.anterior_od_tick = vm.ocularValues.anterior_od_tick;
            $scope.anterior_os_tick = vm.ocularValues.anterior_os_tick;
            $scope.anterior_od_text = vm.ocularValues.anterior_od_text;
            $scope.anterior_os_text = vm.ocularValues.anterior_os_text;
            $scope.tx_plan = vm.ocularValues.tx_plan;

            if ($scope.at_od_tick === true || $scope.at_od_tick === "true") { $scope.at_od_tick = "1"; } if ($scope.at_od_tick === false || $scope.at_od_tick === undefined) { $scope.at_od_tick = "0"; }
            if ($scope.at_os_tick === true || $scope.at_os_tick === "true") { $scope.at_os_tick = "1"; } if ($scope.at_os_tick === false || $scope.at_os_tick === undefined) { $scope.at_os_tick = "0"; }
            if ($scope.gonioscopy_od_tick === true || $scope.gonioscopy_od_tick === "true") { $scope.gonioscopy_od_tick = "1"; } if ($scope.gonioscopy_od_tick === false || $scope.gonioscopy_od_tick === undefined) { $scope.gonioscopy_od_tick = "0"; }
            if ($scope.gonioscopy_os_tick === true || $scope.gonioscopy_os_tick === "true") { $scope.gonioscopy_os_tick = "1"; } if ($scope.gonioscopy_os_tick === false || $scope.gonioscopy_os_tick === undefined) { $scope.gonioscopy_os_tick = "0"; }
            if ($scope.anterior_segment_tick === true || $scope.anterior_segment_tick === "true") { $scope.anterior_segment_tick = "1"; } if ($scope.anterior_segment_tick === false || $scope.anterior_segment_tick === undefined) { $scope.anterior_segment_tick = "0"; }
            if ($scope.ct_od_tick === true || $scope.ct_od_tick === "true") { $scope.ct_od_tick = "1"; } if ($scope.ct_od_tick === false || $scope.ct_od_tick === undefined) { $scope.ct_od_tick = "0"; }
            if ($scope.ct_os_tick === true || $scope.ct_os_tick === "true") { $scope.ct_os_tick = "1"; } if ($scope.ct_os_tick === false || $scope.ct_os_tick === undefined) { $scope.ct_os_tick = "0"; }
            if ($scope.ct_erpretation_od_tick === true || $scope.ct_erpretation_od_tick === "true") { $scope.ct_erpretation_od_tick = "1"; } if ($scope.ct_erpretation_od_tick === false || $scope.ct_erpretation_od_tick === undefined) { $scope.ct_erpretation_od_tick = "0"; }
            if ($scope.ct_erpretation_os_tick === true || $scope.ct_erpretation_os_tick === "true") { $scope.ct_erpretation_os_tick = "1"; } if ($scope.ct_erpretation_os_tick === false || $scope.ct_erpretation_os_tick === undefined) { $scope.ct_erpretation_os_tick = "0"; }
            if ($scope.ascan_od_tick === true || $scope.ascan_od_tick === "true") { $scope.ascan_od_tick = "1"; } if ($scope.ascan_od_tick === false || $scope.ascan_od_tick === undefined) { $scope.ascan_od_tick = "0"; }
            if ($scope.ascan_os_tick === true || $scope.ascan_os_tick === "true") { $scope.ascan_os_tick = "1"; } if ($scope.ascan_os_tick === false || $scope.ascan_os_tick === undefined) { $scope.ascan_os_tick = "0"; }
            if ($scope.ascan_erpretation_od_tick === true || $scope.ascan_erpretation_od_tick === "true") { $scope.ascan_erpretation_od_tick = "1"; } if ($scope.ascan_erpretation_od_tick === false || $scope.ascan_erpretation_od_tick === undefined) { $scope.ascan_erpretation_od_tick = "0"; }
            if ($scope.ascan_erpretation_os_tick === true || $scope.ascan_erpretation_os_tick === "true") { $scope.ascan_erpretation_os_tick = "1"; } if ($scope.ascan_erpretation_os_tick === false || $scope.ascan_erpretation_os_tick === undefined) { $scope.ascan_erpretation_os_tick = "0"; }
            if ($scope.anterioroct_od_tick === true || $scope.anterioroct_od_tick === "true") { $scope.anterioroct_od_tick = "1"; } if ($scope.anterioroct_od_tick === false || $scope.anterioroct_od_tick === undefined) { $scope.anterioroct_od_tick = "0"; }
            if ($scope.anterioroct_os_tick === true || $scope.anterioroct_os_tick === "true") { $scope.anterioroct_os_tick = "1"; } if ($scope.anterioroct_os_tick === false || $scope.anterioroct_os_tick === undefined) { $scope.anterioroct_os_tick = "0"; }
            if ($scope.anterioroct_erpretation_od_tick === true || $scope.anterioroct_erpretation_od_tick === "true") { $scope.anterioroct_erpretation_od_tick = "1"; } if ($scope.anterioroct_erpretation_od_tick === false || $scope.anterioroct_erpretation_od_tick === undefined) { $scope.anterioroct_erpretation_od_tick = "0"; }
            if ($scope.anterioroct_erpretation_os_tick === true || $scope.anterioroct_erpretation_os_tick === "true") { $scope.anterioroct_erpretation_os_tick = "1"; } if ($scope.anterioroct_erpretation_os_tick === false || $scope.anterioroct_erpretation_os_tick === undefined) { $scope.anterioroct_erpretation_os_tick = "0"; }
            if ($scope.posterior_segment_tick === true || $scope.posterior_segment_tick === "true") { $scope.posterior_segment_tick = "1"; } if ($scope.posterior_segment_tick === false || $scope.posterior_segment_tick === undefined) { $scope.posterior_segment_tick = "0"; }
            if ($scope.bscan_od_tick === true || $scope.bscan_od_tick === "true") { $scope.bscan_od_tick = "1"; } if ($scope.bscan_od_tick === false || $scope.bscan_od_tick === undefined) { $scope.bscan_od_tick = "0"; }
            if ($scope.bscan_os_tick === true || $scope.bscan_os_tick === "true") { $scope.bscan_os_tick = "1"; } if ($scope.bscan_os_tick === false || $scope.bscan_os_tick === undefined) { $scope.bscan_os_tick = "0"; }
            if ($scope.bscan_erpretation_od_tick === true || $scope.bscan_erpretation_od_tick === "true") { $scope.bscan_erpretation_od_tick = "1"; } if ($scope.bscan_erpretation_od_tick === false || $scope.bscan_erpretation_od_tick === undefined) { $scope.bscan_erpretation_od_tick = "0"; }
            if ($scope.bscan_erpretation_os_tick === true || $scope.bscan_erpretation_os_tick === "true") { $scope.bscan_erpretation_os_tick = "1"; } if ($scope.bscan_erpretation_os_tick === false || $scope.bscan_erpretation_os_tick === undefined) { $scope.bscan_erpretation_os_tick = "0"; }
            if ($scope.fundus_od_tick === true || $scope.fundus_od_tick === "true") { $scope.fundus_od_tick = "1"; } if ($scope.fundus_od_tick === false || $scope.fundus_od_tick === undefined) { $scope.fundus_od_tick = "0"; }
            if ($scope.fundus_os_tick === true || $scope.fundus_os_tick === "true") { $scope.fundus_os_tick = "1"; } if ($scope.fundus_os_tick === false || $scope.fundus_os_tick === undefined) { $scope.fundus_os_tick = "0"; }
            if ($scope.funudus_erpretation_od_tick === true || $scope.funudus_erpretation_od_tick === "true") { $scope.funudus_erpretation_od_tick = "1"; } if ($scope.funudus_erpretation_od_tick === false || $scope.funudus_erpretation_od_tick === undefined) { $scope.funudus_erpretation_od_tick = "0"; }
            if ($scope.funudus_erpretation_os_tick === true || $scope.funudus_erpretation_os_tick === "true") { $scope.funudus_erpretation_os_tick = "1"; } if ($scope.funudus_erpretation_os_tick === false || $scope.funudus_erpretation_os_tick === undefined) { $scope.funudus_erpretation_os_tick = "0"; }
            if ($scope.disc_od_tick === true || $scope.disc_od_tick === "true") { $scope.disc_od_tick = "1"; } if ($scope.disc_od_tick === false || $scope.disc_od_tick === undefined) { $scope.disc_od_tick = "0"; }
            if ($scope.disc_os_tick === true || $scope.disc_os_tick === "true") { $scope.disc_os_tick = "1"; } if ($scope.disc_os_tick === false || $scope.disc_os_tick === undefined) { $scope.disc_os_tick = "0"; }
            if ($scope.disc_erpretation_od_tick === true || $scope.disc_erpretation_od_tick === "true") { $scope.disc_erpretation_od_tick = "1"; } if ($scope.disc_erpretation_od_tick === false || $scope.disc_erpretation_od_tick === undefined) { $scope.disc_erpretation_od_tick = "0"; }
            if ($scope.disc_erpretation_os_tick === true || $scope.disc_erpretation_os_tick === "true") { $scope.disc_erpretation_os_tick = "1"; } if ($scope.disc_erpretation_os_tick === false || $scope.disc_erpretation_os_tick === undefined) { $scope.disc_erpretation_os_tick = "0"; }
            if ($scope.fdp_od_tick === true || $scope.fdp_od_tick === "true") { $scope.fdp_od_tick = "1"; } if ($scope.fdp_od_tick === false || $scope.fdp_od_tick === undefined) { $scope.fdp_od_tick = "0"; }
            if ($scope.fdp_os_tick === true || $scope.fdp_os_tick === "true") { $scope.fdp_os_tick = "1"; } if ($scope.fdp_os_tick === false || $scope.fdp_os_tick === undefined) { $scope.fdp_os_tick = "0"; }
            if ($scope.fdp_erpretation_od_tick === true || $scope.fdp_erpretation_od_tick === "true") { $scope.fdp_erpretation_od_tick = "1"; } if ($scope.fdp_erpretation_od_tick === false || $scope.fdp_erpretation_od_tick === undefined) { $scope.fdp_erpretation_od_tick = "0"; }
            if ($scope.fdp_erpretation_os_tick === true || $scope.fdp_erpretation_os_tick === "true") { $scope.fdp_erpretation_os_tick = "1"; } if ($scope.fdp_erpretation_os_tick === false || $scope.fdp_erpretation_os_tick === undefined) { $scope.fdp_erpretation_os_tick = "0"; }
            if ($scope.post_od_tick === true || $scope.post_od_tick === "true") { $scope.post_od_tick = "1"; } if ($scope.post_od_tick === false || $scope.post_od_tick === undefined) { $scope.post_od_tick = "0"; }
            if ($scope.post_os_tick === true || $scope.post_os_tick === "true") { $scope.post_os_tick = "1"; } if ($scope.post_os_tick === false || $scope.post_os_tick === undefined) { $scope.post_os_tick = "0"; }
            if ($scope.post_erpretation_od_tick === true || $scope.post_erpretation_od_tick === "true") { $scope.post_erpretation_od_tick = "1"; } if ($scope.post_erpretation_od_tick === false || $scope.post_erpretation_od_tick === undefined) { $scope.post_erpretation_od_tick = "0"; }
            if ($scope.post_erpretation_os_tick === true || $scope.post_erpretation_os_tick === "true") { $scope.post_erpretation_os_tick = "1"; } if ($scope.post_erpretation_os_tick === false || $scope.post_erpretation_os_tick === undefined) { $scope.post_erpretation_os_tick = "0"; }
            // if ($scope.treatment_od_tick === true || $scope.treatment_od_tick === "true") { $scope.treatment_od_tick = "1"; } if ($scope.treatment_od_tick === false || $scope.treatment_od_tick === undefined) { $scope.treatment_od_tick = "0"; }
            // if ($scope.treatment_os_tick === true || $scope.treatment_os_tick === "true") { $scope.treatment_os_tick = "1"; } if ($scope.treatment_os_tick === false || $scope.treatment_os_tick === undefined) { $scope.treatment_os_tick = "0"; }


        }

        vm.deleteRecord = function () {
            if (confirm('Are you sure you want to delete this record?')) {
                var userId = TokenService.getUserId();

                var mrdPayload = {
                    mrdno: vm.userMrd,
                };
                var token = localStorage.getItem('access_token');
                $http.post(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationDetail/delete',
                    mrdPayload, { headers: { Authorization: 'Bearer ' + token } })

                    .then(function (result) {
                        // console.log(result.data);
                        vm.notification = { mode: 'success', message: 'MRD report deleted' };
                        vm.fetchUserSummary();

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

        vm.fetchRefererList = function () {
            var token = localStorage.getItem('access_token');


            $http.get(UrlConfig.labReportBaseUrl() + 'api/referer/0', //selectedReferer
                { headers: { Authorization: 'Bearer ' + token } }) //sp_id=101&dep=a
                .then(function (result) {
                    vm.refererList = result.data;
                    if (vm.refererList.length === "1") {
                        vm.refererSelectList = result.data[0];
                        // vm.onRefererSelected = function () {
                        // vm.selectedReferer = vm.refererList[0].referer;
                        vm.selectedReferer = vm.refererSelectList;
                        vm.selectedReferer.referer = vm.refererSelectList.referer;
                        // }; 
                    }
                    // console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });

        };

        // PRINT

        vm.fetchPrintVisionList = function () {
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
                    //     console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
            vm.noalert();

        };


        vm.fetchPrintOcularList = function () {
            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();

            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularInvestigationAll?mrdno=' + $scope.mrdnum,
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

        vm.getBiometry = function () {
            $scope.loadtrue = true;

            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();


            $http.get(UrlConfig.labReportBaseUrl() + 'api/CsiAll?mrdno=' + $scope.mrdnum,
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



        vm.toDash = function () {
            window.open('#!/dashboard?mrdno=' + $scope.mrdnum,
                '_self', '');
        }

        vm.PrintRecord = function () {
            vm.getBiometry()
            if (window.confirm("Do you want to include Biometry?")) {
                vm.biometryPrint = true;

            } else {
                vm.biometryPrint = false;
            }
            $scope.loading = true;
            $timeout(printData, 4000);
        }

        function printData() {
            $scope.loading = false;

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
                ' #sameline,#sameline1{display:inline;}' +
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

       

        vm.Export = function () {
            $("#reporttable").table2excel({
                filename: vm.pagetitle + "_" + vm.initFiltered + "To " + vm.finalFiltered + ".xls"
            });
        }

        vm.noalert = function () {
            $timeout(vm.resetNotification, 4000);
        }
        vm.reload = function () {
            $timeout(vm.reloadfn, 3000);
        };

        vm.reloadfn = function () {
            window.open('#!/dashboard', '_self', '');
        }
        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };


    }
]);