app.factory('TokenService', ['$http', '$location', 
function ($http, $location) {

    var tokenBody = null;

    function checkTokenValidity() {
        var token = localStorage.getItem('access_token');

        if (token === null || token === undefined) {
            return false;
        }

        var tokenPartition = token.split('.');

        if (tokenPartition.length === 3) {
            var tokenBase64Body = tokenPartition[1];
            this.tokenBody = JSON.parse(atob(tokenBase64Body));

            if (this.tokenBody.exp !== null || this.tokenBody.exp !== '') {
                var currentDateTime = new Date().getTime() / 1000;

                if (this.tokenBody.exp < currentDateTime) {
                    return false;
                }
            }
        }
        else {
            return false;
        }

        return true;
    }
    //"{"sub":"1","nameid":"ADMINISTRATOR","email":"test@test.com","role":["admin","supervisor"],"iss":"http://localhost:63240",
    //"aud":"Medipro","exp":1557477301,"nbf":1557390901}"

    function getUser() {
        var user = '';

        if (this.tokenBody !== null && this.tokenBody !== undefined) {
            user = this.tokenBody.nameid;
        }

        return user;
    }

    function getUserId() {
        var userId = '';

        if (this.tokenBody !== null && this.tokenBody !== undefined) {
            userId = this.tokenBody.sub;
        }

        return userId;
    }

    function getUserRoles() {
        var roles = [];

        if (this.tokenBody !== null && this.tokenBody !== undefined) {
            roles = this.tokenBody.role;
        }

        return roles;
    }

    function navigateToLoginOnInvalidToken(returnRoute){
        if(!this.checkTokenValidity()){
            $location.path('/login').search('redirect', returnRoute);
        }
    }

    function navigateToLoginOnClearToken(){
        localStorage.removeItem('access_token');
        $location.path('/login');
    }

    return {
        checkTokenValidity: checkTokenValidity,
        getUser: getUser,
        getUserId: getUserId,
        getUserRoles: getUserRoles,
        navigateToLoginOnInvalidToken: navigateToLoginOnInvalidToken,
        navigateToLoginOnClearToken: navigateToLoginOnClearToken
    };
}]);