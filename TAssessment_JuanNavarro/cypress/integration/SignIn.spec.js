import SignInPage from "../support/pages/SignInPage";
import HomePage from "../support/pages/HomePage";
import { SignIntests } from "../fixtures/SignInData";
//import { beforeEach } from "mocha";


describe('Pruebas de Sign In', () => {
    SignIntests.forEach(test => {
        it(test.name, function () {
            cy.intercept('GET', '**', (req) => {
                req.headers['Accept-Language'] = 'es';
              }).as('setLanguage');

            SignInPage.urlVisit();
            cy.wait('@setLanguage');

            // Intentar cerrar el modal de cookies si aparece
            cy.get('body').then(($body) => {
                if ($body.find('#onetrust-reject-all-handler').length > 0) {
                    cy.get('#onetrust-reject-all-handler', { timeout: 15000 }).click();
                    cy.scrollTo('top');
                } else {
                    cy.log('El modal de cookies no apareció.');
                }
            });

            // Realizar las pruebas según el caso
            if (test.name === 'CTC_9_Sign_in_fields_blank' || 
                test.name === 'CTC_17_Sign_In_access_forget_password_url' || 
                test.name === 'CTC_18_Sign_In_access_Sign_Up_url') {

                if (test.name === 'CTC_9_Sign_in_fields_blank') {
                    SignInPage.clickSubmitB();
                    cy.scrollTo('top');
                    cy.contains('Dirección de correo obligatoria.').should('be.visible');
                    cy.contains('Contraseña obligatoria.').should('be.visible');
                } else if (test.name === 'CTC_17_Sign_In_access_forget_password_url') {
                    SignInPage.clickFPassword();
                    cy.url().should('eq', 'https://www.nba.com/account/forgot-password');
                } else {
                    SignInPage.clickNoID();
                    cy.url().should('eq', 'https://www.nba.com/account/sign-up');
                }
            } 
            
            else  if(test.name === 'CTC_10_Sign_In_nonregistered_email' ||
                test.name === 'CTC_12_Sign_In_error_password' ||
                test.name === 'CTC_13_Sign_In_invalid_email_format' ||
                test.name === 'CTC_14_Sign_In_correct_sign_in' ||
                test.name === 'BCTC_27_Sql_injection_1' || 
                test.name === 'BCTC_28_Sql_injection_2' || 
                test.name === 'BCTC_29_Sql_injection_3'
            ){
                SignInPage.typeEmail(test.email);
                SignInPage.typePassword(test.password);
                SignInPage.clickSubmitB();
                cy.scrollTo('top');

                if(test.name === 'CTC_13_Sign_In_invalid_email_format'){
                    !SignInPage.validateEmailFormat(test.email);
                    cy.contains('La dirección de correo debe ser una dirección válida.').should('be.visible');
                }

            }
            
            else if(test.name === 'CTC_11_Sign_In_without_password'){
                SignInPage.typeEmail(test.email);
                SignInPage.clickSubmitB();
                cy.scrollTo('top');
                cy.contains('Contraseña obligatoria.').should('be.visible');
                
            } 
            
            else if(test.name === 'CTC_15_Sign_In_visible_password' ||
                       test.name === 'CTC_16_Sign_In_return_hidden_password'){
                        SignInPage.valTogPassShow();
                        SignInPage.typePassword(test.password);
                        SignInPage.valHiddenPass();
                        SignInPage.clickPassTButton();
                        cy.scrollTo('top');
                        SignInPage.valShowPass();
                        SignInPage.valTogPassHide();

                        if(test.name === 'CTC_16_Sign_In_return_hidden_password'){
                            SignInPage.clickPassTButton();
                            cy.scrollTo('top');
                            SignInPage.valHiddenPass();
                            SignInPage.valTogPassShow();

                        }

                       }
            if(test.name === 'CTC_14_Sign_In_correct_sign_in'){
                cy.wait(5000)
                /*cy.xpath("//path[contains(@fill,'black')]").trigger('mouseover');
                cy.xpath("//path[contains(@fill,'black')]").click()*/

                cy.contains('Sign In').should('not.be.visible')
            }
            
            
                cy.wait(15000);
                const specName = Cypress.spec.name;
                const screenshotName = `${specName}/${test.name}`
                cy.screenshot(screenshotName);
            
          
                
        });
    });
});
