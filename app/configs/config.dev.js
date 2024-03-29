app.constant('Config', {
    ChangePasswordMode: {
        NonToken: 1,
        UserToken: 2,
        AdminToken: 3,
        CodeToken: 4
    },
    AdministratorRole: 'admin',
    EyeDoctorRole:'eyedoctor',
    NurseRole: 'nurse',
    DentalDoctotRole: 'dentaldoctor',
    DermaDoctorRole:'dermadoctor',
    spaceAbove: '10em',
    groupid:124 //102
});

app.factory('UrlConfig', ['$location', function ($location) {
    return {
        labReportBaseUrl: function () {
           return 'https://192.168.50.126/medipro.api.medipro/';
    //    return 'http://localhost/medipro.api.medipro/';

            // return 'https://mediprocomputers.com/mediprowebapis';

        }
    }
}]);

