const fs = require('fs');
const path = require('path');
const db = require('../database/models')

//const productsFilePath = path.join(__dirname, '../data/productsData.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const indexController = {
    index: (req, res) => {
        db.Producto.findAll({
                include: ["colors", "sizes"]
            })
            .then(product => {
                           res.render("index", {product})
            })
    },
    about: (req, res) => {
        res.render("about")
    },
    search: (req, res) => {
        let searched = req.query.buscador;
        let find = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(searched)) {
                find.push(products[i])
            }
        }
        return res.render("search", {
            search: searched,
            products: find
        })
    }
}

module.exports = indexController;