const productsController = {
    cart: (req, res) => {
        res.render("productCart");
    },
    detail: (req, res) => {
        res.render("productDetail");
    },
    create: (req, res) => {
        res.render("createProducts");
    },
};

module.exports = productsController;