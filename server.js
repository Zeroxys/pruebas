(function (){
  'use strict';
  const qs = require('querystring')
  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const request = require('request');
  const config = require('./config');
  
  //Importamos el modelo ProducSchema
  const Product = require('./models/productos')

  //Creamos la aplicacion de express
  const app = express();

  //Seteamos el puerto para produccion y desarrollo
  const port = process.env.PORT || 8080;

  //****Middlewares***//
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  app.use(express.static('app'))
  app.use (cors({origin:"*"}))

  app.get('/*', (req,res) => {
    res.status(200).sendFile(__dirname + '/app/' + 'index.html');
  })

  ////////////----Login de Facebook ---- ////////////////

  app.post('/auth/facebook', (req,res) => {

    var fields = ['id','email','first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.FACEBOOK_SECRET,
      redirect_uri: req.body.redirectUri
    };

    // paso 1 Cambiamos el codigo de autorizacion por el token de acceso.
    request.get({ url:accessTokenUrl, qs:params, json:true}, function(err,response,accessToken){
      if(response.statusCode !== 200){
        return res.status(500).send({message: accessToken.error.message, tipo:"Error acceso token"});
      }

      // paso 2 Recibimos informacion del perfil acerca del usuario.
      request.get({ url:graphApiUrl, qs:accessToken, json:true }, function(err,response,profile){
        
        if (response.statusCode !==200){
          return res.status(500).send({message:profile.error.message, tipo:"Error acceso graph"})
        }

        if (req.header('Authorization')){
          User.findOne({ facebook: profile.id }, function(err, existingUser){
            if (existingUser){
              return res.status(409).send({ message: 'Ya existe una cuenta de Facebook que te pertenece'});
            };

            var token = req.header('Authorization').split(' ')[1];
            var payload = jwt.decode(token, config.TOKEN_SECRET);
            User.findById(payload.sub, function(err, user){
              if (!user){
                return res.status(400).send({ message: 'Usuario no encontrado' });
              };
              user.facebook = profile.id;
              user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
              user.displayName = user.displayName || profile.name;
              user.save(function(){
                var token = createJWT(user);
                res.send({ token:token })
              });
            });

          });
        }else{
          //Paso 3 Creamos una nueva cuenta de usuario o regresamos una existente
          User.findOne({ facebook:profile.id }, function(err, existingUser){
            if (existingUser){
              var token = createJWT(existingUser);
              return res.send({ token:token });
            }
            var user = new User();
            user.facebook = profile.id;
            user.displayName = profile.name;
            user.save(function(){
              var token = createJWT(user);
              res.send({token:token})
            })
          })
        }

      })
    }) 

  })

  ///////////----Login de Twitter ---- ////////////////

  app.post('/auth/twitter', (req,res) => {
    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var profileUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';

    //Iniciamos la peticion desde satellizer
    if (!req.body.oauth_token || !req.body.oauth_verifier) {
      var requestTokenOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        callback: req.body.redirectUri
      };

     // Step 1. Obtain request token for the authorization popup.
      request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
        var oauthToken = qs.parse(body);

        // Step 2. Send OAuth token back to open the authorization screen.
        res.send(oauthToken);
      });
    } else {
      // Part 2 of 2: Second request after Authorize app is clicked.
      var accessTokenOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        token: req.body.oauth_token,
        verifier: req.body.oauth_verifier
      };
    };

    // Step 3. Exchange oauth token and oauth verifier for access token.
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

      accessToken = qs.parse(accessToken);

      var profileOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        token: accessToken.oauth_token,
        token_secret: accessToken.oauth_token_secret,
      };    
    })
    
  })

  app.listen(port, (err)=>{
    if(err) console.log(`Error en el servidor ${err}`);
    console.log(`Servidor iniciado y corriendo en el puerto ${port}`);
  })

})()

