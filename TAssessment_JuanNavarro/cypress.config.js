const { defineConfig } = require("cypress");
const { startActiveScan } = require("./zap-scan");
const { generateZapReport } = require("./zap-report");
const { lighthouse, prepareAudit } = require('cypress-audit');

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // Configuración de OWASP ZAP
      on('before:browser:launch', (browser = {}, launchOptions) => {
        const zapProxyUrl = 'http://localhost:8081';

        // Configurar proxy para diferentes navegadores
        if (browser.name === 'electron') {
          launchOptions.preferences.proxy = {
            server: zapProxyUrl,
          };

          launchOptions.preferences['user-agent'] = 
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        }

        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push(`--proxy-server=${zapProxyUrl}`);
          launchOptions.args.push(
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          );
        }

        if (browser.name === 'firefox') {
          launchOptions.preferences['network.proxy.type'] = 1;
          launchOptions.preferences['network.proxy.http'] = '127.0.0.1';
          launchOptions.preferences['network.proxy.http_port'] = 8081;
          launchOptions.preferences['network.proxy.ssl'] = '127.0.0.1';
          launchOptions.preferences['network.proxy.ssl_port'] = 8081;
          launchOptions.preferences['network.proxy.no_proxies_on'] = '';

          launchOptions.preferences['general.useragent.override'] = 
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        }

        return launchOptions;
      });

      // Ejecutar escaneo activo después de las pruebas
      on('after:run', async () => {
        const target = 'https://www.nba.com/';
        console.log(`Iniciando escaneo activo en: ${target}`);
        await startActiveScan(target);

        console.log('Generando reporte de OWASP ZAP...');
        await generateZapReport();
      });

      // Integración de Lighthouse con cypress-audit
      on('task', {
        lighthouse: lighthouse(),
        prepareAudit: (options) => {
          if (!options.launchOptions || !options.launchOptions.args) {
            throw new Error("launchOptions no definido correctamente");
          }
          return prepareAudit(options); 
        },
      });
    },
    viewportWidth: 1280, // Ancho del viewport
    viewportHeight: 720, // Altura del viewport
  },
});
