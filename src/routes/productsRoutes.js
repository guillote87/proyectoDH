const express = require("express")

const router = express.Router()

const productsController = require ("../controllers/productsController")



/* Rutas de detalle y filtro de productos */

router.get ("/:id", productsController.detail)
router.get ("/filter/:filter", productsController.filter)

/* Rutas de creacion de productos*/

/* Rutas de edicion de productos */



/* Rutas de eliminacion de productos */




module.exports = router;