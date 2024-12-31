const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3000;

// Middleware para manejar JSON (en caso de que se necesite)
app.use(express.json());

// Rutas principales
app.use("/product", productRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Smart Repositor Server escuchando en http://localhost:${PORT}`);
});
