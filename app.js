
var app = angular.module('personalSite', []);

app.directive('tabs', function(){
  return {
    restrict: 'E',
    templateUrl: 'tabs.html'
  };
});
