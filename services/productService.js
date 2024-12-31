const fetch = require("node-fetch");
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
        const main = data.Main?.[0];

        // Verificamos si hay un error en la respuesta
        if (main?.["@error"]) {
            return { error: main["@error"], valid: false };
        }

        // Extraemos los datos relevantes
        const attributes = main?.record?.attributes;
        if (attributes) {
            return {
                valid: true,
                sku: attributes["sku.repositoryId"],
                description: attributes["product.description"],
                image: attributes["product.mediumImage.url"],
            };
        }

        // Si no se encuentran los atributos
        return { error: "Producto no encontrado o respuesta inesperada", valid: false };
    } catch (error) {
        console.error("Error al procesar la solicitud:", error.message);
        return { error: error.message, valid: false };
    }
}

module.exports = { fetchProductData };
