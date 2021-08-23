const usersController = {
    login: (req, res) => {
        res.render("login.ejs");
    },
    createUser: (req, res) => {
        res.send("crear usuario");
    },
};

module.exports = usersController;