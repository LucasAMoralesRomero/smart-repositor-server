// URL base para interactuar con la pagina web de Coto Digital
const BASE_API_URL = "https://api.cotodigital.com.ar/sitios/cdigi/productos/_";
// Creamos el array con los dominios permitidos para configurar CORS
const allowedOrigins = [
    "https://smart-repositor.netlify.app",
    "https://smart-repositor-test.netlify.app"
];
module.exports = { 
    BASE_API_URL,
    allowedOrigins
 };    