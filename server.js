'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Importamos el modelo ProducSchema
const Product = require('./models/productos')

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
	res.status(200).send({message :'Mostrara todos los tipos' });
})

app.listen(port, (err)=>{
	if(err) console.log(`Error en el servidor ${err}`);
	console.log(`Servidor iniciado y corriendo en el puerto ${port}`);
})