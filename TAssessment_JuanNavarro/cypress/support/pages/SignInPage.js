class SignInPage{
    elements = {
        urlbase: 'https://www.nba.com/account/sign-in',
        emailInput: () => cy.get('#email'),
        passwordInput: () => cy.get('#password'),
        submitButton: () => cy.get('#submit'),
        fPassword: () => cy.xpath("//a[@href='/account/forgot-password']"),
        noID: () => cy.xpath("//a[@href='/account/sign-up']"),
        passTogleButton: () => cy.get('.Input_passwordToggleIcon__LTo_J')
    }

    typeEmail(email){
        this.elements.emailInput().type(email)
    }

    typePassword(password){
        this.elements.passwordInput().type(password)
    }

    clickFPassword(){
        this.elements.fPassword().click()
    }

    clickNoID(){
        this.elements.noID().click()
    }

    clickSubmitB(){
        this.elements.submitButton().click()
    }

    clickPassTButton(){
        this.elements.passTogleButton().click()
    }

    urlVisit(){
        cy.visit(this.elements.urlbase)
    }

    valHiddenPass(){
         return this.elements.passwordInput().should('have.attr', 'type', 'password')
    }

    valShowPass(){
        return this.elements.passwordInput().should('have.attr', 'type', 'text')
   }

    valTogPassShow(){
        return this.elements.passTogleButton().find('span').should('contain', 'show password');
    }

    valTogPassHide(){
        return this.elements.passTogleButton().find('span').should('contain', 'hide password');
    }

    validateEmailFormat(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}

module.exports = new SignInPage();