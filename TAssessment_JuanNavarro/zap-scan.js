const axios = require('axios');

const ZAP_API_KEY = 'ctf3q1f3kok19tje8ptd6r1b4i';
const ZAP_HOST = 'http://localhost:8081';

async function startActiveScan(target) {
  try {
    // Inicia el escaneo activo
    const response = await axios.get(`${ZAP_HOST}/JSON/ascan/action/scan/`, {
      params: {
        apikey: ZAP_API_KEY,
        url: target, // URL objetivo
        recurse: true, // Escanear subdirectorios
        inScopeOnly: true, // Solo en alcance
      },
    });

    console.log('Escaneo activo iniciado:', response.data);
  } catch (error) {
    console.error('Error iniciando escaneo activo:', error.message);
  }
}

module.exports = { startActiveScan };
