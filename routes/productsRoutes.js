const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/cart", productsController.cart);
router.get("/detail", productsController.detail);
router.get("/create-product", productsController.create);

module.exports = router;