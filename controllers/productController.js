const { fetchProductData} = require("../services/productService");

//Controlador que maneja la solicitud del producto
async function getProduct(req, res) {
    const { plu } = req.query;

    //validamos el plu
    if (!plu || isNaN(plu)) {
        return res.status(400).json({ error: "El PLU debe ser un numero valido"});
        
    }


try {
    const result = await fetchProductData(plu);
    res.json(result);
} catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({ error: "Error interno del servidor. "});

    }

}

module.exports = { getProduct };