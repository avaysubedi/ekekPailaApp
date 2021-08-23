app.constant('Config', {
    ChangePasswordMode: {
        NonToken: 1,
        UserToken: 2,
        AdminToken: 3,
        CodeToken: 4
    },
    AdministratorRole: 'admin',
    spaceAbove : '15em'
});

app.factory('UrlConfig', ['$location', function ($location) {
    return {
        labReportBaseUrl: function(){
            var protocol = $location.protocol();
            var host = location.host; 
            return protocol + '://' + host + '/medipro.api.medipro/';
        }
    }
}]);