const express = require("express")
const router = express.Router();
const multer = require('multer')
const path = require('path');

const usersController = require("../controllers/usersController");

let multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, "../../public/images/usuarios")
        console.log(__dirname)
        console.log(folder)
        callback(null, folder)
    },
    filename: (req, file, callback) => {
        console.log(file)
        let image = Date.now() + path.extname(file.originalname)
        console.log(image)
        callback(null, image)
    }
})

const fileUpload = multer({ storage: multerDiskStorage })

router.get("/login", usersController.login);
router.post("/login", usersController.loginForm)


router.get("/register", usersController.register);
router.post("/register", fileUpload.single('image'), usersController.registerForm)

router.get("/cart", usersController.cart);
//post de carrito


module.exports = router;