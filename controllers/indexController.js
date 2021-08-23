const indexController = {
    index: (req, res) => {
        res.render("index.ejs");
    },
    about: (req, res) => {
        res.send("About");
    },
};

module.exports = indexController;