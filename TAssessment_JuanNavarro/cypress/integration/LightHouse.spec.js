describe('Lighthouse Audit', () => {
    it('should pass Lighthouse performance tests', () => {
      cy.visit('https://www.nba.com/'); 

      // Preparar la auditoría de Lighthouse
      cy.task('prepareAudit', {
        url: 'https://www.nba.com/',
        config: {
          extends: 'lighthouse:default',
          settings: {
            onlyCategories: ['performance', 'accessibility', 'best-practices'],
          },
        },
        launchOptions: {
          args: ['--remote-debugging-port=9222'],
        },
      }).then(() => {
        // Realizar el escaneo con Lighthouse
        cy.task('lighthouse', {
          url: 'https://www.nba.com/', // URL a auditar
          output: 'html', //guardo el reporte en formato html
        }).then((report) => {
          // Guarda el reporte generado
          cy.writeFile('lighthouse-report.html', report);
        });
      });
    });
});
