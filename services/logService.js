//Requerimos la conexion a supabase
const supabase = require ("../config/supabase");

async function logDeniedAccess(origin) {
    try {
        const { error } = await supabase
            .from("access_logs")
            .insert([{ origin, status: "denied" }]);
        
        if (error) {
            console.error("Error al guardar el log: ", error.message);

        }
    } catch (err) {
        console.error("Error al registrar el acceso denegado: ", err.message);
    }
}

//Exportamos la funcion
module.exports = { logDeniedAccess };