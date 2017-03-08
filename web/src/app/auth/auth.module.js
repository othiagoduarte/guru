(function () {
  'use strict';

  var app =  angular.module('BlurAdmin.auth', []);
  
  app.service('$authService',authService);
  
  function authService(){
    this.perfil = "ALUNO";
  }

app.provider('unicornLauncher', function UnicornLauncherProvider() {
  var useTinfoilShielding = false;

  this.useTinfoilShielding = function(value) {
    useTinfoilShielding = !!value;
  };

  this.$get = ["apiToken", function unicornLauncherFactory(apiToken) {

    // let's assume that the UnicornLauncher constructor was also changed to
    // accept and use the useTinfoilShielding argument
    return new UnicornLauncher(apiToken, useTinfoilShielding);
  }];
});

})();