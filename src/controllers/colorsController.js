const db = require('../database/models');
const sequelize = db.sequelize;


const colorsController = {
    list: (req, res) => {
        db.Color.findAll()
            .then(colors => {
                console.log(colors)
                res.render("colors/colorList", {
                    colors
                })
            })
    },
    addColor: (req, res) => {
        db.Color.create({
                id_color: req.body.id_color,
                description: req.body.description
            })
            .then(() => {
                res.redirect("colors/colorList")
            })
    },
    update: (req, res) => {
        let id = req.params.id;
        db.Color.findByPk(id)
          .then(data => {
                db.Color.update({
                        description: req.body.description || data.description
                                            }, {
                        where: {
                            id_color: id
                        }
                    })
                    .then(() => {
                        return res.redirect("/colors/list");
                    })
                    .catch(error => res.send(error))

            })
    },
    destroy: function (req, res) {
        let colorId = req.params.id;
        db.Color.destroy({
                where: {
                    id_color: colorId
                }
            }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect('/colors/list')
            })
            .catch(error => res.send(error))
    }
}

module.exports = colorsController;