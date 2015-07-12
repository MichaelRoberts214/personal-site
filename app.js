
var app = angular.module('personalSite', []);

app.directive('tabs', function(){
  return {
    restrict: 'E',
    templateUrl: 'tabs.html'
  };
});

var mySubmit = function() {
  // event.preventDefault();
  // alert("asdf");
  // alert(document.forms["myForm"].value);
  alert(document.getElementById("stuff").value);
}
