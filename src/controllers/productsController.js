const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsData.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    detail: (req, res) => {
        let id = req.params.id;
        let product = products.find((product) => product.id == id);
        let interes = products.filter((product) => product.id != id);
        res.render("products/productDetail", {
            product: product,
            interes: interes,
        });
    },
    filter: (req, res) => {
        let filter = req.params.filter;
        let product = products.filter((product) => product.category == filter);
        res.render("index", {
            product,
        });
    },
    createView: (req, res) => {
        res.render("about");
    },
    create: (req, res) => {
        let image;
        if (req.files[0] != undefined) {
            image = req.files[0].filename;
        } else {
            image = "default-image.png";
        }
        let id = products.length + 1;
        let newProduct = {
            id: id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            size: req.body.size,
            color: req.body.color,
            description: req.body.description,
            image: image,
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, "utf-8"));
        res.redirect("/products/" + id);
    },
    editView: (req, res) => {
        let id = req.params.id;
        let product = products.find((prod) => prod.id == id);
        res.render("products/editProduct", { product: product });
    },
    editForm: (req, res) => {
        let id = req.params.id;
        let product = products.forEach((prod) => {
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
            }
        });
        let productsJSON = JSON.stringify(product);
        fs.writeFileSync(productsFilePath, productsJSON);
        return res.redirect("/products/" + id + "/detail/");
    },
};

module.exports = productsController;