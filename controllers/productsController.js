const productsController = {
    cart: (req, res) => {
        res.render("productCart.ejs");
    },
    detail: (req, res) => {
        res.render("productDetail.esj");
    },
};

module.exports = productsController;