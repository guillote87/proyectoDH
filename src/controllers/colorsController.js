const db = require('../database/models');
const sequelize = db.sequelize;


const colorsController = {
    'list': (req, res) => {
        db.Color.findAll()
            .then(genres => {
                res.render('genresList.ejs', {genres})
            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = colorsController;