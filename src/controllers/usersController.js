const fs = require('fs')
const path = require('path')
const {
    validationResult
} = require('express-validator')
const bcrypt = require('bcryptjs')

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
            let userToLogin = users.find(i =>
                i.email == req.body.email
            )



            if (userToLogin) {
                let loginUser = bcrypt.compareSync(req.body.password, userToLogin.password)

                if (loginUser) { //Eliminamos la clave y paso los datos al session
                    delete userToLogin.password
                    req.session.userLogged = userToLogin
                    
                    if(req.body.remember_user){
                        res.cookie("userEmail",req.body.email,{maxAge: 60000})
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

                },

                profile: (req, res) => {
                   console.log(req.session.userLogged)
                        return res.render("users/profile", {
                        user : req.session.userLogged
                    })
                },
                logout: (req, res) => {
                    res.clearCookie("userEmail")
                   req.session.destroy()
                    return res.redirect("/")
                },
                register: (req, res) => {
                    res.render("users/register");
                },
                registerForm: (req, res) => {
                    let id = users.length + 1;
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

                    let newUser = {
                        id: id,
                        name: req.body.name,
                        lastName: req.body.lastName,
                        password: bcrypt.hashSync(req.body.password, 10),
                        image: req.file == undefined ? "defaultUser.png" : req.file.filename,
                        birthday: req.body.birthday,
                        category: "user",
                        email: req.body.email,
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