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
        }, created_at : dataTypes.DATE,
        updated_at : dataTypes.DATE,
        deleted_at: dataTypes.DATE
    };
    let config = {
        tableName: "colores",
        timestamps: true,
        createdAt : "created_at",
        updatedAt: "updated_at",
        deletedAt : "deleted_at",
        paranoid : true

    }
    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models)  {
        Color.hasMany(models.Producto ,{
            foreignKey: 'color',
            as: 'producto'  })
        }
    
        return Color;
    }