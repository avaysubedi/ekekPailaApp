app.controller('AdminChangePasswordController', ['$http', 'Config', '$location', '$routeParams', 'TokenService', 'UrlConfig',
    function ($http, Config, $location, $routeParams, TokenService, UrlConfig) {
        var vm = this;

        vm.title = 'Admin Change Password';
        vm.mode = 1;
        vm.notification = {
            message: '',
            mode: 'info'
        };
        vm.selectedEmployee = null;

        vm.init = function () {
            //vm.fetchEmployeeList();
            vm.fetchUserList();
        };

        vm.fetchEmployeeList = function () {
            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/employees', { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.employeeList = result.data;
                }, function (error) {
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
        };

        vm.fetchUserList = function () {
            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/userlist', { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.UserList = result.data;
                }, function (error) {
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
        };

        vm.tryChangePassword = function () {
            vm.resetNotification();

            var userId = vm.selectedEmployee.userId;

            vm.changePassword({
                userId: userId,
                password: vm.password,
                confirmPassword: vm.confirmPassword
            });
        };

        vm.onEmployeeSelected = function (employee) {
            vm.selectedEmployee = employee;
        };

        vm.changePassword = function (payload) {
            var token = localStorage.getItem('access_token');

            $http.post(UrlConfig.labReportBaseUrl() + 'api/accounts/changepassword', payload, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.reset();
                    vm.notification = { mode: 'success', message: 'Password has been successfully updated.' };
                }, function (error) {
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
        };

        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };

        vm.reset = function(){
            vm.password = null;
            vm.confirmPassword = null;
        };

    }]);