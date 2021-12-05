const { body } = require('express-validator');

const productsValidations = [
    body('name').notEmpty().withMessage('Tenes que completar este campo.').isLength({min: 5}).withMessage("Debe tener mas de 5 caracteres"),
    body('description').notEmpty().withMessage('Tenes que completar este campo.').isLength({min: 10}).withMessage("Debe tener mas de 10 caracteres"),
    body('price').notEmpty().withMessage("Tenes que completar el precio")
]

module.exports = productsValidations;