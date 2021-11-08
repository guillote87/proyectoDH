module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id_usuario: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: dataTypes.INTEGER(11),
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        lastname: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        rol: {
            type: dataTypes.INTEGER(11),
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        birthday: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        created_at : dataTypes.DATE,
        updated_at : dataTypes.DATE,
        deleted_at: dataTypes.DATE
    };
    let config = {
        tableName: "usuarios",
        timestamps: true,
        createdAt : "created_at",
        updatedAt: "updated_at",
        deletedAt : "deleted_at",
        paranoid : true
    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Rol, {
            as: 'roles',
            foreignKey: 'rol'
        })

        Usuario.associate = (models) => {
            Usuario.hasOne(models.Cart, {
                as: "carrito",
                foreignKey: "user_id"
            })
        }
    }
    return Usuario
}