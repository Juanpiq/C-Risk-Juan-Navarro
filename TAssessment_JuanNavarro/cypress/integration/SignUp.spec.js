import SignUpPage, { checkConditionsClick } from "../support/pages/SignUpPage";
import { SignUptests } from "../fixtures/SignUpData";
describe('Pruebas de Sign Up', () => {
    /*beforeEach(() => {
        // Intercepta la solicitud de validación del CAPTCHA
        cy.intercept('POST', '/recaptcha/api2/userverify*', {
            statusCode: 200,
            body: { success: true }, // Simula una respuesta exitosa
        }).as('validateCaptcha');
    });*/

    SignUptests.forEach(test =>{
        it(test.name, function(){
            cy.intercept('GET', '**', (req) => {
                req.headers['Accept-Language'] = 'es';
              }).as('setLanguage');
            SignUpPage.urlVisit();
            cy.wait('@setLanguage');
            //cy.visit('https://www.nba.com/account/sign-up');

            cy.get('body').then(($body) => {
                if ($body.find('#onetrust-reject-all-handler').length > 0) {
                    cy.get('#onetrust-reject-all-handler', { timeout: 5000 }).click();
                    cy.scrollTo('top');
                } else {
                    cy.log('El modal de cookies no apareció.');
                }
            });
            
            if(test.email != '')
                SignUpPage.typeEmail(test.email);

            if(test.password != '')
                SignUpPage.typePassword(test.password);

            if(test.fname != '')
                SignUpPage.typeFName(test.fname);

            if(test.lname != '')
                SignUpPage.typeLName(test.lname);

            if(test.month != '')
                SignUpPage.selectMonth(test.month);

            if(test.year != '')
                SignUpPage.selectYear(test.year);

            SignUpPage.selectCountry(test.country);
            SignUpPage.checkConditionsClick();
            //SignUpPage.checkCaptchaClick();
            SignUpPage.submitButtonClick();

            cy.scrollTo('top');

            if(test.name === 'CTC_1_Sign_Up_fields_in_blank' || test.name === 'CTC_2_Sign_Up_invalid_email'){
                SignUpPage.emailEMVi();
                if(test.name === 'CTC_1_Sign_Up_fields_in_blank'){
                    SignUpPage.emailEMText1()
                    SignUpPage.monthEMVi()
                    SignUpPage.yearEMVi()

                } 
                else{
                    !SignUpPage.validateEmailFormat(test.email)
                    SignUpPage.emailEMText2()
                }

            }

            if(test.name === 'CTC_1_Sign_Up_fields_in_blank' || test.name === 'CTC_3_Sign_Up_short_password' || test.name === 'CTC_4_Sign_Up_large_password' || 
                test.name === 'CTC_5_Sign_Up_password_without_uppercase_character' || test.name === 'CTC_6_Sign_Up_password_without_lowercase_character' || 
                test.name === 'CTC_7_Sign_Up_password_without_symbol_neither_number'){
                    SignUpPage.passwordEMVi()
                    if(test.name === 'CTC_1_Sign_Up_fields_in_blank')
                        SignUpPage.passwordEMText1()
                    else SignUpPage.passwordEMText2()
                }
            cy.wait(5000);
            const specName = Cypress.spec.name;
            const screenshotName = `${specName}/${test.name}`
            cy.screenshot(screenshotName);
        });
    });
});