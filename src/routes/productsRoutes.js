const express = require("express");

const router = express.Router();
const multer = require("multer");
const path = require("path");


const productsController = require("../controllers/productsController");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const productsValidations = require('../middlewares/productsValidations');
const adminMiddleware = require('../middlewares/adminMiddleware')

let multerDiskStorage = multer.diskStorage ({
    destination : (req,file,callback) =>{
        let folder = path.join (__dirname, "../../public/images/productos")
        console.log(__dirname)
        console.log(folder)
        callback(null,folder)
    },
    filename :(req,file,callback)=>{
        console.log(file)
        let image = Date.now() + path.extname(file.originalname)
        console.log(image)
        callback (null, image)
    }
})

const fileUpload = multer({storage: multerDiskStorage})

/* Rutas de creacion de productos*/
router.get("/create",adminMiddleware,productsController.createView);
router.post("/create",fileUpload.single("image"),productsValidations, productsController.create);
/* Rutas de detalle y filtro de productos */

router.get("/:id", productsController.detail);


/* Rutas de edicion de productos */
router.get("/:id/edit",adminMiddleware, productsController.editView);
router.put("/:id/edit",fileUpload.single("image") ,productsValidations, productsController.editForm);


router.get("/filter/:filter", productsController.filter);

/* Rutas de eliminacion de productos */
router.delete("/:id/delete",adminMiddleware, productsController.destroy);

module.exports = router;