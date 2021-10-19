module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id_usuario: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        rol: {
            type: dataTypes.INTEGER,
        },
        image: {
            type: dataTypes.STRING,
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
        Usuario.BelongsTo("Rol", {
            foreignKey: 'rol',
            as: 'rol'
        })
    }




    return Usuario
}