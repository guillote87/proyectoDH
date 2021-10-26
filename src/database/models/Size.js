module.exports = (sequelize, dataTypes) => {
    let alias = "Size";
    let cols = {
        id_size: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
        },
        description: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
    };
    let config = {
        tableName: "size",
        timestamps: false,
    }
    const Size = sequelize.define(alias, cols, config);

    Size.associate = function (models)  {
        Size.hasMany(models.Producto ,{
            foreignKey: 'size',
            as: 'producto'  })
        }
    
        return Size;
    }