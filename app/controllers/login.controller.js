app.controller('LoginController', ['$http', 'Config', '$location', '$routeParams', 'TokenService', '$scope', 'UrlConfig','DateService','$filter',
        function ($http, Config, $location, $routeParams, TokenService, $scope, UrlConfig,DateService,$filter) {
    var vm = this;

    vm.title = 'Login';
    vm.notification = {
        message: '',
        mode: 'info'
    };

    vm.init= function(){
        $scope.init = DateService.getInitDate();
        $scope.final = DateService.getFinalDate();
        vm.initdate = $filter("date")($scope.init, "yyyy/MM/dd");
        vm.finaldate = $filter("date")($scope.final, "yyyy/MM/dd");
        localStorage.setItem('init', vm.initdate);
        localStorage.setItem('final', vm.finaldate);
    };


    vm.tryLogin = function () {
        vm.resetNotification();

        $http.post(UrlConfig.labReportBaseUrl() + 'token', "userName=" + encodeURIComponent(vm.username) +
            "&password=" + encodeURIComponent(vm.password) +
            "&grant_type=password", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).then(function (result) {
            //Set response item in LocalStorage
            localStorage.setItem('access_token', result.data.access_token);
            localStorage.setItem('expiresIn', result.data.expires_in);
            
            TokenService.checkTokenValidity();
            $scope.$parent.vm.loggedIn = true;
            $scope.$parent.vm.loggedInUsername = TokenService.getUser();
            $scope.$parent.vm.loggedInAsAdmin = TokenService.getUserRoles().includes(Config.AdministratorRole);

            //Reroute to original route
            //app.com/login?redirect=/...
            var redirectRoute = $routeParams.redirect;

            if(redirectRoute !== undefined){
                $location.path('/' + redirectRoute);
            }
            else{
                $location.path('/');
            }
        }, function (error) {
            console.log(error);

            var errorMsg = (error.data) ? error.data.error_description : 'Error logging in. Make sure the server is up.';
            vm.notification = { mode: 'danger', message: errorMsg};
        });
    };

    vm.resetNotification = function(){
        vm.notification = {
            message: '',
            mode: 'info'
        };
    };
}]);