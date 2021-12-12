const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');

const usersAPIController = {
    'list': (req, res) => {
        db.Usuario.findAll({
            attributes: ["id_usuario", "name", "email"]
        })
            .then(usuario => {
                let respuesta = {
                    count: usuario.length,
                    data: {
                        users: usuario,
                    },
                    detail: 'api/users/',

                }
                res.json(respuesta);
            });
    },

'detail': (req, res) => {
    db.Usuario.findByPk(req.params.id,{
        attributes: ["id_usuario", "name", "lastname","email","rol","image","birthday"],include: ["roles"]
    })
        .then(usuario => {
        
            let respuesta = {
                meta: {
                    status: 200,
                     url: '/api/users/' + req.params.id
                },
                data: usuario,
                image: "/images/usuarios/"+ usuario.image
            }
            res.json(respuesta);
        });
}

}

module.exports = usersAPIController;