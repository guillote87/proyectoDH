const {
    validationResult,
    body
} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Usuario = require('../database/models/Usuario');




const usersController = {
    list: (req, res) => {
        db.Usuario.findAll({
                include: ["roles"]
            })
            .then((users) => {
                res.json(users)
                res.render("users/usersList", {
                    users
                })
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
        db.Usuario.findAll({
                include: ["roles"]
            })
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
        return res.render("users/profile", {
            user: req.session.userLogged
        })

    },
    register: (req, res) => {
        res.render("users/register");
    },
    registerForm: (req, res) => {
        let resVal = validationResult(req);
        console.log("ERRRORES " + resVal.errors.length)
        if (resVal.errors.length > 0) {
            return res.render("users/register", {
                old: req.body,
                errors: resVal.mapped()
            })
        }
        db.Usuario.findAll()
            .then(users => {
                let userToRegister = users.find(i =>
                    i.email == req.body.email
                )
                if (userToRegister) {
                    return res.render("users/register", {
                        old: req.body,
                        errors: {
                            email: {
                                msg: "Este email ya esta registrado"
                            }
                        }
                    })
                }
            })
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
        let user = req.session.userLogged
        db.Cart.findOne({
                where: {
                    id_usuario: user.id_usuario
                },
                include: {
                    model: db.Producto,
                    include: [
                        "colors", "sizes"
                    ]
                },

            })
            .then(cart => {
                // res.json(cart)
                res.render("users/productCart", {
                    cart
                });
            })

    },
    addToCart: (req, res) => {
        const id_producto = req.params.id;

        console.log(req.body)
        db.Cart.findByPk(req.session.userLogged.id_usuario, {
                include: db.Producto
            })
            .then(cart => {

                if (cart != null) {
                    let product_found = cart.Productos.find(p => p.id_productos == id_producto)


                    if (product_found) {
                        db.CartDetail.update({

                            cantidad: product_found.CartDetail.cantidad + parseInt(req.body.cantidad)

                        }, {
                            where: {

                                CartIdCarrito: req.session.userLogged.id_usuario,
                                ProductoIdProductos: id_producto
                            }
                        }).then(() => {
                            return res.redirect('/users/cart')
                        })

                    } else {
                        cart.addProducto(id_producto, {
                                through: {
                                    cantidad: req.body.cantidad
                                }
                            })
                            .then(() => {
                                return res.redirect('/users/cart')
                            })
                    }
                } else {
                    db.Cart.create({
                            id_carrito: req.session.userLogged.id_usuario,
                            id_usuario: req.session.userLogged.id_usuario,
                            total: 0
                        })
                        .then(() => {
                            db.CartDetail.create({
                                    CartIdCarrito: req.session.userLogged.id_usuario,
                                    ProductoIdProductos: id_producto,
                                    cantidad: req.body.cantidad
                                })
                                .then(() => {
                                    return res.redirect('/users/cart')
                                })
                        })
                }
            })
    },
    destroy: function (req, res) {
        let userId = req.params.id;
        db.Usuario.destroy({
                where: {
                    id_usuario: userId
                }
            }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect('/users/usersList')
            })
            .catch(error => res.send(error))
    }
    //cartForm
};

module.exports = usersController;