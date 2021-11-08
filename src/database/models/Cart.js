module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    let cols = {
        id_carrito: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
        },
        id_usuario: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        total: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    };
    let config = {
        tableName: "carrito",
        timestamps: false,
    }
    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function (models) {
        Cart.belongsToMany(models.Producto, {
                as: "producto",
                through: "CartDetail" 
            }),
            Cart.belongsTo(models.Usuario, {
                as: 'usuario',
                foreignKey: "id_usuario"
            })

    }

    return Cart
}