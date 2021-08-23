app.controller('AdminUpdateUserController', ['$http', 'Config', '$location', '$routeParams', 'TokenService', 'UrlConfig','BroadcastService',
    function ($http, Config, $location, $routeParams, TokenService, UrlConfig,BroadcastService) {
        var vm = this;

        vm.title = 'Admin User Update';
        BroadcastService.notify('radioNavVisible', true);
        BroadcastService.notify('navText', 'Lab Report');
        BroadcastService.notify('labNavVisible', false);

        vm.roles = [];
        vm.selectedRoles = [];
        vm.notification = {
            message: '',
            mode: 'info'
        };
        vm.selectedEmployee = null;
        vm.defaultPassword = 'password';

        vm.init = function () {
            vm.fetchEmployeeList();
            vm.fetchRoles();
        };

        vm.fetchEmployeeList = function () {
            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/userlist', { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.UserList = result.data;
                }, function (error) {
                    var msg = (error.data) ? error.data.message : 'Make sure you are connected to internet and api is up and running.';
                    vm.notification = { mode: 'danger', message: 'Error: ' + msg};
                });
        };

        vm.fetchRoles = function () {
            var token = localStorage.getItem('access_token');
            $http.get(UrlConfig.labReportBaseUrl() + 'api/roles', { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    vm.roles = result.data;
                }, function (error) {
                    vm.notification = { mode: 'danger', message: 'Error - ' + error.data.message };
                });
        };

        vm.onEmployeeSelected = function (employee) {
            vm.selectedEmployee = employee;


            var token = localStorage.getItem('access_token');

            if (employee.userId !== 0) {
                vm.resetNotification();

                $http.get(UrlConfig.labReportBaseUrl() + 'api/accounts/users/' + employee.userId, { headers: { Authorization: 'Bearer ' + token } })
                    .then(function (result) {
                        vm.username = result.data.user.username;
                        vm.firstname = result.data.user.firstname;
                        vm.lastname = result.data.user.lastname;
                        vm.emailAddress = employee.email;
                        vm.mobile = employee.mobileNo;
                        vm.selectedRoles = result.data.roles;

                        vm.selectedRoles.forEach(sr => {
                            var idx = vm.roles.findIndex(f => f.roleId === sr);

                            if (idx > -1) {
                                vm.roles[idx].checked = true;
                            }
                        });
                    }, function (error) {
                        vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                    });
            } else {
                vm.notification = { mode: 'danger', message: 'Error: UserId is missing. Probably external staff member.'};
            }
        };

        vm.toggleRoleSelection = function (role) {
            var idx = vm.selectedRoles.indexOf(role.roleId);

            if (idx > -1) {
                vm.selectedRoles.splice(idx, 1);
            } else {
                vm.selectedRoles.push(role.roleId);
            }
        };

        vm.createOrUpdateUser = function () {
            vm.resetNotification();

            if (vm.selectedEmployee !== null && vm.selectedEmployee.userId !== null) {

                if (vm.password === null || vm.password === undefined) {
                    vm.password = vm.defaultPassword;
                    vm.confirmPassword = vm.defaultPassword;
                }

                var payload = {
                    username: vm.username,
                    password: vm.password,
                    confirmPassword: vm.confirmPassword,
                    emailAddress: vm.emailAddress,
                    mobileNumber: vm.mobile,
                    userRoles: vm.selectedRoles,
                    firstName: vm.firstname,
                    lastName: vm.lastname
                };

                var token = localStorage.getItem('access_token');
                $http.post(UrlConfig.labReportBaseUrl() + 'api/accounts/users/' + vm.selectedEmployee.userId, payload, { headers: { Authorization: 'Bearer ' + token } })
                    .then(function (result) {
                        vm.notification = { mode: 'success', message: 'User updated successfully.' };
                        vm.reset();
                    }, function (error) {
                        vm.notification = { mode: 'danger', message: 'Error - ' + error.data.message };
                    });
            } else {
                vm.notification = { mode: 'danger', message: 'Error - Employee not selected' };
            }
        };

        vm.reset = function () {
            vm.selectedEmployee = null;

            vm.username = null;
            vm.firstname = null;
            vm.lastname = null;
            vm.password = null;
            vm.confirmPassword = null;
            vm.emailAddress = null;
            vm.mobile = null;
            vm.selectedRoles = [];

            vm.roles.forEach(r => {
                r.checked = null;
            })
        };

        vm.resetNotification = function () {
            vm.notification = {
                message: '',
                mode: 'info'
            };
        };
    }]);