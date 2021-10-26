module.exports = (sequelize, dataTypes) => {
    let alias = "Producto"
    let cols = {
        id_productos: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        color: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        size: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        category: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DOUBLE(10,2),
            allowNull: false
        }
    }
    let config = {
        tableName: "productos",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = (models) => {
        Producto.belongsTo(models.Size, {
            as: 'sizes',
            foreignKey: 'size'

        }),
        Producto.belongsTo(models.Color, {
            as: 'colors',
            foreignKey: 'color'

        }),
        Producto.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category'

        })

    }

    return Producto
}