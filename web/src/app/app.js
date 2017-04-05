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
                          'BlurAdmin.auth',
                          'BlurAdmin.theme',
                          'BlurAdmin.data',
                          'BlurAdmin.pages']);

app.constant("authorization", {tipo:"JWT", token:""});
app.constant("$USERDATA",JSON.parse(window.sessionStorage.userData));
app.constant("PERFIL", "");
app.run(function ($rootScope,$state,authorization, $window,PERFIL) {
    authorization.token = $window.sessionStorage.token;
    PERFIL = $window.sessionStorage.perfil;
});