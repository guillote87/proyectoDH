const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productsController = {
 
    detail: (req, res) => {
        let id = req.params.id
        let product = products.find(product => product.id == id)
        let interes = products.filter(product => product.id != id)
        res.render("products/productdetail", {
          product:  product ,interes: interes
        })
    },
    filter: (req, res) => {
        let filter = req.params.filter
        let product = products.filter(product => product.category == filter)
        res.render("index", {
            product
        })
    }
    
}

module.exports = productsController