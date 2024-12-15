class TicketsLakersPage{
    elements = {
        urlbase: 'https://www.nba.com/lakers/tickets?ls=nbatickets',
        lupa: () => cy.get('svg[alt="Search Icon"]').first(),
        //lupa2: () => cy.get('svg[alt="Search Icon"]').eq(1)
    }

    visitUrl(){
        cy.visit(this.elements.urlbase)
    }

    clickLupa(){
        this.elements.lupa().click()
    }
}

module.exports = new TicketsLakersPage();