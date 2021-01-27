const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let fundacionSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El correo es requerido']
    },
    direccion: {
        type: String,
        required: [true, 'la direccion es requerida']
       
    },
    email: {
        type: String,
        default:false,
        required: [true, 'el correo es requerido']
    },
    longitud: {
        type: String

    },
    latitud: {
        type:String
    },
    telefono: {
        type: String,
        required: true
        
    },
    img: {
        type: String
        
    },
    password: {
        type: String,
        required: true
        
    },
    pais: {
        type: String,
        required: true
        
    },
    provincia: {
        type: String,
        required: true
        
    },
    ciudad: {
        type: String,
        required: true
        
    },terminosCondiciones:{
        type:String,
        required:true
    }
    
});

fundacionSchema.plugin(uniqueValidator, { message: '{email} debe ser único' });


module.exports = mongoose.model('Fundacion', fundacionSchema);