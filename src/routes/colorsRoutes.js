const express = require ("express")

const router = express.Router()

const colorsController = require ("../controllers/colorsController");


router.get("/list", colorsController.list)


module.exports = router;