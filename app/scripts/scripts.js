'use strict';
(function (){
    angular.module('mascotte', ['ngRoute'])
   
    .config(($routeProvider,$locationProvider) => {
      $locationProvider.html5Mode(true)
      $routeProvider
      
      .when('/', {
        templateUrl:'views/principal.html',
        controller:'principalCtrl'
      })
            
    })

    .controller('principalCtrl', function($scope) {

    })
})()
