const indexController = {
    index: (req, res) => {
        res.render("index");
    },
    about: (req, res) => {
        res.send("About");
    },
};

module.exports = indexController;