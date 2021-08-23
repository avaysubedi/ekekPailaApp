app.controller('PastEyeHistoryController', ['$http', 'UrlConfig', 'TokenService', '$scope', '$routeParams',
 '$timeout', 'BroadcastService', '$filter','$anchorScroll',
    function ($http, UrlConfig, TokenService, $scope, $routeParams, $timeout, BroadcastService, $filter,$anchorScroll) {

        var vm = this;
        vm.selectedTitle = null;
        vm.selectedOpdBill = null;

        vm.pagetitle = "Past Eye History";


        vm.notification = {
            message: '',
            mode: 'info'
        };

        vm.init = function () {
            $anchorScroll();
            $scope.loadtrue = true;
            vm.showEdit = false;

            TokenService.navigateToLoginOnInvalidToken('pasteyehistory');
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
        };


        vm.fetchUserReportList = function () {
            $scope.loadtrue = true;
            $scope.noReport = false;
            $scope.showReport = false;
            //api/PastEyeHistoryAll

            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/PastEyeHistoryDetails?mrdno=' + $scope.mrdnum, { headers: { Authorization: 'Bearer ' + token } })
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
            $http.get(UrlConfig.labReportBaseUrl() + 'api/PastEyeHistoryAll?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    $scope.loadtrue = false;
                    vm.pastHistory = result.data;

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
                $http.post(UrlConfig.labReportBaseUrl() + 'api/PastEyeHistoryDetails/Delete',
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

        vm.submitPastEyeHistory = function () {
            if (vm.showEdit === true) {
                vm.url = 'api/PastEyeHistoryAll/Update'
            }
            else {
                vm.url = 'api/PastEyeHistoryAll'
            }

            if ($scope.eyeproblem_od_tick === "1") { $scope.eyeproblem_od_tick = true; } else { $scope.eyeproblem_od_tick = false; }
            if ($scope.eyeproblem_glaucoma_od_tick === "1") { $scope.eyeproblem_glaucoma_od_tick = true; } else { $scope.eyeproblem_glaucoma_od_tick = false; }
            if ($scope.eyeproblem_cataract_od_tick === "1") { $scope.eyeproblem_cataract_od_tick = true; } else { $scope.eyeproblem_cataract_od_tick = false; }
            if ($scope.eyeproblem_retina_od_tick === "1") { $scope.eyeproblem_retina_od_tick = true; } else { $scope.eyeproblem_retina_od_tick = false; }
            if ($scope.eyeproblem_squint_od_tick === "1") { $scope.eyeproblem_squint_od_tick = true; } else { $scope.eyeproblem_squint_od_tick = false; }
            if ($scope.eyeproblem_corneal_od_tick === "1") { $scope.eyeproblem_corneal_od_tick = true; } else { $scope.eyeproblem_corneal_od_tick = false; }
            if ($scope.eyeproblem_opalrelated_od_tick === "1") { $scope.eyeproblem_opalrelated_od_tick = true; } else { $scope.eyeproblem_opalrelated_od_tick = false; }
            if ($scope.eyeproblem_uveal_od_tick === "1") { $scope.eyeproblem_uveal_od_tick = true; } else { $scope.eyeproblem_uveal_od_tick = false; }
            if ($scope.eyeproblem_neuro_od_tick === "1") { $scope.eyeproblem_neuro_od_tick = true; } else { $scope.eyeproblem_neuro_od_tick = false; }
            if ($scope.eyeproblem_others_od_tick === "1") { $scope.eyeproblem_others_od_tick = true; } else { $scope.eyeproblem_others_od_tick = false; }
            if ($scope.eyeproblem_os_tick === "1") { $scope.eyeproblem_os_tick = true; } else { $scope.eyeproblem_os_tick = false; }
            if ($scope.eyeproblem_glaucoma_os_tick === "1") { $scope.eyeproblem_glaucoma_os_tick = true; } else { $scope.eyeproblem_glaucoma_os_tick = false; }
            if ($scope.eyeproblem_cataract_os_tick === "1") { $scope.eyeproblem_cataract_os_tick = true; } else { $scope.eyeproblem_cataract_os_tick = false; }
            if ($scope.eyeproblem_retina_os_tick === "1") { $scope.eyeproblem_retina_os_tick = true; } else { $scope.eyeproblem_retina_os_tick = false; }
            if ($scope.eyeproblem_squint_os_tick === "1") { $scope.eyeproblem_squint_os_tick = true; } else { $scope.eyeproblem_squint_os_tick = false; }
            if ($scope.eyeproblem_corneal_os_tick === "1") { $scope.eyeproblem_corneal_os_tick = true; } else { $scope.eyeproblem_corneal_os_tick = false; }
            if ($scope.eyeproblem_opalrelated_os_tick === "1") { $scope.eyeproblem_opalrelated_os_tick = true; } else { $scope.eyeproblem_opalrelated_os_tick = false; }
            if ($scope.eyeproblem_uveal_os_tick === "1") { $scope.eyeproblem_uveal_os_tick = true; } else { $scope.eyeproblem_uveal_os_tick = false; }
            if ($scope.eyeproblem_neuro_os_tick === "1") { $scope.eyeproblem_neuro_os_tick = true; } else { $scope.eyeproblem_neuro_os_tick = false; }
            if ($scope.eyeproblem_others_os_tick === "1") { $scope.eyeproblem_others_os_tick = true; } else { $scope.eyeproblem_others_os_tick = false; }
            if ($scope.trauma_od_tick === "1") { $scope.trauma_od_tick = true; } else { $scope.trauma_od_tick = false; }
            if ($scope.trauma_blunt_od_tick === "1") { $scope.trauma_blunt_od_tick = true; } else { $scope.trauma_blunt_od_tick = false; }
            if ($scope.trauma_penetrating_od_tick === "1") { $scope.trauma_penetrating_od_tick = true; } else { $scope.trauma_penetrating_od_tick = false; }
            if ($scope.trauma_others_od_tick === "1") { $scope.trauma_others_od_tick = true; } else { $scope.trauma_others_od_tick = false; }
            if ($scope.trauma_os_tick === "1") { $scope.trauma_os_tick = true; } else { $scope.trauma_os_tick = false; }
            if ($scope.trauma_blunt_os_tick === "1") { $scope.trauma_blunt_os_tick = true; } else { $scope.trauma_blunt_os_tick = false; }
            if ($scope.trauma_penetrating_os_tick === "1") { $scope.trauma_penetrating_os_tick = true; } else { $scope.trauma_penetrating_os_tick = false; }
            if ($scope.trauma_others_os_tick === "1") { $scope.trauma_others_os_tick = true; } else { $scope.trauma_others_os_tick = false; }
            if ($scope.treatment_od_tick === "1") { $scope.treatment_od_tick = true; } else { $scope.treatment_od_tick = false; }
            if ($scope.treatment_medical_od_tick === "1") { $scope.treatment_medical_od_tick = true; } else { $scope.treatment_medical_od_tick = false; }
            if ($scope.treatment_surgical_od_tick === "1") { $scope.treatment_surgical_od_tick = true; } else { $scope.treatment_surgical_od_tick = false; }
            if ($scope.treatment_donotknow_od_tick === "1") { $scope.treatment_donotknow_od_tick = true; } else { $scope.treatment_donotknow_od_tick = false; }
            if ($scope.treatment_os_tick === "1") { $scope.treatment_os_tick = true; } else { $scope.treatment_os_tick = false; }
            if ($scope.treatment_medical_os_tick === "1") { $scope.treatment_medical_os_tick = true; } else { $scope.treatment_medical_os_tick = false; }
            if ($scope.treatment_surgical_os_tick === "1") { $scope.treatment_surgical_os_tick = true; } else { $scope.treatment_surgical_os_tick = false; }
            if ($scope.treatment_donotknow_os_tick === "1") { $scope.treatment_donotknow_os_tick = true; } else { $scope.treatment_donotknow_os_tick = false; }
            if ($scope.surg_od_tick === "1") { $scope.surg_od_tick = true; } else { $scope.surg_od_tick = false; }
            if ($scope.surg_glaucoma_od_tick === "1") { $scope.surg_glaucoma_od_tick = true; } else { $scope.surg_glaucoma_od_tick = false; }
            if ($scope.surg_cataract_od_tick === "1") { $scope.surg_cataract_od_tick = true; } else { $scope.surg_cataract_od_tick = false; }
            if ($scope.surg_retina_od_tick === "1") { $scope.surg_retina_od_tick = true; } else { $scope.surg_retina_od_tick = false; }
            if ($scope.surg_squint_od_tick === "1") { $scope.surg_squint_od_tick = true; } else { $scope.surg_squint_od_tick = false; }
            if ($scope.surg_corneal_od_tick === "1") { $scope.surg_corneal_od_tick = true; } else { $scope.surg_corneal_od_tick = false; }
            if ($scope.surg_opalrela_od_tick === "1") { $scope.surg_opalrela_od_tick = true; } else { $scope.surg_opalrela_od_tick = false; }
            if ($scope.surg_uveal_od_tick === "1") { $scope.surg_uveal_od_tick = true; } else { $scope.surg_uveal_od_tick = false; }
            if ($scope.surg_neuroopthamalic_od_tick === "1") { $scope.surg_neuroopthamalic_od_tick = true; } else { $scope.surg_neuroopthamalic_od_tick = false; }
            if ($scope.surg_others_od_tick === "1") { $scope.surg_others_od_tick = true; } else { $scope.surg_others_od_tick = false; }
            if ($scope.surg_os_tick === "1") { $scope.surg_os_tick = true; } else { $scope.surg_os_tick = false; }
            if ($scope.surg_glaucoma_os_tick === "1") { $scope.surg_glaucoma_os_tick = true; } else { $scope.surg_glaucoma_os_tick = false; }
            if ($scope.surg_cataract_os_tick === "1") { $scope.surg_cataract_os_tick = true; } else { $scope.surg_cataract_os_tick = false; }
            if ($scope.surg_retina_os_tick === "1") { $scope.surg_retina_os_tick = true; } else { $scope.surg_retina_os_tick = false; }
            if ($scope.surg_squint_os_tick === "1") { $scope.surg_squint_os_tick = true; } else { $scope.surg_squint_os_tick = false; }
            if ($scope.surg_corneal_os_tick === "1") { $scope.surg_corneal_os_tick = true; } else { $scope.surg_corneal_os_tick = false; }
            if ($scope.surg_opalrela_os_tick === "1") { $scope.surg_opalrela_os_tick = true; } else { $scope.surg_opalrela_os_tick = false; }
            if ($scope.surg_uveal_os_tick === "1") { $scope.surg_uveal_os_tick = true; } else { $scope.surg_uveal_os_tick = false; }
            if ($scope.surg_neuroopthamalic_os_tick === "1") { $scope.surg_neuroopthamalic_os_tick = true; } else { $scope.surg_neuroopthamalic_os_tick = false; }
            if ($scope.surg_others_os_tick === "1") { $scope.surg_others_os_tick = true; } else { $scope.surg_others_os_tick = false; }
            if ($scope.systill_od_tick === "1") { $scope.systill_od_tick = true; } else { $scope.systill_od_tick = false; }
            if ($scope.systill_hyperten_od_tick === "1") { $scope.systill_hyperten_od_tick = true; } else { $scope.systill_hyperten_od_tick = false; }
            if ($scope.systill_diabetic_od_tick === "1") { $scope.systill_diabetic_od_tick = true; } else { $scope.systill_diabetic_od_tick = false; }
            if ($scope.systill_asthama_od_tick === "1") { $scope.systill_asthama_od_tick = true; } else { $scope.systill_asthama_od_tick = false; }
            if ($scope.systill_cardiac_od_tick === "1") { $scope.systill_cardiac_od_tick = true; } else { $scope.systill_cardiac_od_tick = false; }
            if ($scope.systill_thyriod_od_tick === "1") { $scope.systill_thyriod_od_tick = true; } else { $scope.systill_thyriod_od_tick = false; }
            if ($scope.systill_cereb_od_tick === "1") { $scope.systill_cereb_od_tick = true; } else { $scope.systill_cereb_od_tick = false; }
            if ($scope.systill_hyper_od_tick === "1") { $scope.systill_hyper_od_tick = true; } else { $scope.systill_hyper_od_tick = false; }
            if ($scope.systill_kidney_od_tick === "1") { $scope.systill_kidney_od_tick = true; } else { $scope.systill_kidney_od_tick = false; }
            if ($scope.systill_anemia_od_tick === "1") { $scope.systill_anemia_od_tick = true; } else { $scope.systill_anemia_od_tick = false; }
            if ($scope.systill_eyeprob_od_tick === "1") { $scope.systill_eyeprob_od_tick = true; } else { $scope.systill_eyeprob_od_tick = false; }
            if ($scope.systill_rheu_od_tick === "1") { $scope.systill_rheu_od_tick = true; } else { $scope.systill_rheu_od_tick = false; }
            if ($scope.systill_inf_od_tick === "1") { $scope.systill_inf_od_tick = true; } else { $scope.systill_inf_od_tick = false; }
            if ($scope.systill_others_od_tick === "1") { $scope.systill_others_od_tick = true; } else { $scope.systill_others_od_tick = false; }
            if ($scope.systill_os_tick === "1") { $scope.systill_os_tick = true; } else { $scope.systill_os_tick = false; }
            if ($scope.systill_hyperten_os_tick === "1") { $scope.systill_hyperten_os_tick = true; } else { $scope.systill_hyperten_os_tick = false; }
            if ($scope.systill_diabetic_os_tick === "1") { $scope.systill_diabetic_os_tick = true; } else { $scope.systill_diabetic_os_tick = false; }
            if ($scope.systill_asthama_os_tick === "1") { $scope.systill_asthama_os_tick = true; } else { $scope.systill_asthama_os_tick = false; }
            if ($scope.systill_cardiac_os_tick === "1") { $scope.systill_cardiac_os_tick = true; } else { $scope.systill_cardiac_os_tick = false; }
            if ($scope.systill_thyriod_os_tick === "1") { $scope.systill_thyriod_os_tick = true; } else { $scope.systill_thyriod_os_tick = false; }
            if ($scope.systill_cereb_os_tick === "1") { $scope.systill_cereb_os_tick = true; } else { $scope.systill_cereb_os_tick = false; }
            if ($scope.systill_hyper_os_tick === "1") { $scope.systill_hyper_os_tick = true; } else { $scope.systill_hyper_os_tick = false; }
            if ($scope.systill_kidney_os_tick === "1") { $scope.systill_kidney_os_tick = true; } else { $scope.systill_kidney_os_tick = false; }
            if ($scope.systill_anemia_os_tick === "1") { $scope.systill_anemia_os_tick = true; } else { $scope.systill_anemia_os_tick = false; }
            if ($scope.systill_eyeprob_os_tick === "1") { $scope.systill_eyeprob_os_tick = true; } else { $scope.systill_eyeprob_os_tick = false; }
            if ($scope.systill_rheu_os_tick === "1") { $scope.systill_rheu_os_tick = true; } else { $scope.systill_rheu_os_tick = false; }
            if ($scope.systill_inf_os_tick === "1") { $scope.systill_inf_os_tick = true; } else { $scope.systill_inf_os_tick = false; }
            if ($scope.systill_others_os_tick === "1") { $scope.systill_others_os_tick = true; } else { $scope.systill_others_os_tick = false; }
            if ($scope.hisofstre_od_tick === "1") { $scope.hisofstre_od_tick = true; } else { $scope.hisofstre_od_tick = false; }
            if ($scope.hisofstre_oral_od_tick === "1") { $scope.hisofstre_oral_od_tick = true; } else { $scope.hisofstre_oral_od_tick = false; }
            if ($scope.hisofstre_injectsys_od_tick === "1") { $scope.hisofstre_injectsys_od_tick = true; } else { $scope.hisofstre_injectsys_od_tick = false; }
            if ($scope.hisofstre_eyedrop_od_tick === "1") { $scope.hisofstre_eyedrop_od_tick = true; } else { $scope.hisofstre_eyedrop_od_tick = false; }
            if ($scope.hisofstre_skincr_od_tick === "1") { $scope.hisofstre_skincr_od_tick = true; } else { $scope.hisofstre_skincr_od_tick = false; }
            if ($scope.hisofstre_others_od_tick === "1") { $scope.hisofstre_others_od_tick = true; } else { $scope.hisofstre_others_od_tick = false; }
            if ($scope.hisofstre_os_tick === "1") { $scope.hisofstre_os_tick = true; } else { $scope.hisofstre_os_tick = false; }
            if ($scope.hisofstre_oral_os_tick === "1") { $scope.hisofstre_oral_os_tick = true; } else { $scope.hisofstre_oral_os_tick = false; }
            if ($scope.hisofstre_injectsys_os_tick === "1") { $scope.hisofstre_injectsys_os_tick = true; } else { $scope.hisofstre_injectsys_os_tick = false; }
            if ($scope.hisofstre_eyedrop_os_tick === "1") { $scope.hisofstre_eyedrop_os_tick = true; } else { $scope.hisofstre_eyedrop_os_tick = false; }
            if ($scope.hisofstre_skincr_os_tick === "1") { $scope.hisofstre_skincr_os_tick = true; } else { $scope.hisofstre_skincr_os_tick = false; }
            if ($scope.hisofstre_others_os_tick === "1") { $scope.hisofstre_others_os_tick = true; } else { $scope.hisofstre_others_os_tick = false; }

            if ($scope.allerg_od_tick === "1") { $scope.allerg_od_tick = true; } else { $scope.allerg_od_tick = false; }
            if ($scope.allerg_os_tick === "1") { $scope.allerg_os_tick = true; } else { $scope.allerg_os_tick = false; }


            if ($scope.famhisofeye_od_tick === "1") { $scope.famhisofeye_od_tick = true; } else { $scope.famhisofeye_od_tick = false; }
            if ($scope.famhisofeye_os_tick === "1") { $scope.famhisofeye_os_tick = true; } else { $scope.famhisofeye_os_tick = false; }


            if ($scope.famhis_cataract_od_tick === undefined || $scope.famhis_cataract_od_tick === null) { $scope.famhis_cataract_od_tick = "0"; }
            if ($scope.famhis_cataract_os_tick === undefined || $scope.famhis_cataract_os_tick === null) { $scope.famhis_cataract_os_tick = "0"; }
            if ($scope.famhis_corneal_od_tick === undefined || $scope.famhis_corneal_od_tick === null) { $scope.famhis_corneal_od_tick = "0"; }
            if ($scope.famhis_corneal_os_tick === undefined || $scope.famhis_corneal_os_tick === null) { $scope.famhis_corneal_os_tick = "0"; }
            if ($scope.famhis_glaucoma_od_tick === undefined || $scope.famhis_glaucoma_od_tick === null) { $scope.famhis_glaucoma_od_tick = "0"; }
            if ($scope.famhis_glaucoma_os_tick === undefined || $scope.famhis_glaucoma_os_tick === null) { $scope.famhis_glaucoma_os_tick = "0"; }
            if ($scope.famhis_neuro_od_tick === undefined || $scope.famhis_neuro_od_tick === null) { $scope.famhis_neuro_od_tick = "0"; }
            if ($scope.famhis_neuro_os_tick === undefined || $scope.famhis_neuro_os_tick === null) { $scope.famhis_neuro_os_tick = "0"; }
            if ($scope.famhis_od_tick === undefined || $scope.famhis_od_tick === null) { $scope.famhis_od_tick = "0"; }
            if ($scope.famhis_os_tick === undefined || $scope.famhis_os_tick === null) { $scope.famhis_os_tick = "0"; }
            if ($scope.famhis_opalrela_od_tick === undefined || $scope.famhis_opalrela_od_tick === null) { $scope.famhis_opalrela_od_tick = "0"; }
            if ($scope.famhis_opalrela_os_tick === undefined || $scope.famhis_opalrela_os_tick === null) { $scope.famhis_opalrela_os_tick = "0"; }
            if ($scope.famhis_others_od_tick === undefined || $scope.famhis_others_od_tick === null) { $scope.famhis_others_od_tick = "0"; }
            if ($scope.famhis_others_os_tick === undefined || $scope.famhis_others_os_tick === null) { $scope.famhis_others_os_tick = "0"; }
            if ($scope.famhis_retina_od_tick === undefined || $scope.famhis_retina_od_tick === null) { $scope.famhis_retina_od_tick = "0"; }
            if ($scope.famhis_retina_os_tick === undefined || $scope.famhis_retina_os_tick === null) { $scope.famhis_retina_os_tick = "0"; }
            if ($scope.famhis_squint_od_tick === undefined || $scope.famhis_squint_od_tick === null) { $scope.famhis_squint_od_tick = "0"; }
            if ($scope.famhis_squint_os_tick === undefined || $scope.famhis_squint_os_tick === null) { $scope.famhis_squint_os_tick = "0"; }
            if ($scope.famhis_uveal_od_tick === undefined || $scope.famhis_uveal_od_tick === null) { $scope.famhis_uveal_od_tick = "0"; }
            if ($scope.famhis_uveal_os_tick === undefined || $scope.famhis_uveal_os_tick === null) { $scope.famhis_uveal_os_tick = "0"; }
            if ($scope.famhisofeye_od_tick === undefined || $scope.famhisofeye_od_tick === null) { $scope.famhisofeye_od_tick = "0"; }
            if ($scope.famhisofeye_os_tick === undefined || $scope.famhisofeye_os_tick === null) { $scope.famhisofeye_os_tick = "0"; }




            var pastEyePayload = {
                mrdno: $scope.mrdnum,
                ddate: vm.today,
                hospid: $scope.hospitalid,
                eyeproblem_od_tick: $scope.eyeproblem_od_tick,
                eyeproblem_glaucoma_od_tick: $scope.eyeproblem_glaucoma_od_tick,
                eyeproblem_glaucoma_od: $scope.eyeproblem_glaucoma_od,
                eyeproblem_cataract_od_tick: $scope.eyeproblem_cataract_od_tick,
                eyeproblem_cataract_od: $scope.eyeproblem_cataract_od,
                eyeproblem_retina_od_tick: $scope.eyeproblem_retina_od_tick,
                eyeproblem_retina_od: $scope.eyeproblem_retina_od,
                eyeproblem_squint_od_tick: $scope.eyeproblem_squint_od_tick,
                eyeproblem_squint_od: $scope.eyeproblem_squint_od,
                eyeproblem_corneal_od_tick: $scope.eyeproblem_corneal_od_tick,
                eyeproblem_corneal_od: $scope.eyeproblem_corneal_od,
                eyeproblem_opalrelated_od_tick: $scope.eyeproblem_opalrelated_od_tick,
                eyeproblem_opalrelated_od: $scope.eyeproblem_opalrelated_od,
                eyeproblem_uveal_od_tick: $scope.eyeproblem_uveal_od_tick,
                eyeproblem_uveal_od: $scope.eyeproblem_uveal_od,
                eyeproblem_neuro_od_tick: $scope.eyeproblem_neuro_od_tick,
                eyeproblem_neuro_od: $scope.eyeproblem_neuro_od,
                eyeproblem_others_od_tick: $scope.eyeproblem_others_od_tick,
                eyeproblem_others_od: $scope.eyeproblem_others_od,
                eyeproblem_os_tick: $scope.eyeproblem_os_tick,
                eyeproblem_glaucoma_os_tick: $scope.eyeproblem_glaucoma_os_tick,
                eyeproblem_glaucoma_os: $scope.eyeproblem_glaucoma_os,
                eyeproblem_cataract_os_tick: $scope.eyeproblem_cataract_os_tick,
                eyeproblem_cataract_os: $scope.eyeproblem_cataract_os,
                eyeproblem_retina_os_tick: $scope.eyeproblem_retina_os_tick,
                eyeproblem_retina_os: $scope.eyeproblem_retina_os,
                eyeproblem_squint_os_tick: $scope.eyeproblem_squint_os_tick,
                eyeproblem_squint_os: $scope.eyeproblem_squint_os,
                eyeproblem_corneal_os_tick: $scope.eyeproblem_corneal_os_tick,
                eyeproblem_corneal_os: $scope.eyeproblem_corneal_os,
                eyeproblem_opalrelated_os_tick: $scope.eyeproblem_opalrelated_os_tick,
                eyeproblem_opalrelated_os: $scope.eyeproblem_opalrelated_os,
                eyeproblem_uveal_os_tick: $scope.eyeproblem_uveal_os_tick,
                eyeproblem_uveal_os: $scope.eyeproblem_uveal_os,
                eyeproblem_neuro_os_tick: $scope.eyeproblem_neuro_os_tick,
                eyeproblem_neuro_os: $scope.eyeproblem_neuro_os,
                eyeproblem_others_os_tick: $scope.eyeproblem_others_os_tick,
                eyeproblem_others_os: $scope.eyeproblem_others_os,
                eyeprob_remarks_od: $scope.eyeprob_remarks_od,
                eyeprob_remarks_os: $scope.eyeprob_remarks_os,
                trauma_od_tick: $scope.trauma_od_tick,
                trauma_blunt_od_tick: $scope.trauma_blunt_od_tick,
                trauma_blunt_od: $scope.trauma_blunt_od,
                trauma_penetrating_od_tick: $scope.trauma_penetrating_od_tick,
                trauma_penetrating_od: $scope.trauma_penetrating_od,
                trauma_others_od_tick: $scope.trauma_others_od_tick,
                trauma_others_od: $scope.trauma_others_od,
                trauma_os_tick: $scope.trauma_os_tick,
                trauma_blunt_os_tick: $scope.trauma_blunt_os_tick,
                trauma_blunt_os: $scope.trauma_blunt_os,
                trauma_penetrating_os_tick: $scope.trauma_penetrating_os_tick,
                trauma_penetrating_os: $scope.trauma_penetrating_os,
                trauma_others_os_tick: $scope.trauma_others_os_tick,
                trauma_others_os: $scope.trauma_others_os,
                treatment_od_tick: $scope.treatment_od_tick,
                treatment_medical_od_tick: $scope.treatment_medical_od_tick,
                treatment_medical_od: $scope.treatment_medical_od,
                treatment_surgical_od_tick: $scope.treatment_surgical_od_tick,
                treatment_surgical_od: $scope.treatment_surgical_od,
                treatment_donotknow_od_tick: $scope.treatment_donotknow_od_tick,
                treatment_donotknow_od: $scope.treatment_donotknow_od,
                treatment_os_tick: $scope.treatment_os_tick,
                treatment_medical_os_tick: $scope.treatment_medical_os_tick,
                treatment_medical_os: $scope.treatment_medical_os,
                treatment_surgical_os_tick: $scope.treatment_surgical_os_tick,
                treatment_surgical_os: $scope.treatment_surgical_os,
                treatment_donotknow_os_tick: $scope.treatment_donotknow_os_tick,
                treatment_donotknow_os: $scope.treatment_donotknow_os,
                treatment_remarks_od: $scope.treatment_remarks_od,
                treatment_remarks_os: $scope.treatment_remarks_os,
                surg_od_tick: $scope.surg_od_tick,
                surg_glaucoma_od_tick: $scope.surg_glaucoma_od_tick,
                surg_glaucoma_od_no: $scope.surg_glaucoma_od_no,
                surg_glaucoma_od_time: $scope.surg_glaucoma_od_time,
                surg_cataract_od_tick: $scope.surg_cataract_od_tick,
                surg_cataract_od_no: $scope.surg_cataract_od_no,
                surg_cataract_od_time: $scope.surg_cataract_od_time,
                surg_retina_od_tick: $scope.surg_retina_od_tick,
                surg_retina_od_no: $scope.surg_retina_od_no,
                surg_retina_od_time: $scope.surg_retina_od_time,
                surg_squint_od_tick: $scope.surg_squint_od_tick,
                surg_squint_od_no: $scope.surg_squint_od_no,
                surg_squint_od_time: $scope.surg_squint_od_time,
                surg_corneal_od_tick: $scope.surg_corneal_od_tick,
                surg_corneal_od_no: $scope.surg_corneal_od_no,
                surg_corneal_od_time: $scope.surg_corneal_od_time,
                surg_opalrela_od_tick: $scope.surg_opalrela_od_tick,
                surg_opalrela_od_no: $scope.surg_opalrela_od_no,
                surg_opalrela_od_time: $scope.surg_opalrela_od_time,
                surg_uveal_od_tick: $scope.surg_uveal_od_tick,
                surg_uveal_od_no: $scope.surg_uveal_od_no,
                surg_uveal_od_time: $scope.surg_uveal_od_time,
                surg_neuroopthamalic_od_tick: $scope.surg_neuroopthamalic_od_tick,
                surg_neuroopthamalic_od_no: $scope.surg_neuroopthamalic_od_no,
                surg_neuroopthamalic_od_time: $scope.surg_neuroopthamalic_od_time,
                surg_others_od_tick: $scope.surg_others_od_tick,
                surg_others_od_no: $scope.surg_others_od_no,
                surg_others_od_time: $scope.surg_others_od_time,
                surg_os_tick: $scope.surg_os_tick,
                surg_glaucoma_os_tick: $scope.surg_glaucoma_os_tick,
                surg_glaucoma_os_no: $scope.surg_glaucoma_os_no,
                surg_glaucoma_os_time: $scope.surg_glaucoma_os_time,
                surg_cataract_os_tick: $scope.surg_cataract_os_tick,
                surg_cataract_os_no: $scope.surg_cataract_os_no,
                surg_cataract_os_time: $scope.surg_cataract_os_time,
                surg_retina_os_tick: $scope.surg_retina_os_tick,
                surg_retina_os_no: $scope.surg_retina_os_no,
                surg_retina_os_time: $scope.surg_retina_os_time,
                surg_squint_os_tick: $scope.surg_squint_os_tick,
                surg_squint_os_no: $scope.surg_squint_os_no,
                surg_squint_os_time: $scope.surg_squint_os_time,
                surg_corneal_os_tick: $scope.surg_corneal_os_tick,
                surg_corneal_os_no: $scope.surg_corneal_os_no,
                surg_corneal_os_time: $scope.surg_corneal_os_time,
                surg_opalrela_os_tick: $scope.surg_opalrela_os_tick,
                surg_opalrela_os_no: $scope.surg_opalrela_os_no,
                surg_opalrela_os_time: $scope.surg_opalrela_os_time,
                surg_uveal_os_tick: $scope.surg_uveal_os_tick,
                surg_uveal_os_no: $scope.surg_uveal_os_no,
                surg_uveal_os_time: $scope.surg_uveal_os_time,
                surg_neuroopthamalic_os_tick: $scope.surg_neuroopthamalic_os_tick,
                surg_neuroopthamalic_os_no: $scope.surg_neuroopthamalic_os_no,
                surg_neuroopthamalic_os_time: $scope.surg_neuroopthamalic_os_time,
                surg_others_os_tick: $scope.surg_others_os_tick,
                surg_others_os_no: $scope.surg_others_os_no,
                surg_others_os_time: $scope.surg_others_os_time,
                surg_remarks_od: $scope.surg_remarks_od,
                surg_remarks_os: $scope.surg_remarks_os,
                systill_od_tick: $scope.systill_od_tick,
                systill_hyper_od_tick: $scope.systill_hyper_od_tick,
                systill_hyper_od: $scope.systill_hyper_od,
                systill_diab_od_tick: $scope.systill_diab_od_tick,
                systill_diab_od: $scope.systill_diab_od,
                systill_astha_od_tick: $scope.systill_astha_od_tick,
                systill_astha_od: $scope.systill_astha_od,
                systill_cardc_od_tick: $scope.systill_cardc_od_tick,
                systill_cardc_od: $scope.systill_cardc_od,
                systill_thy_od_tick: $scope.systill_thy_od_tick,
                systill_thy_od: $scope.systill_thy_od,
                systill_cereb_od_tick: $scope.systill_cereb_od_tick,
                systill_cereb_od: $scope.systill_cereb_od,
                systill_hyperlipi_od_tick: $scope.systill_hyperlipi_od_tick,
                systill_hyperlipi_od: $scope.systill_hyperlipi_od,
                systill_kidney_od_tick: $scope.systill_kidney_od_tick,
                systill_kidney_od: $scope.systill_kidney_od,
                systill_anemia_od_tick: $scope.systill_anemia_od_tick,
                systill_anemia_od: $scope.systill_anemia_od,
                systill_eyeprob_od_tick: $scope.systill_eyeprob_od_tick,
                systill_eyeprob_od: $scope.systill_eyeprob_od,
                systill_rheu_od_tick: $scope.systill_rheu_od_tick,
                systill_rheu_od: $scope.systill_rheu_od,
                systill_inf_od_tick: $scope.systill_inf_od_tick,
                systill_inf_od: $scope.systill_inf_od,
                systill_others_od_tick: $scope.systill_others_od_tick,
                systill_others_od: $scope.systill_others_od,
                systill_os_tick: $scope.systill_os_tick,
                systill_hyper_os_tick: $scope.systill_hyper_os_tick,
                systill_hyper_os: $scope.systill_hyper_os,
                systill_diab_os_tick: $scope.systill_diab_os_tick,
                systill_diab_os: $scope.systill_diab_os,
                systill_astha_os_tick: $scope.systill_astha_os_tick,
                systill_astha_os: $scope.systill_astha_os,
                systill_cardc_os_tick: $scope.systill_cardc_os_tick,
                systill_cardc_os: $scope.systill_cardc_os,
                systill_thy_os_tick: $scope.systill_thy_os_tick,
                systill_thy_os: $scope.systill_thy_os,
                systill_cereb_os_tick: $scope.systill_cereb_os_tick,
                systill_cereb_os: $scope.systill_cereb_os,
                systill_hyperlipi_os_tick: $scope.systill_hyperlipi_os_tick,
                systill_hyperlipi_os: $scope.systill_hyperlipi_os,
                systill_kidney_os_tick: $scope.systill_kidney_os_tick,
                systill_kidney_os: $scope.systill_kidney_os,
                systill_anemia_os_tick: $scope.systill_anemia_os_tick,
                systill_anemia_os: $scope.systill_anemia_os,
                systill_eyeprob_os_tick: $scope.systill_eyeprob_os_tick,
                systill_eyeprob_os: $scope.systill_eyeprob_os,
                systill_rheu_os_tick: $scope.systill_rheu_os_tick,
                systill_rheu_os: $scope.systill_rheu_os,
                systill_inf_os_tick: $scope.systill_inf_os_tick,
                systill_inf_os: $scope.systill_inf_os,
                systill_others_os_tick: $scope.systill_others_os_tick,
                systill_others_os: $scope.systill_others_os,
                systill_medi_od: $scope.systill_medi_od,
                systill_medi_os: $scope.systill_medi_os,
                systill_remarks_od: $scope.systill_remarks_od,
                systill_remarks_os: $scope.systill_remarks_os,
                hisofstre_od_tick: $scope.hisofstre_od_tick,
                hisofstre_oral_od_tick: $scope.hisofstre_oral_od_tick,
                hisofstre_oral_od: $scope.hisofstre_oral_od,
                hisofstre_injectsys_od_tick: $scope.hisofstre_injectsys_od_tick,
                hisofstre_injectsys_od: $scope.hisofstre_injectsys_od,
                hisofstre_injectperi_od_tick: $scope.hisofstre_injectperi_od_tick,
                hisofstre_injectperi_od: $scope.hisofstre_injectperi_od,
                hisofstre_eyedrop_od_tick: $scope.hisofstre_eyedrop_od_tick,
                hisofstre_eyedrop_od: $scope.hisofstre_eyedrop_od,
                hisofstre_skincr_od_tick: $scope.hisofstre_skincr_od_tick,
                hisofstre_skincr_od: $scope.hisofstre_skincr_od,
                hisofstre_others_od_tick: $scope.hisofstre_others_od_tick,
                hisofstre_others_od: $scope.hisofstre_others_od,

                hisofstre_os_tick: $scope.hisofstre_os_tick,
                hisofstre_oral_os_tick: $scope.hisofstre_oral_os_tick,
                hisofstre_oral_os: $scope.hisofstre_oral_os,
                hisofstre_injectsys_os_tick: $scope.hisofstre_injectsys_os_tick,
                hisofstre_injectperi_os: $scope.hisofstre_injectperi_os,
                hisofstre_eyedrop_os_tick: $scope.hisofstre_eyedrop_os_tick,
                hisofstre_eyedrop_os: $scope.hisofstre_eyedrop_os,
                hisofstre_skincr_os_tick: $scope.hisofstre_skincr_os_tick,
                hisofstre_skincr_os: $scope.hisofstre_skincr_os,
                hisofstre_others_os_tick: $scope.hisofstre_others_os_tick,
                hisofstre_others_os: $scope.hisofstre_others_os,

                famhis_od_tick: $scope.famhis_od_tick,
                famhis_glaucoma_od_tick: $scope.famhis_glaucoma_od_tick,
                famhis_glaucoma_od: $scope.famhis_glaucoma_od,
                famhis_cataract_od_tick: $scope.famhis_cataract_od_tick,
                famhis_cataract_od: $scope.famhis_cataract_od,
                famhis_retina_od_tick: $scope.famhis_retina_od_tick,
                famhis_retina_od: $scope.famhis_retina_od,
                famhis_squint_od_tick: $scope.famhis_squint_od_tick,
                famhis_squint_od: $scope.famhis_squint_od,
                famhis_corneal_od_tick: $scope.famhis_corneal_od_tick,
                famhis_corneal_od: $scope.famhis_corneal_od,
                famhis_opalrela_od_tick: $scope.famhis_opalrela_od_tick,
                famhis_opalrela_od: $scope.famhis_opalrela_od,
                famhis_uveal_od_tick: $scope.famhis_uveal_od_tick,
                famhis_uveal_od: $scope.famhis_uveal_od,
                famhis_neuro_od_tick: $scope.famhis_neuro_od_tick,
                famhis_neuro_od: $scope.famhis_neuro_od,
                famhis_others_od_tick: $scope.famhis_others_od_tick,
                famhis_others_od: $scope.famhis_others_od,
                famhis_os_tick: $scope.famhis_os_tick,
                famhis_glaucoma_os_tick: $scope.famhis_glaucoma_os_tick,
                famhis_glaucoma_os: $scope.famhis_glaucoma_os,
                famhis_cataract_os_tick: $scope.famhis_cataract_os_tick,
                famhis_cataract_os: $scope.famhis_cataract_os,
                famhis_retina_os_tick: $scope.famhis_retina_os_tick,
                famhis_retina_os: $scope.famhis_retina_os,
                famhis_squint_os_tick: $scope.famhis_squint_os_tick,
                famhis_squint_os: $scope.famhis_squint_os,
                famhis_squint_os: $scope.famhis_squint_os,
                famhis_corneal_os_tick: $scope.famhis_corneal_os_tick,
                famhis_corneal_os: $scope.famhis_corneal_os,
                famhis_opalrela_os_tick: $scope.famhis_opalrela_os_tick,
                famhis_opalrela_os: $scope.famhis_opalrela_os,
                famhis_uveal_os_tick: $scope.famhis_uveal_os_tick,
                famhis_uveal_os: $scope.famhis_uveal_os,
                famhis_neuro_os_tick: $scope.famhis_neuro_os_tick,
                famhis_neuro_os: $scope.famhis_neuro_os,
                famhis_others_os_tick: $scope.famhis_others_os_tick,
                famhis_others_os: $scope.famhis_others_os,
                fam_reltosub_od: $scope.fam_reltosub_od,
                fam_reltosub_os: $scope.fam_reltosub_os,
                famhisofeye_od_tick: $scope.famhisofeye_od_tick,
                famhisofeye_od: $scope.famhisofeye_od,
                famhisofeye_os_tick: $scope.famhisofeye_os_tick,
                famhisofeye_os: $scope.famhisofeye_os,
                allerg_od_tick: $scope.allerg_od_tick,
                allerg_od: $scope.allerg_od,
                allerg_os_tick: $scope.allerg_os_tick,
                allerg_os: $scope.allerg_os,





            };
            console.log(pastEyePayload)

            var token = localStorage.getItem('access_token');

            $http.post(UrlConfig.labReportBaseUrl() + vm.url, pastEyePayload,
                { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    vm.notification = { mode: 'success', message: 'This History succcessfully saved.' };
                    console.log(result.data);
                    vm.showEdit = false;
                    vm.reset();
                //    vm.reload();
                }, function (error) {
                    console.log(error);


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
            $scope.mrdno = vm.pastHistory.mrdno;

            vm.showEdit = true;
            $scope.eyeproblem_od_tick = vm.pastHistory.eyeproblem_od_tick;
            $scope.eyeproblem_glaucoma_od_tick = vm.pastHistory.eyeproblem_glaucoma_od_tick;
            $scope.eyeproblem_glaucoma_od = vm.pastHistory.eyeproblem_glaucoma_od;
            $scope.eyeproblem_cataract_od_tick = vm.pastHistory.eyeproblem_cataract_od_tick;
            $scope.eyeproblem_cataract_od = vm.pastHistory.eyeproblem_cataract_od;
            $scope.eyeproblem_retina_od_tick = vm.pastHistory.eyeproblem_retina_od_tick;
            $scope.eyeproblem_retina_od = vm.pastHistory.eyeproblem_retina_od;
            $scope.eyeproblem_squint_od_tick = vm.pastHistory.eyeproblem_squint_od_tick;
            $scope.eyeproblem_squint_od = vm.pastHistory.eyeproblem_squint_od;
            $scope.eyeproblem_corneal_od_tick = vm.pastHistory.eyeproblem_corneal_od_tick;
            $scope.eyeproblem_corneal_od = vm.pastHistory.eyeproblem_corneal_od;
            $scope.eyeproblem_opalrelated_od_tick = vm.pastHistory.eyeproblem_opalrelated_od_tick;
            $scope.eyeproblem_opalrelated_od = vm.pastHistory.eyeproblem_opalrelated_od;
            $scope.eyeproblem_uveal_od_tick = vm.pastHistory.eyeproblem_uveal_od_tick;
            $scope.eyeproblem_uveal_od = vm.pastHistory.eyeproblem_uveal_od;
            $scope.eyeproblem_neuro_od_tick = vm.pastHistory.eyeproblem_neuro_od_tick;
            $scope.eyeproblem_neuro_od = vm.pastHistory.eyeproblem_neuro_od;
            $scope.eyeproblem_others_od_tick = vm.pastHistory.eyeproblem_others_od_tick;
            $scope.eyeproblem_others_od = vm.pastHistory.eyeproblem_others_od;
            $scope.eyeproblem_os_tick = vm.pastHistory.eyeproblem_os_tick;
            $scope.eyeproblem_glaucoma_os_tick = vm.pastHistory.eyeproblem_glaucoma_os_tick;
            $scope.eyeproblem_glaucoma_os = vm.pastHistory.eyeproblem_glaucoma_os;
            $scope.eyeproblem_cataract_os_tick = vm.pastHistory.eyeproblem_cataract_os_tick;
            $scope.eyeproblem_cataract_os = vm.pastHistory.eyeproblem_cataract_os;
            $scope.eyeproblem_retina_os_tick = vm.pastHistory.eyeproblem_retina_os_tick;
            $scope.eyeproblem_retina_os = vm.pastHistory.eyeproblem_retina_os;
            $scope.eyeproblem_squint_os_tick = vm.pastHistory.eyeproblem_squint_os_tick;
            $scope.eyeproblem_squint_os = vm.pastHistory.eyeproblem_squint_os;
            $scope.eyeproblem_corneal_os_tick = vm.pastHistory.eyeproblem_corneal_os_tick;
            $scope.eyeproblem_corneal_os = vm.pastHistory.eyeproblem_corneal_os;
            $scope.eyeproblem_opalrelated_os_tick = vm.pastHistory.eyeproblem_opalrelated_os_tick;
            $scope.eyeproblem_opalrelated_os = vm.pastHistory.eyeproblem_opalrelated_os;
            $scope.eyeproblem_uveal_os_tick = vm.pastHistory.eyeproblem_uveal_os_tick;
            $scope.eyeproblem_uveal_os = vm.pastHistory.eyeproblem_uveal_os;
            $scope.eyeproblem_neuro_os_tick = vm.pastHistory.eyeproblem_neuro_os_tick;
            $scope.eyeproblem_neuro_os = vm.pastHistory.eyeproblem_neuro_os;
            $scope.eyeproblem_others_os_tick = vm.pastHistory.eyeproblem_others_os_tick;
            $scope.eyeproblem_others_os = vm.pastHistory.eyeproblem_others_os;
            $scope.eyeprob_remarks_od = vm.pastHistory.eyeprob_remarks_od;
            $scope.eyeprob_remarks_os = vm.pastHistory.eyeprob_remarks_os;
            $scope.trauma_od_tick = vm.pastHistory.trauma_od_tick;
            $scope.trauma_blunt_od_tick = vm.pastHistory.trauma_blunt_od_tick;
            $scope.trauma_blunt_od = vm.pastHistory.trauma_blunt_od;
            $scope.trauma_penetrating_od_tick = vm.pastHistory.trauma_penetrating_od_tick;
            $scope.trauma_penetrating_od = vm.pastHistory.trauma_penetrating_od;
            $scope.trauma_others_od_tick = vm.pastHistory.trauma_others_od_tick;
            $scope.trauma_others_od = vm.pastHistory.trauma_others_od;
            $scope.trauma_os_tick = vm.pastHistory.trauma_os_tick;
            $scope.trauma_blunt_os_tick = vm.pastHistory.trauma_blunt_os_tick;
            $scope.trauma_blunt_os = vm.pastHistory.trauma_blunt_os;
            $scope.trauma_penetrating_os_tick = vm.pastHistory.trauma_penetrating_os_tick;
            $scope.trauma_penetrating_os = vm.pastHistory.trauma_penetrating_os;
            $scope.trauma_others_os_tick = vm.pastHistory.trauma_others_os_tick;
            $scope.trauma_others_os = vm.pastHistory.trauma_others_os;
            $scope.treatment_od_tick = vm.pastHistory.treatment_od_tick;
            $scope.treatment_medical_od_tick = vm.pastHistory.treatment_medical_od_tick;
            $scope.treatment_medical_od = vm.pastHistory.treatment_medical_od;
            $scope.treatment_surgical_od_tick = vm.pastHistory.treatment_surgical_od_tick;
            $scope.treatment_surgical_od = vm.pastHistory.treatment_surgical_od;
            $scope.treatment_donotknow_od_tick = vm.pastHistory.treatment_donotknow_od_tick;
            $scope.treatment_donotknow_od = vm.pastHistory.treatment_donotknow_od;
            $scope.treatment_os_tick = vm.pastHistory.treatment_os_tick;
            $scope.treatment_medical_os_tick = vm.pastHistory.treatment_medical_os_tick;
            $scope.treatment_medical_os = vm.pastHistory.treatment_medical_os;
            $scope.treatment_surgical_os_tick = vm.pastHistory.treatment_surgical_os_tick;
            $scope.treatment_surgical_os = vm.pastHistory.treatment_surgical_os;
            $scope.treatment_donotknow_os_tick = vm.pastHistory.treatment_donotknow_os_tick;
            $scope.treatment_donotknow_os = vm.pastHistory.treatment_donotknow_os;
            $scope.treatment_remarks_od = vm.pastHistory.treatment_remarks_od;
            $scope.treatment_remarks_os = vm.pastHistory.treatment_remarks_os;
            $scope.surg_od_tick = vm.pastHistory.surg_od_tick;
            $scope.surg_glaucoma_od_tick = vm.pastHistory.surg_glaucoma_od_tick;
            $scope.surg_glaucoma_od_no = vm.pastHistory.surg_glaucoma_od_no;
            $scope.surg_glaucoma_od_time = vm.pastHistory.surg_glaucoma_od_time;
            $scope.surg_cataract_od_tick = vm.pastHistory.surg_cataract_od_tick;
            $scope.surg_cataract_od_no = vm.pastHistory.surg_cataract_od_no;
            $scope.surg_cataract_od_time = vm.pastHistory.surg_cataract_od_time;
            $scope.surg_retina_od_tick = vm.pastHistory.surg_retina_od_tick;
            $scope.surg_retina_od_no = vm.pastHistory.surg_retina_od_no;
            $scope.surg_retina_od_time = vm.pastHistory.surg_retina_od_time;
            $scope.surg_squint_od_tick = vm.pastHistory.surg_squint_od_tick;
            $scope.surg_squint_od_no = vm.pastHistory.surg_squint_od_no;
            $scope.surg_squint_od_time = vm.pastHistory.surg_squint_od_time;
            $scope.surg_corneal_od_tick = vm.pastHistory.surg_corneal_od_tick;
            $scope.surg_corneal_od_no = vm.pastHistory.surg_corneal_od_no;
            $scope.surg_corneal_od_time = vm.pastHistory.surg_corneal_od_time;
            $scope.surg_opalrela_od_tick = vm.pastHistory.surg_opalrela_od_tick;
            $scope.surg_opalrela_od_no = vm.pastHistory.surg_opalrela_od_no;
            $scope.surg_opalrela_od_time = vm.pastHistory.surg_opalrela_od_time;
            $scope.surg_uveal_od_tick = vm.pastHistory.surg_uveal_od_tick;
            $scope.surg_uveal_od_no = vm.pastHistory.surg_uveal_od_no;
            $scope.surg_uveal_od_time = vm.pastHistory.surg_uveal_od_time;
            $scope.surg_neuroopthamalic_od_tick = vm.pastHistory.surg_neuroopthamalic_od_tick;
            $scope.surg_neuroopthamalic_od_no = vm.pastHistory.surg_neuroopthamalic_od_no;
            $scope.surg_neuroopthamalic_od_time = vm.pastHistory.surg_neuroopthamalic_od_time;
            $scope.surg_others_od_tick = vm.pastHistory.surg_others_od_tick;
            $scope.surg_others_od_no = vm.pastHistory.surg_others_od_no;
            $scope.surg_others_od_time = vm.pastHistory.surg_others_od_time;
            $scope.surg_os_tick = vm.pastHistory.surg_os_tick;
            $scope.surg_glaucoma_os_tick = vm.pastHistory.surg_glaucoma_os_tick;
            $scope.surg_glaucoma_os_no = vm.pastHistory.surg_glaucoma_os_no;
            $scope.surg_glaucoma_os_time = vm.pastHistory.surg_glaucoma_os_time;
            $scope.surg_cataract_os_tick = vm.pastHistory.surg_cataract_os_tick;
            $scope.surg_cataract_os_no = vm.pastHistory.surg_cataract_os_no;
            $scope.surg_cataract_os_time = vm.pastHistory.surg_cataract_os_time;
            $scope.surg_retina_os_tick = vm.pastHistory.surg_retina_os_tick;
            $scope.surg_retina_os_no = vm.pastHistory.surg_retina_os_no;
            $scope.surg_retina_os_time = vm.pastHistory.surg_retina_os_time;
            $scope.surg_squint_os_tick = vm.pastHistory.surg_squint_os_tick;
            $scope.surg_squint_os_no = vm.pastHistory.surg_squint_os_no;
            $scope.surg_squint_os_time = vm.pastHistory.surg_squint_os_time;
            $scope.surg_corneal_os_tick = vm.pastHistory.surg_corneal_os_tick;
            $scope.surg_corneal_os_no = vm.pastHistory.surg_corneal_os_no;
            $scope.surg_corneal_os_time = vm.pastHistory.surg_corneal_os_time;
            $scope.surg_opalrela_os_tick = vm.pastHistory.surg_opalrela_os_tick;
            $scope.surg_opalrela_os_no = vm.pastHistory.surg_opalrela_os_no;
            $scope.surg_opalrela_os_time = vm.pastHistory.surg_opalrela_os_time;
            $scope.surg_uveal_os_tick = vm.pastHistory.surg_uveal_os_tick;
            $scope.surg_uveal_os_no = vm.pastHistory.surg_uveal_os_no;
            $scope.surg_uveal_os_time = vm.pastHistory.surg_uveal_os_time;
            $scope.surg_neuroopthamalic_os_tick = vm.pastHistory.surg_neuroopthamalic_os_tick;
            $scope.surg_neuroopthamalic_os_no = vm.pastHistory.surg_neuroopthamalic_os_no;
            $scope.surg_neuroopthamalic_os_time = vm.pastHistory.surg_neuroopthamalic_os_time;
            $scope.surg_others_os_tick = vm.pastHistory.surg_others_os_tick;
            $scope.surg_others_os_no = vm.pastHistory.surg_others_os_no;
            $scope.surg_others_os_time = vm.pastHistory.surg_others_os_time;
            $scope.surg_remarks_od = vm.pastHistory.surg_remarks_od;
            $scope.surg_remarks_os = vm.pastHistory.surg_remarks_os;
            $scope.systill_od_tick = vm.pastHistory.systill_od_tick;
            $scope.systill_hyper_od_tick = vm.pastHistory.systill_hyper_od_tick;
            $scope.systill_hyper_od = vm.pastHistory.systill_hyper_od;
            $scope.systill_diab_od_tick = vm.pastHistory.systill_diab_od_tick;
            $scope.systill_diab_od = vm.pastHistory.systill_diab_od;
            $scope.systill_astha_od_tick = vm.pastHistory.systill_astha_od_tick;
            $scope.systill_astha_od = vm.pastHistory.systill_astha_od;
            $scope.systill_cardc_od_tick = vm.pastHistory.systill_cardc_od_tick;
            $scope.systill_cardc_od = vm.pastHistory.systill_cardc_od;
            $scope.systill_thy_od_tick = vm.pastHistory.systill_thy_od_tick;
            $scope.systill_thy_od = vm.pastHistory.systill_thy_od;
            $scope.systill_cereb_od_tick = vm.pastHistory.systill_cereb_od_tick;
            $scope.systill_cereb_od = vm.pastHistory.systill_cereb_od;
            $scope.systill_hyperlipi_od_tick = vm.pastHistory.systill_hyperlipi_od_tick;
            $scope.systill_hyperlipi_od = vm.pastHistory.systill_hyperlipi_od;
            $scope.systill_kidney_od_tick = vm.pastHistory.systill_kidney_od_tick;
            $scope.systill_kidney_od = vm.pastHistory.systill_kidney_od;
            $scope.systill_anemia_od_tick = vm.pastHistory.systill_anemia_od_tick;
            $scope.systill_anemia_od = vm.pastHistory.systill_anemia_od;
            $scope.systill_eyeprob_od_tick = vm.pastHistory.systill_eyeprob_od_tick;
            $scope.systill_eyeprob_od = vm.pastHistory.systill_eyeprob_od;
            $scope.systill_rheu_od_tick = vm.pastHistory.systill_rheu_od_tick;
            $scope.systill_rheu_od = vm.pastHistory.systill_rheu_od;
            $scope.systill_inf_od_tick = vm.pastHistory.systill_inf_od_tick;
            $scope.systill_inf_od = vm.pastHistory.systill_inf_od;
            $scope.systill_others_od_tick = vm.pastHistory.systill_others_od_tick;
            $scope.systill_others_od = vm.pastHistory.systill_others_od;
            $scope.systill_os_tick = vm.pastHistory.systill_os_tick;
            $scope.systill_hyper_os_tick = vm.pastHistory.systill_hyper_os_tick;
            $scope.systill_hyper_os = vm.pastHistory.systill_hyper_os;
            $scope.systill_diab_os_tick = vm.pastHistory.systill_diab_os_tick;
            $scope.systill_diab_os = vm.pastHistory.systill_diab_os;
            $scope.systill_astha_os_tick = vm.pastHistory.systill_astha_os_tick;
            $scope.systill_astha_os = vm.pastHistory.systill_astha_os;
            $scope.systill_cardc_os_tick = vm.pastHistory.systill_cardc_os_tick;
            $scope.systill_cardc_os = vm.pastHistory.systill_cardc_os;
            $scope.systill_thy_os_tick = vm.pastHistory.systill_thy_os_tick;
            $scope.systill_thy_os = vm.pastHistory.systill_thy_os;
            $scope.systill_cereb_os_tick = vm.pastHistory.systill_cereb_os_tick;
            $scope.systill_cereb_os = vm.pastHistory.systill_cereb_os;
            $scope.systill_hyperlipi_os_tick = vm.pastHistory.systill_hyperlipi_os_tick;
            $scope.systill_hyperlipi_os = vm.pastHistory.systill_hyperlipi_os;
            $scope.systill_kidney_os_tick = vm.pastHistory.systill_kidney_os_tick;
            $scope.systill_kidney_os = vm.pastHistory.systill_kidney_os;
            $scope.systill_anemia_os_tick = vm.pastHistory.systill_anemia_os_tick;
            $scope.systill_anemia_os = vm.pastHistory.systill_anemia_os;
            $scope.systill_eyeprob_os_tick = vm.pastHistory.systill_eyeprob_os_tick;
            $scope.systill_eyeprob_os = vm.pastHistory.systill_eyeprob_os;
            $scope.systill_rheu_os_tick = vm.pastHistory.systill_rheu_os_tick;
            $scope.systill_rheu_os = vm.pastHistory.systill_rheu_os;
            $scope.systill_inf_os_tick = vm.pastHistory.systill_inf_os_tick;
            $scope.systill_inf_os = vm.pastHistory.systill_inf_os;
            $scope.systill_others_os_tick = vm.pastHistory.systill_others_os_tick;
            $scope.systill_others_os = vm.pastHistory.systill_others_os;
            $scope.systill_medi_od = vm.pastHistory.systill_medi_od;
            $scope.systill_medi_os = vm.pastHistory.systill_medi_os;
            $scope.systill_remarks_od = vm.pastHistory.systill_remarks_od;
            $scope.systill_remarks_os = vm.pastHistory.systill_remarks_os;
            $scope.hisofstre_od_tick = vm.pastHistory.hisofstre_od_tick;
            $scope.hisofstre_oral_od_tick = vm.pastHistory.hisofstre_oral_od_tick;
            $scope.hisofstre_oral_od = vm.pastHistory.hisofstre_oral_od;
            $scope.hisofstre_injectsys_od_tick = vm.pastHistory.hisofstre_injectsys_od_tick;
            $scope.hisofstre_injectsys_od = vm.pastHistory.hisofstre_injectsys_od;
            $scope.hisofstre_injectperi_od_tick = vm.pastHistory.hisofstre_injectperi_od_tick;
            $scope.hisofstre_injectperi_od = vm.pastHistory.hisofstre_injectperi_od;
            $scope.hisofstre_eyedrop_od_tick = vm.pastHistory.hisofstre_eyedrop_od_tick;
            $scope.hisofstre_eyedrop_od = vm.pastHistory.hisofstre_eyedrop_od;
            $scope.hisofstre_skincr_od_tick = vm.pastHistory.hisofstre_skincr_od_tick;
            $scope.hisofstre_skincr_od = vm.pastHistory.hisofstre_skincr_od;
            $scope.hisofstre_others_od_tick = vm.pastHistory.hisofstre_others_od_tick;
            $scope.hisofstre_others_od = vm.pastHistory.hisofstre_others_od;
            $scope.hisofstre_os_tick = vm.pastHistory.hisofstre_os_tick;
            $scope.hisofstre_oral_os_tick = vm.pastHistory.hisofstre_oral_os_tick;
            $scope.hisofstre_oral_os = vm.pastHistory.hisofstre_oral_os;
            $scope.hisofstre_injectsys_os_tick = vm.pastHistory.hisofstre_injectsys_os_tick;
            $scope.hisofstre_injectperi_os = vm.pastHistory.hisofstre_injectperi_os;
            $scope.hisofstre_eyedrop_os_tick = vm.pastHistory.hisofstre_eyedrop_os_tick;
            $scope.hisofstre_eyedrop_os = vm.pastHistory.hisofstre_eyedrop_os;
            $scope.hisofstre_skincr_os_tick = vm.pastHistory.hisofstre_skincr_os_tick;
            $scope.hisofstre_skincr_os = vm.pastHistory.hisofstre_skincr_os;
            $scope.hisofstre_others_os_tick = vm.pastHistory.hisofstre_others_os_tick;
            $scope.hisofstre_others_os = vm.pastHistory.hisofstre_others_os;
            $scope.famhis_od_tick = vm.pastHistory.famhis_od_tick;
            $scope.famhis_glaucoma_od_tick = vm.pastHistory.famhis_glaucoma_od_tick;
            $scope.famhis_glaucoma_od = vm.pastHistory.famhis_glaucoma_od;
            $scope.famhis_cataract_od_tick = vm.pastHistory.famhis_cataract_od_tick;
            $scope.famhis_cataract_od = vm.pastHistory.famhis_cataract_od;
            $scope.famhis_retina_od_tick = vm.pastHistory.famhis_retina_od_tick;
            $scope.famhis_retina_od = vm.pastHistory.famhis_retina_od;
            $scope.famhis_squint_od_tick = vm.pastHistory.famhis_squint_od_tick;
            $scope.famhis_squint_od = vm.pastHistory.famhis_squint_od;
            $scope.famhis_corneal_od_tick = vm.pastHistory.famhis_corneal_od_tick;
            $scope.famhis_corneal_od = vm.pastHistory.famhis_corneal_od;
            $scope.famhis_opalrela_od_tick = vm.pastHistory.famhis_opalrela_od_tick;
            $scope.famhis_opalrela_od = vm.pastHistory.famhis_opalrela_od;
            $scope.famhis_uveal_od_tick = vm.pastHistory.famhis_uveal_od_tick;
            $scope.famhis_uveal_od = vm.pastHistory.famhis_uveal_od;
            $scope.famhis_neuro_od_tick = vm.pastHistory.famhis_neuro_od_tick;
            $scope.famhis_neuro_od = vm.pastHistory.famhis_neuro_od;
            $scope.famhis_others_od_tick = vm.pastHistory.famhis_others_od_tick;
            $scope.famhis_others_od = vm.pastHistory.famhis_others_od;
            $scope.famhis_os_tick = vm.pastHistory.famhis_os_tick;
            $scope.famhis_glaucoma_os_tick = vm.pastHistory.famhis_glaucoma_os_tick;
            $scope.famhis_glaucoma_os = vm.pastHistory.famhis_glaucoma_os;
            $scope.famhis_cataract_os_tick = vm.pastHistory.famhis_cataract_os_tick;
            $scope.famhis_cataract_os = vm.pastHistory.famhis_cataract_os;
            $scope.famhis_retina_os_tick = vm.pastHistory.famhis_retina_os_tick;
            $scope.famhis_retina_os = vm.pastHistory.famhis_retina_os;
            $scope.famhis_squint_os_tick = vm.pastHistory.famhis_squint_os_tick;
            $scope.famhis_squint_os = vm.pastHistory.famhis_squint_os;
            $scope.famhis_squint_os = vm.pastHistory.famhis_squint_os;
            $scope.famhis_corneal_os_tick = vm.pastHistory.famhis_corneal_os_tick;
            $scope.famhis_corneal_os = vm.pastHistory.famhis_corneal_os;
            $scope.famhis_opalrela_os_tick = vm.pastHistory.famhis_opalrela_os_tick;
            $scope.famhis_opalrela_os = vm.pastHistory.famhis_opalrela_os;
            $scope.famhis_uveal_os_tick = vm.pastHistory.famhis_uveal_os_tick;
            $scope.famhis_uveal_os = vm.pastHistory.famhis_uveal_os;
            $scope.famhis_neuro_os_tick = vm.pastHistory.famhis_neuro_os_tick;
            $scope.famhis_neuro_os = vm.pastHistory.famhis_neuro_os;
            $scope.famhis_others_os_tick = vm.pastHistory.famhis_others_os_tick;
            $scope.famhis_others_os = vm.pastHistory.famhis_others_os;
            $scope.fam_reltosub_od = vm.pastHistory.fam_reltosub_od;
            $scope.fam_reltosub_os = vm.pastHistory.fam_reltosub_os;
            $scope.famhisofeye_od_tick = vm.pastHistory.famhisofeye_od_tick;
            $scope.famhisofeye_od = vm.pastHistory.famhisofeye_od;
            $scope.famhisofeye_os_tick = vm.pastHistory.famhisofeye_os_tick;
            $scope.famhisofeye_os = vm.pastHistory.famhisofeye_os;
            $scope.allerg_od_tick = vm.pastHistory.allerg_od_tick;
            $scope.allerg_od = vm.pastHistory.allerg_od;
            $scope.allerg_os_tick = vm.pastHistory.allerg_os_tick;
            $scope.allerg_os = vm.pastHistory.allerg_os;

            if ($scope.famhis_cataract_od_tick === "Yes") { $scope.famhis_cataract_od_tick = "1"; } if ($scope.famhis_cataract_od_tick === "Donot Know") { $scope.famhis_cataract_od_tick = "2"; } if ($scope.famhis_cataract_od_tick === "No") { $scope.famhis_cataract_od_tick = "0"; }
            if ($scope.famhis_cataract_os_tick === "Yes") { $scope.famhis_cataract_os_tick = "1"; } if ($scope.famhis_cataract_os_tick === "Donot Know") { $scope.famhis_cataract_os_tick = "2"; } if ($scope.famhis_cataract_os_tick === "No") { $scope.famhis_cataract_os_tick = "0"; }
            if ($scope.famhis_corneal_od_tick === "Yes") { $scope.famhis_corneal_od_tick = "1"; } if ($scope.famhis_corneal_od_tick === "Donot Know") { $scope.famhis_corneal_od_tick = "2"; } if ($scope.famhis_corneal_od_tick === "No") { $scope.famhis_corneal_od_tick = "0"; }
            if ($scope.famhis_corneal_os_tick === "Yes") { $scope.famhis_corneal_os_tick = "1"; } if ($scope.famhis_corneal_os_tick === "Donot Know") { $scope.famhis_corneal_os_tick = "2"; } if ($scope.famhis_corneal_os_tick === "No") { $scope.famhis_corneal_os_tick = "0"; }
            if ($scope.famhis_glaucoma_od_tick === "Yes") { $scope.famhis_glaucoma_od_tick = "1"; } if ($scope.famhis_glaucoma_od_tick === "Donot Know") { $scope.famhis_glaucoma_od_tick = "2"; } if ($scope.famhis_glaucoma_od_tick === "No") { $scope.famhis_glaucoma_od_tick = "0"; }
            if ($scope.famhis_glaucoma_os_tick === "Yes") { $scope.famhis_glaucoma_os_tick = "1"; } if ($scope.famhis_glaucoma_os_tick === "Donot Know") { $scope.famhis_glaucoma_os_tick = "2"; } if ($scope.famhis_glaucoma_os_tick === "No") { $scope.famhis_glaucoma_os_tick = "0"; }
            if ($scope.famhis_neuro_od_tick === "Yes") { $scope.famhis_neuro_od_tick = "1"; } if ($scope.famhis_neuro_od_tick === "Donot Know") { $scope.famhis_neuro_od_tick = "2"; } if ($scope.famhis_neuro_od_tick === "No") { $scope.famhis_neuro_od_tick = "0"; }
            if ($scope.famhis_neuro_os_tick === "Yes") { $scope.famhis_neuro_os_tick = "1"; } if ($scope.famhis_neuro_os_tick === "Donot Know") { $scope.famhis_neuro_os_tick = "2"; } if ($scope.famhis_neuro_os_tick === "No") { $scope.famhis_neuro_os_tick = "0"; }
            if ($scope.famhis_od_tick === "Yes") { $scope.famhis_od_tick = "1"; } if ($scope.famhis_od_tick === "Donot Know") { $scope.famhis_od_tick = "2"; } if ($scope.famhis_od_tick === "No") { $scope.famhis_od_tick = "0"; }
            if ($scope.famhis_os_tick === "Yes") { $scope.famhis_os_tick = "1"; } if ($scope.famhis_os_tick === "Donot Know") { $scope.famhis_os_tick = "2"; } if ($scope.famhis_os_tick === "No") { $scope.famhis_os_tick = "0"; }
            if ($scope.famhis_opalrela_od_tick === "Yes") { $scope.famhis_opalrela_od_tick = "1"; } if ($scope.famhis_opalrela_od_tick === "Donot Know") { $scope.famhis_opalrela_od_tick = "2"; } if ($scope.famhis_opalrela_od_tick === "No") { $scope.famhis_opalrela_od_tick = "0"; }
            if ($scope.famhis_opalrela_os_tick === "Yes") { $scope.famhis_opalrela_os_tick = "1"; } if ($scope.famhis_opalrela_os_tick === "Donot Know") { $scope.famhis_opalrela_os_tick = "2"; } if ($scope.famhis_opalrela_os_tick === "No") { $scope.famhis_opalrela_os_tick = "0"; }
            if ($scope.famhis_others_od_tick === "Yes") { $scope.famhis_others_od_tick = "1"; } if ($scope.famhis_others_od_tick === "Donot Know") { $scope.famhis_others_od_tick = "2"; } if ($scope.famhis_others_od_tick === "No") { $scope.famhis_others_od_tick = "0"; }
            if ($scope.famhis_others_os_tick === "Yes") { $scope.famhis_others_os_tick = "1"; } if ($scope.famhis_others_os_tick === "Donot Know") { $scope.famhis_others_os_tick = "2"; } if ($scope.famhis_others_os_tick === "No") { $scope.famhis_others_os_tick = "0"; }
            if ($scope.famhis_retina_od_tick === "Yes") { $scope.famhis_retina_od_tick = "1"; } if ($scope.famhis_retina_od_tick === "Donot Know") { $scope.famhis_retina_od_tick = "2"; } if ($scope.famhis_retina_od_tick === "No") { $scope.famhis_retina_od_tick = "0"; }
            if ($scope.famhis_retina_os_tick === "Yes") { $scope.famhis_retina_os_tick = "1"; } if ($scope.famhis_retina_os_tick === "Donot Know") { $scope.famhis_retina_os_tick = "2"; } if ($scope.famhis_retina_os_tick === "No") { $scope.famhis_retina_os_tick = "0"; }
            if ($scope.famhis_squint_od_tick === "Yes") { $scope.famhis_squint_od_tick = "1"; } if ($scope.famhis_squint_od_tick === "Donot Know") { $scope.famhis_squint_od_tick = "2"; } if ($scope.famhis_squint_od_tick === "No") { $scope.famhis_squint_od_tick = "0"; }
            if ($scope.famhis_squint_os_tick === "Yes") { $scope.famhis_squint_os_tick = "1"; } if ($scope.famhis_squint_os_tick === "Donot Know") { $scope.famhis_squint_os_tick = "2"; } if ($scope.famhis_squint_os_tick === "No") { $scope.famhis_squint_os_tick = "0"; }
            if ($scope.famhis_uveal_od_tick === "Yes") { $scope.famhis_uveal_od_tick = "1"; } if ($scope.famhis_uveal_od_tick === "Donot Know") { $scope.famhis_uveal_od_tick = "2"; } if ($scope.famhis_uveal_od_tick === "No") { $scope.famhis_uveal_od_tick = "0"; }
            if ($scope.famhis_uveal_os_tick === "Yes") { $scope.famhis_uveal_os_tick = "1"; } if ($scope.famhis_uveal_os_tick === "Donot Know") { $scope.famhis_uveal_os_tick = "2"; } if ($scope.famhis_uveal_os_tick === "No") { $scope.famhis_uveal_os_tick = "0"; }
            // if($scope.famhisofeye_od_tick==="Yes"){$scope.famhisofeye_od_tick="1";}if($scope.famhisofeye_od_tick==="Donot Know"){$scope.famhisofeye_od_tick="2";}if($scope.famhisofeye_od_tick==="No"){$scope.famhisofeye_od_tick="0";}
            // if($scope.famhisofeye_os_tick==="Yes"){$scope.famhisofeye_os_tick="1";}if($scope.famhisofeye_os_tick==="Donot Know"){$scope.famhisofeye_os_tick="2";}if($scope.famhisofeye_os_tick==="No"){$scope.famhisofeye_os_tick="0";}

            if ($scope.eyeproblem_od_tick === true) { $scope.eyeproblem_od_tick = "1"; } else { $scope.eyeproblem_od_tick = "0"; }
            if ($scope.eyeproblem_glaucoma_od_tick === true) { $scope.eyeproblem_glaucoma_od_tick = "1"; } else { $scope.eyeproblem_glaucoma_od_tick = "0"; }
            if ($scope.eyeproblem_cataract_od_tick === true) { $scope.eyeproblem_cataract_od_tick = "1"; } else { $scope.eyeproblem_cataract_od_tick = "0"; }
            if ($scope.eyeproblem_retina_od_tick === true) { $scope.eyeproblem_retina_od_tick = "1"; } else { $scope.eyeproblem_retina_od_tick = "0"; }
            if ($scope.eyeproblem_squint_od_tick === true) { $scope.eyeproblem_squint_od_tick = "1"; } else { $scope.eyeproblem_squint_od_tick = "0"; }
            if ($scope.eyeproblem_corneal_od_tick === true) { $scope.eyeproblem_corneal_od_tick = "1"; } else { $scope.eyeproblem_corneal_od_tick = "0"; }
            if ($scope.eyeproblem_opalrelated_od_tick === true) { $scope.eyeproblem_opalrelated_od_tick = "1"; } else { $scope.eyeproblem_opalrelated_od_tick = "0"; }
            if ($scope.eyeproblem_uveal_od_tick === true) { $scope.eyeproblem_uveal_od_tick = "1"; } else { $scope.eyeproblem_uveal_od_tick = "0"; }
            if ($scope.eyeproblem_neuro_od_tick === true) { $scope.eyeproblem_neuro_od_tick = "1"; } else { $scope.eyeproblem_neuro_od_tick = "0"; }
            if ($scope.eyeproblem_others_od_tick === true) { $scope.eyeproblem_others_od_tick = "1"; } else { $scope.eyeproblem_others_od_tick = "0"; }
            if ($scope.eyeproblem_os_tick === true) { $scope.eyeproblem_os_tick = "1"; } else { $scope.eyeproblem_os_tick = "0"; }
            if ($scope.eyeproblem_glaucoma_os_tick === true) { $scope.eyeproblem_glaucoma_os_tick = "1"; } else { $scope.eyeproblem_glaucoma_os_tick = "0"; }
            if ($scope.eyeproblem_cataract_os_tick === true) { $scope.eyeproblem_cataract_os_tick = "1"; } else { $scope.eyeproblem_cataract_os_tick = "0"; }
            if ($scope.eyeproblem_retina_os_tick === true) { $scope.eyeproblem_retina_os_tick = "1"; } else { $scope.eyeproblem_retina_os_tick = "0"; }
            if ($scope.eyeproblem_squint_os_tick === true) { $scope.eyeproblem_squint_os_tick = "1"; } else { $scope.eyeproblem_squint_os_tick = "0"; }
            if ($scope.eyeproblem_corneal_os_tick === true) { $scope.eyeproblem_corneal_os_tick = "1"; } else { $scope.eyeproblem_corneal_os_tick = "0"; }
            if ($scope.eyeproblem_opalrelated_os_tick === true) { $scope.eyeproblem_opalrelated_os_tick = "1"; } else { $scope.eyeproblem_opalrelated_os_tick = "0"; }
            if ($scope.eyeproblem_uveal_os_tick === true) { $scope.eyeproblem_uveal_os_tick = "1"; } else { $scope.eyeproblem_uveal_os_tick = "0"; }
            if ($scope.eyeproblem_neuro_os_tick === true) { $scope.eyeproblem_neuro_os_tick = "1"; } else { $scope.eyeproblem_neuro_os_tick = "0"; }
            if ($scope.eyeproblem_others_os_tick === true) { $scope.eyeproblem_others_os_tick = "1"; } else { $scope.eyeproblem_others_os_tick = "0"; }
            if ($scope.trauma_od_tick === true) { $scope.trauma_od_tick = "1"; } else { $scope.trauma_od_tick = "0"; }
            if ($scope.trauma_blunt_od_tick === true) { $scope.trauma_blunt_od_tick = "1"; } else { $scope.trauma_blunt_od_tick = "0"; }
            if ($scope.trauma_penetrating_od_tick === true) { $scope.trauma_penetrating_od_tick = "1"; } else { $scope.trauma_penetrating_od_tick = "0"; }
            if ($scope.trauma_others_od_tick === true) { $scope.trauma_others_od_tick = "1"; } else { $scope.trauma_others_od_tick = "0"; }
            if ($scope.trauma_os_tick === true) { $scope.trauma_os_tick = "1"; } else { $scope.trauma_os_tick = "0"; }
            if ($scope.trauma_blunt_os_tick === true) { $scope.trauma_blunt_os_tick = "1"; } else { $scope.trauma_blunt_os_tick = "0"; }
            if ($scope.trauma_penetrating_os_tick === true) { $scope.trauma_penetrating_os_tick = "1"; } else { $scope.trauma_penetrating_os_tick = "0"; }
            if ($scope.trauma_others_os_tick === true) { $scope.trauma_others_os_tick = "1"; } else { $scope.trauma_others_os_tick = "0"; }
            if ($scope.treatment_od_tick === true) { $scope.treatment_od_tick = "1"; } else { $scope.treatment_od_tick = "0"; }
            if ($scope.treatment_medical_od_tick === true) { $scope.treatment_medical_od_tick = "1"; } else { $scope.treatment_medical_od_tick = "0"; }
            if ($scope.treatment_surgical_od_tick === true) { $scope.treatment_surgical_od_tick = "1"; } else { $scope.treatment_surgical_od_tick = "0"; }
            if ($scope.treatment_donotknow_od_tick === true) { $scope.treatment_donotknow_od_tick = "1"; } else { $scope.treatment_donotknow_od_tick = "0"; }
            if ($scope.treatment_os_tick === true) { $scope.treatment_os_tick = "1"; } else { $scope.treatment_os_tick = "0"; }
            if ($scope.treatment_medical_os_tick === true) { $scope.treatment_medical_os_tick = "1"; } else { $scope.treatment_medical_os_tick = "0"; }
            if ($scope.treatment_surgical_os_tick === true) { $scope.treatment_surgical_os_tick = "1"; } else { $scope.treatment_surgical_os_tick = "0"; }
            if ($scope.treatment_donotknow_os_tick === true) { $scope.treatment_donotknow_os_tick = "1"; } else { $scope.treatment_donotknow_os_tick = "0"; }
            if ($scope.surg_od_tick === true) { $scope.surg_od_tick = "1"; } else { $scope.surg_od_tick = "0"; }
            if ($scope.surg_glaucoma_od_tick === true) { $scope.surg_glaucoma_od_tick = "1"; } else { $scope.surg_glaucoma_od_tick = "0"; }
            if ($scope.surg_cataract_od_tick === true) { $scope.surg_cataract_od_tick = "1"; } else { $scope.surg_cataract_od_tick = "0"; }
            if ($scope.surg_retina_od_tick === true) { $scope.surg_retina_od_tick = "1"; } else { $scope.surg_retina_od_tick = "0"; }
            if ($scope.surg_squint_od_tick === true) { $scope.surg_squint_od_tick = "1"; } else { $scope.surg_squint_od_tick = "0"; }
            if ($scope.surg_corneal_od_tick === true) { $scope.surg_corneal_od_tick = "1"; } else { $scope.surg_corneal_od_tick = "0"; }
            if ($scope.surg_opalrela_od_tick === true) { $scope.surg_opalrela_od_tick = "1"; } else { $scope.surg_opalrela_od_tick = "0"; }
            if ($scope.surg_uveal_od_tick === true) { $scope.surg_uveal_od_tick = "1"; } else { $scope.surg_uveal_od_tick = "0"; }
            if ($scope.surg_neuroopthamalic_od_tick === true) { $scope.surg_neuroopthamalic_od_tick = "1"; } else { $scope.surg_neuroopthamalic_od_tick = "0"; }
            if ($scope.surg_others_od_tick === true) { $scope.surg_others_od_tick = "1"; } else { $scope.surg_others_od_tick = "0"; }
            if ($scope.surg_os_tick === true) { $scope.surg_os_tick = "1"; } else { $scope.surg_os_tick = "0"; }
            if ($scope.surg_glaucoma_os_tick === true) { $scope.surg_glaucoma_os_tick = "1"; } else { $scope.surg_glaucoma_os_tick = "0"; }
            if ($scope.surg_cataract_os_tick === true) { $scope.surg_cataract_os_tick = "1"; } else { $scope.surg_cataract_os_tick = "0"; }
            if ($scope.surg_retina_os_tick === true) { $scope.surg_retina_os_tick = "1"; } else { $scope.surg_retina_os_tick = "0"; }
            if ($scope.surg_squint_os_tick === true) { $scope.surg_squint_os_tick = "1"; } else { $scope.surg_squint_os_tick = "0"; }
            if ($scope.surg_corneal_os_tick === true) { $scope.surg_corneal_os_tick = "1"; } else { $scope.surg_corneal_os_tick = "0"; }
            if ($scope.surg_opalrela_os_tick === true) { $scope.surg_opalrela_os_tick = "1"; } else { $scope.surg_opalrela_os_tick = "0"; }
            if ($scope.surg_uveal_os_tick === true) { $scope.surg_uveal_os_tick = "1"; } else { $scope.surg_uveal_os_tick = "0"; }
            if ($scope.surg_neuroopthamalic_os_tick === true) { $scope.surg_neuroopthamalic_os_tick = "1"; } else { $scope.surg_neuroopthamalic_os_tick = "0"; }
            if ($scope.surg_others_os_tick === true) { $scope.surg_others_os_tick = "1"; } else { $scope.surg_others_os_tick = "0"; }
            if ($scope.systill_od_tick === true) { $scope.systill_od_tick = "1"; } else { $scope.systill_od_tick = "0"; }
            if ($scope.systill_hyperten_od_tick === true) { $scope.systill_hyperten_od_tick = "1"; } else { $scope.systill_hyperten_od_tick = "0"; }
            if ($scope.systill_diabetic_od_tick === true) { $scope.systill_diabetic_od_tick = "1"; } else { $scope.systill_diabetic_od_tick = "0"; }
            if ($scope.systill_asthama_od_tick === true) { $scope.systill_asthama_od_tick = "1"; } else { $scope.systill_asthama_od_tick = "0"; }
            if ($scope.systill_cardiac_od_tick === true) { $scope.systill_cardiac_od_tick = "1"; } else { $scope.systill_cardiac_od_tick = "0"; }
            if ($scope.systill_thyriod_od_tick === true) { $scope.systill_thyriod_od_tick = "1"; } else { $scope.systill_thyriod_od_tick = "0"; }
            if ($scope.systill_cereb_od_tick === true) { $scope.systill_cereb_od_tick = "1"; } else { $scope.systill_cereb_od_tick = "0"; }
            if ($scope.systill_hyper_od_tick === true) { $scope.systill_hyper_od_tick = "1"; } else { $scope.systill_hyper_od_tick = "0"; }
            if ($scope.systill_kidney_od_tick === true) { $scope.systill_kidney_od_tick = "1"; } else { $scope.systill_kidney_od_tick = "0"; }
            if ($scope.systill_anemia_od_tick === true) { $scope.systill_anemia_od_tick = "1"; } else { $scope.systill_anemia_od_tick = "0"; }
            if ($scope.systill_eyeprob_od_tick === true) { $scope.systill_eyeprob_od_tick = "1"; } else { $scope.systill_eyeprob_od_tick = "0"; }
            if ($scope.systill_rheu_od_tick === true) { $scope.systill_rheu_od_tick = "1"; } else { $scope.systill_rheu_od_tick = "0"; }
            if ($scope.systill_inf_od_tick === true) { $scope.systill_inf_od_tick = "1"; } else { $scope.systill_inf_od_tick = "0"; }
            if ($scope.systill_others_od_tick === true) { $scope.systill_others_od_tick = "1"; } else { $scope.systill_others_od_tick = "0"; }
            if ($scope.systill_os_tick === true) { $scope.systill_os_tick = "1"; } else { $scope.systill_os_tick = "0"; }
            if ($scope.systill_hyperten_os_tick === true) { $scope.systill_hyperten_os_tick = "1"; } else { $scope.systill_hyperten_os_tick = "0"; }
            if ($scope.systill_diabetic_os_tick === true) { $scope.systill_diabetic_os_tick = "1"; } else { $scope.systill_diabetic_os_tick = "0"; }
            if ($scope.systill_asthama_os_tick === true) { $scope.systill_asthama_os_tick = "1"; } else { $scope.systill_asthama_os_tick = "0"; }
            if ($scope.systill_cardiac_os_tick === true) { $scope.systill_cardiac_os_tick = "1"; } else { $scope.systill_cardiac_os_tick = "0"; }
            if ($scope.systill_thyriod_os_tick === true) { $scope.systill_thyriod_os_tick = "1"; } else { $scope.systill_thyriod_os_tick = "0"; }
            if ($scope.systill_cereb_os_tick === true) { $scope.systill_cereb_os_tick = "1"; } else { $scope.systill_cereb_os_tick = "0"; }
            if ($scope.systill_hyper_os_tick === true) { $scope.systill_hyper_os_tick = "1"; } else { $scope.systill_hyper_os_tick = "0"; }
            if ($scope.systill_kidney_os_tick === true) { $scope.systill_kidney_os_tick = "1"; } else { $scope.systill_kidney_os_tick = "0"; }
            if ($scope.systill_anemia_os_tick === true) { $scope.systill_anemia_os_tick = "1"; } else { $scope.systill_anemia_os_tick = "0"; }
            if ($scope.systill_eyeprob_os_tick === true) { $scope.systill_eyeprob_os_tick = "1"; } else { $scope.systill_eyeprob_os_tick = "0"; }
            if ($scope.systill_rheu_os_tick === true) { $scope.systill_rheu_os_tick = "1"; } else { $scope.systill_rheu_os_tick = "0"; }
            if ($scope.systill_inf_os_tick === true) { $scope.systill_inf_os_tick = "1"; } else { $scope.systill_inf_os_tick = "0"; }
            if ($scope.systill_others_os_tick === true) { $scope.systill_others_os_tick = "1"; } else { $scope.systill_others_os_tick = "0"; }
            if ($scope.hisofstre_od_tick === true) { $scope.hisofstre_od_tick = "1"; } else { $scope.hisofstre_od_tick = "0"; }
            if ($scope.hisofstre_oral_od_tick === true) { $scope.hisofstre_oral_od_tick = "1"; } else { $scope.hisofstre_oral_od_tick = "0"; }
            if ($scope.hisofstre_injectsys_od_tick === true) { $scope.hisofstre_injectsys_od_tick = "1"; } else { $scope.hisofstre_injectsys_od_tick = "0"; }
            if ($scope.hisofstre_eyedrop_od_tick === true) { $scope.hisofstre_eyedrop_od_tick = "1"; } else { $scope.hisofstre_eyedrop_od_tick = "0"; }
            if ($scope.hisofstre_skincr_od_tick === true) { $scope.hisofstre_skincr_od_tick = "1"; } else { $scope.hisofstre_skincr_od_tick = "0"; }
            if ($scope.hisofstre_others_od_tick === true) { $scope.hisofstre_others_od_tick = "1"; } else { $scope.hisofstre_others_od_tick = "0"; }
            if ($scope.hisofstre_os_tick === true) { $scope.hisofstre_os_tick = "1"; } else { $scope.hisofstre_os_tick = "0"; }
            if ($scope.hisofstre_oral_os_tick === true) { $scope.hisofstre_oral_os_tick = "1"; } else { $scope.hisofstre_oral_os_tick = "0"; }
            if ($scope.hisofstre_injectsys_os_tick === true) { $scope.hisofstre_injectsys_os_tick = "1"; } else { $scope.hisofstre_injectsys_os_tick = "0"; }
            if ($scope.hisofstre_eyedrop_os_tick === true) { $scope.hisofstre_eyedrop_os_tick = "1"; } else { $scope.hisofstre_eyedrop_os_tick = "0"; }
            if ($scope.hisofstre_skincr_os_tick === true) { $scope.hisofstre_skincr_os_tick = "1"; } else { $scope.hisofstre_skincr_os_tick = "0"; }
            if ($scope.hisofstre_others_os_tick === true) { $scope.hisofstre_others_os_tick = "1"; } else { $scope.hisofstre_others_os_tick = "0"; }

            if ($scope.allerg_od_tick === true) { $scope.allerg_od_tick = "1"; } else { $scope.allerg_od_tick = "0"; }
            if ($scope.allerg_os_tick === true) { $scope.allerg_os_tick = "1"; } else { $scope.allerg_os_tick = "0"; }

            if ($scope.famhisofeye_os_tick === true) { $scope.famhisofeye_os_tick = "1"; } else { $scope.famhisofeye_os_tick = "0"; }
            if ($scope.famhisofeye_od_tick === true) { $scope.famhisofeye_od_tick = "1"; } else { $scope.famhisofeye_od_tick = "0"; }

            // $scope.famhis_glaucoma_od_tick = "1"
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

        vm.next = function(){
            window.open('#!/smokinghistory?mrdno=' + $scope.mrdnum +
            '&hospid=' + $scope.hospitalid,
            '_self', '');
        }
        vm.reload = function () {
            $timeout(vm.reloadfn, 3000);
        };

        vm.reloadfn = function(){
            window.open('#!/dashboard','_self', '');
    }
        vm.reset = function () {
            $scope.mdrsearch = null;
            $scope.noReport = false;
        };
    }]);





