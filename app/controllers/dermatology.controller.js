
app.controller('DermatologyController', ['$http', 'UrlConfig', 'Config', 'TokenService', 'DateService', '$scope', 
'$filter', '$timeout', 'BroadcastService','$routeParams',
    function ($http, UrlConfig, Config, TokenService, DateService, $scope, $filter,
         $timeout, BroadcastService,$routeParams) {

        var vm = this;

        vm.pagetitle = "Dermatology";


        //vm.selectedTitle = null;
        //vm.selectedOpdBill = null;

        vm.init = function () {
            //    TokenService.navigateToLoginOnInvalidToken();

            BroadcastService.notify('radioNavVisible', true);
            BroadcastService.notify('labNavVisible', false);

            BroadcastService.notify('navText', 'Radiology Reporting ');

            // vm.fetchTestReportList();

            $scope.init = DateService.getInitDate();
            $scope.final = DateService.getFinalDate();
            vm.initdate = $filter("date")($scope.init, "yyyy/MM/dd");
            vm.finaldate = $filter("date")($scope.final, "yyyy/MM/dd");

            $scope.mrdnum = $routeParams.mrdno;
            $scope.hospitalid = $routeParams.hospid;
            if($scope.mrdnum !== undefined && $scope.hospitalid !== undefined){
                vm.fetchDermoForm();
                vm.fetchDermoReportList();
            }

            $scope.datetype = 'ad';
            $scope.by = 'date';
            vm.space = Config.spaceAbove;


            //   vm.fetchList();


            //   vm.AdToBsInit(vm.initFiltered);
            //   vm.AdToBsFinal(vm.finalFiltered);



            vm.edit = false;


            $scope.acanthosis_tick = false;
            $scope.achro_tick = false;
            $scope.anaemia_tick = false;
            $scope.annular_skin_tick = false;
            $scope.asta_exz_tick = false;
            $scope.asthma_tick = false;
            $scope.atop_derma_tick = false;
            $scope.atrophic_mucosa_tick = false;
            $scope.atrophic_palm_soles_tick = false;
            $scope.atrophic_skin_tick = false;
            $scope.auto_derma_tick = false;
            $scope.b_tick = false;
            $scope.bedsore_tick = false;
            $scope.black_dots_scalp_tick = false;
            $scope.blood_urea = null;
            $scope.bloodsugar_f = null;
            $scope.bloodsugar_p = null;
            $scope.buccal_mucosa_bilateral_tick = false;
            $scope.buccal_mucosa_unilateral_tick = false;
            $scope.bullae_lesion_tick = false;
            $scope.bullous_mucosa_tick = false;
            $scope.bullous_palm_soles_tick = false;
            $scope.bullous_skin_tick = false;
            $scope.callos_tick = false;
            $scope.candida_fungal_tick = false;
            $scope.cherry_tick = false;
            $scope.comedones_tick = false;
            $scope.complaints = null;
            $scope.contact_derma_tick = false;
            $scope.cuta_derma_pruritus_tick = false;
            $scope.cutaneous_tick = false;
            $scope.deep_fungal_tick = false;
            $scope.diffuse_alop_scalp_tick = false;
            $scope.dm_tick = false;
            $scope.erosions_lesion_tick = false;
            $scope.erosive_mucosa_tick = false;
            $scope.eryth_skin_tick = false;
            $scope.erythem_palm_soles_tick = false;
            $scope.erythema_genitalia_mucosa_tick = false;
            $scope.erythoderma_tick = false;
            $scope.extensor_lesion_tick = false;
            $scope.face_lesion_tick = false;
            $scope.family_history_tick = false;
            $scope.fin_tick = false;
            $scope.fissur_palm_soles_tick = false;
            $scope.fissur_skin_tick = false;
            $scope.fissured_soles_tick = false;
            $scope.flexure_lesion_tick = false;
            $scope.follicular_scalp_tick = false;
            $scope.follicular_skin_tick = false;
            $scope.freckles_tick = false;
            $scope.fungal_tick = false;
            $scope.genital_lesion_tick = false;
            $scope.genital_tick = false;
            $scope.gingiva_mucosa_tick = false;
            $scope.herpes_simplex_tick = false;
            $scope.herpes_tick = false;
            $scope.hyperkerato_palm_soles_tick = false;
            $scope.hyperkeratotic_skin_tick = false;
            $scope.hyperpigment_nail_tick = false;
            $scope.hyperpigment_palm_soles_tick = false;
            $scope.hyperpigment_skin_tick = false;
            $scope.hyperpigmentation_mucosa_tick = false;
            $scope.hypertension_tick = false;
            $scope.idio_guttate_tick = false;
            $scope.ihd_tick = false;
            $scope.itching = false;
            $scope.labial_mucosa_tick = false;
            $scope.lenti_tick = false;
            $scope.leprosy_tick = false;
            $scope.lesion_tick = false;
            $scope.lichen_planus_tick = false;
            $scope.lichen_simplex_tick = false;
            $scope.lips_lesion_tick = false;
            $scope.liver_tick = false;
            $scope.long_melanon_nail_tick = false;
            $scope.lower_extremities_tick = false;
            $scope.macule_lesion_tick = false;
            $scope.macule_palm_soles_tick = false;
            $scope.macule_skin_tick = false;
            $scope.male_pattern_scalp_tick = false;
            $scope.milia_tick = false;
            $scope.miliaria_tick = false;
            $scope.mixed_mucosa_tick = false;
            $scope.mouth_floor_mucosa_tick = false;
            $scope.mucosal_lesion_pain_tick = false;
            $scope.naevi_tick = false;
            $scope.nail_tick = false;
            $scope.nails_lesion_tick = false;
            $scope.nummular_eczema_tick = false;
            $scope.onycho_nail_tick = false;
            $scope.oral_lesion_tick = false;
            $scope.oral_tick = false;
            $scope.other_disease_tick = false;
            $scope.others_tick = false;
            $scope.palatal_arch_mucosa_tick = false;
            $scope.palm_lesion_tick = false;
            $scope.palms_soles_tick = false;
            $scope.palques_lesion_tick = false;
            $scope.papules_genitalia_mucosa_tick = false;
            $scope.papules_lesion_tick = false;
            $scope.papules_mucosa_tick = false;
            $scope.papules_palm_soles_tick = false;
            $scope.papules_skin_tick = false;
            $scope.past_ho_lesion_tick = false;
            $scope.pemp_vulg_tick = false;
            $scope.pemphi_tick = false;
            $scope.photoderma_tick = false;
            $scope.pity_fungal_tick = false;
            $scope.plaques_genitalia_mucosa_tick = false;
            $scope.plaques_palm_soles_tick = false;
            $scope.plaques_skin_tick = false;
            $scope.post_herpes_tick = false;
            $scope.prime_syp_tick = false;
            $scope.psoriasis_tick = false;
            $scope.pterygium_nail_tick = false;
            $scope.pul_tb_tick = false;
            $scope.pupules_scalp_tick = false;
            $scope.pyoderma_tick = false;
            $scope.reticulate_mucosa_tick = false;
            $scope.rhino_tick = false;
            $scope.scabies_tick = false;
            $scope.scalp_lesion_tick = false;
            $scope.scalp_tick = false;
            $scope.scarring_scalp_tick = false;
            $scope.sebor_derma_tick = false;
            $scope.sebor_kerat_tick = false;
            $scope.senile_pruritus_tick = false;
            $scope.senile_purpura_tick = false;
            $scope.senile_xerosis_tick = false;
            $scope.soles_lesion_tick = false;
            $scope.stasis_derma_tick = false;
            $scope.subungual_nail_tick = false;
            $scope.systemic_disease_pruritus_tick = false;
            $scope.tb_verru_tick = false;
            $scope.telang_tick = false;
            $scope.thining_nail_tick = false;
            $scope.tinea_fungal_tick = false;
            $scope.toe_tick = false;
            $scope.tongue_mucosa_tick = false;
            $scope.totaloss_nail_tick = false;
            $scope.trunk_lesion_tick = false;
            $scope.ulcer_mucosa_tick = false;
            $scope.ulcer_palm_soles_tick = false;
            $scope.ulcerative_skin_tick = false;
            $scope.ulcers_genitalia_mucosa_tick = false;
            $scope.ulcers_lesion_tick = false;
            $scope.upper_extremities_tick = false;
            $scope.urticaria_tick = false;
            $scope.vesicles_lesion_tick = false;
            $scope.violaceous_mucosa_tick = false;
            $scope.violaceous_skin_tick = false;
            $scope.vitiligo_tick = false;
            $scope.voilaceous_genitalia_mucosa_tick = false;
            $scope.warts_tick = false;
            $scope.white_plaque_mucosa_tick = false;
            $scope.xanthel_tick = false;

        };

        vm.today = $filter("date")(new Date(), "yyyy/MM/dd");



        $scope.dateTypes = [{
            value: 0,
            name: 'AD'
        },
        {
            value: 1,
            name: 'BS'
        },
        {
            value: 2,
            name: 'By Month'
        },
        ];

        vm.selectedDateType = {};
        vm.selectedDateType.value = 0;
        vm.selectedDateType.name = 'AD';





        vm.fetchDermoForm = function () {
            $scope.loadtrue = true;
            var token = localStorage.getItem('access_token');
            // var userId = TokenService.getUserId(); 
            $http.get(UrlConfig.labReportBaseUrl() + 'api/DermatologyAll?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.dermaReports = result.data;
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    $scope.noReport = true;

                    $scope.loadtrue = false;
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
            vm.noalert();

        };





        vm.fetchDermoReportList = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;

            //  vm.fetchUserSummary();
            // if ($scope.newmdr === null || $scope.newmdr === undefined) {
            //     $scope.newmdr = 0;
            // }
            var token = localStorage.getItem('access_token');
            //   $scope.mdrsearch = 8;
            // var userId = TokenService.getUserId(); 
            $http.get(UrlConfig.labReportBaseUrl() + 'api/DermatologyDetails?mrdno=' + $scope.mrdnum, 
            { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.DermoReportList = result.data;
                    if (result.data.length === 0) {
                        vm.notification = { mode: 'danger', message: 'No report found' };
                        $scope.showReport = true;
                        $scope.noReport = true;
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

        };



        vm.deleteRecord = function () {
            if (confirm('Are you sure you want to delete this record?')) {
                var userId = TokenService.getUserId();

                var mrdPayload = {
                    mrdno: vm.userMrd,
                };
                var token = localStorage.getItem('access_token');
                $http.post(UrlConfig.labReportBaseUrl() + 'api/DermatologyDetails/Delete',
                    mrdPayload, { headers: { Authorization: 'Bearer ' + token } })

                    .then(function (result) {
                        // console.log(result.data);
                        vm.notification = { mode: 'success', message: 'MRD report deleted' };
                        vm.fetchDermoReportList();

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


        $scope.lesion_tick = "";
        $scope.palms_soles_tick = "";
        //SUBMIT FORM  

        vm.submitDermoForm = function () {
            if ($scope.mucosal_lesion_pain_tick === undefined || $scope.mucosal_lesion_pain_tick === false) { $scope.mucosal_lesion_pain_tick = false; } else { $scope.mucosal_lesion_pain_tick = true; }
            if ($scope.lesion_tick === undefined || $scope.lesion_tick === false) { $scope.lesion_tick = false; } else { $scope.lesion_tick = true; }
            if ($scope.cutaneous_tick === undefined || $scope.cutaneous_tick === false) { $scope.cutaneous_tick = false; } else { $scope.cutaneous_tick = true; }
            if ($scope.oral_tick === undefined || $scope.oral_tick === false) { $scope.oral_tick = false; } else { $scope.oral_tick = true; }
            if ($scope.genital_tick === undefined || $scope.genital_tick === false) { $scope.genital_tick = false; } else { $scope.genital_tick = true; }
            if ($scope.nail_tick === undefined || $scope.nail_tick === false) { $scope.nail_tick = false; } else { $scope.nail_tick = true; }
            if ($scope.scalp_tick === undefined || $scope.scalp_tick === false) { $scope.scalp_tick = false; } else { $scope.scalp_tick = true; }
            if ($scope.macule_lesion_tick === undefined || $scope.macule_lesion_tick === false) { $scope.macule_lesion_tick = false; } else { $scope.macule_lesion_tick = true; }
            if ($scope.papules_lesion_tick === undefined || $scope.papules_lesion_tick === false) { $scope.papules_lesion_tick = false; } else { $scope.papules_lesion_tick = true; }
            if ($scope.palques_lesion_tick === undefined || $scope.palques_lesion_tick === false) { $scope.palques_lesion_tick = false; } else { $scope.palques_lesion_tick = true; }
            if ($scope.erosions_lesion_tick === undefined || $scope.erosions_lesion_tick === false) { $scope.erosions_lesion_tick = false; } else { $scope.erosions_lesion_tick = true; }
            if ($scope.ulcers_lesion_tick === undefined || $scope.ulcers_lesion_tick === false) { $scope.ulcers_lesion_tick = false; } else { $scope.ulcers_lesion_tick = true; }
            if ($scope.vesicles_lesion_tick === undefined || $scope.vesicles_lesion_tick === false) { $scope.vesicles_lesion_tick = false; } else { $scope.vesicles_lesion_tick = true; }
            if ($scope.bullae_lesion_tick === undefined || $scope.bullae_lesion_tick === false) { $scope.bullae_lesion_tick = false; } else { $scope.bullae_lesion_tick = true; }
            if ($scope.scalp_lesion_tick === undefined || $scope.scalp_lesion_tick === false) { $scope.scalp_lesion_tick = false; } else { $scope.scalp_lesion_tick = true; }
            if ($scope.face_lesion_tick === undefined || $scope.face_lesion_tick === false) { $scope.face_lesion_tick = false; } else { $scope.face_lesion_tick = true; }
            if ($scope.trunk_lesion_tick === undefined || $scope.trunk_lesion_tick === false) { $scope.trunk_lesion_tick = false; } else { $scope.trunk_lesion_tick = true; }
            if ($scope.upper_extremities_tick === undefined || $scope.upper_extremities_tick === false) { $scope.upper_extremities_tick = false; } else { $scope.upper_extremities_tick = true; }
            if ($scope.lower_extremities_tick === undefined || $scope.lower_extremities_tick === false) { $scope.lower_extremities_tick = false; } else { $scope.lower_extremities_tick = true; }
            if ($scope.flexure_lesion_tick === undefined || $scope.flexure_lesion_tick === false) { $scope.flexure_lesion_tick = false; } else { $scope.flexure_lesion_tick = true; }
            if ($scope.extensor_lesion_tick === undefined || $scope.extensor_lesion_tick === false) { $scope.extensor_lesion_tick = false; } else { $scope.extensor_lesion_tick = true; }
            if ($scope.palm_lesion_tick === undefined || $scope.palm_lesion_tick === false) { $scope.palm_lesion_tick = false; } else { $scope.palm_lesion_tick = true; }
            if ($scope.soles_lesion_tick === undefined || $scope.soles_lesion_tick === false) { $scope.soles_lesion_tick = false; } else { $scope.soles_lesion_tick = true; }
            if ($scope.nails_lesion_tick === undefined || $scope.nails_lesion_tick === false) { $scope.nails_lesion_tick = false; } else { $scope.nails_lesion_tick = true; }
            if ($scope.oral_lesion_tick === undefined || $scope.oral_lesion_tick === false) { $scope.oral_lesion_tick = false; } else { $scope.oral_lesion_tick = true; }
            if ($scope.genital_lesion_tick === undefined || $scope.genital_lesion_tick === false) { $scope.genital_lesion_tick = false; } else { $scope.genital_lesion_tick = true; }
            if ($scope.lips_lesion_tick === undefined || $scope.lips_lesion_tick === false) { $scope.lips_lesion_tick = false; } else { $scope.lips_lesion_tick = true; }
            if ($scope.past_ho_lesion_tick === undefined || $scope.past_ho_lesion_tick === false) { $scope.past_ho_lesion_tick = false; } else { $scope.past_ho_lesion_tick = true; }
            if ($scope.family_history_tick === undefined || $scope.family_history_tick === false) { $scope.family_history_tick = false; } else { $scope.family_history_tick = true; }
            if ($scope.dm_tick === undefined || $scope.dm_tick === false) { $scope.dm_tick = false; } else { $scope.dm_tick = true; }
            if ($scope.liver_tick === undefined || $scope.liver_tick === false) { $scope.liver_tick = false; } else { $scope.liver_tick = true; }
            if ($scope.hypertension_tick === undefined || $scope.hypertension_tick === false) { $scope.hypertension_tick = false; } else { $scope.hypertension_tick = true; }
            if ($scope.anaemia_tick === undefined || $scope.anaemia_tick === false) { $scope.anaemia_tick = false; } else { $scope.anaemia_tick = true; }
            if ($scope.asthma_tick === undefined || $scope.asthma_tick === false) { $scope.asthma_tick = false; } else { $scope.asthma_tick = true; }
            if ($scope.pul_tb_tick === undefined || $scope.pul_tb_tick === false) { $scope.pul_tb_tick = false; } else { $scope.pul_tb_tick = true; }
            if ($scope.ihd_tick === undefined || $scope.ihd_tick === false) { $scope.ihd_tick = false; } else { $scope.ihd_tick = true; }
            if ($scope.other_disease_tick === undefined || $scope.other_disease_tick === false) { $scope.other_disease_tick = false; } else { $scope.other_disease_tick = true; }
            if ($scope.macule_skin_tick === undefined || $scope.macule_skin_tick === false) { $scope.macule_skin_tick = false; } else { $scope.macule_skin_tick = true; }
            if ($scope.papules_skin_tick === undefined || $scope.papules_skin_tick === false) { $scope.papules_skin_tick = false; } else { $scope.papules_skin_tick = true; }
            if ($scope.plaques_skin_tick === undefined || $scope.plaques_skin_tick === false) { $scope.plaques_skin_tick = false; } else { $scope.plaques_skin_tick = true; }
            if ($scope.hyperkeratotic_skin_tick === undefined || $scope.hyperkeratotic_skin_tick === false) { $scope.hyperkeratotic_skin_tick = false; } else { $scope.hyperkeratotic_skin_tick = true; }
            if ($scope.atrophic_skin_tick === undefined || $scope.atrophic_skin_tick === false) { $scope.atrophic_skin_tick = false; } else { $scope.atrophic_skin_tick = true; }
            if ($scope.follicular_skin_tick === undefined || $scope.follicular_skin_tick === false) { $scope.follicular_skin_tick = false; } else { $scope.follicular_skin_tick = true; }
            if ($scope.violaceous_skin_tick === undefined || $scope.violaceous_skin_tick === false) { $scope.violaceous_skin_tick = false; } else { $scope.violaceous_skin_tick = true; }
            if ($scope.eryth_skin_tick === undefined || $scope.eryth_skin_tick === false) { $scope.eryth_skin_tick = false; } else { $scope.eryth_skin_tick = true; }
            if ($scope.hyperpigment_skin_tick === undefined || $scope.hyperpigment_skin_tick === false) { $scope.hyperpigment_skin_tick = false; } else { $scope.hyperpigment_skin_tick = true; }
            if ($scope.annular_skin_tick === undefined || $scope.annular_skin_tick === false) { $scope.annular_skin_tick = false; } else { $scope.annular_skin_tick = true; }
            if ($scope.bullous_skin_tick === undefined || $scope.bullous_skin_tick === false) { $scope.bullous_skin_tick = false; } else { $scope.bullous_skin_tick = true; }
            if ($scope.ulcerative_skin_tick === undefined || $scope.ulcerative_skin_tick === false) { $scope.ulcerative_skin_tick = false; } else { $scope.ulcerative_skin_tick = true; }
            if ($scope.fissur_skin_tick === undefined || $scope.fissur_skin_tick === false) { $scope.fissur_skin_tick = false; } else { $scope.fissur_skin_tick = true; }
            if ($scope.buccal_mucosa_unilateral_tick === undefined || $scope.buccal_mucosa_unilateral_tick === false) { $scope.buccal_mucosa_unilateral_tick = false; } else { $scope.buccal_mucosa_unilateral_tick = true; }
            if ($scope.buccal_mucosa_bilateral_tick === undefined || $scope.buccal_mucosa_bilateral_tick === false) { $scope.buccal_mucosa_bilateral_tick = false; } else { $scope.buccal_mucosa_bilateral_tick = true; }
            if ($scope.tongue_mucosa_tick === undefined || $scope.tongue_mucosa_tick === false) { $scope.tongue_mucosa_tick = false; } else { $scope.tongue_mucosa_tick = true; }
            if ($scope.palatal_arch_mucosa_tick === undefined || $scope.palatal_arch_mucosa_tick === false) { $scope.palatal_arch_mucosa_tick = false; } else { $scope.palatal_arch_mucosa_tick = true; }
            if ($scope.mouth_floor_mucosa_tick === undefined || $scope.mouth_floor_mucosa_tick === false) { $scope.mouth_floor_mucosa_tick = false; } else { $scope.mouth_floor_mucosa_tick = true; }
            if ($scope.labial_mucosa_tick === undefined || $scope.labial_mucosa_tick === false) { $scope.labial_mucosa_tick = false; } else { $scope.labial_mucosa_tick = true; }
            if ($scope.gingiva_mucosa_tick === undefined || $scope.gingiva_mucosa_tick === false) { $scope.gingiva_mucosa_tick = false; } else { $scope.gingiva_mucosa_tick = true; }
            if ($scope.white_plaque_mucosa_tick === undefined || $scope.white_plaque_mucosa_tick === false) { $scope.white_plaque_mucosa_tick = false; } else { $scope.white_plaque_mucosa_tick = true; }
            if ($scope.violaceous_mucosa_tick === undefined || $scope.violaceous_mucosa_tick === false) { $scope.violaceous_mucosa_tick = false; } else { $scope.violaceous_mucosa_tick = true; }
            if ($scope.hyperpigmentation_mucosa_tick === undefined || $scope.hyperpigmentation_mucosa_tick === false) { $scope.hyperpigmentation_mucosa_tick = false; } else { $scope.hyperpigmentation_mucosa_tick = true; }
            if ($scope.papules_mucosa_tick === undefined || $scope.papules_mucosa_tick === false) { $scope.papules_mucosa_tick = false; } else { $scope.papules_mucosa_tick = true; }
            if ($scope.reticulate_mucosa_tick === undefined || $scope.reticulate_mucosa_tick === false) { $scope.reticulate_mucosa_tick = false; } else { $scope.reticulate_mucosa_tick = true; }
            if ($scope.ulcer_mucosa_tick === undefined || $scope.ulcer_mucosa_tick === false) { $scope.ulcer_mucosa_tick = false; } else { $scope.ulcer_mucosa_tick = true; }
            if ($scope.atrophic_mucosa_tick === undefined || $scope.atrophic_mucosa_tick === false) { $scope.atrophic_mucosa_tick = false; } else { $scope.atrophic_mucosa_tick = true; }
            if ($scope.erosive_mucosa_tick === undefined || $scope.erosive_mucosa_tick === false) { $scope.erosive_mucosa_tick = false; } else { $scope.erosive_mucosa_tick = true; }
            if ($scope.bullous_mucosa_tick === undefined || $scope.bullous_mucosa_tick === false) { $scope.bullous_mucosa_tick = false; } else { $scope.bullous_mucosa_tick = true; }
            if ($scope.mixed_mucosa_tick === undefined || $scope.mixed_mucosa_tick === false) { $scope.mixed_mucosa_tick = false; } else { $scope.mixed_mucosa_tick = true; }
            if ($scope.erythema_genitalia_mucosa_tick === undefined || $scope.erythema_genitalia_mucosa_tick === false) { $scope.erythema_genitalia_mucosa_tick = false; } else { $scope.erythema_genitalia_mucosa_tick = true; }
            if ($scope.voilaceous_genitalia_mucosa_tick === undefined || $scope.voilaceous_genitalia_mucosa_tick === false) { $scope.voilaceous_genitalia_mucosa_tick = false; } else { $scope.voilaceous_genitalia_mucosa_tick = true; }
            if ($scope.papules_genitalia_mucosa_tick === undefined || $scope.papules_genitalia_mucosa_tick === false) { $scope.papules_genitalia_mucosa_tick = false; } else { $scope.papules_genitalia_mucosa_tick = true; }
            if ($scope.plaques_genitalia_mucosa_tick === undefined || $scope.plaques_genitalia_mucosa_tick === false) { $scope.plaques_genitalia_mucosa_tick = false; } else { $scope.plaques_genitalia_mucosa_tick = true; }
            if ($scope.ulcers_genitalia_mucosa_tick === undefined || $scope.ulcers_genitalia_mucosa_tick === false) { $scope.ulcers_genitalia_mucosa_tick = false; } else { $scope.ulcers_genitalia_mucosa_tick = true; }
            if ($scope.fin_tick === undefined || $scope.fin_tick === false) { $scope.fin_tick = false; } else { $scope.fin_tick = true; }
            if ($scope.toe_tick === undefined || $scope.toe_tick === false) { $scope.toe_tick = false; } else { $scope.toe_tick = true; }
            if ($scope.b_tick === undefined || $scope.b_tick === false) { $scope.b_tick = false; } else { $scope.b_tick = true; }
            if ($scope.thining_nail_tick === undefined || $scope.thining_nail_tick === false) { $scope.thining_nail_tick = false; } else { $scope.thining_nail_tick = true; }
            if ($scope.onycho_nail_tick === undefined || $scope.onycho_nail_tick === false) { $scope.onycho_nail_tick = false; } else { $scope.onycho_nail_tick = true; }
            if ($scope.subungual_nail_tick === undefined || $scope.subungual_nail_tick === false) { $scope.subungual_nail_tick = false; } else { $scope.subungual_nail_tick = true; }
            if ($scope.pterygium_nail_tick === undefined || $scope.pterygium_nail_tick === false) { $scope.pterygium_nail_tick = false; } else { $scope.pterygium_nail_tick = true; }
            if ($scope.totaloss_nail_tick === undefined || $scope.totaloss_nail_tick === false) { $scope.totaloss_nail_tick = false; } else { $scope.totaloss_nail_tick = true; }
            if ($scope.long_melanon_nail_tick === undefined || $scope.long_melanon_nail_tick === false) { $scope.long_melanon_nail_tick = false; } else { $scope.long_melanon_nail_tick = true; }
            if ($scope.hyperpigment_nail_tick === undefined || $scope.hyperpigment_nail_tick === false) { $scope.hyperpigment_nail_tick = false; } else { $scope.hyperpigment_nail_tick = true; }
            if ($scope.diffuse_alop_scalp_tick === undefined || $scope.diffuse_alop_scalp_tick === false) { $scope.diffuse_alop_scalp_tick = false; } else { $scope.diffuse_alop_scalp_tick = true; }
            if ($scope.male_pattern_scalp_tick === undefined || $scope.male_pattern_scalp_tick === false) { $scope.male_pattern_scalp_tick = false; } else { $scope.male_pattern_scalp_tick = true; }
            if ($scope.scarring_scalp_tick === undefined || $scope.scarring_scalp_tick === false) { $scope.scarring_scalp_tick = false; } else { $scope.scarring_scalp_tick = true; }
            if ($scope.pupules_scalp_tick === undefined || $scope.pupules_scalp_tick === false) { $scope.pupules_scalp_tick = false; } else { $scope.pupules_scalp_tick = true; }
            if ($scope.follicular_scalp_tick === undefined || $scope.follicular_scalp_tick === false) { $scope.follicular_scalp_tick = false; } else { $scope.follicular_scalp_tick = true; }
            if ($scope.black_dots_scalp_tick === undefined || $scope.black_dots_scalp_tick === false) { $scope.black_dots_scalp_tick = false; } else { $scope.black_dots_scalp_tick = true; }
            if ($scope.palms_soles_tick === undefined || $scope.palms_soles_tick === false) { $scope.palms_soles_tick = false; } else { $scope.palms_soles_tick = true; }
            if ($scope.macule_palm_soles_tick === undefined || $scope.macule_palm_soles_tick === false) { $scope.macule_palm_soles_tick = false; } else { $scope.macule_palm_soles_tick = true; }
            if ($scope.papules_palm_soles_tick === undefined || $scope.papules_palm_soles_tick === false) { $scope.papules_palm_soles_tick = false; } else { $scope.papules_palm_soles_tick = true; }
            if ($scope.plaques_palm_soles_tick === undefined || $scope.plaques_palm_soles_tick === false) { $scope.plaques_palm_soles_tick = false; } else { $scope.plaques_palm_soles_tick = true; }
            if ($scope.hyperkerato_palm_soles_tick === undefined || $scope.hyperkerato_palm_soles_tick === false) { $scope.hyperkerato_palm_soles_tick = false; } else { $scope.hyperkerato_palm_soles_tick = true; }
            if ($scope.atrophic_palm_soles_tick === undefined || $scope.atrophic_palm_soles_tick === false) { $scope.atrophic_palm_soles_tick = false; } else { $scope.atrophic_palm_soles_tick = true; }
            if ($scope.erythem_palm_soles_tick === undefined || $scope.erythem_palm_soles_tick === false) { $scope.erythem_palm_soles_tick = false; } else { $scope.erythem_palm_soles_tick = true; }
            if ($scope.hyperpigment_palm_soles_tick === undefined || $scope.hyperpigment_palm_soles_tick === false) { $scope.hyperpigment_palm_soles_tick = false; } else { $scope.hyperpigment_palm_soles_tick = true; }
            if ($scope.bullous_palm_soles_tick === undefined || $scope.bullous_palm_soles_tick === false) { $scope.bullous_palm_soles_tick = false; } else { $scope.bullous_palm_soles_tick = true; }
            if ($scope.ulcer_palm_soles_tick === undefined || $scope.ulcer_palm_soles_tick === false) { $scope.ulcer_palm_soles_tick = false; } else { $scope.ulcer_palm_soles_tick = true; }
            if ($scope.fissur_palm_soles_tick === undefined || $scope.fissur_palm_soles_tick === false) { $scope.fissur_palm_soles_tick = false; } else { $scope.fissur_palm_soles_tick = true; }
            if ($scope.pruritus_tick === undefined || $scope.pruritus_tick === false) { $scope.pruritus_tick = false; } else { $scope.pruritus_tick = true; }
            if ($scope.senile_pruritus_tick === undefined || $scope.senile_pruritus_tick === false) { $scope.senile_pruritus_tick = false; } else { $scope.senile_pruritus_tick = true; }
            if ($scope.cuta_derma_pruritus_tick === undefined || $scope.cuta_derma_pruritus_tick === false) { $scope.cuta_derma_pruritus_tick = false; } else { $scope.cuta_derma_pruritus_tick = true; }
            if ($scope.systemic_disease_pruritus_tick === undefined || $scope.systemic_disease_pruritus_tick === false) { $scope.systemic_disease_pruritus_tick = false; } else { $scope.systemic_disease_pruritus_tick = true; }
            if ($scope.senile_xerosis_tick === undefined || $scope.senile_xerosis_tick === false) { $scope.senile_xerosis_tick = false; } else { $scope.senile_xerosis_tick = true; }
            if ($scope.senile_purpura_tick === undefined || $scope.senile_purpura_tick === false) { $scope.senile_purpura_tick = false; } else { $scope.senile_purpura_tick = true; }
            if ($scope.telang_tick === undefined || $scope.telang_tick === false) { $scope.telang_tick = false; } else { $scope.telang_tick = true; }
            if ($scope.comedones_tick === undefined || $scope.comedones_tick === false) { $scope.comedones_tick = false; } else { $scope.comedones_tick = true; }
            if ($scope.asta_exz_tick === undefined || $scope.asta_exz_tick === false) { $scope.asta_exz_tick = false; } else { $scope.asta_exz_tick = true; }
            if ($scope.atop_derma_tick === undefined || $scope.atop_derma_tick === false) { $scope.atop_derma_tick = false; } else { $scope.atop_derma_tick = true; }
            if ($scope.sebor_derma_tick === undefined || $scope.sebor_derma_tick === false) { $scope.sebor_derma_tick = false; } else { $scope.sebor_derma_tick = true; }
            if ($scope.stasis_derma_tick === undefined || $scope.stasis_derma_tick === false) { $scope.stasis_derma_tick = false; } else { $scope.stasis_derma_tick = true; }
            if ($scope.contact_derma_tick === undefined || $scope.contact_derma_tick === false) { $scope.contact_derma_tick = false; } else { $scope.contact_derma_tick = true; }
            if ($scope.lichen_simplex_tick === undefined || $scope.lichen_simplex_tick === false) { $scope.lichen_simplex_tick = false; } else { $scope.lichen_simplex_tick = true; }
            if ($scope.nummular_eczema_tick === undefined || $scope.nummular_eczema_tick === false) { $scope.nummular_eczema_tick = false; } else { $scope.nummular_eczema_tick = true; }
            if ($scope.photoderma_tick === undefined || $scope.photoderma_tick === false) { $scope.photoderma_tick = false; } else { $scope.photoderma_tick = true; }
            if ($scope.auto_derma_tick === undefined || $scope.auto_derma_tick === false) { $scope.auto_derma_tick = false; } else { $scope.auto_derma_tick = true; }
            if ($scope.fissured_soles_tick === undefined || $scope.fissured_soles_tick === false) { $scope.fissured_soles_tick = false; } else { $scope.fissured_soles_tick = true; }
            if ($scope.pemp_vulg_tick === undefined || $scope.pemp_vulg_tick === false) { $scope.pemp_vulg_tick = false; } else { $scope.pemp_vulg_tick = true; }
            if ($scope.pemphi_tick === undefined || $scope.pemphi_tick === false) { $scope.pemphi_tick = false; } else { $scope.pemphi_tick = true; }
            if ($scope.psoriasis_tick === undefined || $scope.psoriasis_tick === false) { $scope.psoriasis_tick = false; } else { $scope.psoriasis_tick = true; }
            if ($scope.vitiligo_tick === undefined || $scope.vitiligo_tick === false) { $scope.vitiligo_tick = false; } else { $scope.vitiligo_tick = true; }
            if ($scope.idio_guttate_tick === undefined || $scope.idio_guttate_tick === false) { $scope.idio_guttate_tick = false; } else { $scope.idio_guttate_tick = true; }
            if ($scope.cherry_tick === undefined || $scope.cherry_tick === false) { $scope.cherry_tick = false; } else { $scope.cherry_tick = true; }
            if ($scope.sebor_kerat_tick === undefined || $scope.sebor_kerat_tick === false) { $scope.sebor_kerat_tick = false; } else { $scope.sebor_kerat_tick = true; }
            if ($scope.naevi_tick === undefined || $scope.naevi_tick === false) { $scope.naevi_tick = false; } else { $scope.naevi_tick = true; }
            if ($scope.achro_tick === undefined || $scope.achro_tick === false) { $scope.achro_tick = false; } else { $scope.achro_tick = true; }
            if ($scope.xanthel_tick === undefined || $scope.xanthel_tick === false) { $scope.xanthel_tick = false; } else { $scope.xanthel_tick = true; }
            if ($scope.lichen_planus_tick === undefined || $scope.lichen_planus_tick === false) { $scope.lichen_planus_tick = false; } else { $scope.lichen_planus_tick = true; }
            if ($scope.urticaria_tick === undefined || $scope.urticaria_tick === false) { $scope.urticaria_tick = false; } else { $scope.urticaria_tick = true; }
            if ($scope.miliaria_tick === undefined || $scope.miliaria_tick === false) { $scope.miliaria_tick = false; } else { $scope.miliaria_tick = true; }
            if ($scope.erythoderma_tick === undefined || $scope.erythoderma_tick === false) { $scope.erythoderma_tick = false; } else { $scope.erythoderma_tick = true; }
            if ($scope.lenti_tick === undefined || $scope.lenti_tick === false) { $scope.lenti_tick = false; } else { $scope.lenti_tick = true; }
            if ($scope.callos_tick === undefined || $scope.callos_tick === false) { $scope.callos_tick = false; } else { $scope.callos_tick = true; }
            if ($scope.milia_tick === undefined || $scope.milia_tick === false) { $scope.milia_tick = false; } else { $scope.milia_tick = true; }
            if ($scope.acanthosis_tick === undefined || $scope.acanthosis_tick === false) { $scope.acanthosis_tick = false; } else { $scope.acanthosis_tick = true; }
            if ($scope.rhino_tick === undefined || $scope.rhino_tick === false) { $scope.rhino_tick = false; } else { $scope.rhino_tick = true; }
            if ($scope.freckles_tick === undefined || $scope.freckles_tick === false) { $scope.freckles_tick = false; } else { $scope.freckles_tick = true; }
            if ($scope.fungal_tick === undefined || $scope.fungal_tick === false) { $scope.fungal_tick = false; } else { $scope.fungal_tick = true; }
            if ($scope.tinea_fungal_tick === undefined || $scope.tinea_fungal_tick === false) { $scope.tinea_fungal_tick = false; } else { $scope.tinea_fungal_tick = true; }
            if ($scope.candida_fungal_tick === undefined || $scope.candida_fungal_tick === false) { $scope.candida_fungal_tick = false; } else { $scope.candida_fungal_tick = true; }
            if ($scope.pity_fungal_tick === undefined || $scope.pity_fungal_tick === false) { $scope.pity_fungal_tick = false; } else { $scope.pity_fungal_tick = true; }
            if ($scope.deep_fungal_tick === undefined || $scope.deep_fungal_tick === false) { $scope.deep_fungal_tick = false; } else { $scope.deep_fungal_tick = true; }
            if ($scope.herpes_tick === undefined || $scope.herpes_tick === false) { $scope.herpes_tick = false; } else { $scope.herpes_tick = true; }
            if ($scope.post_herpes_tick === undefined || $scope.post_herpes_tick === false) { $scope.post_herpes_tick = false; } else { $scope.post_herpes_tick = true; }
            if ($scope.herpes_simplex_tick === undefined || $scope.herpes_simplex_tick === false) { $scope.herpes_simplex_tick = false; } else { $scope.herpes_simplex_tick = true; }
            if ($scope.pyoderma_tick === undefined || $scope.pyoderma_tick === false) { $scope.pyoderma_tick = false; } else { $scope.pyoderma_tick = true; }
            if ($scope.leprosy_tick === undefined || $scope.leprosy_tick === false) { $scope.leprosy_tick = false; } else { $scope.leprosy_tick = true; }
            if ($scope.scabies_tick === undefined || $scope.scabies_tick === false) { $scope.scabies_tick = false; } else { $scope.scabies_tick = true; }
            if ($scope.warts_tick === undefined || $scope.warts_tick === false) { $scope.warts_tick = false; } else { $scope.warts_tick = true; }
            if ($scope.bedsore_tick === undefined || $scope.bedsore_tick === false) { $scope.bedsore_tick = false; } else { $scope.bedsore_tick = true; }
            if ($scope.prime_syp_tick === undefined || $scope.prime_syp_tick === false) { $scope.prime_syp_tick = false; } else { $scope.prime_syp_tick = true; }
            if ($scope.tb_verru_tick === undefined || $scope.tb_verru_tick === false) { $scope.tb_verru_tick = false; } else { $scope.tb_verru_tick = true; }
            if ($scope.others_tick === undefined || $scope.others_tick === false) { $scope.others_tick = false; } else { $scope.others_tick = true; }
                        if ($scope.lesion_tick === "") { $scope.lesion_tick = false; } else
             { $scope.lesion_tick = $scope.lesion_tick; }

            if ($scope.palms_soles_tick === "") { $scope.palms_soles_tick = false; } else
             { $scope.palms_soles_tick = $scope.palms_soles_tick; }


            if (vm.edit === true) {
                vm.url = "api/DermatologyAll/Update" //EDIT URL
            }
            else {
                vm.url = "api/DermatologyAll"
            }


            var userId = TokenService.getUserId();

            var dermoFormPayload = {

                ddate: $filter("date")(new Date(), "yyyy/MM/dd"),
                hospid:$scope.hospitalid,
                mrdno: $scope.mrdnum,
                pname: $scope.pname,
                age: $scope.age,
                sex: $scope.sex,
                occupation: $scope.occupation,
                education: $scope.education,
                address: $scope.address,
                income: $scope.income,
                complaints: $scope.complaints,
                itching: $scope.itching,
                mucosal_lesion_pain_tick: $scope.mucosal_lesion_pain_tick,
                lesion_tick: $scope.lesion_tick,
                cutaneous_tick: $scope.cutaneous_tick,
                cutaneous: $scope.cutaneous,
                oral_tick: $scope.oral_tick,
                oral: $scope.oral,
                genital_tick: $scope.genital_tick,
                genital: $scope.genital,
                nail_tick: $scope.nail_tick,
                nail: $scope.nail,
                scalp_tick: $scope.scalp_tick,
                scalp: $scope.scalp,
                macule_lesion_tick: $scope.macule_lesion_tick,
                papules_lesion_tick: $scope.papules_lesion_tick,
                palques_lesion_tick: $scope.palques_lesion_tick,
                erosions_lesion_tick: $scope.erosions_lesion_tick,
                ulcers_lesion_tick: $scope.ulcers_lesion_tick,
                vesicles_lesion_tick: $scope.vesicles_lesion_tick,
                bullae_lesion_tick: $scope.bullae_lesion_tick,
                scalp_lesion_tick: $scope.scalp_lesion_tick,
                face_lesion_tick: $scope.face_lesion_tick,
                trunk_lesion_tick: $scope.trunk_lesion_tick,
                upper_extremities_tick: $scope.upper_extremities_tick,
                lower_extremities_tick: $scope.lower_extremities_tick,
                flexure_lesion_tick: $scope.flexure_lesion_tick,
                extensor_lesion_tick: $scope.extensor_lesion_tick,
                palm_lesion_tick: $scope.palm_lesion_tick,
                soles_lesion_tick: $scope.soles_lesion_tick,
                nails_lesion_tick: $scope.nails_lesion_tick,
                oral_lesion_tick: $scope.oral_lesion_tick,
                genital_lesion_tick: $scope.genital_lesion_tick,
                lips_lesion_tick: $scope.lips_lesion_tick,
                past_ho_lesion_tick: $scope.past_ho_lesion_tick,
                family_history_tick: $scope.family_history_tick,
                dm_tick: $scope.dm_tick,
                liver_tick: $scope.liver_tick,
                hypertension_tick: $scope.hypertension_tick,
                anaemia_tick: $scope.anaemia_tick,
                asthma_tick: $scope.asthma_tick,
                pul_tb_tick: $scope.pul_tb_tick,
                ihd_tick: $scope.ihd_tick,
                other_disease_tick: $scope.other_disease_tick,
                other_disease: $scope.other_disease,
                morphology: $scope.morphology,
                macule_skin_tick: $scope.macule_skin_tick,
                papules_skin_tick: $scope.papules_skin_tick,
                plaques_skin_tick: $scope.plaques_skin_tick,
                hyperkeratotic_skin_tick: $scope.hyperkeratotic_skin_tick,
                atrophic_skin_tick: $scope.atrophic_skin_tick,
                follicular_skin_tick: $scope.follicular_skin_tick,
                violaceous_skin_tick: $scope.violaceous_skin_tick,
                eryth_skin_tick: $scope.eryth_skin_tick,
                hyperpigment_skin_tick: $scope.hyperpigment_skin_tick,
                annular_skin_tick: $scope.annular_skin_tick,
                bullous_skin_tick: $scope.bullous_skin_tick,
                ulcerative_skin_tick: $scope.ulcerative_skin_tick,
                fissur_skin_tick: $scope.fissur_skin_tick,
                buccal_mucosa_unilateral_tick: $scope.buccal_mucosa_unilateral_tick,
                buccal_mucosa_bilateral_tick: $scope.buccal_mucosa_bilateral_tick,
                tongue_mucosa_tick: $scope.tongue_mucosa_tick,
                palatal_arch_mucosa_tick: $scope.palatal_arch_mucosa_tick,
                mouth_floor_mucosa_tick: $scope.mouth_floor_mucosa_tick,
                labial_mucosa_tick: $scope.labial_mucosa_tick,
                gingiva_mucosa_tick: $scope.gingiva_mucosa_tick,
                white_plaque_mucosa_tick: $scope.white_plaque_mucosa_tick,
                violaceous_mucosa_tick: $scope.violaceous_mucosa_tick,
                hyperpigmentation_mucosa_tick: $scope.hyperpigmentation_mucosa_tick,
                papules_mucosa_tick: $scope.papules_mucosa_tick,
                reticulate_mucosa_tick: $scope.reticulate_mucosa_tick,
                ulcer_mucosa_tick: $scope.ulcer_mucosa_tick,
                atrophic_mucosa_tick: $scope.atrophic_mucosa_tick,
                erosive_mucosa_tick: $scope.erosive_mucosa_tick,
                bullous_mucosa_tick: $scope.bullous_mucosa_tick,
                mixed_mucosa_tick: $scope.mixed_mucosa_tick,
                erythema_genitalia_mucosa_tick: $scope.erythema_genitalia_mucosa_tick,
                voilaceous_genitalia_mucosa_tick: $scope.voilaceous_genitalia_mucosa_tick,
                papules_genitalia_mucosa_tick: $scope.papules_genitalia_mucosa_tick,
                plaques_genitalia_mucosa_tick: $scope.plaques_genitalia_mucosa_tick,
                ulcers_genitalia_mucosa_tick: $scope.ulcers_genitalia_mucosa_tick,
                fin_tick: $scope.fin_tick,
                toe_tick: $scope.toe_tick,
                b_tick: $scope.b_tick,
                thining_nail_tick: $scope.thining_nail_tick,
                onycho_nail_tick: $scope.onycho_nail_tick,
                subungual_nail_tick: $scope.subungual_nail_tick,
                pterygium_nail_tick: $scope.pterygium_nail_tick,
                totaloss_nail_tick: $scope.totaloss_nail_tick,
                long_melanon_nail_tick: $scope.long_melanon_nail_tick,
                hyperpigment_nail_tick: $scope.hyperpigment_nail_tick,
                diffuse_alop_scalp_tick: $scope.diffuse_alop_scalp_tick,
                male_pattern_scalp_tick: $scope.male_pattern_scalp_tick,
                scarring_scalp_tick: $scope.scarring_scalp_tick,
                pupules_scalp_tick: $scope.pupules_scalp_tick,
                follicular_scalp_tick: $scope.follicular_scalp_tick,
                black_dots_scalp_tick: $scope.black_dots_scalp_tick,
                palms_soles_tick: $scope.palms_soles_tick,
                macule_palm_soles_tick: $scope.macule_palm_soles_tick,
                papules_palm_soles_tick: $scope.papules_palm_soles_tick,
                plaques_palm_soles_tick: $scope.plaques_palm_soles_tick,
                hyperkerato_palm_soles_tick: $scope.hyperkerato_palm_soles_tick,
                atrophic_palm_soles_tick: $scope.atrophic_palm_soles_tick,
                erythem_palm_soles_tick: $scope.erythem_palm_soles_tick,
                hyperpigment_palm_soles_tick: $scope.hyperpigment_palm_soles_tick,
                bullous_palm_soles_tick: $scope.bullous_palm_soles_tick,
                ulcer_palm_soles_tick: $scope.ulcer_palm_soles_tick,
                fissur_palm_soles_tick: $scope.fissur_palm_soles_tick,
                senile_pruritus_tick: $scope.senile_pruritus_tick,
                cuta_derma_pruritus_tick: $scope.cuta_derma_pruritus_tick,
                systemic_disease_pruritus_tick: $scope.systemic_disease_pruritus_tick,
                senile_xerosis_tick: $scope.senile_xerosis_tick,
                senile_purpura_tick: $scope.senile_purpura_tick,
                telang_tick: $scope.telang_tick,
                comedones_tick: $scope.comedones_tick,
                asta_exz_tick: $scope.asta_exz_tick,
                atop_derma_tick: $scope.atop_derma_tick,
                sebor_derma_tick: $scope.sebor_derma_tick,
                stasis_derma_tick: $scope.stasis_derma_tick,
                contact_derma_tick: $scope.contact_derma_tick,
                lichen_simplex_tick: $scope.lichen_simplex_tick,
                nummular_eczema_tick: $scope.nummular_eczema_tick,
                photoderma_tick: $scope.photoderma_tick,
                auto_derma_tick: $scope.auto_derma_tick,
                fissured_soles_tick: $scope.fissured_soles_tick,
                pemp_vulg_tick: $scope.pemp_vulg_tick,
                pemphi_tick: $scope.pemphi_tick,
                psoriasis_tick: $scope.psoriasis_tick,
                vitiligo_tick: $scope.vitiligo_tick,
                idio_guttate_tick: $scope.idio_guttate_tick,
                cherry_tick: $scope.cherry_tick,
                sebor_kerat_tick: $scope.sebor_kerat_tick,
                naevi_tick: $scope.naevi_tick,
                achro_tick: $scope.achro_tick,
                xanthel_tick: $scope.xanthel_tick,
                lichen_planus_tick: $scope.lichen_planus_tick,
                urticaria_tick: $scope.urticaria_tick,
                miliaria_tick: $scope.miliaria_tick,
                erythoderma_tick: $scope.erythoderma_tick,
                lenti_tick: $scope.lenti_tick,
                callos_tick: $scope.callos_tick,
                milia_tick: $scope.milia_tick,
                acanthosis_tick: $scope.acanthosis_tick,
                rhino_tick: $scope.rhino_tick,
                freckles_tick: $scope.freckles_tick,
                fungal_tick: $scope.fungal_tick,
                tinea_fungal_tick: $scope.tinea_fungal_tick,
                candida_fungal_tick: $scope.candida_fungal_tick,
                pity_fungal_tick: $scope.pity_fungal_tick,
                deep_fungal_tick: $scope.deep_fungal_tick,
                herpes_tick: $scope.herpes_tick,
                post_herpes_tick: $scope.post_herpes_tick,
                herpes_simplex_tick: $scope.herpes_simplex_tick,
                pyoderma_tick: $scope.pyoderma_tick,
                leprosy_tick: $scope.leprosy_tick,
                scabies_tick: $scope.scabies_tick,
                warts_tick: $scope.warts_tick,
                bedsore_tick: $scope.bedsore_tick,
                prime_syp_tick: $scope.prime_syp_tick,
                tb_verru_tick: $scope.tb_verru_tick,
                others_tick: $scope.others_tick,
                others: $scope.others,
                leucocytes_cnt: $scope.leucocytes_cnt,
                dlc_n: $scope.dlc_n,
                dlc_l: $scope.dlc_l,
                dlc_e: $scope.dlc_e,
                dlc_m: $scope.dlc_m,
                esr: $scope.esr,
                hemoglobin: $scope.hemoglobin,
                bloodsugar_f: $scope.bloodsugar_f,
                bloodsugar_p: $scope.bloodsugar_p,
                blood_urea: $scope.blood_urea,
                serum_proteins: $scope.serum_proteins,
                serum_albumin: $scope.serum_albumin,
                lft: $scope.lft,
                skin_biopsy: $scope.skin_biopsy,
                treatment: $scope.treatment,

            };

            var token = localStorage.getItem("access_token");
            $http
                .post(
                    UrlConfig.labReportBaseUrl() + vm.url,
                    dermoFormPayload,
                    //   { headers: { Authorization: "Bearer " + token } }
                )

                .then(
                    function (result) {
                        vm.notification = {
                            mode: "success",
                            message: "This  report succcessfully saved.",
                        };
                        location.reload();
                        console.log(dermoFormPayload);

                    },
                    function (error) {
                        console.log(error);

                        var allErrors = error.data.message;
                        if (error.data.modelState) {
                            for (var msg in error.data.modelState) {
                                allErrors += "" + error.data.modelState[msg][0];
                            }
                        }

                        vm.notification = {
                            mode: "danger",
                            message: "Error: " + allErrors,
                        };
                    }
                );
            vm.noalert();
        };





        vm.onReportSelected = function () {
            vm.edit = true;
            vm.selectedReport = vm.DermoReportList;
            $scope.newmdr = vm.userMrd;
            $scope.ddate = new Date(vm.dermaReports.ddate);
            $scope.hospid = vm.dermaReports.hospid;
            $scope.mrdno = vm.dermaReports.mrdno;
            $scope.pname = vm.dermaReports.pname;
            $scope.age = vm.dermaReports.age;
            $scope.sex = vm.dermaReports.sex;
            $scope.occupation = vm.dermaReports.occupation;
            $scope.education = vm.dermaReports.education;
            $scope.address = vm.dermaReports.address;
            $scope.income = vm.dermaReports.income;
            $scope.complaints = vm.dermaReports.complaints;
            $scope.itching = vm.dermaReports.itching;
            $scope.mucosal_lesion_pain_tick = vm.dermaReports.mucosal_lesion_pain_tick;
            $scope.lesion_tick = vm.dermaReports.lesion_tick;
            $scope.cutaneous_tick = vm.dermaReports.cutaneous_tick;
            $scope.cutaneous = vm.dermaReports.cutaneous;
            $scope.oral_tick = vm.dermaReports.oral_tick;
            $scope.oral = vm.dermaReports.oral;
            $scope.genital_tick = vm.dermaReports.genital_tick;
            $scope.genital = vm.dermaReports.genital;
            $scope.nail_tick = vm.dermaReports.nail_tick;
            $scope.nail = vm.dermaReports.nail;
            $scope.scalp_tick = vm.dermaReports.scalp_tick;
            $scope.scalp = vm.dermaReports.scalp;
            $scope.macule_lesion_tick = vm.dermaReports.macule_lesion_tick;
            $scope.papules_lesion_tick = vm.dermaReports.papules_lesion_tick;
            $scope.palques_lesion_tick = vm.dermaReports.palques_lesion_tick;
            $scope.erosions_lesion_tick = vm.dermaReports.erosions_lesion_tick;
            $scope.ulcers_lesion_tick = vm.dermaReports.ulcers_lesion_tick;
            $scope.vesicles_lesion_tick = vm.dermaReports.vesicles_lesion_tick;
            $scope.bullae_lesion_tick = vm.dermaReports.bullae_lesion_tick;
            $scope.scalp_lesion_tick = vm.dermaReports.scalp_lesion_tick;
            $scope.face_lesion_tick = vm.dermaReports.face_lesion_tick;
            $scope.trunk_lesion_tick = vm.dermaReports.trunk_lesion_tick;
            $scope.upper_extremities_tick = vm.dermaReports.upper_extremities_tick;
            $scope.lower_extremities_tick = vm.dermaReports.lower_extremities_tick;
            $scope.flexure_lesion_tick = vm.dermaReports.flexure_lesion_tick;
            $scope.extensor_lesion_tick = vm.dermaReports.extensor_lesion_tick;
            $scope.palm_lesion_tick = vm.dermaReports.palm_lesion_tick;
            $scope.soles_lesion_tick = vm.dermaReports.soles_lesion_tick;
            $scope.nails_lesion_tick = vm.dermaReports.nails_lesion_tick;
            $scope.oral_lesion_tick = vm.dermaReports.oral_lesion_tick;
            $scope.genital_lesion_tick = vm.dermaReports.genital_lesion_tick;
            $scope.lips_lesion_tick = vm.dermaReports.lips_lesion_tick;
            $scope.past_ho_lesion_tick = vm.dermaReports.past_ho_lesion_tick;
            $scope.family_history_tick = vm.dermaReports.family_history_tick;
            $scope.dm_tick = vm.dermaReports.dm_tick;
            $scope.liver_tick = vm.dermaReports.liver_tick;
            $scope.hypertension_tick = vm.dermaReports.hypertension_tick;
            $scope.anaemia_tick = vm.dermaReports.anaemia_tick;
            $scope.asthma_tick = vm.dermaReports.asthma_tick;
            $scope.pul_tb_tick = vm.dermaReports.pul_tb_tick;
            $scope.ihd_tick = vm.dermaReports.ihd_tick;
            $scope.other_disease_tick = vm.dermaReports.other_disease_tick;
            $scope.other_disease = vm.dermaReports.other_disease;
            $scope.morphology = vm.dermaReports.morphology;
            $scope.macule_skin_tick = vm.dermaReports.macule_skin_tick;
            $scope.papules_skin_tick = vm.dermaReports.papules_skin_tick;
            $scope.plaques_skin_tick = vm.dermaReports.plaques_skin_tick;
            $scope.hyperkeratotic_skin_tick = vm.dermaReports.hyperkeratotic_skin_tick;
            $scope.atrophic_skin_tick = vm.dermaReports.atrophic_skin_tick;
            $scope.follicular_skin_tick = vm.dermaReports.follicular_skin_tick;
            $scope.violaceous_skin_tick = vm.dermaReports.violaceous_skin_tick;
            $scope.eryth_skin_tick = vm.dermaReports.eryth_skin_tick;
            $scope.hyperpigment_skin_tick = vm.dermaReports.hyperpigment_skin_tick;
            $scope.annular_skin_tick = vm.dermaReports.annular_skin_tick;
            $scope.bullous_skin_tick = vm.dermaReports.bullous_skin_tick;
            $scope.ulcerative_skin_tick = vm.dermaReports.ulcerative_skin_tick;
            $scope.fissur_skin_tick = vm.dermaReports.fissur_skin_tick;
            $scope.buccal_mucosa_unilateral_tick = vm.dermaReports.buccal_mucosa_unilateral_tick;
            $scope.buccal_mucosa_bilateral_tick = vm.dermaReports.buccal_mucosa_bilateral_tick;
            $scope.tongue_mucosa_tick = vm.dermaReports.tongue_mucosa_tick;
            $scope.palatal_arch_mucosa_tick = vm.dermaReports.palatal_arch_mucosa_tick;
            $scope.mouth_floor_mucosa_tick = vm.dermaReports.mouth_floor_mucosa_tick;
            $scope.labial_mucosa_tick = vm.dermaReports.labial_mucosa_tick;
            $scope.gingiva_mucosa_tick = vm.dermaReports.gingiva_mucosa_tick;
            $scope.white_plaque_mucosa_tick = vm.dermaReports.white_plaque_mucosa_tick;
            $scope.violaceous_mucosa_tick = vm.dermaReports.violaceous_mucosa_tick;
            $scope.hyperpigmentation_mucosa_tick = vm.dermaReports.hyperpigmentation_mucosa_tick;
            $scope.papules_mucosa_tick = vm.dermaReports.papules_mucosa_tick;
            $scope.reticulate_mucosa_tick = vm.dermaReports.reticulate_mucosa_tick;
            $scope.ulcer_mucosa_tick = vm.dermaReports.ulcer_mucosa_tick;
            $scope.atrophic_mucosa_tick = vm.dermaReports.atrophic_mucosa_tick;
            $scope.erosive_mucosa_tick = vm.dermaReports.erosive_mucosa_tick;
            $scope.bullous_mucosa_tick = vm.dermaReports.bullous_mucosa_tick;
            $scope.mixed_mucosa_tick = vm.dermaReports.mixed_mucosa_tick;
            $scope.erythema_genitalia_mucosa_tick = vm.dermaReports.erythema_genitalia_mucosa_tick;
            $scope.voilaceous_genitalia_mucosa_tick = vm.dermaReports.voilaceous_genitalia_mucosa_tick;
            $scope.papules_genitalia_mucosa_tick = vm.dermaReports.papules_genitalia_mucosa_tick;
            $scope.plaques_genitalia_mucosa_tick = vm.dermaReports.plaques_genitalia_mucosa_tick;
            $scope.ulcers_genitalia_mucosa_tick = vm.dermaReports.ulcers_genitalia_mucosa_tick;
            $scope.fin_tick = vm.dermaReports.fin_tick;
            $scope.toe_tick = vm.dermaReports.toe_tick;
            $scope.b_tick = vm.dermaReports.b_tick;
            $scope.thining_nail_tick = vm.dermaReports.thining_nail_tick;
            $scope.onycho_nail_tick = vm.dermaReports.onycho_nail_tick;
            $scope.subungual_nail_tick = vm.dermaReports.subungual_nail_tick;
            $scope.pterygium_nail_tick = vm.dermaReports.pterygium_nail_tick;
            $scope.totaloss_nail_tick = vm.dermaReports.totaloss_nail_tick;
            $scope.long_melanon_nail_tick = vm.dermaReports.long_melanon_nail_tick;
            $scope.hyperpigment_nail_tick = vm.dermaReports.hyperpigment_nail_tick;
            $scope.diffuse_alop_scalp_tick = vm.dermaReports.diffuse_alop_scalp_tick;
            $scope.male_pattern_scalp_tick = vm.dermaReports.male_pattern_scalp_tick;
            $scope.scarring_scalp_tick = vm.dermaReports.scarring_scalp_tick;
            $scope.pupules_scalp_tick = vm.dermaReports.pupules_scalp_tick;
            $scope.follicular_scalp_tick = vm.dermaReports.follicular_scalp_tick;
            $scope.black_dots_scalp_tick = vm.dermaReports.black_dots_scalp_tick;
            $scope.palms_soles_tick = vm.dermaReports.palms_soles_tick;
            $scope.macule_palm_soles_tick = vm.dermaReports.macule_palm_soles_tick;
            $scope.papules_palm_soles_tick = vm.dermaReports.papules_palm_soles_tick;
            $scope.plaques_palm_soles_tick = vm.dermaReports.plaques_palm_soles_tick;
            $scope.hyperkerato_palm_soles_tick = vm.dermaReports.hyperkerato_palm_soles_tick;
            $scope.atrophic_palm_soles_tick = vm.dermaReports.atrophic_palm_soles_tick;
            $scope.erythem_palm_soles_tick = vm.dermaReports.erythem_palm_soles_tick;
            $scope.hyperpigment_palm_soles_tick = vm.dermaReports.hyperpigment_palm_soles_tick;
            $scope.bullous_palm_soles_tick = vm.dermaReports.bullous_palm_soles_tick;
            $scope.ulcer_palm_soles_tick = vm.dermaReports.ulcer_palm_soles_tick;
            $scope.fissur_palm_soles_tick = vm.dermaReports.fissur_palm_soles_tick;
            $scope.pruritus_tick = vm.dermaReports.pruritus_tick;
            $scope.senile_pruritus_tick = vm.dermaReports.senile_pruritus_tick;
            $scope.cuta_derma_pruritus_tick = vm.dermaReports.cuta_derma_pruritus_tick;
            $scope.systemic_disease_pruritus_tick = vm.dermaReports.systemic_disease_pruritus_tick;
            $scope.senile_xerosis_tick = vm.dermaReports.senile_xerosis_tick;
            $scope.senile_purpura_tick = vm.dermaReports.senile_purpura_tick;
            $scope.telang_tick = vm.dermaReports.telang_tick;
            $scope.comedones_tick = vm.dermaReports.comedones_tick;
            $scope.asta_exz_tick = vm.dermaReports.asta_exz_tick;
            $scope.atop_derma_tick = vm.dermaReports.atop_derma_tick;
            $scope.sebor_derma_tick = vm.dermaReports.sebor_derma_tick;
            $scope.stasis_derma_tick = vm.dermaReports.stasis_derma_tick;
            $scope.contact_derma_tick = vm.dermaReports.contact_derma_tick;
            $scope.lichen_simplex_tick = vm.dermaReports.lichen_simplex_tick;
            $scope.nummular_eczema_tick = vm.dermaReports.nummular_eczema_tick;
            $scope.photoderma_tick = vm.dermaReports.photoderma_tick;
            $scope.auto_derma_tick = vm.dermaReports.auto_derma_tick;
            $scope.fissured_soles_tick = vm.dermaReports.fissured_soles_tick;
            $scope.pemp_vulg_tick = vm.dermaReports.pemp_vulg_tick;
            $scope.pemphi_tick = vm.dermaReports.pemphi_tick;
            $scope.psoriasis_tick = vm.dermaReports.psoriasis_tick;
            $scope.vitiligo_tick = vm.dermaReports.vitiligo_tick;
            $scope.idio_guttate_tick = vm.dermaReports.idio_guttate_tick;
            $scope.cherry_tick = vm.dermaReports.cherry_tick;
            $scope.sebor_kerat_tick = vm.dermaReports.sebor_kerat_tick;
            $scope.naevi_tick = vm.dermaReports.naevi_tick;
            $scope.achro_tick = vm.dermaReports.achro_tick;
            $scope.xanthel_tick = vm.dermaReports.xanthel_tick;
            $scope.lichen_planus_tick = vm.dermaReports.lichen_planus_tick;
            $scope.urticaria_tick = vm.dermaReports.urticaria_tick;
            $scope.miliaria_tick = vm.dermaReports.miliaria_tick;
            $scope.erythoderma_tick = vm.dermaReports.erythoderma_tick;
            $scope.lenti_tick = vm.dermaReports.lenti_tick;
            $scope.callos_tick = vm.dermaReports.callos_tick;
            $scope.milia_tick = vm.dermaReports.milia_tick;
            $scope.acanthosis_tick = vm.dermaReports.acanthosis_tick;
            $scope.rhino_tick = vm.dermaReports.rhino_tick;
            $scope.freckles_tick = vm.dermaReports.freckles_tick;
            $scope.fungal_tick = vm.dermaReports.fungal_tick;
            $scope.tinea_fungal_tick = vm.dermaReports.tinea_fungal_tick;
            $scope.candida_fungal_tick = vm.dermaReports.candida_fungal_tick;
            $scope.pity_fungal_tick = vm.dermaReports.pity_fungal_tick;
            $scope.deep_fungal_tick = vm.dermaReports.deep_fungal_tick;
            $scope.herpes_tick = vm.dermaReports.herpes_tick;
            $scope.post_herpes_tick = vm.dermaReports.post_herpes_tick;
            $scope.herpes_simplex_tick = vm.dermaReports.herpes_simplex_tick;
            $scope.pyoderma_tick = vm.dermaReports.pyoderma_tick;
            $scope.leprosy_tick = vm.dermaReports.leprosy_tick;
            $scope.scabies_tick = vm.dermaReports.scabies_tick;
            $scope.warts_tick = vm.dermaReports.warts_tick;
            $scope.bedsore_tick = vm.dermaReports.bedsore_tick;
            $scope.prime_syp_tick = vm.dermaReports.prime_syp_tick;
            $scope.tb_verru_tick = vm.dermaReports.tb_verru_tick;
            $scope.others_tick = vm.dermaReports.others_tick;
            $scope.others = vm.dermaReports.others;
            $scope.leucocytes_cnt = vm.dermaReports.leucocytes_cnt;
            $scope.dlc_n = vm.dermaReports.dlc_n;
            $scope.dlc_l = vm.dermaReports.dlc_l;
            $scope.dlc_e = vm.dermaReports.dlc_e;
            $scope.dlc_m = vm.dermaReports.dlc_m;
            $scope.esr = vm.dermaReports.esr;
            $scope.hemoglobin = vm.dermaReports.hemoglobin;
            $scope.bloodsugar_f = vm.dermaReports.bloodsugar_f;
            $scope.bloodsugar_p = vm.dermaReports.bloodsugar_p;
            $scope.blood_urea = vm.dermaReports.blood_urea;
            $scope.serum_proteins = vm.dermaReports.serum_proteins;
            $scope.serum_albumin = vm.dermaReports.serum_albumin;
            $scope.lft = vm.dermaReports.lft;
            $scope.skin_biopsy = vm.dermaReports.skin_biopsy;
            $scope.treatment = vm.dermaReports.treatment;

        }



        vm.deleteRecord = function () {
            if (confirm('Are you sure you want to delete this record?')) {
                var userId = TokenService.getUserId();

                var mrdPayload = {
                    mrdno: vm.userMrd,
                };
                var token = localStorage.getItem('access_token');
                $http.post(UrlConfig.labReportBaseUrl() + 'api/DermatologyDetails/Delete',
                    mrdPayload, { headers: { Authorization: 'Bearer ' + token } })

                    .then(function (result) {
                        // console.log(result.data);
                        vm.notification = { mode: 'success', message: 'Dermatology report deleted' };
                        vm.fetchDermoFormList();

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








        $scope.IsVisible = false;
        $scope.ShowHide = function () {
            //If DIV is visible it will be hidden and vice versa.
            $scope.IsVisible = $scope.IsVisible ? false : true;
        }






        vm.onInvoiceSelected = function (invoice) {
            vm.selectedInvoice = invoice;
            window.open('#!/servicereport?id=' + vm.selectedInvoice.inv_no + '&servid=' + vm.selectedInvoice.servid + '&sn=' + vm.selectedInvoice.sn,
                '_blank', '');
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
                filename: vm.pagetitle + "_" + vm.initdate + "To " + vm.finaldate + ".xls"
            });
        }

        vm.noalert = function () {
            $timeout(vm.resetNotification, 4000);
        }
        vm.reload = function () {
            $timeout(vm.reloadfn, 3000);
        };

        vm.reloadfn = function(){
            location.reload();
        }

        vm.toDash = function(){
            window.open('#!/dashboard?mrdno=' + $scope.mrdnum,
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


    }]);