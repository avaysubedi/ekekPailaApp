app.controller('OcularExaminationController', ['$http', 'UrlConfig', 'TokenService', 'DateService',
    '$scope', '$filter', '$timeout', 'BroadcastService', '$routeParams','$anchorScroll',
    function ($http, UrlConfig, TokenService, DateService, $scope, $filter, $timeout, 
        BroadcastService, $routeParams,$anchorScroll) {

        var vm = this;

        vm.pagetitle = "Ocular Examination";
        //vm.selectedTitle = null;
        //vm.selectedOpdBill = null;

        vm.init = function () {
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



        vm.submitOcularExaminationDetails = function () {

            if ($scope.showEdit === true) {
                vm.url = "api/OcularExaminationAll/Update"
            }
            else {
                vm.url = "api/OcularExaminationAll"
            }

            if ($scope.eom_od_tick === 1 || $scope.eom_od_tick === "1") { $scope.eom_od_tick = true; } if ($scope.eom_od_tick === "0" || $scope.eom_od_tick === 0) { $scope.eom_od_tick = false; }
            if ($scope.eom_os_tick === 1 || $scope.eom_os_tick === "1") { $scope.eom_os_tick = true; } if ($scope.eom_os_tick === "0" || $scope.eom_os_tick === 0) { $scope.eom_os_tick = false; }
            if ($scope.lid_od_tick === 1 || $scope.lid_od_tick === "1") { $scope.lid_od_tick = true; } if ($scope.lid_od_tick === "0" || $scope.lid_od_tick === 0) { $scope.lid_od_tick = false; }
            if ($scope.lid_os_tick === 1 || $scope.lid_os_tick === "1") { $scope.lid_os_tick = true; } if ($scope.lid_os_tick === "0" || $scope.lid_os_tick === 0) { $scope.lid_os_tick = false; }
            if ($scope.conjunct_od_tick === 1 || $scope.conjunct_od_tick === "1") { $scope.conjunct_od_tick = true; } if ($scope.conjunct_od_tick === "0" || $scope.conjunct_od_tick === 0) { $scope.conjunct_od_tick = false; }
            if ($scope.conjunct_os_tick === 1 || $scope.conjunct_os_tick === "1") { $scope.conjunct_os_tick = true; } if ($scope.conjunct_os_tick === "0" || $scope.conjunct_os_tick === 0) { $scope.conjunct_os_tick = false; }
            if ($scope.sclera_od_tick === 1 || $scope.sclera_od_tick === "1") { $scope.sclera_od_tick = true; } if ($scope.sclera_od_tick === "0" || $scope.sclera_od_tick === 0) { $scope.sclera_od_tick = false; }
            if ($scope.sclera_os_tick === 1 || $scope.sclera_os_tick === "1") { $scope.sclera_os_tick = true; } if ($scope.sclera_os_tick === "0" || $scope.sclera_os_tick === 0) { $scope.sclera_os_tick = false; }
            if ($scope.cornea_od_tick === 1 || $scope.cornea_od_tick === "1") { $scope.cornea_od_tick = true; } if ($scope.cornea_od_tick === "0" || $scope.cornea_od_tick === 0) { $scope.cornea_od_tick = false; }
            if ($scope.cornea_os_tick === 1 || $scope.cornea_os_tick === "1") { $scope.cornea_os_tick = true; } if ($scope.cornea_os_tick === "0" || $scope.cornea_os_tick === 0) { $scope.cornea_os_tick = false; }
            if ($scope.anterchamb_od_tick === 1 || $scope.anterchamb_od_tick === "1") { $scope.anterchamb_od_tick = true; } if ($scope.anterchamb_od_tick === "0" || $scope.anterchamb_od_tick === 0) { $scope.anterchamb_od_tick = false; }
            if ($scope.anterchamb_os_tick === 1 || $scope.anterchamb_os_tick === "1") { $scope.anterchamb_os_tick = true; } if ($scope.anterchamb_os_tick === "0" || $scope.anterchamb_os_tick === 0) { $scope.anterchamb_os_tick = false; }
            if ($scope.iris_od_tick === 1 || $scope.iris_od_tick === "1") { $scope.iris_od_tick = true; } if ($scope.iris_od_tick === "0" || $scope.iris_od_tick === 0) { $scope.iris_od_tick = false; }
            if ($scope.iris_os_tick === 1 || $scope.iris_os_tick === "1") { $scope.iris_os_tick = true; } if ($scope.iris_os_tick === "0" || $scope.iris_os_tick === 0) { $scope.iris_os_tick = false; }
            if ($scope.pupil_od_tick === 1 || $scope.pupil_od_tick === "1") { $scope.pupil_od_tick = true; } if ($scope.pupil_od_tick === "0" || $scope.pupil_od_tick === 0) { $scope.pupil_od_tick = false; }
            if ($scope.pupil_os_tick === 1 || $scope.pupil_os_tick === "1") { $scope.pupil_os_tick = true; } if ($scope.pupil_os_tick === "0" || $scope.pupil_os_tick === 0) { $scope.pupil_os_tick = false; }
            if ($scope.pupil_rti_od_tick === 1 || $scope.pupil_rti_od_tick === "1") { $scope.pupil_rti_od_tick = true; } if ($scope.pupil_rti_od_tick === "0" || $scope.pupil_rti_od_tick === 0) { $scope.pupil_rti_od_tick = false; }
            if ($scope.pupil_rti_os_tick === 1 || $scope.pupil_rti_os_tick === "1") { $scope.pupil_rti_os_tick = true; } if ($scope.pupil_rti_os_tick === "0" || $scope.pupil_rti_os_tick === 0) { $scope.pupil_rti_os_tick = false; }
            if ($scope.caps_od_tick === 1 || $scope.caps_od_tick === "1") { $scope.caps_od_tick = true; } if ($scope.caps_od_tick === "0" || $scope.caps_od_tick === 0) { $scope.caps_od_tick = false; }
            if ($scope.caps_os_tick === 1 || $scope.caps_os_tick === "1") { $scope.caps_os_tick = true; } if ($scope.caps_os_tick === "0" || $scope.caps_os_tick === 0) { $scope.caps_os_tick = false; }




            var userId = TokenService.getUserId();
            var visionAndRefractionPayload = {
                mrdno: $scope.mrdnum,
                ddate: $filter("date")(new Date(), "yyyy/MM/dd"),
                hospid: $scope.hospitalid,
                proptosis_od_tick: $scope.proptosis_od_tick,
                proptosis_os_tick: $scope.proptosis_os_tick,
                eom_od_tick: $scope.eom_od_tick,
                eom_od: $scope.eom_od,
                eom_os_tick: $scope.eom_os_tick,
                eom_os: $scope.eom_os,
                lid_od_tick: $scope.lid_od_tick,
                lid_dermato_od_tick: $scope.lid_dermato_od_tick,
                lid_xanthelasma_od_tick: $scope.lid_xanthelasma_od_tick,
                lid_pbt_od_tick: $scope.lid_pbt_od_tick,
                lid_ptosis_od_tick: $scope.lid_ptosis_od_tick,
                lid_entropion_od_tick: $scope.lid_entropion_od_tick,
                lid_ectropion_od_tick: $scope.lid_ectropion_od_tick,
                lid_chalazion_od_tick: $scope.lid_chalazion_od_tick,
                lid_stye_od_tick: $scope.lid_stye_od_tick,
                lid_abscess_od_tick: $scope.lid_abscess_od_tick,
                lid_laceration_od_tick: $scope.lid_laceration_od_tick,
                lid_others_od_tick: $scope.lid_others_od_tick,
                lid_others_od: $scope.lid_others_od,
                lid_os_tick: $scope.lid_os_tick,
                lid_dermato_os_tick: $scope.lid_dermato_os_tick,
                lid_xanthelasma_os_tick: $scope.lid_xanthelasma_os_tick,
                lid_pbt_os_tick: $scope.lid_pbt_os_tick,
                lid_ptosis_os_tick: $scope.lid_ptosis_os_tick,
                lid_entropion_os_tick: $scope.lid_entropion_os_tick,
                lid_ectropion_os_tick: $scope.lid_ectropion_os_tick,
                lid_chalazion_os_tick: $scope.lid_chalazion_os_tick,
                lid_stye_os_tick: $scope.lid_stye_os_tick,
                lid_abscess_os_tick: $scope.lid_abscess_os_tick,
                lid_laceration_os_tick: $scope.lid_laceration_os_tick,
                lid_others_os_tick: $scope.lid_others_os_tick,
                lid_others_os: $scope.lid_others_os,
                conjunct_od_tick: $scope.conjunct_od_tick,
                conjunct_congestion_od_tick: $scope.conjunct_congestion_od_tick,
                conjunct_nevus_od_tick: $scope.conjunct_nevus_od_tick,
                conjunct_bleb_od_tick: $scope.conjunct_bleb_od_tick,
                conjunct_laceration_od_tick: $scope.conjunct_laceration_od_tick,
                conjunct_deposteroid_od_tick: $scope.conjunct_deposteroid_od_tick,
                conjunct_ptery_od_tick: $scope.conjunct_ptery_od_tick,
                conjunct_ping_od_tick: $scope.conjunct_ping_od_tick,
                conjunct_others_od_tick: $scope.conjunct_others_od_tick,
                conjunct_others_od: $scope.conjunct_others_od,
                conjunct_os_tick: $scope.conjunct_os_tick,
                conjunct_congestion_os_tick: $scope.conjunct_congestion_os_tick,
                conjunct_nevus_os_tick: $scope.conjunct_nevus_os_tick,
                conjunct_bleb_os_tick: $scope.conjunct_bleb_os_tick,
                conjunct_laceration_os_tick: $scope.conjunct_laceration_os_tick,
                conjunct_deposteroid_os_tick: $scope.conjunct_deposteroid_os_tick,
                conjunct_ptery_os_tick: $scope.conjunct_ptery_os_tick,
                conjunct_ping_os_tick: $scope.conjunct_ping_os_tick,
                conjunct_others_os_tick: $scope.conjunct_others_os_tick,
                conjunct_others_os: $scope.conjunct_others_os,
                sclera_od_tick: $scope.sclera_od_tick,
                sclera_staphy_od_tick: $scope.sclera_staphy_od_tick,
                sclera_ict_od_tick: $scope.sclera_ict_od_tick,
                sclera_thinning_od_tick: $scope.sclera_thinning_od_tick,
                sclera_melting_od_tick: $scope.sclera_melting_od_tick,
                sclera_lacerat_od_tick: $scope.sclera_lacerat_od_tick,
                sclera_others_od_tick: $scope.sclera_others_od_tick,
                sclera_others_od: $scope.sclera_others_od,
                sclera_os_tick: $scope.sclera_os_tick,
                sclera_staphy_os_tick: $scope.sclera_staphy_os_tick,
                sclera_ict_os_tick: $scope.sclera_ict_os_tick,
                sclera_thinning_os_tick: $scope.sclera_thinning_os_tick,
                sclera_melting_os_tick: $scope.sclera_melting_os_tick,
                sclera_lacerat_os_tick: $scope.sclera_lacerat_os_tick,
                sclera_others_os_tick: $scope.sclera_others_os_tick,
                sclera_others_os: $scope.sclera_others_os,
                cornea_od_tick: $scope.cornea_od_tick,
                cornea_staphy_od_tick: $scope.cornea_staphy_od_tick,
                cornea_ict_od_tick: $scope.cornea_ict_od_tick,
                cornea_thinning_od_tick: $scope.cornea_thinning_od_tick,
                cornea_melting_od_tick: $scope.cornea_melting_od_tick,
                cornea_lacerat_od_tick: $scope.cornea_lacerat_od_tick,
                cornea_others_od_tick: $scope.cornea_others_od_tick,
                cornea_others_od: $scope.cornea_others_od,
                cornea_os_tick: $scope.cornea_os_tick,
                cornea_staphy_os_tick: $scope.cornea_staphy_os_tick,
                cornea_ict_os_tick: $scope.cornea_ict_os_tick,
                cornea_thinning_os_tick: $scope.cornea_thinning_os_tick,
                cornea_melting_os_tick: $scope.cornea_melting_os_tick,
                cornea_lacerat_os_tick: $scope.cornea_lacerat_os_tick,
                cornea_others_os_tick: $scope.cornea_others_os_tick,
                cornea_others_os: $scope.cornea_others_os,
                anterchamb_od_tick: $scope.anterchamb_od_tick,
                anterchamb_mh_od_tick: $scope.anterchamb_mh_od_tick,
                anterchamb_pc_od_tick: $scope.anterchamb_pc_od_tick,
                anterchamb_nf_od_tick: $scope.anterchamb_nf_od_tick,
                anterchamb_others_od_tick: $scope.anterchamb_others_od_tick,
                anterchamb_others_od: $scope.anterchamb_others_od,
                anterchamb_os_tick: $scope.anterchamb_os_tick,
                anterchamb_mh_os_tick: $scope.anterchamb_mh_os_tick,
                anterchamb_pc_os_tick: $scope.anterchamb_pc_os_tick,
                anterchamb_nf_os_tick: $scope.anterchamb_nf_os_tick,
                anterchamb_others_os_tick: $scope.anterchamb_others_os_tick,
                anterchamb_others_os: $scope.anterchamb_others_os,
                iris_od_tick: $scope.iris_od_tick,
                iris_hetero_od_tick: $scope.iris_hetero_od_tick,
                iris_atrophy_od_tick: $scope.iris_atrophy_od_tick,
                iris_nevus_od_tick: $scope.iris_nevus_od_tick,
                iris_sid_od_tick: $scope.iris_sid_od_tick,
                iris_anirid_od_tick: $scope.iris_anirid_od_tick,
                iris_others_od_tick: $scope.iris_others_od_tick,
                iris_others_od: $scope.iris_others_od,
                iris_os_tick: $scope.iris_os_tick,
                iris_hetero_os_tick: $scope.iris_hetero_os_tick,
                iris_atrophy_os_tick: $scope.iris_atrophy_os_tick,
                iris_nevus_os_tick: $scope.iris_nevus_os_tick,
                iris_sid_os_tick: $scope.iris_sid_os_tick,
                iris_anirid_os_tick: $scope.iris_anirid_os_tick,
                iris_others_os_tick: $scope.iris_others_os_tick,
                iris_others_os: $scope.iris_others_os,
                pupil_od_tick: $scope.pupil_od_tick,
                pupil_corecto_od_tick: $scope.pupil_corecto_od_tick,
                pupil_polyco_od_tick: $scope.pupil_polyco_od_tick,
                pupil_ppm_od_tick: $scope.pupil_ppm_od_tick,
                pupil_ppi_od_tick: $scope.pupil_ppi_od_tick,
                pupil_dsp_od_tick: $scope.pupil_dsp_od_tick,
                pupil_others_od_tick: $scope.pupil_others_od_tick,
                pupil_others_od: $scope.pupil_others_od,
                pupil_os_tick: $scope.pupil_os_tick,
                pupil_corecto_os_tick: $scope.pupil_corecto_os_tick,
                pupil_polyco_os_tick: $scope.pupil_polyco_os_tick,
                pupil_ppm_os_tick: $scope.pupil_ppm_os_tick,
                pupil_ppi_os_tick: $scope.pupil_ppi_os_tick,
                pupil_dsp_os_tick: $scope.pupil_dsp_os_tick,
                pupil_others_os_tick: $scope.pupil_others_os_tick,
                pupil_others_os: $scope.pupil_others_os,
                pupil_rti_od_tick: $scope.pupil_rti_od_tick,
                pupil_rti_rapd_od_tick: $scope.pupil_rti_rapd_od_tick,
                pupil_rti_slugreact_od_tick: $scope.pupil_rti_slugreact_od_tick,
                pupil_rti_hippus_od_tick: $scope.pupil_rti_hippus_od_tick,
                pupil_rti_aap_od_tick: $scope.pupil_rti_aap_od_tick,
                pupil_rti_apd_od_tick: $scope.pupil_rti_apd_od_tick,
                pupil_rti_others_od_tick: $scope.pupil_rti_others_od_tick,
                pupil_rti_others_od: $scope.pupil_rti_others_od,
                pupil_rti_os_tick: $scope.pupil_rti_os_tick,
                pupil_rti_rapd_os_tick: $scope.pupil_rti_rapd_os_tick,
                pupil_rti_slugreact_os_tick: $scope.pupil_rti_slugreact_os_tick,
                pupil_rti_hippus_os_tick: $scope.pupil_rti_hippus_os_tick,
                pupil_rti_aap_os_tick: $scope.pupil_rti_aap_os_tick,
                pupil_rti_apd_os_tick: $scope.pupil_rti_apd_os_tick,
                pupil_rti_others_os_tick: $scope.pupil_rti_others_os_tick,
                pupil_rti_others_os: $scope.pupil_rti_others_os,
                lens_phakic_od_tick: $scope.lens_phakic_od_tick,
                lens_pseuphakic_od_tick: $scope.lens_pseuphakic_od_tick,
                lens_aphakic_od_tick: $scope.lens_aphakic_od_tick,
                lens_phakic_os_tick: $scope.lens_phakic_os_tick,
                lens_pseuphakic_os_tick: $scope.lens_pseuphakic_os_tick,
                lens_aphakic_os_tick: $scope.lens_aphakic_os_tick,
                caps_od_tick: $scope.caps_od_tick,
                caps_pseudo_od_tick: $scope.caps_pseudo_od_tick,
                caps_pco_od_tick: $scope.caps_pco_od_tick,
                caps_others_od_tick: $scope.caps_others_od_tick,
                caps_others_od: $scope.caps_others_od,
                caps_os_tick: $scope.caps_os_tick,
                caps_pseudo_os_tick: $scope.caps_pseudo_os_tick,
                caps_pco_os_tick: $scope.caps_pco_os_tick,
                caps_others_os_tick: $scope.caps_others_os_tick,
                caps_others_os: $scope.caps_others_os,
                pos_phacod_od_tick: $scope.pos_phacod_od_tick,
                pos_sublux_od_tick: $scope.pos_sublux_od_tick,
                pos_disloc_od_tick: $scope.pos_disloc_od_tick,
                pos_none_od_tick: $scope.pos_none_od_tick,
                pos_phacod_os_tick: $scope.pos_phacod_os_tick,
                pos_sublux_os_tick: $scope.pos_sublux_os_tick,
                pos_disloc_os_tick: $scope.pos_disloc_os_tick,
                pos_none_os_tick: $scope.pos_none_os_tick,
                cataract_tick: $scope.cataract_tick,
                nucopal_n0_od_tick: $scope.nucopal_n0_od_tick,
                nucopal_n1_od_tick: $scope.nucopal_n1_od_tick,
                nucopal_n2_od_tick: $scope.nucopal_n2_od_tick,
                nucopal_n3_od_tick: $scope.nucopal_n3_od_tick,
                nucopal_n4_od_tick: $scope.nucopal_n4_od_tick,
                nucopal_notgrade_od_tick: $scope.nucopal_notgrade_od_tick,
                nucopal_n0_os_tick: $scope.nucopal_n0_os_tick,
                nucopal_n1_os_tick: $scope.nucopal_n1_os_tick,
                nucopal_n2_os_tick: $scope.nucopal_n2_os_tick,
                nucopal_n3_os_tick: $scope.nucopal_n3_os_tick,
                nucopal_n4_os_tick: $scope.nucopal_n4_os_tick,
                nucopal_notgrade_os_tick: $scope.nucopal_notgrade_os_tick,
                cortical_c0_od_tick: $scope.cortical_c0_od_tick,
                cortical_ctr_od_tick: $scope.cortical_ctr_od_tick,
                cortical_c1_od_tick: $scope.cortical_c1_od_tick,
                cortical_c2_od_tick: $scope.cortical_c2_od_tick,
                cortical_c3_od_tick: $scope.cortical_c3_od_tick,
                cortical_c4_od_tick: $scope.cortical_c4_od_tick,
                cortical_c5_od_tick: $scope.cortical_c5_od_tick,
                cortical_notgrade_od_tick: $scope.cortical_notgrade_od_tick,
                cortical_c0_os_tick: $scope.cortical_c0_os_tick,
                cortical_ctr_os_tick: $scope.cortical_ctr_os_tick,
                cortical_c1_os_tick: $scope.cortical_c1_os_tick,
                cortical_c2_os_tick: $scope.cortical_c2_os_tick,
                cortical_c3_os_tick: $scope.cortical_c3_os_tick,
                cortical_c4_os_tick: $scope.cortical_c4_os_tick,
                cortical_c5_os_tick: $scope.cortical_c5_os_tick,
                cortical_notgrade_os_tick: $scope.cortical_notgrade_os_tick,
                psc_p0_od_tick: $scope.psc_p0_od_tick,
                psc_p1_od_tick: $scope.psc_p1_od_tick,
                psc_p2_od_tick: $scope.psc_p2_od_tick,
                psc_p3_od_tick: $scope.psc_p3_od_tick,
                psc_p4_od_tick: $scope.psc_p4_od_tick,
                psc_notgrade_od_tick: $scope.psc_notgrade_od_tick,
                psc_p0_os_tick: $scope.psc_p0_os_tick,
                psc_p1_os_tick: $scope.psc_p1_os_tick,
                psc_p2_os_tick: $scope.psc_p2_os_tick,
                psc_p3_os_tick: $scope.psc_p3_os_tick,
                psc_p4_os_tick: $scope.psc_p4_os_tick,
                psc_notgrade_os_tick: $scope.psc_notgrade_os_tick,
                maturecat_od_tick: $scope.maturecat_od_tick,
                maturecat_os_tick: $scope.maturecat_os_tick,
                compact_od_tick: $scope.compact_od_tick,
                compact_os_tick: $scope.compact_os_tick,
                vitreous_od_tick: $scope.vitreous_od_tick,
                vitreous_pvd_od_tick: $scope.vitreous_pvd_od_tick,
                vitreous_vh_od_tick: $scope.vitreous_vh_od_tick,
                vitreous_oparities_od_tick: $scope.vitreous_oparities_od_tick,
                vitreous_other_od_tick: $scope.vitreous_other_od_tick,
                vitreous_other_od: $scope.vitreous_other_od,
                vitreous_os_tick: $scope.vitreous_os_tick,
                vitreous_pvd_os_tick: $scope.vitreous_pvd_os_tick,
                vitreous_vh_os_tick: $scope.vitreous_vh_os_tick,
                vitreous_oparities_os_tick: $scope.vitreous_oparities_os_tick,
                vitreous_other_os_tick: $scope.vitreous_other_os_tick,
                vitreous_other_os: $scope.vitreous_other_os,
                vitreous_remarks_od: $scope.vitreous_remarks_od,
                vitreous_remarks_os: $scope.vitreous_remarks_os,
                retina_od_tick: $scope.retina_od_tick,
                retina_os_tick: $scope.retina_os_tick,
                retina_od: $scope.retina_od,
                retina_os: $scope.retina_os,
                disc_od_tick: $scope.disc_od_tick,
                disc_os_tick: $scope.disc_os_tick,
                disc_od: $scope.disc_od,
                disc_os: $scope.disc_os,
                cdr_od_tick: $scope.cdr_od_tick,
                cdr_od: $scope.cdr_od,
                cdr_os_tick: $scope.cdr_os_tick,
                cdr_os: $scope.cdr_os,
                macula_od_tick: $scope.macula_od_tick,
                macula_erm_od_tick: $scope.macula_erm_od_tick,
                macula_hole_od_tick: $scope.macula_hole_od_tick,
                macula_hemorage_od_tick: $scope.macula_hemorage_od_tick,
                macula_edema_od_tick: $scope.macula_edema_od_tick,
                macula_other_od_tick: $scope.macula_other_od_tick,
                macula_other_od: $scope.macula_other_od,
                macula_os_tick: $scope.macula_os_tick,
                macula_erm_os_tick: $scope.macula_erm_os_tick,
                macula_hole_os_tick: $scope.macula_hole_os_tick,
                macula_hemorage_os_tick: $scope.macula_hemorage_os_tick,
                macula_edema_os_tick: $scope.macula_edema_os_tick,
                macula_other_os_tick: $scope.macula_other_os_tick,
                macula_other_os: $scope.macula_other_os,
                vessels_od_tick: $scope.vessels_od_tick,
                vessels_od: $scope.vessels_od,
                vessels_os_tick: $scope.vessels_os_tick,
                vessels_os: $scope.vessels_os,
                periphery_od_tick: $scope.periphery_od_tick,
                periphery_od: $scope.periphery_od,
                periphery_os_tick: $scope.periphery_os_tick,
                periphery_os: $scope.periphery_os

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

        vm.fetchUserSummary = function () {
            $scope.loadtrue = true;

            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();

            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularExaminationdetail?mrdno=' + $scope.mrdnum,
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


            $http.get(UrlConfig.labReportBaseUrl() + 'api/OcularExaminationAll?mrdno=' + $scope.mrdnum,
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

        vm.onReportSelected = function () {
            $scope.mdrno = vm.ocularValues.mrdno;
            $scope.showEdit = true;
            $scope.proptosis_od_tick = vm.ocularValues.proptosis_od_tick;
            $scope.proptosis_os_tick = vm.ocularValues.proptosis_os_tick;
            $scope.eom_od_tick = vm.ocularValues.eom_od_tick;
            $scope.eom_od = vm.ocularValues.eom_od;
            $scope.eom_os_tick = vm.ocularValues.eom_os_tick;
            $scope.eom_os = vm.ocularValues.eom_os;
            $scope.lid_od_tick = vm.ocularValues.lid_od_tick;
            $scope.lid_dermato_od_tick = vm.ocularValues.lid_dermato_od_tick;
            $scope.lid_xanthelasma_od_tick = vm.ocularValues.lid_xanthelasma_od_tick;
            $scope.lid_pbt_od_tick = vm.ocularValues.lid_pbt_od_tick;
            $scope.lid_ptosis_od_tick = vm.ocularValues.lid_ptosis_od_tick;
            $scope.lid_entropion_od_tick = vm.ocularValues.lid_entropion_od_tick;
            $scope.lid_ectropion_od_tick = vm.ocularValues.lid_ectropion_od_tick;
            $scope.lid_chalazion_od_tick = vm.ocularValues.lid_chalazion_od_tick;
            $scope.lid_stye_od_tick = vm.ocularValues.lid_stye_od_tick;
            $scope.lid_abscess_od_tick = vm.ocularValues.lid_abscess_od_tick;
            $scope.lid_laceration_od_tick = vm.ocularValues.lid_laceration_od_tick;
            $scope.lid_others_od_tick = vm.ocularValues.lid_others_od_tick;
            $scope.lid_others_od = vm.ocularValues.lid_others_od;
            $scope.lid_os_tick = vm.ocularValues.lid_os_tick;
            $scope.lid_dermato_os_tick = vm.ocularValues.lid_dermato_os_tick;
            $scope.lid_xanthelasma_os_tick = vm.ocularValues.lid_xanthelasma_os_tick;
            $scope.lid_pbt_os_tick = vm.ocularValues.lid_pbt_os_tick;
            $scope.lid_ptosis_os_tick = vm.ocularValues.lid_ptosis_os_tick;
            $scope.lid_entropion_os_tick = vm.ocularValues.lid_entropion_os_tick;
            $scope.lid_ectropion_os_tick = vm.ocularValues.lid_ectropion_os_tick;
            $scope.lid_chalazion_os_tick = vm.ocularValues.lid_chalazion_os_tick;
            $scope.lid_stye_os_tick = vm.ocularValues.lid_stye_os_tick;
            $scope.lid_abscess_os_tick = vm.ocularValues.lid_abscess_os_tick;
            $scope.lid_laceration_os_tick = vm.ocularValues.lid_laceration_os_tick;
            $scope.lid_others_os_tick = vm.ocularValues.lid_others_os_tick;
            $scope.lid_others_os = vm.ocularValues.lid_others_os;
            $scope.conjunct_od_tick = vm.ocularValues.conjunct_od_tick;
            $scope.conjunct_congestion_od_tick = vm.ocularValues.conjunct_congestion_od_tick;
            $scope.conjunct_nevus_od_tick = vm.ocularValues.conjunct_nevus_od_tick;
            $scope.conjunct_bleb_od_tick = vm.ocularValues.conjunct_bleb_od_tick;
            $scope.conjunct_laceration_od_tick = vm.ocularValues.conjunct_laceration_od_tick;
            $scope.conjunct_deposteroid_od_tick = vm.ocularValues.conjunct_deposteroid_od_tick;
            $scope.conjunct_ptery_od_tick = vm.ocularValues.conjunct_ptery_od_tick;
            $scope.conjunct_ping_od_tick = vm.ocularValues.conjunct_ping_od_tick;
            $scope.conjunct_others_od_tick = vm.ocularValues.conjunct_others_od_tick;
            $scope.conjunct_others_od = vm.ocularValues.conjunct_others_od;
            $scope.conjunct_os_tick = vm.ocularValues.conjunct_os_tick;
            $scope.conjunct_congestion_os_tick = vm.ocularValues.conjunct_congestion_os_tick;
            $scope.conjunct_nevus_os_tick = vm.ocularValues.conjunct_nevus_os_tick;
            $scope.conjunct_bleb_os_tick = vm.ocularValues.conjunct_bleb_os_tick;
            $scope.conjunct_laceration_os_tick = vm.ocularValues.conjunct_laceration_os_tick;
            $scope.conjunct_deposteroid_os_tick = vm.ocularValues.conjunct_deposteroid_os_tick;
            $scope.conjunct_ptery_os_tick = vm.ocularValues.conjunct_ptery_os_tick;
            $scope.conjunct_ping_os_tick = vm.ocularValues.conjunct_ping_os_tick;
            $scope.conjunct_others_os_tick = vm.ocularValues.conjunct_others_os_tick;
            $scope.conjunct_others_os = vm.ocularValues.conjunct_others_os;
            $scope.sclera_od_tick = vm.ocularValues.sclera_od_tick;
            $scope.sclera_staphy_od_tick = vm.ocularValues.sclera_staphy_od_tick;
            $scope.sclera_ict_od_tick = vm.ocularValues.sclera_ict_od_tick;
            $scope.sclera_thinning_od_tick = vm.ocularValues.sclera_thinning_od_tick;
            $scope.sclera_melting_od_tick = vm.ocularValues.sclera_melting_od_tick;
            $scope.sclera_lacerat_od_tick = vm.ocularValues.sclera_lacerat_od_tick;
            $scope.sclera_others_od_tick = vm.ocularValues.sclera_others_od_tick;
            $scope.sclera_others_od = vm.ocularValues.sclera_others_od;
            $scope.sclera_os_tick = vm.ocularValues.sclera_os_tick;
            $scope.sclera_staphy_os_tick = vm.ocularValues.sclera_staphy_os_tick;
            $scope.sclera_ict_os_tick = vm.ocularValues.sclera_ict_os_tick;
            $scope.sclera_thinning_os_tick = vm.ocularValues.sclera_thinning_os_tick;
            $scope.sclera_melting_os_tick = vm.ocularValues.sclera_melting_os_tick;
            $scope.sclera_lacerat_os_tick = vm.ocularValues.sclera_lacerat_os_tick;
            $scope.sclera_others_os_tick = vm.ocularValues.sclera_others_os_tick;
            $scope.sclera_others_os = vm.ocularValues.sclera_others_os;
            $scope.cornea_od_tick = vm.ocularValues.cornea_od_tick;
            $scope.cornea_staphy_od_tick = vm.ocularValues.cornea_staphy_od_tick;
            $scope.cornea_ict_od_tick = vm.ocularValues.cornea_ict_od_tick;
            $scope.cornea_thinning_od_tick = vm.ocularValues.cornea_thinning_od_tick;
            $scope.cornea_melting_od_tick = vm.ocularValues.cornea_melting_od_tick;
            $scope.cornea_lacerat_od_tick = vm.ocularValues.cornea_lacerat_od_tick;
            $scope.cornea_others_od_tick = vm.ocularValues.cornea_others_od_tick;
            $scope.cornea_others_od = vm.ocularValues.cornea_others_od;
            $scope.cornea_os_tick = vm.ocularValues.cornea_os_tick;
            $scope.cornea_staphy_os_tick = vm.ocularValues.cornea_staphy_os_tick;
            $scope.cornea_ict_os_tick = vm.ocularValues.cornea_ict_os_tick;
            $scope.cornea_thinning_os_tick = vm.ocularValues.cornea_thinning_os_tick;
            $scope.cornea_melting_os_tick = vm.ocularValues.cornea_melting_os_tick;
            $scope.cornea_lacerat_os_tick = vm.ocularValues.cornea_lacerat_os_tick;
            $scope.cornea_others_os_tick = vm.ocularValues.cornea_others_os_tick;
            $scope.cornea_others_os = vm.ocularValues.cornea_others_os;
            $scope.anterchamb_od_tick = vm.ocularValues.anterchamb_od_tick;
            $scope.anterchamb_mh_od_tick = vm.ocularValues.anterchamb_mh_od_tick;
            $scope.anterchamb_pc_od_tick = vm.ocularValues.anterchamb_pc_od_tick;
            $scope.anterchamb_nf_od_tick = vm.ocularValues.anterchamb_nf_od_tick;
            $scope.anterchamb_others_od_tick = vm.ocularValues.anterchamb_others_od_tick;
            $scope.anterchamb_others_od = vm.ocularValues.anterchamb_others_od;
            $scope.anterchamb_os_tick = vm.ocularValues.anterchamb_os_tick;
            $scope.anterchamb_mh_os_tick = vm.ocularValues.anterchamb_mh_os_tick;
            $scope.anterchamb_pc_os_tick = vm.ocularValues.anterchamb_pc_os_tick;
            $scope.anterchamb_nf_os_tick = vm.ocularValues.anterchamb_nf_os_tick;
            $scope.anterchamb_others_os_tick = vm.ocularValues.anterchamb_others_os_tick;
            $scope.anterchamb_others_os = vm.ocularValues.anterchamb_others_os;
            $scope.iris_od_tick = vm.ocularValues.iris_od_tick;
            $scope.iris_hetero_od_tick = vm.ocularValues.iris_hetero_od_tick;
            $scope.iris_atrophy_od_tick = vm.ocularValues.iris_atrophy_od_tick;
            $scope.iris_nevus_od_tick = vm.ocularValues.iris_nevus_od_tick;
            $scope.iris_sid_od_tick = vm.ocularValues.iris_sid_od_tick;
            $scope.iris_anirid_od_tick = vm.ocularValues.iris_anirid_od_tick;
            $scope.iris_others_od_tick = vm.ocularValues.iris_others_od_tick;
            $scope.iris_others_od = vm.ocularValues.iris_others_od;
            $scope.iris_os_tick = vm.ocularValues.iris_os_tick;
            $scope.iris_hetero_os_tick = vm.ocularValues.iris_hetero_os_tick;
            $scope.iris_atrophy_os_tick = vm.ocularValues.iris_atrophy_os_tick;
            $scope.iris_nevus_os_tick = vm.ocularValues.iris_nevus_os_tick;
            $scope.iris_sid_os_tick = vm.ocularValues.iris_sid_os_tick;
            $scope.iris_anirid_os_tick = vm.ocularValues.iris_anirid_os_tick;
            $scope.iris_others_os_tick = vm.ocularValues.iris_others_os_tick;
            $scope.iris_others_os = vm.ocularValues.iris_others_os;
            $scope.pupil_od_tick = vm.ocularValues.pupil_od_tick;
            $scope.pupil_corecto_od_tick = vm.ocularValues.pupil_corecto_od_tick;
            $scope.pupil_polyco_od_tick = vm.ocularValues.pupil_polyco_od_tick;
            $scope.pupil_ppm_od_tick = vm.ocularValues.pupil_ppm_od_tick;
            $scope.pupil_ppi_od_tick = vm.ocularValues.pupil_ppi_od_tick;
            $scope.pupil_dsp_od_tick = vm.ocularValues.pupil_dsp_od_tick;
            $scope.pupil_others_od_tick = vm.ocularValues.pupil_others_od_tick;
            $scope.pupil_others_od = vm.ocularValues.pupil_others_od;
            $scope.pupil_os_tick = vm.ocularValues.pupil_os_tick;
            $scope.pupil_corecto_os_tick = vm.ocularValues.pupil_corecto_os_tick;
            $scope.pupil_polyco_os_tick = vm.ocularValues.pupil_polyco_os_tick;
            $scope.pupil_ppm_os_tick = vm.ocularValues.pupil_ppm_os_tick;
            $scope.pupil_ppi_os_tick = vm.ocularValues.pupil_ppi_os_tick;
            $scope.pupil_dsp_os_tick = vm.ocularValues.pupil_dsp_os_tick;
            $scope.pupil_others_os_tick = vm.ocularValues.pupil_others_os_tick;
            $scope.pupil_others_os = vm.ocularValues.pupil_others_os;
            $scope.pupil_rti_od_tick = vm.ocularValues.pupil_rti_od_tick;
            $scope.pupil_rti_rapd_od_tick = vm.ocularValues.pupil_rti_rapd_od_tick;
            $scope.pupil_rti_slugreact_od_tick = vm.ocularValues.pupil_rti_slugreact_od_tick;
            $scope.pupil_rti_hippus_od_tick = vm.ocularValues.pupil_rti_hippus_od_tick;
            $scope.pupil_rti_aap_od_tick = vm.ocularValues.pupil_rti_aap_od_tick;
            $scope.pupil_rti_apd_od_tick = vm.ocularValues.pupil_rti_apd_od_tick;
            $scope.pupil_rti_others_od_tick = vm.ocularValues.pupil_rti_others_od_tick;
            $scope.pupil_rti_others_od = vm.ocularValues.pupil_rti_others_od;
            $scope.pupil_rti_os_tick = vm.ocularValues.pupil_rti_os_tick;
            $scope.pupil_rti_rapd_os_tick = vm.ocularValues.pupil_rti_rapd_os_tick;
            $scope.pupil_rti_slugreact_os_tick = vm.ocularValues.pupil_rti_slugreact_os_tick;
            $scope.pupil_rti_hippus_os_tick = vm.ocularValues.pupil_rti_hippus_os_tick;
            $scope.pupil_rti_aap_os_tick = vm.ocularValues.pupil_rti_aap_os_tick;
            $scope.pupil_rti_apd_os_tick = vm.ocularValues.pupil_rti_apd_os_tick;
            $scope.pupil_rti_others_os_tick = vm.ocularValues.pupil_rti_others_os_tick;
            $scope.pupil_rti_others_os = vm.ocularValues.pupil_rti_others_os;
            $scope.lens_phakic_od_tick = vm.ocularValues.lens_phakic_od_tick;
            $scope.lens_pseuphakic_od_tick = vm.ocularValues.lens_pseuphakic_od_tick;
            $scope.lens_aphakic_od_tick = vm.ocularValues.lens_aphakic_od_tick;
            $scope.lens_phakic_os_tick = vm.ocularValues.lens_phakic_os_tick;
            $scope.lens_pseuphakic_os_tick = vm.ocularValues.lens_pseuphakic_os_tick;
            $scope.lens_aphakic_os_tick = vm.ocularValues.lens_aphakic_os_tick;
            $scope.caps_od_tick = vm.ocularValues.caps_od_tick;
            $scope.caps_pseudo_od_tick = vm.ocularValues.caps_pseudo_od_tick;
            $scope.caps_pco_od_tick = vm.ocularValues.caps_pco_od_tick;
            $scope.caps_others_od_tick = vm.ocularValues.caps_others_od_tick;
            $scope.caps_others_od = vm.ocularValues.caps_others_od;
            $scope.caps_os_tick = vm.ocularValues.caps_os_tick;
            $scope.caps_pseudo_os_tick = vm.ocularValues.caps_pseudo_os_tick;
            $scope.caps_pco_os_tick = vm.ocularValues.caps_pco_os_tick;
            $scope.caps_others_os_tick = vm.ocularValues.caps_others_os_tick;
            $scope.caps_others_os = vm.ocularValues.caps_others_os;
            $scope.pos_phacod_od_tick = vm.ocularValues.pos_phacod_od_tick;
            $scope.pos_sublux_od_tick = vm.ocularValues.pos_sublux_od_tick;
            $scope.pos_disloc_od_tick = vm.ocularValues.pos_disloc_od_tick;
            $scope.pos_none_od_tick = vm.ocularValues.pos_none_od_tick;
            $scope.pos_phacod_os_tick = vm.ocularValues.pos_phacod_os_tick;
            $scope.pos_sublux_os_tick = vm.ocularValues.pos_sublux_os_tick;
            $scope.pos_disloc_os_tick = vm.ocularValues.pos_disloc_os_tick;
            $scope.pos_none_os_tick = vm.ocularValues.pos_none_os_tick;
            $scope.cataract_tick = vm.ocularValues.cataract_tick;
            $scope.nucopal_n0_od_tick = vm.ocularValues.nucopal_n0_od_tick;
            $scope.nucopal_n1_od_tick = vm.ocularValues.nucopal_n1_od_tick;
            $scope.nucopal_n2_od_tick = vm.ocularValues.nucopal_n2_od_tick;
            $scope.nucopal_n3_od_tick = vm.ocularValues.nucopal_n3_od_tick;
            $scope.nucopal_n4_od_tick = vm.ocularValues.nucopal_n4_od_tick;
            $scope.nucopal_notgrade_od_tick = vm.ocularValues.nucopal_notgrade_od_tick;
            $scope.nucopal_n0_os_tick = vm.ocularValues.nucopal_n0_os_tick;
            $scope.nucopal_n1_os_tick = vm.ocularValues.nucopal_n1_os_tick;
            $scope.nucopal_n2_os_tick = vm.ocularValues.nucopal_n2_os_tick;
            $scope.nucopal_n3_os_tick = vm.ocularValues.nucopal_n3_os_tick;
            $scope.nucopal_n4_os_tick = vm.ocularValues.nucopal_n4_os_tick;
            $scope.nucopal_notgrade_os_tick = vm.ocularValues.nucopal_notgrade_os_tick;
            $scope.cortical_c0_od_tick = vm.ocularValues.cortical_c0_od_tick;
            $scope.cortical_ctr_od_tick = vm.ocularValues.cortical_ctr_od_tick;
            $scope.cortical_c1_od_tick = vm.ocularValues.cortical_c1_od_tick;
            $scope.cortical_c2_od_tick = vm.ocularValues.cortical_c2_od_tick;
            $scope.cortical_c3_od_tick = vm.ocularValues.cortical_c3_od_tick;
            $scope.cortical_c4_od_tick = vm.ocularValues.cortical_c4_od_tick;
            $scope.cortical_c5_od_tick = vm.ocularValues.cortical_c5_od_tick;
            $scope.cortical_notgrade_od_tick = vm.ocularValues.cortical_notgrade_od_tick;
            $scope.cortical_c0_os_tick = vm.ocularValues.cortical_c0_os_tick;
            $scope.cortical_ctr_os_tick = vm.ocularValues.cortical_ctr_os_tick;
            $scope.cortical_c1_os_tick = vm.ocularValues.cortical_c1_os_tick;
            $scope.cortical_c2_os_tick = vm.ocularValues.cortical_c2_os_tick;
            $scope.cortical_c3_os_tick = vm.ocularValues.cortical_c3_os_tick;
            $scope.cortical_c4_os_tick = vm.ocularValues.cortical_c4_os_tick;
            $scope.cortical_c5_os_tick = vm.ocularValues.cortical_c5_os_tick;
            $scope.cortical_notgrade_os_tick = vm.ocularValues.cortical_notgrade_os_tick;
            $scope.psc_p0_od_tick = vm.ocularValues.psc_p0_od_tick;
            $scope.psc_p1_od_tick = vm.ocularValues.psc_p1_od_tick;
            $scope.psc_p2_od_tick = vm.ocularValues.psc_p2_od_tick;
            $scope.psc_p3_od_tick = vm.ocularValues.psc_p3_od_tick;
            $scope.psc_p4_od_tick = vm.ocularValues.psc_p4_od_tick;
            $scope.psc_notgrade_od_tick = vm.ocularValues.psc_notgrade_od_tick;
            $scope.psc_p0_os_tick = vm.ocularValues.psc_p0_os_tick;
            $scope.psc_p1_os_tick = vm.ocularValues.psc_p1_os_tick;
            $scope.psc_p2_os_tick = vm.ocularValues.psc_p2_os_tick;
            $scope.psc_p3_os_tick = vm.ocularValues.psc_p3_os_tick;
            $scope.psc_p4_os_tick = vm.ocularValues.psc_p4_os_tick;
            $scope.psc_notgrade_os_tick = vm.ocularValues.psc_notgrade_os_tick;
            $scope.maturecat_od_tick = vm.ocularValues.maturecat_od_tick;
            $scope.maturecat_os_tick = vm.ocularValues.maturecat_os_tick;
            $scope.compact_od_tick = vm.ocularValues.compact_od_tick;
            $scope.compact_os_tick = vm.ocularValues.compact_os_tick;
            $scope.vitreous_od_tick = vm.ocularValues.vitreous_od_tick;
            $scope.vitreous_pvd_od_tick = vm.ocularValues.vitreous_pvd_od_tick;
            $scope.vitreous_vh_od_tick = vm.ocularValues.vitreous_vh_od_tick;
            $scope.vitreous_oparities_od_tick = vm.ocularValues.vitreous_oparities_od_tick;
            $scope.vitreous_other_od_tick = vm.ocularValues.vitreous_other_od_tick;
            $scope.vitreous_other_od = vm.ocularValues.vitreous_other_od;
            $scope.vitreous_os_tick = vm.ocularValues.vitreous_os_tick;
            $scope.vitreous_pvd_os_tick = vm.ocularValues.vitreous_pvd_os_tick;
            $scope.vitreous_vh_os_tick = vm.ocularValues.vitreous_vh_os_tick;
            $scope.vitreous_oparities_os_tick = vm.ocularValues.vitreous_oparities_os_tick;
            $scope.vitreous_other_os_tick = vm.ocularValues.vitreous_other_os_tick;
            $scope.vitreous_other_os = vm.ocularValues.vitreous_other_os;
            $scope.vitreous_remarks_od = vm.ocularValues.vitreous_remarks_od;
            $scope.vitreous_remarks_os = vm.ocularValues.vitreous_remarks_os;
            $scope.retina_od_tick = vm.ocularValues.retina_od_tick;
            $scope.retina_os_tick = vm.ocularValues.retina_os_tick;
            $scope.retina_od = vm.ocularValues.retina_od;
            $scope.retina_os = vm.ocularValues.retina_os;
            $scope.disc_od_tick = vm.ocularValues.disc_od_tick;
            $scope.disc_os_tick = vm.ocularValues.disc_os_tick;
            $scope.disc_od = vm.ocularValues.disc_od;
            $scope.disc_os = vm.ocularValues.disc_os;
            $scope.cdr_od_tick = vm.ocularValues.cdr_od_tick;
            $scope.cdr_od = vm.ocularValues.cdr_od;
            $scope.cdr_os_tick = vm.ocularValues.cdr_os_tick;
            $scope.cdr_os = vm.ocularValues.cdr_os;
            $scope.macula_od_tick = vm.ocularValues.macula_od_tick;
            $scope.macula_erm_od_tick = vm.ocularValues.macula_erm_od_tick;
            $scope.macula_hole_od_tick = vm.ocularValues.macula_hole_od_tick;
            $scope.macula_hemorage_od_tick = vm.ocularValues.macula_hemorage_od_tick;
            $scope.macula_edema_od_tick = vm.ocularValues.macula_edema_od_tick;
            $scope.macula_other_od_tick = vm.ocularValues.macula_other_od_tick;
            $scope.macula_other_od = vm.ocularValues.macula_other_od;
            $scope.macula_os_tick = vm.ocularValues.macula_os_tick;
            $scope.macula_erm_os_tick = vm.ocularValues.macula_erm_os_tick;
            $scope.macula_hole_os_tick = vm.ocularValues.macula_hole_os_tick;
            $scope.macula_hemorage_os_tick = vm.ocularValues.macula_hemorage_os_tick;
            $scope.macula_edema_os_tick = vm.ocularValues.macula_edema_os_tick;
            $scope.macula_other_os_tick = vm.ocularValues.macula_other_os_tick;
            $scope.macula_other_os = vm.ocularValues.macula_other_os;
            $scope.vessels_od_tick = vm.ocularValues.vessels_od_tick;
            $scope.vessels_od = vm.ocularValues.vessels_od;
            $scope.vessels_os_tick = vm.ocularValues.vessels_os_tick;
            $scope.vessels_os = vm.ocularValues.vessels_os;
            $scope.periphery_od_tick = vm.ocularValues.periphery_od_tick;
            $scope.periphery_od = vm.ocularValues.periphery_od;
            $scope.periphery_os_tick = vm.ocularValues.periphery_os_tick;
            $scope.periphery_os = vm.ocularValues.periphery_os;


            if ($scope.eom_od_tick === true || $scope.eom_od_tick === "true") { $scope.eom_od_tick = "1" } if ($scope.eom_od_tick === false || $scope.eom_od_tick === 0) { $scope.eom_od_tick = "0"; }
            if ($scope.eom_os_tick === true || $scope.eom_os_tick === "true") { $scope.eom_os_tick = "1" } if ($scope.eom_os_tick === false || $scope.eom_os_tick === 0) { $scope.eom_os_tick = "0"; }
            if ($scope.lid_od_tick === true || $scope.lid_od_tick === "true") { $scope.lid_od_tick = "1" } if ($scope.lid_od_tick === false || $scope.lid_od_tick === 0) { $scope.lid_od_tick = "0"; }
            if ($scope.lid_os_tick === true || $scope.lid_os_tick === "true") { $scope.lid_os_tick = "1" } if ($scope.lid_os_tick === false || $scope.lid_os_tick === 0) { $scope.lid_os_tick = "0"; }
            if ($scope.conjunct_od_tick === true || $scope.conjunct_od_tick === "true") { $scope.conjunct_od_tick = "1" } if ($scope.conjunct_od_tick === false || $scope.conjunct_od_tick === 0) { $scope.conjunct_od_tick = "0"; }
            if ($scope.conjunct_os_tick === true || $scope.conjunct_os_tick === "true") { $scope.conjunct_os_tick = "1" } if ($scope.conjunct_os_tick === false || $scope.conjunct_os_tick === 0) { $scope.conjunct_os_tick = "0"; }
            if ($scope.sclera_od_tick === true || $scope.sclera_od_tick === "true") { $scope.sclera_od_tick = "1" } if ($scope.sclera_od_tick === false || $scope.sclera_od_tick === 0) { $scope.sclera_od_tick = "0"; }
            if ($scope.sclera_os_tick === true || $scope.sclera_os_tick === "true") { $scope.sclera_os_tick = "1" } if ($scope.sclera_os_tick === false || $scope.sclera_os_tick === 0) { $scope.sclera_os_tick = "0"; }
            if ($scope.cornea_od_tick === true || $scope.cornea_od_tick === "true") { $scope.cornea_od_tick = "1" } if ($scope.cornea_od_tick === false || $scope.cornea_od_tick === 0) { $scope.cornea_od_tick = "0"; }
            if ($scope.cornea_os_tick === true || $scope.cornea_os_tick === "true") { $scope.cornea_os_tick = "1" } if ($scope.cornea_os_tick === false || $scope.cornea_os_tick === 0) { $scope.cornea_os_tick = "0"; }
            if ($scope.anterchamb_od_tick === true || $scope.anterchamb_od_tick === "true") { $scope.anterchamb_od_tick = "1" } if ($scope.anterchamb_od_tick === false || $scope.anterchamb_od_tick === 0) { $scope.anterchamb_od_tick = "0"; }
            if ($scope.anterchamb_os_tick === true || $scope.anterchamb_os_tick === "true") { $scope.anterchamb_os_tick = "1" } if ($scope.anterchamb_os_tick === false || $scope.anterchamb_os_tick === 0) { $scope.anterchamb_os_tick = "0"; }
            if ($scope.iris_od_tick === true || $scope.iris_od_tick === "true") { $scope.iris_od_tick = "1" } if ($scope.iris_od_tick === false || $scope.iris_od_tick === 0) { $scope.iris_od_tick = "0"; }
            if ($scope.iris_os_tick === true || $scope.iris_os_tick === "true") { $scope.iris_os_tick = "1" } if ($scope.iris_os_tick === false || $scope.iris_os_tick === 0) { $scope.iris_os_tick = "0"; }
            if ($scope.pupil_od_tick === true || $scope.pupil_od_tick === "true") { $scope.pupil_od_tick = "1" } if ($scope.pupil_od_tick === false || $scope.pupil_od_tick === 0) { $scope.pupil_od_tick = "0"; }
            if ($scope.pupil_os_tick === true || $scope.pupil_os_tick === "true") { $scope.pupil_os_tick = "1" } if ($scope.pupil_os_tick === false || $scope.pupil_os_tick === 0) { $scope.pupil_os_tick = "0"; }
            if ($scope.pupil_rti_od_tick === true || $scope.pupil_rti_od_tick === "true") { $scope.pupil_rti_od_tick = "1" } if ($scope.pupil_rti_od_tick === false || $scope.pupil_rti_od_tick === 0) { $scope.pupil_rti_od_tick = "0"; }
            if ($scope.pupil_rti_os_tick === true || $scope.pupil_rti_os_tick === "true") { $scope.pupil_rti_os_tick = "1" } if ($scope.pupil_rti_os_tick === false || $scope.pupil_rti_os_tick === 0) { $scope.pupil_rti_os_tick = "0"; }
            if ($scope.caps_od_tick === true || $scope.caps_od_tick === "true") { $scope.caps_od_tick = "1" } if ($scope.caps_od_tick === false || $scope.caps_od_tick === 0) { $scope.caps_od_tick = "0"; }
            if ($scope.caps_os_tick === true || $scope.caps_os_tick === "true") { $scope.caps_os_tick = "1" } if ($scope.caps_os_tick === false || $scope.caps_os_tick === 0) { $scope.caps_os_tick = "0"; }

        }


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

        vm.PrintRecord = function () {
            printData();
        }

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
            $("#reporttable").table2excel({
                filename: vm.pagetitle + "_" + vm.initFiltered + "To " + vm.finalFiltered + ".xls"
            });
        }

        vm.noalert = function () {
            $timeout(vm.resetNotification, 4000);
        }
        vm.next = function(){
            window.open('#!/ocularinvestigation?mrdno=' + $scope.mrdnum +
            '&hospid=' + $scope.hospitalid,
            '_self', '');

        }
        vm.reload = function () {
            $timeout(vm.reloadfn, 3000);
        };

        vm.reloadfn = function () {
            window.open('#!/dashboard', '_self', '');
                    // window.open();
        }
    vm.resetNotification = function () {
        vm.notification = {
            message: '',
            mode: 'info'
        };
    };


    }
]);