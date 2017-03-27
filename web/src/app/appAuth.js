'use strict';
var app = angular.module('Auth',[]);

app.controller('loginCtrl', function($scope,$http,$window) {
    
    $window.sessionStorage.clear();
    
    $scope.login = login;
    $scope.data = {};
    $scope.data.password  = null;
    $scope.data.email ="";
    
    console.log("Controller ready");

    function login(){
 
        if($scope.data && $scope.data.password != "" && $scope.data.email !="" ){
            
            $http.post("https://guru-othiagoduarte.c9users.io/login", $scope.data)
            .then(function(res){
                $window.sessionStorage.token = res.data.token ;
                $window.sessionStorage.perfil = res.data.user.tipo;
                window.location.href ="/#/" + res.data.user.tipo ;
            })
            .catch(function(res){
                if(res.data.retorno){
                    alert(res.data.retorno);
                }
                $scope.data.password  =null;
            });

        }
    }
});