const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const usersAPIController = {
    'list': (req, res) => {
        db.Usuario.findAll({
            attributes: ["id_usuario", "name", "email"]
        })
        .then(usuario => {
            let respuesta = {
                count: usuario.length,
                users: {
                    data: usuario,
                    detail: 'api/users/'
                },
                id: usuario.id_usuario,
               
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.Usuario.findByPk(req.params.id)
            .then(usuario => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuario.length,
                        url: '/api/users/'+ req.params.id
                    },
                    data: usuario
                }
                res.json(respuesta);
            });
    }
    
}

module.exports = usersAPIController;