(function (){
'use strict';
    angular.module('mascotte', ['mascotte.routes','satellizer','mascotte.controllers.loginCtrl'])

    .config(['$authProvider', function($authProvider){

      $authProvider.twitter({
        url: 'https://api.twitter.com/oauth2/token',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri: window.location.origin,
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
      });      

    }])
    

})()