module.exports = (sequelize, dataTypes) => {
    let alias = "Color";
    let cols = {
        id_color: {
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
        tableName: "colores",
        timestamps: false,
    }
    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models)  {
        Color.hasMany(models.Producto ,{
            foreignKey: 'color',
            as: 'producto'  })
        }
    
        return Color;
    }