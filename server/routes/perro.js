const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Perros = require('../models/Perro');
const email = require('../models/Email')

const app = express();

app.get('/perros', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Perros.find()
        .skip(desde)
        .limit(limite)
        .exec((err, perro) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Perros.count((err, conteo) => {
                res.json({
                    ok: true,
                    perro,
                    numero: conteo
                });
            });
        })
});


app.get('/perrosPorFun/:id', (req, res) => {
    let id = req.params.id;
    Perros.aggregate([
        { $match: { codFundacion: id } }
    ], (err, perroBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (perroBD.leght == 0) {
            res.json({
                ok: false,
                err: {
                    message: "perro no encontrado"
                }
            });
        } else {
            res.json({
                ok: true,
                perroBD
            });
        }
    });
});


app.post('/perros', (req, res) => {

    let body = req.body

    let perro = new Perros({
        nombre: body.nombre,
        edad: body.edad,
        tamaño: body.tamaño,
        img: body.img,
        historia: body.historia,
        estado: body.estado,
        codFundacion: body.codFundacion,
        requisitos: body.requisitos,
        discapacidades: body.discapacidades

    });

    perro.save((err, perroDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            perro: perroDB
        });
    });
});

app.post('/adoptar', async(req, res) => {

    let body = req.body
    console.log("llego");
    err = await email.sendEmail(body.emailF, body.nombreF, body.nombre, body.apellido, body.idPerro, body.correoP);

    if (!err) {
        return res.status(400).json({
            ok: false,
            message: 'No se envio correo'
        });
    }

    res.json({
        ok: true
    });
});

app.put('/perros/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "discapacidades", "edad", "tamaño", "img", "requisitos", "estado"]);

    Perros.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, perroBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            perro: perroBD
        });
    });
});

app.delete('/perros/:id', (req, res) => {

    let id = req.params.id;


    Perros.findByIdAndDelete(id, (err, perroBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!perroBD) {
            res.json({
                ok: false,
                err: {
                    message: "perro no encontrada"
                }
            });
        } else {
            res.json({
                ok: true,
                perro: perroBD
            });
        }
    });
});



module.exports = app;