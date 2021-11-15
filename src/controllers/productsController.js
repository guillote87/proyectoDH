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
                id_color: req.body.color,
                id_size: req.body.size,
                price: req.body.price,
                image: foto
            }, {
                include: ["colors", "sizes"]
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
                db.Producto.findByPk(id, {
                        include: ["colors", "sizes"]
                    })
                    .then(product => {
                       // res.json(product)
                        res.render("products/productDetail", { product, interes });
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    },

    filter: (req, res) => {
        let filter = req.params.filter;
        db.Producto.findAll({
                include: ["colors", "sizes"]
            })
            .then(productos => {
                let product = productos.filter((id) => id.category == filter);
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
        db.Producto.findByPk(id)
            .then(prod => {
                db.Producto.update({
                        name: req.body.name || prod.name,
                        price: req.body.price || prod.price,
                        category: req.body.category || prod.category,
                        size: req.body.size || prod.size,
                        color: req.body.color || prod.color,
                        description: req.body.description ? req.body.description : prod.description,
                        image: req.file == undefined ? prod.image : req.file.filename

                    }, {
                        where: {
                            id_productos: id
                        }
                    })
                    .then(() => {
                        return res.redirect("/products/" + id);
                    })
                    .catch(error => res.send(error))

            })
    },


    destroy: function (req, res) {
        let productId = req.params.id;
        db.Producto.destroy({
                where: {
                    id_productos: productId
                }
            }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect("/");
            })
            .catch(error => res.send(error))
    }
        
    
   
};

module.exports = productsController;