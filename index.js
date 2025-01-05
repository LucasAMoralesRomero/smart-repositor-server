require("dotenv").config();
const express = require("express");
//Requerimos CORS
const cors =require("cors");
const productRoutes = require("./routes/productRoutes");
//Importamos el array de dominios permitidos
const { allowedOrigins } = require("./config/constants")

const app = express();
const PORT = process.env.PORT || 3000; // Usamos el puerto de Vercel o 3000 por defecto

//Middleware de CORS
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);//Permitimos la solicitud
        } else {
        console.error(`CORS bloqueado para el origen: ${origin}`);
        callback(new Error("Acceso denegado por CORS"));//Bloqueamos la solicitud
        }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

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