'use strict';
var app = angular.module('BlurAdmin', [
                          'ngAnimate',
                          'ui.calendar',
                          'ui.bootstrap',
                          'ui.sortable',
                          'ui.router',
                          'ngTouch',
                          'toastr',
                          'smart-table',
                          "xeditable",
                          'ui.slimscroll',
                          'ngJsTree',
                          'angular-progress-button-styles',
                          'firebase',
                          'angularFileUpload',
                          'BlurAdmin.auth',
                          'BlurAdmin.theme',
                          'BlurAdmin.data',
                          'BlurAdmin.pages'])
.constant("authorization", {tipo:"JWT", token:""})
.constant("$USERDATA",JSON.parse(window.sessionStorage.userData))
.constant("PERFIL", "")
//.constant("$URLAPI", "https://guru-web.herokuapp.com/");
.constant("$URLAPI", "http://localhost:3008/");
app.run(function ($rootScope,$state,authorization, $window,PERFIL) {
    authorization.token = $window.sessionStorage.token;
    PERFIL = $window.sessionStorage.perfil;
});