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
                          'BlurAdmin.auth',
                          'BlurAdmin.theme',
                          'BlurAdmin.data',
                          'BlurAdmin.pages']);

app.constant("authorization", {tipo:"JWT", token:""});
app.constant("PERFIL", "ALUNO");
app.run(function ($rootScope,$state,authorization, $window) {
   // $window.sessionStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU4ZDdmODY5NjU0ZDY5NjFmZWY4OTQwNSJ9.QgL9BSI3NCU5Bl74L0zuu-cIbO17gK5pwhlWS1Lq-1I";
    authorization.token = $window.sessionStorage.token;
});
