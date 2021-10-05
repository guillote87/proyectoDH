const { body } = require('express-validator');

const regVal = [
    body('name').notEmpty().withMessage('Tenes que completar este campo.'),
    body('lastName').notEmpty().withMessage('Tenes que completar este campo.'),
    body('email').notEmpty().withMessage('Tenes que completar este campo').bail().
    isEmail().withMessage('Tenes que completar con un email valido'),
    body('password').notEmpty().withMessage('Tenes que completar este campo'),
    body('confirmation').notEmpty().withMessage('Tenes que completar este campo'),
    body('birthday').notEmpty().withMessage('Sino sabemos tu cumple, no podemos hacerte regalos :(')

]


module.exports = regVal;