const axios = require('axios');

const ZAP_API_KEY = 'ctf3q1f3kok19tje8ptd6r1b4i';
const ZAP_HOST = 'http://localhost:8081';

async function generateZapReport() {
  try {
    const response = await axios.get(`${ZAP_HOST}/JSON/core/action/generateReport/`, {
      params: {
        apikey: ZAP_API_KEY,
        title: 'OWASP ZAP Report',
        template: 'traditional-html',
        reportdir: './reports',
        reportfilename: 'zap-report.html',
      },
    });

    console.log('Reporte generado exitosamente:', response.data);
  } catch (error) {
    console.error('Error generando el reporte:', error.message);
  }
}

module.exports = { generateZapReport };
