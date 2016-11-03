'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//Importamos el modelo ProducSchema
const Product = require('./models/productos')

const corsOps = {
	origin : '*',
	methods : 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue : 'false'
}

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors(corsOps));
//usamos middleware para los assets
app.use(express.static('app'))

app.get('/*', (req,res) => {
	res.status(200).sendFile(__dirname + '/app/' + 'index.html');
})
app.options('*', cors());


app.listen(port, (err)=>{
	if(err) console.log(`Error en el servidor ${err}`);
	console.log(`Servidor iniciado y corriendo en el puerto ${port}`);
})