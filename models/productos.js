'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const ProductSchema = Schema({
	name : String,
	img : String,
	precio : { type : Number, default : 0},
	categoria: {type: String, enum:['computers', 'phone','accesories']},
	descripcion : String
})


//Hacemos este modelo accesible desde el resto de la aplicacion
module.exports =  mongoose.model('Product', ProductSchema);