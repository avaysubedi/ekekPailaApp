app.controller('EntryListController', ['$http', 'UrlConfig', 'TokenService', '$scope', 'DateService', '$filter', 'BroadcastService','$timeout',
    function ($http, UrlConfig, TokenService, $scope, DateService, $filter, BroadcastService,$timeout) {

        var vm = this;

        vm.pagetitle = "Entry List";
        //vm.selectedTitle = null;
        //vm.selectedOpdBill = null;

        vm.init = function () {
            TokenService.navigateToLoginOnInvalidToken();

            BroadcastService.notify('radioNavVisible', true);
            BroadcastService.notify('labNavVisible', false);

            BroadcastService.notify('navText', 'Radiology Reporting ');

            // vm.fetchTestReportList();

            $scope.init = localStorage.getItem('init');
            $scope.final = localStorage.getItem('final');
            vm.initdate = new Date($scope.init);
            vm.finaldate = new Date($scope.final);
            vm.initFiltered = $filter("date")(vm.initdate, "yyyy/MM/dd");
            vm.finalFiltered = $filter("date")(vm.finaldate, "yyyy/MM/dd");
            
            vm.AdToBsInit(vm.initFiltered);
            vm.AdToBsFinal(vm.finalFiltered);

            $scope.loadtrue = false;

            vm.fetchUserDepartmentList();
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

        vm.statusFilterList
            = [{

                value: true,
                name: 'Complete'
            },
            {
                value: false,
                name: 'Incomplete'
            },
            ];

        vm.onStatusFilterSelected = function (x) {
            vm.selectedStatusFilter = x;
        };
        vm.selectedStatusFilter = {};
        vm.selectedStatusFilter.value = false;
        vm.selectedStatusFilter.name = 'Incomplete';


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
                    vm.initdate = $filter("date")(vm.AdInit.ad_date, "yyyy/MM/dd");
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
                    vm.finaldate = $filter("date")(vm.AdFinal.ad_date, "yyyy/MM/dd");
                    vm.setFinal(vm.finaldate);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        };



        vm.fetchUserDepartmentList = function () {

            var token = localStorage.getItem('access_token');
            var userId = TokenService.getUserId();

            $http.get(UrlConfig.labReportBaseUrl() + 'api/UserDepart/' + userId,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.UserDepartmentList = result.data;
                    $scope.loadtrue = false;

                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
            $scope.loadtrue = false;

                }); vm.noalert();


        };

        vm.onDepartmentSelected = function (department) {
            vm.selectedDepartment = department;
        };

        vm.fetchInvoiceList = function () {
            $scope.loadtrue = true;
            if (vm.selectedDepartment === null || vm.selectedDepartment === undefined) {
                vm.notification = { mode: 'danger', message: ' Select Department first' };
                $scope.loadtrue = false;

                return;
            }
            

            var token = localStorage.getItem('access_token');

            $http.get(UrlConfig.labReportBaseUrl() + 'api/TestReporting/InvoiceList?init=' + vm.initFiltered
             +
                '&final=' + vm.finalFiltered + '&grpid=' + vm.selectedDepartment.grpid,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.InvoiceEntryList = result.data;
                    $scope.loadtrue = false;
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                    $scope.loadtrue = false;

                });vm.noalert();
        };


        vm.onInvoiceSelected = function (invoice) {
            vm.selectedInvoice = invoice;
         //   prompt("enter password");
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
                filename: vm.pagetitle + "_"+ vm.initdate + "To " + vm.finaldate + ".xls"
            });
        }
        
        vm.noalert = function(){
            $timeout(vm.resetNotification, 4000);
        }

        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };


    }]);




    







    // var visionAndRefractionPayload = {
    //     anterior_segment_tick: $scope.masteranterior,
    //     ct_od_tick: $scope.cornealtopographyod,
    //     ct_os_tick: $scope.cornealtopographyos,

    //     cct_od: $scope.cctod,
    //     k1_od: $scope.k1od,
    //     k2_od: $scope.k2od,



    //     ct_mh_od_tick: $scope.ct_mhodtick,
    //     ct_pc_od_tick: $scope.ctpcodtick,
    //     ct_nf_od_tick: $scope.ctnfodtick,
    //     ct_other_od_tick: $scope.ctotherodtick,
    //     ct_other_od: $scope.ctotherod,

    //     cct_os: $scope.cctos,
    //     k1_os: $scope.k1os,
    //     k2_os: $scope.k2os,

    //     ct_mh_os_tick: $scope.ct_mhostick,
    //     ct_pc_os_tick: $scope.ctpcostick,
    //     ct_nf_os_tick: $scope.ctnfostick,
    //     ct_other_os_tick: $scope.ctotherostick,
    //     ct_other_os: $scope.ctotheros,



    //     ct_interpretation_od_tick: $scope.cornealtopographyodinterpretation,
    //     ct_interpretation_od: $scope.ctinterpretationod,

    //     ct_interpretation_os: $scope.ctinterpretos,
    //     ct_interpretation_os_tick: $scope.ctinterpretationos,

    //     ascan_od_tick: $scope.ascanod,

    //     ascan_acp_od: $scope.ascanacpod,
    //     ascan_al_od: $scope.ascanalod,
    //     ascan_iolpower_od: $scope.ascaniolpowerod,
    //     ascan_lt_od: $scope.ascanltod,
    //     ascan_nf_od_tick: $scope.ascannfodtick,

    //     ascan_mh_od_tick: $scope.ascanmhodtick,
    //     ascan_pc_od_tick: $scope.ascanpcodtick,

    //     ascan_os_tick: $scope.ascanostick,

    //     ascan_acp_os: $scope.ascanacpos,
    //     ascan_al_os: $scope.ascanalos,
    //     ascan_iolpower_os: $scope.ascaniolpoweros,
    //     ascan_lt_os: $scope.ascanltos,


    //     ascan_mh_os_tick: $scope.ascanmhostick,
    //     ascan_pc_os_tick: $scope.ascanpcostick,

    //     ascan_nf_os_tick: $scope.ascannfostick,
    //     ascan_other_od_tick: $scope.ascanothersod,
    //     ascan_other_os_tick: $scope.ascanotherostick,
    //     ascan_other_od: $scope.ascanotherod,
    //     ascan_other_os: $scope.ascanotheros,

    //     ascan_interpretation_od_tick: $scope.anteriorsegmentoctosinterpretation,
    //     ascan_interpretation_os_tick: $scope.ascanosinterpretation,
    //     ascan_interpretation_od: $scope.ascaninterpretationod,
    //     ascan_interpretation_os: $scope.ascaninterpretationos,

    //     anterioroct_od_tick: $scope.anteriorsegmentoctod,
    //     anterioroct_os_tick: $scope.anteriorsegmentoctos,
    //     anteriorsga_od: $scope.anteriorsgaod,
    //     anteriorit1_od: $scope.anteriorit1od,
    //     anteriorit2_od: $scope.anteriorit2od,
    //     anterioracdepth_od: $scope.anterioracdepthod,
    //     anterioracwidth_od: $scope.anterioracwidthod,
    //     anteriorlv_od: $scope.anteriorlvod,

    //     anteriorara_od: $scope.anterioraraod,
    //     anterioraod500_od: $scope.anterioraod500od,
    //     anterioraod750_od: $scope.anterioraod750od,
    //     anteriortisa_od: $scope.anteriortisaod,

    //     anteriortia_od: $scope.anteriortiaod,

    //     anteriorsga_os: $scope.anteriorsgaos,
    //     anteriorit1_os: $scope.anteriorit1os,
    //     anteriorit2_os: $scope.anteriorit2os,
    //     anterioracdepth_os: $scope.anterioracdepthos,
    //     anterioracwidth_os: $scope.anterioracwidthos,
    //     anteriorlv_os: $scope.anteriorlvos,
    //     anteriorara_os: $scope.anterioraraos,
    //     anterioraod500_os: $scope.anterioraod500os,

    //     anterioraod750_os: $scope.anterioraod750os,
    //     anteriortisa_os: $scope.anteriortisaos,
    //     anterior_tia_os: $scope.anteriortiaos,

    //     anterioroct_mh_od_tick: $scope.anterioroctmhodtick,
    //     anterioroct_mh_os_tick: $scope.anterioroctmhostick,
    //     anterioroct_pc_od_tick: $scope.anterioroctpcodtick,
    //     anterioroct_pc_os_tick: $scope.anterioroctpcostick,

    //     anterioroct_nf_od_tick: $scope.anterioroctnfodstick,
    //     anterioroct_nf_os_tick: $scope.anterioroctnfostick,
    //     anterioroct_other_od_tick: $scope.anteriorsegmentoctothersod,

    //     anterioroct_other_os_tick: $scope.anteriorsegmentoctothersos,
    //     anterioroct_other_od: $scope.anteriooctotherod,
    //     anterioroct_other_os: $scope.anterioroctotheros,

    //     anterioroct_interpretation_od_tick: $scope.anteriorsegmentoctodinterpretation,
    //     anterioroct_interpretation_os_tick: $scope.anteriorsegmentoctosinterpretation,
    //     anterioroct_interpretation_od: $scope.anterioroctinterpretationod,
    //     anterioroct_interpretation_os: $scope.anterioroctinterpretationos,

    //     posterior_segment_tick: $scope.masterposterior,

    //     bscan_od_tick: $scope.bscanod,

    //     bscan_acp_od: $scope.bscanacpod,
    //     bscan_al_od: $scope.bscanalod,
    //     bscan_iolpower_od: $scope.bscaniolpowerod,
    //     bscan_lt_od: $scope.bscanltod,
    //     bscan_nf_od_tick: $scope.bscannfodtick,

    //     bscan_mh_od_tick: $scope.bscanmhodtick,
    //     bscan_pc_od_tick: $scope.bscanpcodtick,

    //     bscan_os_tick: $scope.bscanostick,

    //     bscan_acp_os: $scope.bscanacpos,
    //     bscan_al_os: $scope.bscanalos,
    //     bscan_iolpower_os: $scope.bscaniolpoweros,
    //     bscan_lt_os: $scope.bscanltos,


    //     bscan_mh_os_tick: $scope.bscanmhostick,
    //     bscan_pc_os_tick: $scope.bscanpcostick,

    //     bscan_nf_os_tick: $scope.bscannfostick,
    //     bscan_other_od_tick: $scope.bscanothersod,
    //     bscan_other_os_tick: $scope.bscanotherostick,
    //     bscan_other_od: $scope.bscanotherod,
    //     bscan_other_os: $scope.bscanotheros,

    //     bscan_interpretation_od_tick: $scope.bscanodinterpretation,
    //     bscan_interpretation_os_tick: $scope.bscanosinterpretation,
    //     bscan_interpretation_od: $scope.bscaninterpretationod,
    //     bscan_interpretation_os: $scope.bscaninterpretationos,

    //     fundus_od_tick: $scope.fundusphotographod,
    //     fundus_mh_od_tick: $scope.fundusmhodtick,
    //     fundus_pc_od_tick: $scope.funduspcodtick,
    //     fundus_nf_od_tick: $scope.fundusnfodtick,
    //     fundus_others_od_tick: $scope.fundusphotographothersod,
    //     fundus_others_od: $scope.fundusothersos,

    //     fundus_os_tick: $scope.fundusphotographos,
    //     fundus_mh_os_tick: $scope.fundusmhostick,
    //     fundus_pc_os_tick: $scope.funduspcostick,
    //     fundus_nf_os_tick: $scope.fundusnfostick,
    //     fundus_others_os_tick: $scope.fundusphotographothersos,
    //     fundus_others_os: $scope.fundusothersos,

    //     funudus_interpretation_od_tick: $scope.fundusphotographodinterpretation,
    //     funudus_interpretation_od: $scope.funudus_interpretationod,
    //     funudus_interpretation_os_tick: $scope.fundusphotographosinterpretation,
    //     funudus_interpretation_os: $scope.funudus_interpretationos,


    //     disc_od_tick: $scope.discphotographod,
    //     disc_mh_od_tick: $scope.discmhodtick,
    //     disc_pc_od_tick: $scope.discpcodtick,
    //     disc_nf_od_tick: $scope.discnfodtick,
    //     disc_others_od_tick: $scope.discothersodtick,
    //     disc_others_od: $scope.discothersos,

    //     disc_os_tick: $scope.discphotographos,
    //     disc_mh_os_tick: $scope.discmhostick,
    //     disc_pc_os_tick: $scope.discpcostick,
    //     disc_nf_os_tick: $scope.discnfostick,
    //     disc_others_os_tick: $scope.discothersostick,
    //     disc_others_os: $scope.discothersos,

    //     disc_interpretation_od_tick: $scope.disc_interpretationodtick,
    //     disc_interpretation_od: $scope.disc_interpretationod,
    //     disc_interpretation_os_tick: $scope.disc_interpretationostick,
    //     disc_interpretation_os: $scope.disc_interpretation_os,


    //     post_od_tick: $scope.posteriorsegmentoctod,
    //     post_sga_od: $scope.post_sgaod,
    //     post_it1_od: $scope.post_it1od,
    //     post_it2_od: $scope.post_it2od,
    //     post_ac_od: $scope.post_acod,
    //     post_acw_od: $scope.post_acwod,
    //     post_lv_od: $scope.post_lvod,
    //     post_ara_od: $scope.post_ara_od,
    //     post_aod500_od: $scope.post_aod500od,
    //     post_aod7500_od: $scope.post_aod7500od,
    //     post_tisa_od: $scope.post_tisaod,
    //     post_tia_od: $scope.post_tiaod,



    //     post_mh_od_tick: $scope.postoctmhodstick,
    //     post_pc_od_tick: $scope.postoctpcodtick,
    //     post_nf_od_tick: $scope.postoctnfodtick,
    //     post_others_od_tick: $scope.posteriorsegmentoctothersod,
    //     post_others_od: $scope.postcninfood,

    //     post_os_tick: $scope.posteriorsegmentoctos,
    //     post_sga_os: $scope.post_sgaos,
    //     post_it1_os: $scope.post_it1os,
    //     post_it2_os: $scope.post_it2os,
    //     post_ac_os: $scope.post_acos,
    //     post_acw_os: $scope.post_acwos,
    //     post_lv_os: $scope.post_lvos,
    //     post_ara_os: $scope.post_ara_os,
    //     post_aod500_os: $scope.post_aod500os,
    //     post_aod7500_os: $scope.post_aod7500os,
    //     post_tisa_os: $scope.post_tisaos,
    //     post_tia_os: $scope.post_tiaos,



    //     post_os_tick: $scope.postoctmhostick,
    //     post_mh_os_tick: $scope.postoctmhosstick,
    //     post_pc_os_tick: $scope.postoctpcostick,
    //     post_nf_os_tick: $scope.postoctpnfostiick,

    //     post_others_os_tick: $scope.posteriorsegmentoctothersos,
    //     post_others_os: $scope.postoctosinfo,


    //     post_interpretation_od_tick: $scope.posteriorsegmentoctodinterpretation,
    //     post_interpretation_os_tick: $scope.posteriorsegmentoctosinterpretation,
    //     post_interpretation_od: $scope.post_interpretationod,
    //     post_interpretation_os: $scope.post_interpretationos,



    //     fdp_od_tick: $scope.fdpod,
    //     fdp_mh_od_tick: $scope.fdpodstick,
    //     fdp_pc_od_tick: $scope.fdppcodtick,
    //     fdp_nf_od_tick: $scope.fdpnfodtick,

    //     fdp_others_od_tick: $scope.fdpothersod,
    //     fdp_others_od: $scope.fdpodothers,



    //     fdp_os_tick: $scope.fdpos,
    //     fdp_mh_os_tick: $scope.fdpmhosstick,
    //     fdp_pc_os_tick: $scope.fdpcostick,
    //     fdp_nf_os_tick: $scope.fdpnfosstick,

    //     fdp_others_os_tick: $scope.fdpothersos,
    //     fdp_others_os: $scope.fdpnfos,


    //     fdp_interpretation_od_tick: $scope.fundusphotographodinterpretation,
    //     fdp_interpretation_os_tick: $scope.fundusphotographosinterpretation,
    //     fdp_interpretation_od: $scope.fdp_interpretationod,
    //     fdp_interpretation_os: $scope.fdp_interpretationos,



    //     //apPLANTIONNTONEMETRY

    //     at_od_tick: $scope.applanationtonometryod,
    //     at_os_tick: $scope.applanationtonometryos,
    //     at_od: $scope.atod,
    //     at_os: $scope.atos,

    //     at_mh_od_tick: $scope.atmhodtick,
    //     at_mh_os_tick: $scope.atmhostick,
    //     at_pc_od_tick: $scope.atpcodtick,
    //     at_pc_os_tick: $scope.atpcostick,
    //     at_nf_od_tick: $scope.atnfodtick,
    //     at_nf_os_tick: $scope.atnfostick,
    //     at_other_od_tick: $scope.applanationtonometryotherod,
    //     at_other_os_tick: $scope.applanationtonometryothersos,
    //     at_other_od: $scope.atotherod,
    //     at_other_os: $scope.atotheros,

    //     at_interpretation_od_tick: $scope.atinterpretationodtick,
    //     at_interpretation_os_tick: $scope.atinterpretationostick,
    //     at_interpretation_od: $scope.atinterpretationod,
    //     at_interpretation_os: $scope.atinterpretationos,


    //     gonioscopy_od_tick: $scope.gonioscopyodtick,
    //     gonioscopy_os_tick: $scope.gonioscopyos,
    //     gonioscopy_od_open_tick: $scope.gonioscopyodopen,
    //     gonioscopy_od_close_tick: $scope.gonioscopyodclose,
    //     gonioscopy_od_occludable_tick: $scope.gonioscopyodoccludable,
    //     gonioscopy_od_nonoccludable_tick: $scope.gonioscopyodnonoccludable,


    //     gonioscopy_os_open_tick: $scope.gonioscopyosopen,
    //     gonioscopy_os_close_tick: $scope.gonioscopyosclose,
    //     gonioscopy_os_occludable_tick: $scope.gonioscopyosoccludable,
    //     gonioscopy_os_nonoccludable_tick: $scope.gonioscopyosnonoccludable,

    //     gonioscopy_mh_od_tick: $scope.gonioscopymhodtick,
    //     gonioscopy_mh_os_tick: $scope.gonioscopymhostick,
    //     gonioscopy_pc_od_tick: $scope.gonioscopypcodtick,
    //     gonioscopy_pc_os_tick: $scope.gonioscopypcostick,
    //     gonioscopy_nf_od_tick: $scope.gonioscopynfodtick,
    //     gonioscopy_nf_os_tick: $scope.gonioscopynfostick,
    //     gonioscopy_other_od_tick: $scope.gonioscopyothersod,
    //     gonioscopy_other_os_tick: $scope.gonioscopyothersos,
    //     gonioscopy_other_od: $scope.gonioscopyotherod,
    //     gonioscopy_other_os: $scope.gonioscopyotheros,

    //     gonioscopy_other_os: $scope.gonioscopyotheros,
    //     gonioscopy_interpretation_os_tick: $scope.gonioscopyinterpretationostick,
    //     gonioscopy_interpretation_od: $scope.gonioscopyinterpretationod,
    //     gonioscopy_interpretation_os: $scope.gonioscopyinterpretationos,

    //     normal_od_tick: $scope.normalodtick,
    //     refractive_error_od_tick: $scope.refractiveerrorodtick,
    //     presbyopia_od_tick: $scope.presbyopiaodtick,
    //     cataract_untreated_od_tick: $scope.cataractuntreatedodtick,
    //     aphakiaodtick: $scope.aphakiaodtick,
    //     cataract_surg_complications_od_tick: $scope.cataractsurgcomplicationsodtick,
    //     tco_od_tick: $scope.tcoodtick,
    //     phthisis_od_tick: $scope.phthisisodtick,
    //     onchcercia_od_tick: $scope.onchcerciaodtick,
    //     glaucoma_od_tick: $scope.glaucomaodtick,
    //     diabetic_od_tick: $scope.diabeticodtick,
    //     armd_od_tick: $scope.armdodtick,
    //     other_posterior_od_tick: $scope.otherposteriorodtick,
    //     cns_od: $scope.cnsod,
    //     others_od_tick: $scope.othersodtick,
    //     others_od: $scope.othersod,

    //     normal_os_tick: $scope.noabnormalitiesos,
    //     refractive_error_os_tick: $scope.refractiverroros,
    //     presbyopia_os_tick: $scope.Presbyopiaos,
    //     cataract_untreated_os_tick: $scope.Cataractuntreatedos,
    //     aphakiaostick: $scope.Aphakiauntreatedos,
    //     cataract_surg_complications_os_tick: $scope.CataractSurgricalComplicationsos,
    //     tco_os_tick: $scope.TrachomatousCornealOpacityos,
    //     phthisis_os_tick: $scope.Phthisisos,
    //     onchcercia_os_tick: $scope.Onchocerciasisos,
    //     glaucoma_os_tick: $scope.Glaucomaos,
    //     diabetic_os_tick: $scope.DiabeticRetinopathyos,
    //     armd_os_tick: $scope.ARMDos,
    //     other_posterior_os_tick: $scope.othersegmentdiseasesos,
    //     cns_os: $scope.abnormalitiesos,
    //     others_os_tick: $scope.otherdiseaseos,
    //     others_os: $scope.othersos,


    //     medical_treatment_od_tick: $scope.medicaltreatmentodtick,
    //     medical_treatment_od: $scope.medicalstreatmentod,
    //     surgrical_treatment_od_tick: $scope.surgricalstreatmentsodstick,
    //     surgrical_treatment_od: $scope.surgricalstreatmentsod,

    //     medical_treatment_os_tick: $scope.medicaltreatmentostick,
    //     medical_treatment_os: $scope.medicalstreatmentos,
    //     surgrical_treatment_os_tick: $scope.surgricalstreatmentsosstick,
    //     surgrical_treatment_os: $scope.surgricalstreatmentsos,

    //     mdrno: $scope.mrdnum
    // };