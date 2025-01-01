const express = require("express");
const { getProduct } = require("../controllers/productController");

const router = express.Router();

// Ruta para obtener datos de un producto
router.get("/:plu", getProduct);

module.exports = router;