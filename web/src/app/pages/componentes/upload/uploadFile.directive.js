(function () {
  'use strict';

  angular.module('BlurAdmin.pages')
      .directive('uploadFile', uploadFile);

  /** @ngInject */
  function uploadFile() {
    return {
      restrict: 'EA',
      controller: 'uploadFileCtrl',
      templateUrl: 'app/pages/componentes/upload/uploadFile.html'
    };
  }
})();