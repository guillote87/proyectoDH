const db = require('../database/models');
const sequelize = db.sequelize;


const colorsController = {
        list: (req, res) => {
            db.Color.findAll()
                .then(colors => {
                    console.log(colors)
                    res.render("colors/colorList",{colors})
                })
        }
    }
     
        module.exports = colorsController;