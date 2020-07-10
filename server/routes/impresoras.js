const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Impresora = require('../models/Impresora');

const app = express();

app.get('/impresora', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Impresora.find()
        .skip(desde)
        .limit(limite)
        .exec((err, impresoras) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Impresora.count( (err, conteo) => {
                res.json({
                    ok: true,
                    impresoras,
                    numero: conteo
                });
            });
        })
});

app.post('/impresora', (req, res) => {

    let body = req.body

    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        n_serie: body.n_serie,
        color: body.color,
        ip :body.ip,
        n_contador:body.n_contador,
        precio:body.precio
       
    });

    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            impresora: impresoraDB
        });
    });
});

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["modelo","color", "ip","precio"]);

    Impresora.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, impresoraBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            impresora: impresoraBD
        });
    });
});

app.delete('/impresora/:id', (req, res) => {

    let id = req.params.id;
  

    Impresora.findByIdAndDelete(id,  (err, impresoraBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!impresoraBD) {
            res.json({
                ok: false,
                err: {
                    message: "impresora no encontrada"
                }
            });
        } else {
            res.json({
                ok: true,
                usuario: impresoraBD
            });
        }
    });
});



module.exports = app;