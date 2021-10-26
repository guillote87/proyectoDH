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
            type: dataTypes.INTEGER,
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        birthday: {
            type: dataTypes.DATE,
            allowNull: false,
        }
    };
    let config = {
        tableName: "usuarios",
        timestamps: false,
    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Rol, {
            as: 'roles',
            foreignKey: 'rol'

        })
    }
    return Usuario
}