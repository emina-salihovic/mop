import * as signupPage from "../support/objects/signup";
import { faker } from '@faker-js/faker';

describe('Verify the SignUp Page', () => {  
    beforeEach(() => {
        cy.window().then((window) => {
            window.sessionStorage.clear();
            window.localStorage.clear();
        });

        cy.visit('/login')
        
        cy.url().then(url => {
            if (! url.includes('login')) {
                console.log('logging out')
                cy.logout()   
            }

            cy.visit('/signup')
        })
    })

    it('is visible', () => {
        signupPage.isSignUpPageVisible()
    })

    it ('can create an account when valid data is entered', () => {
        let fakeEmail = faker.internet.email()
        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'Test123!'
        let fakePhoneNumber = faker.phone.phoneNumber('+123############') 

        signupPage.enterEmail(fakeEmail)
        signupPage.enterName(fakeFirstName)
        signupPage.enterPassword(fakePassword)
        signupPage.confirmPassword(fakePassword)
        signupPage.enterPhoneNumber(fakePhoneNumber)
        signupPage.checkTermsAndConditions()
        signupPage.clickOnSignUp()

        cy.url().should('contain', '/pba')
        cy.get("[data-testid=registration-code-mfa").type("9999")
        cy.get("[data-testid=pba-signup-button").click()
        cy.get("button[data-testid=''").click()
        cy.url().should('contain', '/events')
        cy.get('a[href*="settings"]').click()

        cy.contains(fakeFirstName)
        cy.contains(fakeEmail)

    })
})