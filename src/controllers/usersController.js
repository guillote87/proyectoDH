const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    login: (req, res) => {
        res.render("users/login");
    },
    loginProcess: (req, res) =>{
        let errors = validationResult(req)
        res.send(errors)
    },
    register: (req, res) => {
        res.render("users/register");
    },
    cart: (req, res) => {
        res.render("users/productCart");
    },
};

module.exports = usersController;