const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Fundaciones = require('../models/Fundacion');

const app = express();

app.get('/fundaciones', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Fundaciones.find()
        .skip(desde)
        .limit(limite)
        .exec((err, fundacion) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Fundaciones.count( (err, conteo) => {
                res.json({
                    ok: true,
                    fundacion,
                    numero: conteo
                });
            });
        })
});

app.get('/Fundaciones', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Fundaciones.find()
        .skip(desde)
        .limit(limite)
        .exec((err, fundacion) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Fundaciones.count( (err, conteo) => {
                
  
                    fundacion,
           
              
            });
        })
});

app.post('/fundaciones', (req, res) => {

    let body = req.body

    let fundacion = new Fundaciones({
        nombre: body.nombre,
        direccion: body.direccion,
        email: body.email,
        longitud: body.longitud,
        latitud :body.latitud,
        telefono:body.telefono,
        img:body.img,
        password:body.password,
        pais:body.pais,
        provincia:body.provincia,
        ciudad:body.ciudad,
        terminosCondiciones:body.terminosCondiciones
       
    });

    fundacion.save((err, fundacionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            fundacion: fundacionDB
        });
    });
});

app.put('/fundaciones/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["direccion","longitud", "latitud","telefono","img","password"]);

    Fundaciones.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, fundacionBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            fundacion: fundacionBD
        });
    });
});

app.delete('/fundaciones/:id', (req, res) => {

    let id = req.params.id;
  

    Fundaciones.findByIdAndDelete(id,  (err, fundacionesBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!fundacionesBD) {
            res.json({
                ok: false,
                err: {
                    message: "impresora no encontrada"
                }
            });
        } else {
            res.json({
                ok: true,
                fundacion: fundacionesBD
            });
        }
    });
});



module.exports = app;