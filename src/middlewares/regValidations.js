const { body } = require('express-validator');

const regVal = [
    body('name').notEmpty().withMessage('Tenes que completar este campo.').isLength({min: 2}).withMessage("Debe tener mas de 2 caracteres"),
    body('lastName').notEmpty().withMessage('Tenes que completar este campo.').isLength({min: 2}).withMessage("Debe tener mas de 2 caracteres"),
    body('email').notEmpty().withMessage('Tenes que completar este campo').bail().isEmail().withMessage('Tenes que completar con un email valido'),
    body('password').notEmpty().withMessage('Tenes que completar este campo').isLength({min: 8}).withMessage("la contraseña debe tener mas de 8 caracteres").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("La contraseña debera incluir, al menos una letra mayuscula, una minuscula, un numero y un caracter especial"),
    body('confirmation').notEmpty().withMessage('Tenes que completar este campo').isLength({min: 8}).withMessage("la contraseña debe tener mas de 8 caracteres"),
    body('birthday').notEmpty().withMessage('Sino sabemos tu cumple, no podemos hacerte regalos :(')


]


module.exports = regVal;