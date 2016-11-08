(function (){
'use strict';
    angular.module('mascotte', ['mascotte.routes','satellizer','mascotte.controllers.loginCtrl'])

    .config(['$authProvider','$httpProvider', function($authProvider,$httpProvider){

      $httpProvider.defaults.useXDomain = true;

      $authProvider.withCredentials = false;
      $authProvider.tokenRoot = null;
      $authProvider.baseUrl = '/';
      $authProvider.loginUrl = 'http://localhost:8080/auth/twitter';
      $authProvider.signupUrl = '/auth/signup';
      $authProvider.tokenName = 'token';
      $authProvider.tokenPrefix = 'mascotte';
      $authProvider.tokenHeader = 'Authorization';
      $authProvider.tokenType = 'JWT';
      $authProvider.storageType = 'localStorage';

      $authProvider.facebook({
        clientId: '1237951999603741',
        responseType:'token',
        redirectUri: window.location.origin + '/menu'

      });

      $authProvider.twitter({

        url: '/auth/twitter',
        redirectUri: window.location.origin + '/menu',
        popupOptions: { width: 495, height: 445 }

      });

    }])
    

})()