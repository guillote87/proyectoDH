const express = require ("express")

const router = express.Router()

const colorsController = require ("../controllers/colorsController");

router.put("/:id/edit",colorsController.update)
router.get("/list", colorsController.list)
router.post("/create",colorsController.addColor)

router.delete ("/delete/:id",colorsController.destroy)


module.exports = router;