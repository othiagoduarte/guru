'use strict';
var app = angular.module('BlurAdmin',modulos())
.constant("authorization", {tipo:"JWT", token:""})
.constant("$USERDATA",JSON.parse(window.sessionStorage.userData))
.constant("PERFIL", "")
.constant("$URLAPI", "https://guru-web.herokuapp.com/");
/*
.constant("$URLAPI", "http://localhost:3008/");
*/
app.run(function ($rootScope,$state,authorization, $window,PERFIL) {
    authorization.token = $window.sessionStorage.token;
    PERFIL = $window.sessionStorage.perfil;
});

function modulos(){
    var mod = [];
    mod.push('ngAnimate');
    mod.push('ui.calendar');
    mod.push('ui.bootstrap');
    mod.push('ui.sortable');
    mod.push('ui.router');
    mod.push('ui.select');
    mod.push('ui.slimscroll');
    mod.push('ngTouch');
    mod.push('toastr');
    mod.push('smart-table');
    mod.push("xeditable");
    mod.push('ngJsTree');
    mod.push('angular-progress-button-styles');
    mod.push('angularFileUpload');
    mod.push('BlurAdmin.auth');
    mod.push('BlurAdmin.theme');
    mod.push('BlurAdmin.data');
    mod.push('BlurAdmin.pages');
    
    return mod;
}