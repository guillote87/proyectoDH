const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


const categoriesAPIController = {
    'list': (req, res) => {
        db.Category.findAll()
            .then(categories => {
            
               let respuesta = {
                        meta: {
                            status : 200,
                            url: 'api/categories'
                        },
                        data: categories,
                        count : categories.length
                    }
                        res.json(respuesta);
                    })
            }
        }

module.exports = categoriesAPIController;