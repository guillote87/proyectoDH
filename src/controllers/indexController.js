const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const indexController = {
    index: (req, res) => {
       const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render("index",{product : products })
    },

    about: (req,res) =>{
        res.render("about")
    }
 
}

module.exports = indexController;