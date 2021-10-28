const {
    validationResult,
    body
} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models')


const usersController = {
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
        db.Usuario.findAll()
            .then(users => {
                let userToLogin = users.find(i =>
                    i.email == req.body.email
                )

                if (userToLogin) {
                    let loginUser = bcrypt.compareSync(req.body.password, userToLogin.password)

                    if (loginUser) { //Eliminamos la clave y paso los datos al session
                        delete userToLogin.password
                        req.session.userLogged = userToLogin

                        if (req.body.remember_user) {
                            res.cookie("userEmail", req.body.email, {
                                maxAge: 60000
                            })
                        }

                        res.redirect("/users/profile")
                    }
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
            })

    },

    profile: (req, res) => {
        console.log(req.session.userLogged)
        db.Rol.findAll()
        .then((allRoles)=>{
        return res.render("users/profile", {
            user: req.session.userLogged , allRoles
        })
        })
    },
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
        db.Usuario.create({
                lastname: req.body.lastName,
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                rol: 2,
                image: req.file.filename,
                birthday: req.body.birthday
            })
            .then(() => {
                res.redirect('/users/login');
            })
            .catch((error) => {
                console.log(error);
            });

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