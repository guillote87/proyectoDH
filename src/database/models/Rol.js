module.exports = (sequelize, dataTypes) => {
    let alias = "Rol";
    let cols = {
        id_roles: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
        },
        description: {
            type: dataTypes.STRING(50),
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
            as: 'usuario',
             foreignKey: 'rol'
          
        })
    }

    return Rol;
}