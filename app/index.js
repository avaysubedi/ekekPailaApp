var app = angular.module('medipro-clientprofile', ['ngRoute','ui.mask']);

app.controller('MainController', ['TokenService', '$location', 'Config','$scope','BroadcastService',
 function (TokenService, $location, Config,$scope, BroadcastService) {
  var vm = this;

  vm.title = "Page under construction...";
  vm.loggedIn = false;
  vm.loggedInAsAdmin = false;
  vm.loggedInUsername = 'No name';

  
  BroadcastService.subscribe('radioNavVisible', $scope, function (event, args) {
    vm.isRadioSideNavVisible = args.message;
    });
    BroadcastService.subscribe('navText', $scope, function (event, args) {
      vm.navText = args.message;
      });

  BroadcastService.subscribe('labNavVisible', $scope, function (event, args) {
    vm.isLabSideNavVisible = args.message;
     //message is either true or false passed from each partial view controller
  });
  
  
  vm.init = function () {
    vm.loggedIn = TokenService.checkTokenValidity();

    //Check token presence and expiry, if not route to login
    //   TokenService.navigateToLoginOnInvalidToken();

    vm.loggedInUsername = TokenService.getUser();
    vm.loggedInAsAdmin = TokenService.getUserRoles().includes(Config.AdministratorRole);
  };

  vm.tryLogOff = function () {
    vm.loggedIn = false;
    TokenService.navigateToLoginOnClearToken();
  };

  vm.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  vm.menuShowed = true;
  vm.toggleMenu = function () {
    $('.menu-container').slideToggle();
    vm.menuShowed = !vm.menuShowed;
  };

  vm.getIcon = function () {
    return vm.menuShowed ? 'fa fa-chevron-up' : 'fa fa-chevron-up';
  };
}]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider

  .when('/dashboard', {
    templateUrl: './partials/dashboard.tpls.html',
    controller: 'DashboardController as vm'
  })
    .when('/biometry', {
      templateUrl: './partials/biometry.tpls.html',
      controller: 'BiometryController as vm'
    })
    .when('/reporttemplate', {
      templateUrl: './partials/reporttemplate.tpls.html',
      controller: 'ReportTemplateController as vm'
    })
    .when('/login', {
      templateUrl: './partials/login.tpls.html',
      controller: 'LoginController as vm'
    })
    .when('/entrylist', {
      templateUrl: './partials/entrylist.tpls.html',
      controller: 'EntryListController as vm'
    })
    .when('/testlist', {
      templateUrl: './partials/testlist.tpls.html',
      controller: 'TestListController as vm'
    })
    .when('/testreport', {
      templateUrl: './partials/testreport.tpls.html',
      controller: 'TestReportController as vm'
    })

    .when('/testresult', {
      templateUrl: './partials/lab/testresult.tpls.html',
      controller: 'TestResultController as vm'
    })


    .when('/changepassword', {
      templateUrl: './partials/changepassword.tpls.html',
      controller: 'ChangePasswordController as vm'
    })
    .when('/visionandrefraction', {
      templateUrl: './partials/visionandrefraction.tpls.html',
      controller: 'VisionAndRefractionController as vm'
    })
    .when('/ocularexamination', {
      templateUrl: './partials/ocularexamination.tpls.html',
      controller: 'OcularExaminationController as vm'
    })
    .when('/ocularinvestigation', {
      templateUrl: './partials/ocularinvestigation.tpls.html',
      controller: 'OcularInvestigationController as vm'
    })
    .when('/pasteyehistory', {
      templateUrl: './partials/pasteyehistory.tpls.html',
      controller: 'PastEyeHistoryController as vm'
    })
    
    .when('/chiefeyecomplain', {
      templateUrl: './partials/chiefeyecomplain.tpls.html',
      controller: 'ChiefEyeComplainController as vm'
    })
    .when('/smokinghistory', {
      templateUrl: './partials/smokinghistory.tpls.html',
      controller: 'SmokingHistoryController as vm'
    })

    .when('/dentalinfo', {
      templateUrl: './partials/dentalinfo.tpls.html',
      controller: 'DentalInfoController as vm'
    })
    .when('/dermatology', {
      templateUrl: './partials/dermatology.tpls.html',
      controller: 'DermatologyController as vm'
    })



    .when('/adminchangepassword', {
      templateUrl: './partials/adminchangepassword.tpls.html',
      controller: 'AdminChangePasswordController as vm'
    })
    .when('/createuser', {
      templateUrl: './partials/createuser.tpls.html',
      controller: 'CreateUserController as vm'
    })
    .when('/adminupdateuser', {
      templateUrl: './partials/adminupdateuser.tpls.html',
      controller: 'AdminUpdateUserController as vm'
    })
    .otherwise({ redirectTo: '/dashboard' });
});


     // .when('/clientvisit', {
    //   templateUrl: './partials/clientvisit.tpls.html',
    //   controller: 'ClientVisitController as vm'
    // })
    // .when('/clientreceipt', {
    //   templateUrl: './partials/clientreceipt.tpls.html',
    //   controller: 'ClientReceiptController as vm'
    // })
