const { generateApiUrl } = require("../utils/formatters");
const supabase = require("../config/supabase");

// Lógica para obtener los datos del producto
async function fetchProductData(plu) {
    try {
        // Verificar si el producto ya está almacenado en Supabase
        const { data: existingData, error: fetchError } = await supabase
            .from("products")
            .select("*")
            .eq("plu", plu)
            .limit(1); // Limitamos la consulta a un registro

        if (fetchError) {
            console.error("Error al consultar Supabase:", fetchError.message);
        }

        // Si se encuentra un producto, lo retornamos directamente
        if (existingData && existingData.length > 0) {
            console.log(`Producto obtenido desde Supabase: PLU ${plu}`);
            return {
                valid: true,
                plu: existingData[0].plu,
                description: existingData[0].description,
                image: existingData[0].image,
            };
        }

        // Si no está en Supabase, consultar la API externa
        console.log(`Consultando API de Coto Digital para PLU: ${plu}`);
        const url = generateApiUrl(plu);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al consultar la API: ${response.status}`);
        }

        const data = await response.json();

        // Validar que exista el producto en la estructura esperada
        const main = data.contents?.[0]?.Main?.[0];
        const attributes = main?.record?.attributes;

        if (!attributes) {
            console.log(`Producto no encontrado en Coto Digital para PLU: ${plu}`);
            return { error: "Producto no encontrado o respuesta inesperada", valid: false };
        }

        // Extraer el PLU, descripción y URL de la imagen
        const product = {
            valid: true,
            plu: attributes["sku.repositoryId"]?.[0] || "No disponible",
            description: attributes["product.description"]?.[0] || "No disponible",
            image: attributes["product.mediumImage.url"]?.[0] || "No disponible",
        };

        // Guardar los datos en Supabase
        const { error: insertError } = await supabase
            .from("products")
            .insert([{ plu: product.plu, description: product.description, image: product.image }]);

        if (insertError) {
            if (insertError.message.includes("duplicate key")) {
                console.log(`El producto con PLU ${plu} ya existe en la base de datos.`);
            } else {
                console.error("Error al guardar en Supabase:", insertError.message);
            }
        } else {
            console.log(`Producto guardado en Supabase: PLU ${plu}`);
        }

        return product;
    } catch (error) {
        console.error("Error al procesar la solicitud:", error.message);
        return { error: error.message, valid: false };
    }
}

module.exports = { fetchProductData };
