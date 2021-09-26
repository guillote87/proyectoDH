const express = require("express");

const router = express.Router();

const productsController = require("../controllers/productsController");

/* Rutas de detalle y filtro de productos */

router.get("/:id", productsController.detail);
router.get("/filter/:filter", productsController.filter);

/* Rutas de creacion de productos*/
router.get("/create", productsController.createView);
router.post("/create", productsController.create);

/* Rutas de edicion de productos */
router.get("/:id/edit", productsController.editView);
router.put("/:id/edit", productsController.editForm);

/* Rutas de eliminacion de productos */
router.delete("/:id/delete", productsController.destroy);

module.exports = router;