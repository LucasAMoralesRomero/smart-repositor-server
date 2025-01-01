const { generateApiUrl } = require("../utils/formatters");

// Lógica para obtener los datos del producto
async function fetchProductData(plu) {
    const url = generateApiUrl(plu);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al consultar la API: ${response.status}`);
        }

        const data = await response.json();

        // Validar que exista el producto en la estructura esperada
        const main = data.contents?.[0]?.Main?.[0];
        const attributes = main?.record?.attributes;

        if (!attributes) {
            return { error: "Producto no encontrado o respuesta inesperada", valid: false };
        }

        // Extraer el PLU, descripción y URL de la imagen
        return {
            valid: true,
            plu: attributes["sku.repositoryId"]?.[0] || "No disponible",
            description: attributes["product.description"]?.[0] || "No disponible",
            image: attributes["product.mediumImage.url"]?.[0] || "No disponible",
        };
    } catch (error) {
        console.error("Error al procesar la solicitud:", error.message);
        return { error: error.message, valid: false };
    }
}

module.exports = { fetchProductData };