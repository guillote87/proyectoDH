module.exports = (sequelize, dataTypes) => {
    let alias = "Rol";
    let cols = {
        id_roles: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    };
    let config = {
        tableName: "roles",
        timestamps: false,
    }
    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) => {
        Rol.hasMany("Usuario", {
            foreignKey: 'rol',
            as: 'usuario'
        })
    }

    return Rol;
}