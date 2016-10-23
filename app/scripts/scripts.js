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

      .when('/quienes', {
        templateUrl:'views/principal.html',
        controller:'quienesCtrl'
      })

      .when('/acerca', {
        templateUrl:'views/principal.html',
        controller:'acercaCtrl'
      })            

      .otherwise({redirectTo:'/' })   
    })

    .controller('principalCtrl', function($scope) {

    })

    .controller('queienesCtrl', function(){

    })

    .controller('acercaCtrl', function(){

    })
})()
