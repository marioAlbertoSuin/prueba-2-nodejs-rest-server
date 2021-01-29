const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    telefono: {
        type: String
    },
    img: {
        type: String
    },
    //terminos y condiciones

});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};
usuarioSchema.methods.comparePasswords = function(passwordU) {
    return bcrypt.compareSync(passwordU, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);