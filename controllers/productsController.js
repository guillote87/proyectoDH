const productsController = {
   
    detail: (req, res) => {
        res.render("products/productDetail");
    },
    create: (req, res) => {
        res.render("products/createProducts");
    },
};

module.exports = productsController;