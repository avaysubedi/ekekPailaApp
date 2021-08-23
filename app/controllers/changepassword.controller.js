app.controller('ChangePasswordController', ['$http', 'Config', '$location', '$routeParams', 'TokenService', 'UrlConfig',
    function ($http, Config, $location, $routeParams, TokenService, UrlConfig) {
        var vm = this;

        vm.title = 'Change Password';
        vm.mode = 1;
        vm.notification = {
            message: '',
            mode: 'info'
        };
        vm.resetCode = null;

        vm.init = function () {
            //Check mode
            vm.resetCode = $routeParams.resetcode;


            if (TokenService.checkTokenValidity()) {
                var roles = TokenService.getUserRoles();

                if (roles.includes(Config.AdministratorRole)) {
                    vm.mode = Config.ChangePasswordMode.AdminToken;
                } else {
                    vm.mode = Config.ChangePasswordMode.UserToken;
                }
            } else if (vm.resetCode != undefined) {
                vm.mode = Config.ChangePasswordMode.CodeToken;
            } else {
                vm.mode = Config.ChangePasswordMode.NonToken;
            }
        };

        vm.tryChangePassword = function () {
            vm.resetNotification();

            if (vm.mode === Config.ChangePasswordMode.NonToken) {
                vm.changePassword({
                    emailAddress: vm.emailAddress
                });
            } else if (vm.mode === Config.ChangePasswordMode.CodeToken) {
                vm.changePassword({
                    resetCode: vm.resetCode,
                    password: vm.password,
                    confirmPassword: vm.confirmPassword
                });
            } else {
                var userId = TokenService.getUserId();

                vm.changePassword({
                    userId: userId,
                    password: vm.password,
                    confirmPassword: vm.confirmPassword
                });
            }
        };

        vm.changePassword = function (payload) {
            var token = localStorage.getItem('access_token');

            $http.post(UrlConfig.labReportBaseUrl() + 'api/accounts/changepassword', payload, { headers: { Authorization: 'Bearer ' + token } })
                .then(function (result) {
                    if (vm.mode === Config.ChangePasswordMode.NonToken) {
                        var email = result.data;
                        if (email !== null && email != '' && email != undefined) {
                            vm.notification = { mode: 'success', message: 'Email has been sent to user email [' + email + ']. Please check the email to change password.' };
                        }
                    } else {
                        vm.notification = { mode: 'success', message: 'Password has been successfully updated.' };
                        vm.reset();
                    }
                }, function (error) {
                    vm.notification = { mode: 'danger', message: 'Error: ' + error.data.message };
                });
        }

        vm.reset = function () {
            vm.password = null;
            vm.confirmPassword = null;
        }

        vm.resetNotification = function(){
            vm.notification = {
                message: '',
                mode: 'info'
            };
        }
    }]);