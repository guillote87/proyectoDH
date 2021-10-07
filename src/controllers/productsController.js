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
    res.render("products/createProducts");
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
};
module.exports = productsController;
