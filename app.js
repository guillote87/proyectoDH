const express = require("express");
const app = express();
const path = require("path");
const indexRoutes = require("./routes/indexRoutes");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor funcionando");
});

app.use("/", indexRoutes);

app.use("/products", productsRoutes);

app.use("/users", usersRoutes);

app.use("/about", indexRoutes);