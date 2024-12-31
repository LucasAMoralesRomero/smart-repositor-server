const { BASE_API_URL } = require("../config/constants");

//funcion para formatear el PLU y generar la URL
function generateApiUrl(plu) {
    const formattedPlu = plu.toString().padStart(8, "0");
    return `${BASE_API_URL}/R-${formattedPlu}-${formattedPlu}-200?Dy=1&format=json`;
    }
MediaSourceHandle.exports = { generateApiUrl };