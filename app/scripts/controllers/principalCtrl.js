(function (){
'use strict';
  angular.module('mascotte.controllers.loginCtrl', [])

  .controller('principalCtrl',['$scope', function($scope){
      $scope.obj = {   
        img404 : "https://firebasestorage.googleapis.com/v0/b/adogdb.appspot.com/o/imagenes%2F404.jpg?alt=media&token=7bd2e62d-8255-43c0-a254-28e8fc22f425",    
        imgLogin :"https://firebasestorage.googleapis.com/v0/b/adogdb.appspot.com/o/imagenes%2Flogin.jpg?alt=media&token=9463af67-8c7b-4fba-8540-3ec477eb1c31"
      }

      $(".button-collapse").sideNav();       
  }])

})()