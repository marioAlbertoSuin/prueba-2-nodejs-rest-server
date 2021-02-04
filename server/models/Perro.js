const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let PerroSchema = new Schema({
    nombre: {
        type: String,
       
        
    },
    edad: {
        type: String
      
       
    },
    tamaño: {
        type: String,
    },
    img: {
        type: String
        
    },
    historia:{
        type:String
    },
    estado:{
        type:Boolean
    },
    codFundacion:{
        type:String
    },
    requisitos:{
        type:String
    },
    discapacidades:{
        type:String
    }
 
});




module.exports = mongoose.model('Perro', PerroSchema);