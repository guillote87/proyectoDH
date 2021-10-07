const { body } = require('express-validator')

const validations = [
    body('user').notEmpty().withMessage('Tenés que completar con tu nombre de usuario'),
    body('password').notEmpty().withMessage('Tenés que completar con tu contraseña')
]

module.exports = validations