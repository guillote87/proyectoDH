const fs = require('fs');
const path = require('path');


const usersFilePath = path.join(__dirname, "../data/usersData.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {
    login: (req, res) => {
        res.render("users/login");
    },
    loginForm: (req, res) => {
        console.log("falta el loginForm y el create");

    },
    register: (req, res) => {
        res.render("users/register");
    },
    registerForm: (req, res) => {
        let id = users.length + 1
        let newUser = {
            id: id == null? 1 : id,
            password: req.body.pass1 == req.body.pass2 ? req.body.pass1 : "contraseña invalida",
            name: req.body.name,
            lastName: req.body.lastName,
            image: req.file.filename == undefined ? "defaultUser.png" : req.file.filename
        }

        users.push(newUser)
        fs.writeFileSync(usersFilePath, JSON.stringify(users))
        res.redirect("/")
    },
    cart: (req, res) => {
        res.render("users/productCart");
    },
    //cartForm
};

module.exports = usersController;