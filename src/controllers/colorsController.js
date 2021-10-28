const db = require('../database/models');
const sequelize = db.sequelize;


const colorsController = {
    'list': (req, res) => {
        db.Color.findAll()
            .then(colors => {
                res.render('colorList.ejs', {colors})
            })
    },
    'create': (req, res) => {
        db.Color.create({
            description : req.body.description
        }
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = colorsController;