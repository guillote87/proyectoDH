const fs = require("fs");
const path = require("path");
const db = require('../database/models')
/* const productsFilePath = path.join(__dirname, "../data/productsData.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");*/     // DE CUANDO USABAMOS JSON

const productsController = {
    detail: (req, res) => {
        let id = req.params.id;

        db.Producto.findAll()
            .then(interes => {
                db.Producto.findByPk(id)
                    .then(product => {
                        res.render("products/productDetail", {
                            product,
                            interes
                        });
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    },
    filter: (req, res) => {
        let filter = req.params.filter;
        db.Producto.findAll()
        .then(productos=>{

        let product = productos.filter((productos) => productos.category == filter);
        res.render("index", {
            product,
        });
        })
    },
    createView: (req, res) => {

        db.Color.findAll()
            .then((allColors) => {
                db.Category.findAll()
                    .then((allCategories) => {
                        db.Size.findAll()
                            .then((allSizes) => {
                                res.render("products/createProducts", {
                                    allColors,
                                    allCategories,
                                    allSizes
                                });
                            })
                    })
            })
            .catch((error) => {
                console.log(error);
            })

    },
    create: (req, res) => {
        foto = req.file == undefined ? "default-image.png" : req.file.filename;

        db.Producto.create({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                color: req.body.color,
                size: req.body.size,
                price: req.body.price,
                image: foto
            })
            .then(() => {
                res.redirect('/users/login');
            })
            .catch((error) => {
                console.log(error);
            });
    },
    editView: (req, res) => {
        let id = req.params.id;
      db.Producto.findByPk(id)
      .then(product =>{
        res.render("products/editProduct", {product});
      })
    },
    editForm: (req, res) => {
        let id = req.params.id;
        products.forEach((prod) => {
            if (prod.id == id) {
                prod.name = req.body.name || prod.name;
                prod.price = req.body.price || prod.price;
                prod.category = req.body.category || prod.category;
                prod.size = req.body.size || prod.size;
                prod.color = req.body.color || prod.color;
                prod.description = req.body.description ?
                    req.body.description :
                    prod.description;
                prod.image = req.file == undefined ? prod.image : req.file.filename;
                prod.image2 = req.file == undefined ? prod.image : req.file.filename;
            }
        });
        let productsJSON = JSON.stringify(products, "utf-8");
        fs.writeFileSync(productsFilePath, productsJSON);
        return res.redirect("/products/" + id);
    },
    destroy: (req, res) => {
        id = req.params.id;

        let allProducts = products.filter((prod) => prod.id != id);
        allProducts.forEach((prod, i) => {
            prod.id = i + 1;
        });

        console.log(allProducts);

        productsJSON = JSON.stringify(allProducts);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect("/");
    },
};

module.exports = productsController;