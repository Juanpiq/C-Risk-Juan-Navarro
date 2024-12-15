class ForgetPasswordPage{
    elements = {
        emailInput: () => cy.get('#email'),
        submitButton: () => cy.get('#submit'),
        cancelLink: () => cy.get('#cancel'),
        urlbase: 'https://www.nba.com/account/forgot-password'
    }

    typeEmail(email){
        this.elements.emailInput().type(email)
    }

    clickSubmitButton(){
        this.elements.submitButton().click()
    }

    clickCancelLink(){
        this.elements.cancelLink().click()
    }

    visitUrl(){
        cy.visit(this.elements.urlbase)
    }

    validateEmailFormat(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}

module.exports = new ForgetPasswordPage()