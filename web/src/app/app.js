'use strict';

var app = angular.module('BlurAdmin', [
                          'ngAnimate',
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
                          'angular-jwt',
                          'BlurAdmin.auth',
                          'BlurAdmin.theme',
                          'BlurAdmin.data',
                          'BlurAdmin.pages']);

app.constant("authorization", {tipo:"JWT", token:""});
app.constant("PERFIL", "");
app.run(function ($rootScope,$state,authorization, $window,PERFIL) {
    authorization.token = $window.sessionStorage.token;
    PERFIL = $window.sessionStorage.perfil;
});