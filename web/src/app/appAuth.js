'use strict';
var app = angular.module('Auth',[]);

app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});