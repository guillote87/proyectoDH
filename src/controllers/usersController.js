const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    login: (req, res) => {
        res.render("users/login");
    },
    loginProcess: (req, res) =>{
        let errors = validationResult(req)
        return res.send(errors)
        if (errors.errors.length > 0){
            return res.render('user/register', { errors : errors.mapped() })
        }
    },
    register: (req, res) => {
        res.render("users/register");
    },
    registerForm: (req, res) => {
        let id = users.length + 1;
        let resVal = validationResult(req);

        if (resVal.errors.length > 0) {
            return res.render("users/register", { old: req.body, errors: resVal.mapped() })
        }

        if (req.body.password != req.body.confirmation) {
            return res.render("users/register", { old:req.body, errors: { password: { msg: "Las contraseñas no coinciden" } } })
        }
        
        let newUser = {
            id: id,
            name: req.body.name,
            lastName: req.body.lastName,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.file == undefined ? "defaultUser.png" : req.file.filename,
            birthday: req.body.birthday,
            category: "user",
        }

        console.log(newUser);
        users.push(newUser)
        fs.writeFileSync(usersFilePath, JSON.stringify(users))
        return res.redirect("/users/login")

    },
    cart: (req, res) => {
        res.render("users/productCart");
    },
    //cartForm
};

module.exports = usersController;