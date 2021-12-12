const express = require('express');
const router = express.Router();
const categoriesAPIController = require('../../controllers/api/categoriesAPIController');

//Rutas
//Listado de todos los actores
router.get('/', categoriesAPIController.list);
//Detalle del actor
//router.get('/:id', categoriesAPIController.detail);

module.exports = router;