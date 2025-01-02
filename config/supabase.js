const { createClient } = require("@supabase/supabase-js");

// Obtén la URL y la clave de las variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Valida que las variables estén configuradas
if (!supabaseUrl || !supabaseKey) {
    throw new Error("SUPABASE_URL y SUPABASE_KEY son requeridas. Verifica tu archivo .env");
}

// Crea la instancia del cliente
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;