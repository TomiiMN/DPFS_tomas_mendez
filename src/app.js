const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());

// Importar models/index.js para que Sequelize registre todos los modelos
// y sus asociaciones antes de que arranquen las rutas.
require("./models/index");

const rememberMeMiddleware = require("./middlewares/rememberMeMiddleware");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
app.use(rememberMeMiddleware);
app.use(userLoggedMiddleware);

const mainRoutes    = require("./routes/mainRoutes");
const userRoutes    = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes   = require("./routes/adminRoutes");

app.use("/",        mainRoutes);
app.use("/users",   userRoutes);
app.use("/products", productRoutes);
app.use("/admin",   adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});
