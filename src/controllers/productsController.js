const fs = require("fs");
const path = require("path");
const db = require('../database/models')
/* const productsFilePath = path.join(__dirname, "../data/productsData.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");*/ // DE CUANDO USABAMOS JSON

const productsController = {
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
                .then(productos => {

                    let product = productos.filter((productos) => productos.category == filter);
                    res.render("index", {
                        product,
                    });
                })
        },

        editView: (req, res) => {
            let id = req.params.id;
            db.Producto.findByPk(id)
                .then((product) => {
                    db.Color.findAll()
                        .then((allColors) => {
                            db.Category.findAll()
                                .then((allCategories) => {
                                    db.Size.findAll()
                                        .then((allSizes) => {
                                            res.render("products/editProduct", {
                                                allColors,
                                                allCategories,
                                                allSizes,
                                                product
                                            });
                                        })


                                })
                        })
                })
        },
        editForm: (req, res) => {
            let id = req.params.id;
            db.Producto.update({
                    name: req.body.name || prod.name,
                    price : req.body.price || prod.price,
                    category : req.body.category || prod.category,
                    size : req.body.size || prod.size,
                    color : req.body.color || prod.color,
                    description : req.body.description ? req.body.description : prod.description,
                    image : req.file == undefined ? prod.image : req.file.filename

                },
                {where :{id_productos: id}}
            )
            .then(()=>{
                return res.redirect("/products/" + id);})
                .catch(error => res.send(error))
            
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