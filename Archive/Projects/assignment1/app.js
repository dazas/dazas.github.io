(function() {
  'use strict';
  angular.module('LunchCheckApp', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.items = ""
    $scope.message = "";
    $scope.toggle = function() {
      return !this.booleanVal;
    };
    $scope.checkLunchItems = function() {
      $scope.items = $scope.items.trim();
      if ($scope.items === "") {
        $scope.message = "Please enter data first.";
        $scope.noticeType = "error";
      }
      else {
        var $lunchItems = $scope.items.split(",");
        var $length = $lunchItems.length;
        $scope.noticeType = "success";
        if ( $length <= 3) {
          $scope.message = "Enjoy!";
        }
        else {
          $scope.message = "Too much!";
        }
      }
    };
  }
})();