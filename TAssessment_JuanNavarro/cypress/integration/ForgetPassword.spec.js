import ForgetPasswordPage from "../support/pages/ForgetPasswordPage";
import { ForgetPasswordtests } from "../fixtures/ForgetPasswordData";

describe('Pruebas de Forget Password', () => {
    ForgetPasswordtests.forEach(test => {
        it(test.name, function () {
            cy.intercept('GET', '**', (req) => {
                req.headers['Accept-Language'] = 'es';
              }).as('setLanguage');

            ForgetPasswordPage.visitUrl()
            cy.wait('@setLanguage');

            // Intentar cerrar el modal de cookies si aparece
            cy.get('body').then(($body) => {
                if ($body.find('#onetrust-reject-all-handler').length > 0) {
                    cy.get('#onetrust-reject-all-handler', { timeout: 8000 }).click();
                    cy.scrollTo('top');
                } else {
                    cy.log('El modal de cookies no apareció.');
                }
            });
            cy.scrollTo('top');

            if(test.name === 'CTC_22_Forget_Password_cancel'){
                ForgetPasswordPage.clickCancelLink();
                cy.url().should('eq', 'https://www.nba.com/account/sign-in');
            } 
            else if(test.name === 'CTC_23_Forget_Password_blank_password'){
                ForgetPasswordPage.clickSubmitButton();
                cy.contains('Dirección de correo obligatoria.').should('be.visible')
            }
            else{
                ForgetPasswordPage.typeEmail(test.email);
                ForgetPasswordPage.clickSubmitButton();
                cy.wait(5000)
                cy.scrollTo('top');
                if(test.name === 'CTC_19_Forget_Password_invalid_email_format'){
                    cy.contains('La dirección de correo debe ser una dirección válida.').should('be.visible');
                } 
                else if(test.name === 'CTC_20_Forget_Password_nonregisted_email'){
                    cy.scrollTo('top');
                    cy.contains('Enlace de restablecimiento enviado', { matchCase: false }).should('not.be.visible');
                }
                else if(test.name === 'CTC_21_Forget_Password_correct_email'){
                    cy.scrollTo('top');
                    cy.contains('Enlace de restablecimiento enviado', { matchCase: false }).should('be.visible');
                }
            }

            cy.wait(5000);
            const specName = Cypress.spec.name;
            const screenshotName = `${specName}/${test.name}`
            cy.screenshot(screenshotName);
            
            
        })
    });
});