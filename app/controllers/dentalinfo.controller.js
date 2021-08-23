app.controller('DentalInfoController', ['UrlConfig', 'TokenService', 'ConfigurationService', '$http',
    '$scope', '$timeout', '$filter', 'BroadcastService', '$routeParams',
    function (UrlConfig, TokenService, ConfigurationService, $http, $scope, $timeout, $filter, BroadcastService, $routeParams) {
        var vm = this;


        vm.notification = {
            message: '',
            mode: 'info'
        };
        vm.pagetitle = "Dental Information";


        vm.init = function () {
            BroadcastService.notify('radioNavVisible', true);
            BroadcastService.notify('navText', 'Reporting');
            BroadcastService.notify('labNavVisible', false);
            vm.edit = false;

            vm.today = $filter("date")(new Date(), "yyyy/MM/dd");
            var nowyear = new Date();
            vm.year = nowyear.getFullYear();
            vm.showEdit = false;

            $scope.mrdnum = $routeParams.mrdno;
            $scope.hospitalid = $routeParams.hospid;

            if ($scope.mrdnum !== undefined && $scope.hospitalid !== undefined) {
                vm.fetchDentalInfo();
            }


        };


        $scope.teethValues = [
            {
                name: '1 Normal',
                value: 'Normal'
            },
            {
                name: '2 Decayed',
                value: 'Decayed'
            },
            {
                name: '3 Missing',
                value: 'Missing'
            }, {
                name: '4 Filled',
                value: 'Filled'
            }, {
                name: '5 RCT Txed',
                value: 'RCT Txed'
            }, {
                name: '6 Crown',
                value: 'Crown'
            }, {
                name: '7 RPD',
                value: 'RPD'
            }, {
                name: '8 CA ',
                value: 'CA'
            }, {
                name: '9 Implant',
                value: 'Implant'
            }
        ];


        vm.submitDentalInfo = function () {

            if (vm.edit = false) {
                vm.url = 'api/DentalInformationAll';
            } else {
                vm.url = 'api/DentalInformationAll/Update'
            }

            if ($scope.allergy_tick === undefined || $scope.allergy_tick === null) { $scope.allergy_tick = false; }
            if ($scope.diabetes_tick === undefined || $scope.diabetes_tick === null) { $scope.diabetes_tick = false; }
            if ($scope.bp_tick === undefined || $scope.bp_tick === null) { $scope.bp_tick = false; }
            if ($scope.heart_disease_tick === undefined || $scope.heart_disease_tick === null) { $scope.heart_disease_tick = false; }
            if ($scope.liver_disease_tick === undefined || $scope.liver_disease_tick === null) { $scope.liver_disease_tick = false; }
            if ($scope.kidney_disease_tick === undefined || $scope.kidney_disease_tick === null) { $scope.kidney_disease_tick = false; }
            if ($scope.medications_tick === undefined || $scope.medications_tick === null) { $scope.medications_tick = false; }
            if ($scope.other_history_tick === undefined || $scope.other_history_tick === null) { $scope.other_history_tick = false; }
            // if ($scope.brushing_tick === undefined || $scope.brushing_tick === null) { $scope.brushing_tick = false; }
            if ($scope.alcohol_tick === undefined || $scope.alcohol_tick === null) { $scope.alcohol_tick = false; }
            if ($scope.smoking_tick === undefined || $scope.smoking_tick === null) { $scope.smoking_tick = false; }
            if ($scope.tobacco_tick === undefined || $scope.tobacco_tick === null) { $scope.tobacco_tick = false; }
            if ($scope.thumb_suck_tick === undefined || $scope.thumb_suck_tick === null) { $scope.thumb_suck_tick = false; }
            if ($scope.pan_masala_tick === undefined || $scope.pan_masala_tick === null) { $scope.pan_masala_tick = false; }
            if ($scope.mouth_breathe_tick === undefined || $scope.mouth_breathe_tick === null) { $scope.mouth_breathe_tick = false; }
            if ($scope.tongue_thrust_tick === undefined || $scope.tongue_thrust_tick === null) { $scope.tongue_thrust_tick = false; }
            if ($scope.clench_tick === undefined || $scope.clench_tick === null) { $scope.clench_tick = false; }
            if ($scope.bruxism_tick === undefined || $scope.bruxism_tick === null) { $scope.bruxism_tick = false; }
            // if ($scope.diet_tick === undefined || $scope.diet_tick === null) { $scope.diet_tick = false; }
            if ($scope.other_habit_tick === undefined || $scope.other_habit_tick === null) { $scope.other_habit_tick = false; }
            if ($scope.tmj_extra_oral_tick === undefined || $scope.tmj_extra_oral_tick === null) { $scope.tmj_extra_oral_tick = false; }
            if ($scope.masseter_extra_oral_tick === undefined || $scope.masseter_extra_oral_tick === null) { $scope.masseter_extra_oral_tick = false; }
            if ($scope.lymph_nodes_extra_oral_tick === undefined || $scope.lymph_nodes_extra_oral_tick === null) { $scope.lymph_nodes_extra_oral_tick = false; }
            if ($scope.others_extra_oral_tick === undefined || $scope.others_extra_oral_tick === null) { $scope.others_extra_oral_tick = false; }
            if ($scope.others_extra_oral === undefined || $scope.others_extra_oral === null) { $scope.others_extra_oral = false; }
            if ($scope.buccal_mucosa_tick === undefined || $scope.buccal_mucosa_tick === null) { $scope.buccal_mucosa_tick = false; }
            if ($scope.tongue_intra_oral_tick === undefined || $scope.tongue_intra_oral_tick === null) { $scope.tongue_intra_oral_tick = false; }
            if ($scope.palate_intra_oral_tick === undefined || $scope.palate_intra_oral_tick === null) { $scope.palate_intra_oral_tick = false; }
            if ($scope.bpe_score === undefined || $scope.bpe_score === null) { $scope.bpe_score = 0; }
            if ($scope.teeth_tick === undefined || $scope.teeth_tick === null) { $scope.teeth_tick = false; }



            var dentalPayload = {
                //    mrdno: $scope.mrdno,
                ddate: vm.today,
                hospid: $scope.hospitalid,
                mrdno: $scope.mrdnum,
                pname: $scope.pname,
                age: $scope.age,
                sex: $scope.sex,
                occupation: $scope.occupation,
                education: $scope.education,
                address: $scope.address,
                religion: $scope.religion,
                maritalstatus: $scope.maritalstatus,

                allergy_tick: $scope.allergy_tick,
                allergy: $scope.allergy,
                diabetes_tick: $scope.diabetes_tick,
                bp_tick: $scope.bp_tick,
                heart_disease_tick: $scope.heart_disease_tick,
                liver_disease_tick: $scope.liver_disease_tick,
                kidney_disease_tick: $scope.kidney_disease_tick,
                medications_tick: $scope.medications_tick,
                other_history_tick: $scope.other_history_tick,
                other_history: $scope.other_history,
                chief_complain: $scope.chief_complain,
                hopi: $scope.hopi,
                dental_history: $scope.dental_history,
                // brushing_tick: $scope.brushing_tick,
                alcohol_tick: $scope.alcohol_tick,
                smoking_tick: $scope.smoking_tick,
                tobacco_tick: $scope.tobacco_tick,
                thumb_suck_tick: $scope.thumb_suck_tick,
                pan_masala_tick: $scope.pan_masala_tick,
                mouth_breathe_tick: $scope.mouth_breathe_tick,
                tongue_thrust_tick: $scope.tongue_thrust_tick,
                clench_tick: $scope.clench_tick,
                bruxism_tick: $scope.bruxism_tick,
                //    diet_tick: $scope.diet_tick,
                other_habit_tick: $scope.other_habit_tick,
                other_habit: $scope.other_habit,
                tmj_extra_oral_tick: $scope.tmj_extra_oral_tick,
                masseter_extra_oral_tick: $scope.masseter_extra_oral_tick,
                lymph_nodes_extra_oral_tick: $scope.lymph_nodes_extra_oral_tick,
                others_extra_oral_tick: $scope.others_extra_oral_tick,
                others_extra_oral: $scope.others_extra_oral,
                buccal_mucosa_tick: $scope.buccal_mucosa_tick,
                tongue_intra_oral_tick: $scope.tongue_intra_oral_tick,
                palate_intra_oral_tick: $scope.palate_intra_oral_tick,
                bpe_score: $scope.bpe_score,
                teeth_tick: $scope.teeth_tick,
                emergency_mgmt: $scope.emergency_mgmt,
                stabilization: $scope.stabilization,
                maintenance: $scope.maintenance,
                definitive_mgmt: $scope.definitive_mgmt,
                treatment_done: $scope.treatment_done,

                brush_habit: $scope.brush_habit,
                diet_habit: $scope.diet_habit,
                teeth_11: $scope.teeth_11,

                teeth_12: $scope.teeth_12,
                teeth_13: $scope.teeth_13,
                teeth_14: $scope.teeth_14,
                teeth_15: $scope.teeth_15,
                teeth_16: $scope.teeth_16,
                teeth_17: $scope.teeth_17,
                teeth_18: $scope.teeth_18,
                // teeth_19: 0,//$scope.teeth_19,
                // teeth_20: 0,//$scope.teeth_20,
                teeth_21: $scope.teeth_21,
                teeth_22: $scope.teeth_22,
                teeth_23: $scope.teeth_23,
                teeth_24: $scope.teeth_24,
                teeth_25: $scope.teeth_25,
                teeth_26: $scope.teeth_26,
                teeth_27: $scope.teeth_27,
                teeth_28: $scope.teeth_28,
                // teeth_29: 0,//$scope.teeth_29,
                // teeth_30: 0,//$scope.teeth_30,
                teeth_31: $scope.teeth_31,
                teeth_32: $scope.teeth_32,
                teeth_33: $scope.teeth_33,
                teeth_34: $scope.teeth_34,
                teeth_35: $scope.teeth_35,
                teeth_36: $scope.teeth_36,
                teeth_37: $scope.teeth_37,
                teeth_38: $scope.teeth_38,
                // teeth_39: 0,//$scope.teeth_39,
                // teeth_40: 0,//$scope.teeth_40,
                teeth_41: $scope.teeth_41,
                teeth_42: $scope.teeth_42,
                teeth_43: $scope.teeth_43,
                teeth_44: $scope.teeth_44,
                teeth_45: $scope.teeth_45,
                teeth_46: $scope.teeth_46,
                teeth_47: $scope.teeth_47,
                teeth_48: $scope.teeth_48,
                // teeth_49: 0,//$scope.teeth_49,
                // teeth_50: 0,//$scope.teeth_50,
                teeth_51: $scope.teeth_51,
                teeth_52: $scope.teeth_52,
                teeth_53: $scope.teeth_53,
                teeth_54: $scope.teeth_54,
                teeth_55: $scope.teeth_55,
                teeth_56: $scope.teeth_56,
                teeth_57: $scope.teeth_57,
                teeth_58: $scope.teeth_58,
                // teeth_59: 0,//$scope.teeth_59,
                // teeth_60: 0,//$scope.teeth_60,
                teeth_61: $scope.teeth_61,
                teeth_62: $scope.teeth_62,
                teeth_63: $scope.teeth_63,
                teeth_64: $scope.teeth_64,
                teeth_65: $scope.teeth_65,
                teeth_66: $scope.teeth_66,
                teeth_67: $scope.teeth_67,
                teeth_68: $scope.teeth_68,
                // teeth_69: 0,//$scope.teeth_69,
                // teeth_70: 0,//$scope.teeth_70,
                teeth_71: $scope.teeth_71,
                teeth_72: $scope.teeth_72,
                teeth_73: $scope.teeth_73,
                teeth_74: $scope.teeth_74,
                teeth_75: $scope.teeth_75,
                teeth_76: $scope.teeth_76,
                teeth_77: $scope.teeth_77,
                teeth_78: $scope.teeth_78,
                // teeth_79: 0,//$scope.teeth_79,
                // teeth_80: 0,//$scope.teeth_80,
                teeth_81: $scope.teeth_81,
                teeth_82: $scope.teeth_82,
                teeth_83: $scope.teeth_83,
                teeth_84: $scope.teeth_84,
                teeth_85: $scope.teeth_85,
                teeth_86: $scope.teeth_86,
                teeth_87: $scope.teeth_87,
                teeth_88: $scope.teeth_88,
            }

            var token = localStorage.getItem('access_token');
            $http.post(UrlConfig.labReportBaseUrl() + vm.url, dentalPayload,
                { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    vm.notification = { mode: 'success', message: 'This Information succcessfully submitted.' };
                    //  vm.reset();
                    vm.edit = false;
                    vm.reload();
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


        vm.fetchDentalInfo = function () {
            $scope.loadtrue = true;
            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/DentalInformationDetails?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.DentalInfoList = result.data;
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
                    }
                    $scope.showReport = true;
                    console.log(result.data);
                    $scope.loadtrue = false;
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });

            $http.get(UrlConfig.labReportBaseUrl() + 'api/DentalInformationAll?mrdno=' + $scope.mrdnum,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.teethInfo = result.data;
                    console.log(result.data);
                    $scope.loadtrue = false;
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });

        };


        vm.onReportSelected = function () {
            vm.showEdit = true;
            vm.edit = true;

            $scope.mrdno = vm.teethInfo.mrdno;
            $scope.pname = vm.pname;
            $scope.age = vm.age;
            $scope.sex = vm.gender;
            $scope.occupation = vm.teethInfo.occupation;
            $scope.education = vm.teethInfo.education;
            $scope.address = vm.address;
            $scope.allergy_tick = vm.teethInfo.allergy_tick;
            $scope.allergy = vm.teethInfo.allergy;
            $scope.diabetes_tick = vm.teethInfo.diabetes_tick;
            $scope.bp_tick = vm.teethInfo.bp_tick;
            $scope.heart_disease_tick = vm.teethInfo.heart_disease_tick;
            $scope.liver_disease_tick = vm.teethInfo.liver_disease_tick;
            $scope.kidney_disease_tick = vm.teethInfo.kidney_disease_tick;
            $scope.medications_tick = vm.teethInfo.medications_tick;
            $scope.other_history_tick = vm.teethInfo.other_history_tick;
            $scope.other_history = vm.teethInfo.other_history;
            $scope.chief_complain = vm.teethInfo.chief_complain;
            $scope.hopi = vm.teethInfo.hopi;
            $scope.dental_history = vm.teethInfo.dental_history;
            //   $scope.brushing_tick = vm.teethInfo.brushing_tick;
            $scope.alcohol_tick = vm.teethInfo.alcohol_tick;
            $scope.smoking_tick = vm.teethInfo.smoking_tick;
            $scope.tobacco_tick = vm.teethInfo.tobacco_tick;
            $scope.thumb_suck_tick = vm.teethInfo.thumb_suck_tick;
            $scope.pan_masala_tick = vm.teethInfo.pan_masala_tick;
            $scope.mouth_breathe_tick = vm.teethInfo.mouth_breathe_tick;
            $scope.tongue_thrust_tick = vm.teethInfo.tongue_thrust_tick;
            $scope.clench_tick = vm.teethInfo.clench_tick;
            $scope.bruxism_tick = vm.teethInfo.bruxism_tick;
            //$scope.diet_tick = vm.teethInfo.diet_tick;
            $scope.other_habit_tick = vm.teethInfo.other_habit_tick;
            $scope.other_habit = vm.teethInfo.other_habit;
            $scope.tmj_extra_oral_tick = vm.teethInfo.tmj_extra_oral_tick;
            $scope.masseter_extra_oral_tick = vm.teethInfo.masseter_extra_oral_tick;
            $scope.lymph_nodes_extra_oral_tick = vm.teethInfo.lymph_nodes_extra_oral_tick;
            $scope.others_extra_oral_tick = vm.teethInfo.others_extra_oral_tick;
            $scope.others_extra_oral = vm.teethInfo.others_extra_oral;
            $scope.buccal_mucosa_tick = vm.teethInfo.buccal_mucosa_tick;
            $scope.tongue_intra_oral_tick = vm.teethInfo.tongue_intra_oral_tick;
            $scope.palate_intra_oral_tick = vm.teethInfo.palate_intra_oral_tick;
            $scope.bpe_score = vm.teethInfo.bpe_score;
            $scope.teeth_tick = vm.teethInfo.teeth_tick;

            $scope.brush_habit = vm.teethInfo.brush_habit;
            $scope.diet_habit = vm.teethInfo.diet_habit;

            $scope.teeth_11 = vm.teethInfo.teeth_11;

            $scope.teeth_12 = vm.teethInfo.teeth_12;
            $scope.teeth_13 = vm.teethInfo.teeth_13;
            $scope.teeth_14 = vm.teethInfo.teeth_14;
            $scope.teeth_15 = vm.teethInfo.teeth_15;
            $scope.teeth_16 = vm.teethInfo.teeth_16;
            $scope.teeth_17 = vm.teethInfo.teeth_17;
            $scope.teeth_18 = vm.teethInfo.teeth_18;
            // $scope.teeth_19 = vm.teethInfo.teeth_19;
            // $scope.teeth_20 = vm.teethInfo.teeth_20;
            $scope.teeth_21 = vm.teethInfo.teeth_21;
            $scope.teeth_22 = vm.teethInfo.teeth_22;
            $scope.teeth_23 = vm.teethInfo.teeth_23;
            $scope.teeth_24 = vm.teethInfo.teeth_24;
            $scope.teeth_25 = vm.teethInfo.teeth_25;
            $scope.teeth_26 = vm.teethInfo.teeth_26;
            $scope.teeth_27 = vm.teethInfo.teeth_27;
            $scope.teeth_28 = vm.teethInfo.teeth_28;
            // $scope.teeth_29 = vm.teethInfo.teeth_29;
            // $scope.teeth_30 = vm.teethInfo.teeth_30;
            $scope.teeth_31 = vm.teethInfo.teeth_31;
            $scope.teeth_32 = vm.teethInfo.teeth_32;
            $scope.teeth_33 = vm.teethInfo.teeth_33;
            $scope.teeth_34 = vm.teethInfo.teeth_34;
            $scope.teeth_35 = vm.teethInfo.teeth_35;
            $scope.teeth_36 = vm.teethInfo.teeth_36;
            $scope.teeth_37 = vm.teethInfo.teeth_37;
            $scope.teeth_38 = vm.teethInfo.teeth_38;
            // $scope.teeth_39 = vm.teethInfo.teeth_39;
            // $scope.teeth_40 = vm.teethInfo.teeth_40;
            $scope.teeth_41 = vm.teethInfo.teeth_41;
            $scope.teeth_42 = vm.teethInfo.teeth_42;
            $scope.teeth_43 = vm.teethInfo.teeth_43;
            $scope.teeth_44 = vm.teethInfo.teeth_44;
            $scope.teeth_45 = vm.teethInfo.teeth_45;
            $scope.teeth_46 = vm.teethInfo.teeth_46;
            $scope.teeth_47 = vm.teethInfo.teeth_47;
            $scope.teeth_48 = vm.teethInfo.teeth_48;
            // $scope.teeth_49 = vm.teethInfo.teeth_49;
            // $scope.teeth_50 = vm.teethInfo.teeth_50;
            $scope.teeth_51 = vm.teethInfo.teeth_51;
            $scope.teeth_52 = vm.teethInfo.teeth_52;
            $scope.teeth_53 = vm.teethInfo.teeth_53;
            $scope.teeth_54 = vm.teethInfo.teeth_54;
            $scope.teeth_55 = vm.teethInfo.teeth_55;
            $scope.teeth_56 = vm.teethInfo.teeth_56;
            $scope.teeth_57 = vm.teethInfo.teeth_57;
            $scope.teeth_58 = vm.teethInfo.teeth_58;
            // $scope.teeth_59 = vm.teethInfo.teeth_59;
            // $scope.teeth_60 = vm.teethInfo.teeth_60;
            $scope.teeth_61 = vm.teethInfo.teeth_61;
            $scope.teeth_62 = vm.teethInfo.teeth_62;
            $scope.teeth_63 = vm.teethInfo.teeth_63;
            $scope.teeth_64 = vm.teethInfo.teeth_64;
            $scope.teeth_65 = vm.teethInfo.teeth_65;
            $scope.teeth_66 = vm.teethInfo.teeth_66;
            $scope.teeth_67 = vm.teethInfo.teeth_67;
            $scope.teeth_68 = vm.teethInfo.teeth_68;
            // $scope.teeth_69 = vm.teethInfo.teeth_69;
            // $scope.teeth_70 = vm.teethInfo.teeth_70;
            $scope.teeth_71 = vm.teethInfo.teeth_71;
            $scope.teeth_72 = vm.teethInfo.teeth_72;
            $scope.teeth_73 = vm.teethInfo.teeth_73;
            $scope.teeth_74 = vm.teethInfo.teeth_74;
            $scope.teeth_75 = vm.teethInfo.teeth_75;
            $scope.teeth_76 = vm.teethInfo.teeth_76;
            $scope.teeth_77 = vm.teethInfo.teeth_77;
            $scope.teeth_78 = vm.teethInfo.teeth_78;
            // $scope.teeth_79 = vm.teethInfo.teeth_79;
            // $scope.teeth_80 = vm.teethInfo.teeth_80;
            $scope.teeth_81 = vm.teethInfo.teeth_81;
            $scope.teeth_82 = vm.teethInfo.teeth_82;
            $scope.teeth_83 = vm.teethInfo.teeth_83;
            $scope.teeth_84 = vm.teethInfo.teeth_84;
            $scope.teeth_85 = vm.teethInfo.teeth_85;
            $scope.teeth_86 = vm.teethInfo.teeth_86;
            $scope.teeth_87 = vm.teethInfo.teeth_87;
            $scope.teeth_88 = vm.teethInfo.teeth_88;
            $scope.emergency_mgmt = vm.teethInfo.emergency_mgmt;
            $scope.stabilization = vm.teethInfo.stabilization;
            $scope.maintenance = vm.teethInfo.maintenance;
            $scope.definitive_mgmt = vm.teethInfo.definitive_mgmt;
            $scope.treatment_done = vm.teethInfo.treatment_done;
        };





        vm.deleteRecord = function () {
            if (confirm('Are you sure you want to delete this record?')) {
                var userId = TokenService.getUserId();

                var mrdPayload = {
                    mrdno: vm.userMrd,
                };
                var token = localStorage.getItem('access_token');
                $http.post(UrlConfig.labReportBaseUrl() + 'api/DentalInformationDetails/Delete',
                    mrdPayload, { headers: { Authorization: 'Bearer ' + token } })

                    .then(function (result) {
                        // console.log(result.data);
                        vm.notification = { mode: 'success', message: 'MRD report deleted' };
                        // vm.fetchUserReportList();

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



        vm.btnunhide = function () {
            $scope.uploadBtn = !$scope.uploadBtn;

        };


        vm.reload = function () {
            $timeout(vm.reloadfn, 3000);
        };

        vm.reloadfn = function () {
            location.reload();
        }


        vm.noalert = function () {
            $timeout(vm.resetNotification, 4000);
        };

        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };


        vm.reset = function () {

        };

    }]);