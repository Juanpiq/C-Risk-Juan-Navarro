import HomePage from "../support/pages/HomePage";
beforeEach(() => {
    // Llamada para visitar la URL
    HomePage.visitUrl();
    cy.get('body').then(($body) => {
        // Verifica si el modal de cookies existe
        const cookieModal = $body.find('#onetrust-reject-all-handler');
        if (cookieModal.length > 0) {
            // Si el modal está presente,rechaza las cookies
            cy.log('Modal de cookies encontrado');
            cy.get('#onetrust-reject-all-handler', { timeout: 15000 }).click();
            cy.scrollTo('top');
        } else {
            // Si no hay modal, simplemente registra que no apareció
            cy.log('El modal de cookies no apareció. Continuando...');
        }
    });
});

describe('Pruebas para esconder y mostrar los resultados de partidos', () =>{
    it('CTC_24_Home_Page_Hide_Scores', () =>{
        HomePage.verifyScoreToggleActive();
        HomePage.validShownScores();
        cy.contains('Content is hidden to prevent spoilers. ').should('not.exist');
        HomePage.ScorestoggleAction();
        cy.contains('Content is hidden to prevent spoilers. ').should('be.visible');
        HomePage.verifyScoreToggleInactive();
        cy.wait(5000);
        cy.screenshot();

    });

    it('CTC_25_Home_Page_Show_Scores', () =>{
        HomePage.verifyScoreToggleActive();
        HomePage.validShownScores();
        cy.contains('Content is hidden to prevent spoilers. ').should('not.exist');
        HomePage.ScorestoggleAction();
        cy.contains('Content is hidden to prevent spoilers. ').should('be.visible');
        HomePage.verifyScoreToggleInactive();
        
        HomePage.ScorestoggleAction();
        HomePage.verifyScoreToggleActive();
        cy.contains('Content is hidden to prevent spoilers. ').should('not.exist');

        cy.wait(5000);
        cy.screenshot();
    });

    it('CTC_26_Store_Drop_down_menu', () => {
        HomePage.hoverStore();
        cy.get('.NavDropdown_list__Phy7G')
        .contains('NBA Store')  // Busca el enlace que contiene el texto "NBA Store"
        .should('be.visible');  // Verifica que el enlace esté visible

        cy.wait(5000);
        cy.screenshot();
    });

});