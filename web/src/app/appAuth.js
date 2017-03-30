'use strict';
  /** @ngInject */
var app = angular.module('Auth',[]);

app.controller('loginCtrl', function($scope,$http,$window) {
    
    $window.sessionStorage.clear();
    
    $scope.login = login;
    $scope.data = {};

    function login(){
        
        var url = "";

        if($scope.data && $scope.data.password != "" && $scope.data.email !="" ){
            
            $http.post("http://localhost:3008/login", $scope.data, {headers: {'Authorization':'JWT'}})
            .then(function(res){
                $window.sessionStorage.token = res.data.token ;
                $window.sessionStorage.perfil = res.data.user.tipo;
                $window.sessionStorage.user = res.data.user._id;
                $window.location.href ="/" ;
            })
            .catch(function(res){
                console.log(res);
                if(res.data.retorno){
                    alert(res.data.retorno);
                }
                $scope.data.password  =null;
            });

        }
    }
});