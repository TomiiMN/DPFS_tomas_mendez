const express = require("express");
const path = require("path");

const app = express();

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Carpeta pública
app.use(express.static(path.join(__dirname, "../public")));

// Importar rutas
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Usar rutas
app.use("/", mainRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});