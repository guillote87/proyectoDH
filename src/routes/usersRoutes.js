const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authLoginMiddleware = require('../middlewares/authLoginMiddleware')

// Muestra la vista del login
router.get("/login", usersController.login);

//Procesa el login

router.post("/login", authLoginMiddleware, usersController.loginProcess)

router.get("/register", usersController.register);

router.get("/cart", usersController.cart);

module.exports = router;