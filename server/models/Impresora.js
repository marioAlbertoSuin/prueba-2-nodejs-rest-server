const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let ImoresoraSchema = new Schema({
    marca: {
        type: String,
        required: [true, 'La marca es requerida']
    },
    modelo: {
        type: String,
        required: [true, 'El modelo es requerido']
       
    },
    n_serie: {
        type: Number,
        required: true,
        unique: true
    },
    color: {
        type: Boolean,
        default:false
    },
    ip: {
        type: String,
      
        unique: true
    },
    n_contador: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: true,
        
    }
});

ImoresoraSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

ImoresoraSchema.methods.toJSON = function() {
    let imp = this;
    let impObject = imp.toObject();
    delete impObject.n_contador;

    return impObject;
}

module.exports = mongoose.model('impresora', ImoresoraSchema);