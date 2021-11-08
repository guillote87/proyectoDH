const db = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = "CartDetail";
    let cols = {        
            cantidad: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    };
    let config = {
        tableName: "detalle_carrito",
        timestamps: false,
    }
    const CartDetail = sequelize.define(alias, cols, config);

   CartDetail.associate = (models) => {
        CartDetail.belongsTo(models.Cart),
        CartDetail.belongsTo(models.Producto)
    }

       return CartDetail;
}