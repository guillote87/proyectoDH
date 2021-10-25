module.exports = (sequelize, dataTypes) => {
    let alias = "Rol";
    let cols = {
        id: {
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
        Rol.hasMany(models.Usuario, {
            foreignKey: 'id_rol',
            as: 'usuario'
        })
    }

    return Rol;
}