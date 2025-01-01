const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000; // Usamos el puerto de Vercel o 3000 por defecto

// Middleware para manejar JSON (en caso de que se necesite)
app.use(express.json());

// Rutas principales
app.use("/product", productRoutes);

// Verificamos si estamos en producción
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
    console.log("Servidor ejecutándose en modo producción");
} else {
    console.log("Servidor ejecutándose en modo desarrollo");
}

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Smart Repositor Server escuchando en http://localhost:${PORT}`);
});