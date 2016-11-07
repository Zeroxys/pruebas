(function (){
'use strict';
  angular.module('mascotte.controllers.loginCtrl', ['satellizer'])

  .controller('principalCtrl',['$scope','$auth','$http', function($scope,$auth,$http){
      $scope.obj = {   
        img404 : "https://firebasestorage.googleapis.com/v0/b/adogdb.appspot.com/o/imagenes%2F404.jpg?alt=media&token=7bd2e62d-8255-43c0-a254-28e8fc22f425",    
        imgLogin :"https://firebasestorage.googleapis.com/v0/b/adogdb.appspot.com/o/imagenes%2Flogin.jpg?alt=media&token=9463af67-8c7b-4fba-8540-3ec477eb1c31"
      }

      $scope.authenticate = function(provider){
      	$auth.authenticate(provider);
      }

      $scope.authenticate = function(provider){
        $auth.authenticate(provider);
      }

      $(".button-collapse").sideNav();       

      $scope.salir = function(provider){
        $auth.logout().then(function() {
        $http.get('https://www.facebook.com/logout.php?access_token=ACCESS_TOKEN&confirm=1&next=REDIRECT').success(function() {
        // logged out
  });
});
      }
  }])

})()