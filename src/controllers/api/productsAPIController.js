const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');
const {
    QueryTypes
} = require('sequelize');
const Category = require('../../database/models/Category');

const usersAPIController = {
    'list': (req, res) => {

        db.sequelize.query("SELECT category.description AS categoría, COUNT(*) as Cantidad from nicotine.productos, nicotine.category WHERE productos.category = category.id_category GROUP BY productos.category", {
                type: QueryTypes.SELECT
            })
            .then(resultado => {
                db.Producto.findAll({
                    include:["categories"]
                })
                    .then(producto => {
                    
                        let respuesta = {
                            meta: {
                                status: 200,
                                url: 'api/products'
                            },
                            data: producto,
                            count: producto.length,
                            countByCategory: resultado
                                                 }
                        res.json(respuesta);
                    })
                
            })


    },

    'detail': (req, res) => {
        db.Producto.findByPk(req.params.id,
            {     include:["categories","colors","sizes"]})
            .then(producto => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/products/' + req.params.id
                    },
                    data: producto,
                    image: "http://localhost:3003/images/productos/"+ producto.image
                }
                res.json(respuesta);
            });
    }

}

module.exports = usersAPIController;