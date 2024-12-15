class SignUpPage{
    elements ={
        urlbase: 'https://www.nba.com/account/sign-up',
        modalpopup: () =>cy.get('#onetrust-policy'),
        cookies: () => cy.xpath("//button[contains(@id,'onetrust-reject-all-handler')]"),
        emailInput: () => cy.get('#email'),
        emailErrorM : () => cy.get('p.Input_text__1eMN5'),
        passwordInput: () => cy.get('#password'),
        passwordErrorM: () => cy.get('p.Input_text__1eMN5[data-error="true"]'),
        fnameInput: () => cy.get('#firstName'),
        lnameInput: () => cy.get('#lastName'),
        monthSelect: () => cy.get('[data-testid="dobMonth"]'),
        monthErrorM: () => cy.xpath("(//p[@class='DropDown_invalidMessage__3Fyt_'])[1]"),
        yearSelect: () => cy.get('[data-testid="dobYear"]'),
        yearErrorM: () => cy.xpath("(//p[@class='DropDown_invalidMessage__3Fyt_'])[2]"),
        countrySelect: () => cy.get('select[name="country"]'),
        checkConditions: () => cy.xpath("(//div[contains(@class,'Checkbox_iconWrapper__2k_0O')])[1]"),
        checkCaptcha: () => cy.get('#recaptcha-anchor'),
        submitButton: () => cy.get('#submit')

    }

    modalAppear(){
        this.elements.cookies().click()
    }

    urlVisit(){
        cy.visit(this.elements.urlbase)
    }

    typeEmail(email){
        this.elements.emailInput().type(email)
    }

    typePassword(password){
        this.elements.passwordInput().type(password)
    }

    typeFName(fname){
        this.elements.fnameInput().type(fname)
    }

    typeLName(lname){
        this.elements.lnameInput().type(lname)
    }

    selectMonth(month){
        this.elements.monthSelect().select(month)
    }

    selectYear(year){
        this.elements.yearSelect().select(year)
    }

    selectCountry(country){
        this.elements.countrySelect().select(country)
    }

    checkConditionsClick(){
        this.elements.checkConditions().click()
    }

    checkCaptchaClick(){
        this.elements.checkCaptcha().click()
    }

    submitButtonClick(){
        this.elements.submitButton().click()
    }

    emailEMVi(){
        return this.elements.emailErrorM().should('be.visible')
    }

    emailEMText1(){
        return this.elements.emailErrorM().should('have.text','Dirección de correo obligatoria')
    }
    emailEMText2(){
        return this.elements.emailErrorM().should('have.text', 'La dirección de correo debe ser una dirección válida.')
    }

    passwordEMVi(){
        return this.elements.passwordErrorM().should('be.visible')
    }

    passwordEMText1(){
        return this.elements.passwordErrorM().should('have.text', 'Contraseña obligatoria.')
    }

    passwordEMText2(){
        return this.elements.passwordErrorM().should('have.text', 'La contraseña debe tener al menos 8 caracteres e incluir 1 letra mayúscula y 1 símbolo o número.')
    }

    monthEMVi(){
        return this.elements.monthErrorM().should('be.visible')
    }

    yearEMVi(){
        return this.elements.yearErrorM().should('be.visible')
    }

    validateEmailFormat(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

}

module.exports = new SignUpPage();