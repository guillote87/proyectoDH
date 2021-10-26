module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    let cols = {
        id_category: {
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
        tableName: "category",
        timestamps: false,
    }
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models)  {
        Category.hasMany(models.Producto ,{
            foreignKey: 'category',
            as: 'producto'  })
        }
    
        return Category;
    }