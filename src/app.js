// ************ Require's ************
const createError = require('http-errors');
const express = require("express");
const logger = require("morgan");
const path = require("path");
const session = require("express-session")
const cookies = require("cookie-parser")
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")
const cors = require("cors")

const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE
// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev')); //log de errores para el desarrollador modulo morgan
app.use(express.json()); //permite leer json
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE<
app.use(session({ secret: "Llave secreta", resave: false, saveUninitialized: false }))
app.use(cookies())
app.use(userLoggedMiddleware)

    // ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************

const indexRoutes = require("./routes/indexRoutes");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const colorsRoutes = require("./routes/colorsRoutes");

//Aquí llamo a la ruta de las api de usuarios
const apiUsersRouter = require('./routes/api/usersAPIRoute')
//Aquí llamo a la ruta de las api de products
const apiProductsRouter = require('./routes/api/productsAPIRoute')
//Aquí llamo a la ruta de las api de categorias de productos
const apiCategoriesRouter = require('./routes/api/categoriesAPIRoute');

app.use(cors())
app.use("/", indexRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/colors",colorsRoutes)

//(APIs)
app.use('/api/users',apiUsersRouter);
app.use('/api/products',apiProductsRouter);
app.use("/api/categories",apiCategoriesRouter)





// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;