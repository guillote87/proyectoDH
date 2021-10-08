const { body } = require('express-validator')

const validations = [
    body('email').notEmpty().withMessage('Tenés que completar con tu nombre de usuario').bail().isEmail().withMessage('Debe ser un email válido'),
    body('password').notEmpty().withMessage('Tenés que completar con tu contraseña')
]

module.exports = validations