(function (){
'use strict';
    angular.module('mascotte', ['ui.router','satellizer','mascotte.controllers.loginCtrl'])
   
   .config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider','$locationProvider',
    function($stateProvider,$urlRouterProvider,$sceDelegateProvider,$locationProvider){


    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '**'
    ]);
    $urlRouterProvider.otherwise('/main');
    
    $stateProvider
      .state('login',{
        url:'/login',
        templateUrl:'../views/principal.html',
        controller : 'principalCtrl'
      })

      .state('main',{
        url:'/main',
        templateUrl:'../views/404.html',
        controller:'principalCtrl'
      })
   }])


})()