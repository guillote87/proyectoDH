const { body } = require('express-validator')

const validations = [
    body('email').notEmpty().withMessage('Tenés que completar con tu nombre de usuario').bail().isEmail().withMessage('Debe ser un email válido'),
    body('password').notEmpty().withMessage('Tenés que completar con tu contraseña').isLength({min: 8}).withMessage("la contraseña debe tener mas de 8 caracteres").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("La contraseña debera incluir, al menos una letra mayuscula, una minuscula, un numero y un caracter especial")
]

module.exports = validations