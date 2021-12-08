const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const usersAPIController = {
    'list': (req, res) => {
        db.Producto.findAll()
        .then(producto => {
            let respuesta = {
                meta: {
                    status : 200,
                    url: 'api/products'
                },
                data: producto,
                count : producto.length
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.Producto.findByPk(req.params.id)
            .then(producto => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/products/'+ req.params.id
                    },
                    data: producto
                }
                res.json(respuesta);
            });
    }
    
}

module.exports = usersAPIController;