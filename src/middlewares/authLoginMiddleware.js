const { check } = require('express-validator')

const validations = [
    check('user').notEmpty().withMessage('Tenés que completar con tu nombre de usuario'),
    check('password').notEmpty().withMessage('Tenés que completar con tu contraseña')
]

module.exports = validations