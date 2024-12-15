class HomePage{
    elements = {
        urlbase: 'https://www.nba.com/',
        scoresToggle: () => cy.xpath("//span[@data-id='nba:game-tracker:hide-scores:toggle']"),
        scoresContent: () => cy.get('.CarouselDynamic_cd__77Fo_'),
        storeMenu: () => cy.xpath("//span[@data-has-icon='false'][contains(.,'Store')]"),
        jerseyOp: () => cy.xpath("//a[@data-text='Jerseys']"),
        jerseyIm: () => cy.xpath("(//img[contains(@loading,'eager')])[4]")
    }


    // Verifica si el toggle está activado (data-pos="true")
    verifyScoreToggleActive() {
        this.elements.scoresToggle().should('have.attr', 'data-pos', 'true');
    }

    // Verifica si el toggle está desactivado (data-pos="false")
    verifyScoreToggleInactive() {
        return this.elements.scoresToggle().should('have.attr', 'data-pos', 'false');
    }

    // Alternar el estado del toggle (clic en el toggle)
    ScorestoggleAction() {
        this.elements.scoresToggle().click();
    }

    visitUrl(){
        cy.visit(this.elements.urlbase);
    }

    /*validHiddenScores(){
        return this.elements.scoresContent().should('not.be.visible');
    }*/

    validShownScores(){
        return this.elements.scoresContent().should('be.visible');
    }

    hoverStore(){
        this.elements.storeMenu().trigger('mouseover')
    }

    clickJerseyOp(){
        this.elements.jerseyOp().click()
    }
}

module.exports = new HomePage();