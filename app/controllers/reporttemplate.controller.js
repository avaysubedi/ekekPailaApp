app.controller('ReportTemplateController', ['$http', 'UrlConfig', 'TokenService', '$scope', 'ServiceProfileService','$timeout','BroadcastService',
    function ($http, UrlConfig, TokenService, $scope, ServiceProfileService, $timeout,BroadcastService) {


        var vm = this;

        vm.pagetitle = 'Report Template';
        vm.selectedService = null;
        
        vm.notification = {
            message: '',
            mode: 'info'
        };
        vm.init = function () {
             TokenService.navigateToLoginOnInvalidToken('reporttemplate');
             BroadcastService.notify('radioNavVisible', true);
             BroadcastService.notify('labNavVisible', false);
             BroadcastService.notify('navText', 'Radiology Reporting ');
             

            vm.fetchServiceList();
            vm.fetchReportTemplateList();
            vm.fetchRefererList();
        };



        vm.fetchServiceList = function () {
            ServiceProfileService.fetchServices()
                .then(function (data) {
                    vm.serviceList = data;
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        };


        vm.onServiceSelected = function (service) {
            vm.selectedService = service;
        };

        
        vm.fetchRefererList = function () {
            var token = localStorage.getItem('access_token');

            // $http.get(UrlConfig.teleMedicineBaseUrl() + 'referer?sp_id=' + $scope.speciality.sp_id + '&dep=a', { headers: { Authorization: 'Bearer ' + token } }) //sp_id=101&dep=a
            $http.get(UrlConfig.labReportBaseUrl() + 'api/referer/0', //selectedReferer
                { headers: { Authorization: 'Bearer ' + token } }) //sp_id=101&dep=a
                .then(function (result) {
                    vm.refererList = result.data;
                    vm.image = result.data[0].image;

                    $scope.doctorimage = "data:image/png;base64," + vm.image;

                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();

        };

        vm.onRefererSelected = function (referer) {
            vm.selectedReferer = referer;
            // alert(referer.referer);
        };

        //FETCH REPORTT TEMPPLATE
        vm.fetchReportTemplateList = function () {

            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/ReportTemplates', { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    vm.ReportTemplateList = result.data;
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        };

        vm.submitReport = function () {
            if (vm.selectedService === null) {
                vm.notification = { mode: 'danger', message: 'Error: Select Service  first' };

                return;
            }
            var userId = TokenService.getUserId();

            var serviceReportPayload = {
                mode: 'Insert', //vm.mode,
                servid: vm.selectedService.servid,
                title: vm.title,
                report: vm.report,
                refid: vm.selectedReferer.refid, //vm.refid ,
                status: 'true',
                sn: '1002',
                userId: userId,
            };

            var token = localStorage.getItem('access_token');
            $http.post(UrlConfig.labReportBaseUrl() + 'API/ReportTemplates', serviceReportPayload, { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    vm.notification = { mode: 'success', message: 'This report  succcessfully saved.' };
                    console.log(result.data);
                    vm.fetchReportTemplateList();
                    vm.reset();
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


        //EDIT REPORT TEMPLATE GET
        vm.fetchReportTemplateEditList = function () {

            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/ReportTemplates/' + vm.selectedReportTemplate.sn, { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    vm.ReportTemplateEditList = result.data;
                    console.log(result.data);
                }, function (error) {
                    console.log(error);
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                }); vm.noalert();
        };


        vm.onReportTemplateSelected = function (report) {
            vm.selectedReportTemplate = report;
            vm.selectedReportTemplate.mode = "Edit";
            vm.selectedReportTemplate.servid = report.servid;       
 };


vm.toggleView = function(){
    $scope.toggle = !toggle;
}


        vm.editReport = function () {
            if (vm.selectedReportTemplate == undefined) {
                vm.notification = { mode: 'danger', message: 'Error: Select Report Template To edit first' };
            };


            var reportTemplateEditPayload = {
                //    mode: 'Edit', //vm.mode,
                sn: vm.selectedReportTemplate.sn,
                servid: vm.selectedReportTemplate.servid,
                title: vm.selectedReportTemplate.title,
                report: vm.selectedReportTemplate.report,
                refid: vm.selectedReportTemplate.refid, //vm.refid ,
                status: 'true',
            };

            var token = localStorage.getItem('access_token');

            $http.post(UrlConfig.labReportBaseUrl() + 'API/ReportTemplates', reportTemplateEditPayload, { headers: { Authorization: 'Bearer ' + token } })

                .then(function (result) {
                    vm.notification = { mode: 'success', message: 'THIS REPORT  succcessfully saved.' };
                    console.log(result.data);
                    vm.reset();
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

        vm.reset = function () {
            vm.selectedService = null;
            vm.selectedReportTemplate = null;
            vm.title = null;
            vm.report = null;
            vm.selectedReferer = null;
        };

        vm.noalert = function(){
            $timeout(vm.resetNotification, 4000);
        };

    }]);