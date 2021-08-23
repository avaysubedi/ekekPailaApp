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
    spaceAbove: '0em',
    groupid:124 //102
});

app.factory('UrlConfig', ['$location', function ($location) {
    return {
        labReportBaseUrl: function () {
            return 'http://192.168.50.126/medipro.api.medipro/';
      //  return 'http://server/medipro.api.medipro/';

            // return 'https://mediprocomputers.com/mediprowebapis';

        }
    }
}]);

