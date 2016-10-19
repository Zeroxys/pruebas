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

app.get('/adopcion/tipo', (req,res) => {
	res.status(200).send({ animal : [] });
	res.status(200).send({ message : "hola" });
})

app.get('/adopcion/tipo/:id', (req,res) => {
	res.status(200).send( {message : req.params.id});
})

app.post('/adopcion/tipo', (req,res)=>{
	console.log('/POST /adopcion/tipo');
	console.log(req.body);

	let product = new Product();

	product.name = req.body.name
	product.img = req.body.img
	product.precio = req.body.precio
	product.categoria = req.body.categoria
	product.descripcion = req.body.descripcion

	product.save((err, productStore) => {
		if(err) res.status(500).send({message:`Error al guarda la db : ${err}`});

		res.status(200).send({message:productStore});
	})

})


app.listen(port, (err)=>{
	if(err) console.log(`Error en el servidor ${err}`);
	console.log(`Servidor iniciado y corriendo en el puerto ${port}`);
})