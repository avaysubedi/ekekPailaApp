app.controller('CreateUserController', ['$http', 'Config', '$routeParams', 'TokenService', 'UrlConfig',
        function ($http, Config, $routeParams, TokenService, UrlConfig) {
    var vm = this;

    vm.title = 'Admin Create User';
    vm.roles = [];
    vm.selectedRoles = [];
    vm.defaultPassword = 'password';
    vm.notification = {
        message: '',
        mode: 'info'
    };

    vm.init = function(){
        vm.fetchRoles();
    };

    vm.fetchRoles = function(){
        var token = localStorage.getItem('access_token');
        $http.get(UrlConfig.labReportBaseUrl() + 'api/roles', {headers: { Authorization: 'Bearer ' + token}})
             .then(function(result){
                vm.roles = result.data;
             }, function(error){
                vm.notification = { mode: 'danger', message: 'Error - ' + error.data.message };
             });
    };

    vm.toggleRoleSelection = function(role){
        var idx = vm.selectedRoles.indexOf(role.roleId);

        if (idx > -1) {
            vm.selectedRoles.splice(idx, 1);
        } else {
            vm.selectedRoles.push(role.roleId);
        }
    };

    vm.createOrUpdateUser = function(){
        vm.resetNotification();

        if(vm.password === null || vm.password === undefined){
            vm.password = vm.defaultPassword;
            vm.confirmPassword = vm.defaultPassword;
        }

        var payload = {
            username: vm.username,
            password: vm.password,
            confirmPassword: vm.confirmPassword,
            emailAddress: vm.emailAddress,
            mobileNumber: vm.username,
            userRoles: vm.selectedRoles,
            firstName: vm.firstname,
            lastName: vm.lastname
        };
        
        var token = localStorage.getItem('access_token');
        $http.post(UrlConfig.labReportBaseUrl() + 'api/accounts/createuser', payload, {headers: { Authorization: 'Bearer ' + token}})
             .then(function(result){
                vm.notification = { mode: 'success', message: 'User created successfully.' };
                vm.reset();
             }, function(error){
                vm.notification = { mode: 'danger', message: 'Error - ' + error.data.message };
             });
    };

    vm.reset = function(){
        vm.username = null;
        vm.firstname = null;
        vm.lastname = null;
        vm.password = null;
        vm.confirmPassword = null;
        vm.emailAddress = null;
        vm.mobile = null;
        vm.selectedRoles = [];
    };

    vm.resetNotification = function(){
        vm.notification = {
            message: '',
            mode: 'info'
        };
    };
}]);