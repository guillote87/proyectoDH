module.exports = (sequelize, dataTypes) => {
    let alias = "Producto"
    let cols = {
        id_productos: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        color: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        size: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "productos",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config)

    /* Acá falta las asociaciones */

    return Producto
}