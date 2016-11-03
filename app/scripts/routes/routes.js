(function (){
'use strict';
  angular.module('mascotte.routes',['ui.router'])
  
   .config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider','$locationProvider',
    function($stateProvider,$urlRouterProvider,$sceDelegateProvider,$locationProvider){


    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '**'
    ]);

    
    $stateProvider
      .state('login',{
        url:'/login',
        templateUrl:'../views/principal.html',
        controller : 'principalCtrl'
      })

      .state('landing',{
        url:'/menu',
        templateUrl:'../views/menu.html'
      })

      .state('not-fount',{
        url:'/page-not-found',
        templateUrl:'../views/404.html',
        controller:'principalCtrl'
      })


    $urlRouterProvider.otherwise('/page-not-found');
    $locationProvider.html5Mode(true).hashPrefix('!');
      
   }])


})()