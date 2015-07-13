angular.module('collegeClubs.util.toolbar', ['ngMaterial'])
  .controller('toolbarCtrl', function($scope) {
    $scope.isOpen = false;
    $scope.bar = {
      isOpen: false,
      count: 0,
      selectedAlignment: 'md-left'
    };
  })