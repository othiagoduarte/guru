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
                          'BlurAdmin.pages']);

app.constant("authorization", {tipo:"JWT", token:""});
app.constant("$USERDATA",JSON.parse(window.sessionStorage.userData));
app.constant("PERFIL", "");

app.constant("$URLAPI", "https://guru-api-othiagoduarte.c9users.io/");
/*
app.constant("$URLAPI", "https://othiagoduarte.herokuapp.com/");
*/

/*
app.constant("$URLAPI", "http://localhost:3008/");
*/
app.run(function ($rootScope,$state,authorization, $window,PERFIL) {
    authorization.token = $window.sessionStorage.token;
    PERFIL = $window.sessionStorage.perfil;
});