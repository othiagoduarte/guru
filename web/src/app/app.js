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
                          
                          'BlurAdmin.theme',
                          'BlurAdmin.data',
                          'BlurAdmin.auth',
                          'BlurAdmin.pages']);

app.constant("USUARIO", {"perfil": "ALUNO"})
app.run(function ($rootScope,$state) {
    
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    
    /*
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
        console.log(event)
        event.preventDefault();
            $state.go('orientadores');
    } 
    */  
    });

});
