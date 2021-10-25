const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models')


const usersController = {

    register: (req, res) => {
        res.render("users/register");
    },
    registerForm: (req, res) => {
        let resVal = validationResult(req);

        if (resVal.errors.length > 0) {
            return res.render("users/register", {
                old: req.body,
                errors: resVal.mapped()
            })
        }

        if (req.body.password != req.body.confirmation) {
            return res.render("users/register", {
                old: req.body,
                errors: {
                    password: {
                        msg: "Las contraseñas no coinciden"
                    }
                }
            })
        }

        let password = req.body.password;

        db.Usuario.create({
            name: req.body.name,
            lastname: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(password, 10),
            image: req.file.filename,
            birthday: req.body.birthday,
        })

    },
    login: (req, res) => {
        res.render("users/login");
    },
    loginProcess: (req, res) => {
        let errors = validationResult(req)
        if (errors.errors.length > 0) {
            return res.render('users/login', {
                errors: errors.mapped()
            })
        }




        if (userToLogin) {

            return res.render('users/login', {
                errors: {
                    password: {
                        msg: "Credenciales inválidas"
                    }
                }
            })
        }

        return res.render('users/login', {
            errors: {
                email: {
                    msg: "Email no encontrado"
                }
            }
        })

    },

    profile: (req, res) => {
        console.log(req.session.userLogged)
        return res.render("users/profile", {
            user: req.session.userLogged
        })
    },
    logout: (req, res) => {
        res.clearCookie("userEmail")
        req.session.destroy()
        return res.redirect("/")
    },
    cart: (req, res) => {
        res.render("users/productCart");
    },
    //cartForm
};

module.exports = usersController;