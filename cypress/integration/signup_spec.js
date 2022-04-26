import * as signupPage from "../support/objects/signup"
import { faker } from '@faker-js/faker'

describe('Verify the SignUp Page', () => {
    beforeEach(() => {
        cy.window().then((window) => {
            window.sessionStorage.clear()
            window.localStorage.clear()
        })

        cy.visit('/login')

        cy.url().then(url => {
            if (!url.includes('login')) {
                console.log('logging out')
                cy.logout()
            }

            cy.visit('/signup')
        })
    })

    it('is visible', () => {
        signupPage.isSignUpPageVisible()
    })

    it('can create an account when valid data is entered', () => {
        let fakeEmail = faker.internet.email()
        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'Test123!'
        let fakePhoneNumber = faker.phone.phoneNumber('+123############')

        signupPage.signUp(fakeEmail, fakeFirstName, fakePassword, fakePassword, fakePhoneNumber)
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

    it('can not create an account when empty data is entered', () => {

        signupPage.signUp()
        signupPage.clickOnSignUp()

        cy.contains('Email is required.')
        cy.contains('Name is required.')
        cy.contains('Password is required.')
        cy.contains('Confirm password is required.')
        cy.contains('Phone number is required. Please use +123 format.')
        cy.contains('Please accept our Terms & Conditions.')
    })

    it('can not create an account when invalid email format is entered', () => {

        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'Test123!'
        let fakePhoneNumber = faker.phone.phoneNumber('+123############')

        signupPage.signUp('invalid@', fakeFirstName, fakePassword, fakePassword, fakePhoneNumber)
        signupPage.checkTermsAndConditions()
        signupPage.clickOnSignUp()

        cy.contains('Please enter a valid email.')
    })

    it('can not create an account when already used email is entered', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {

                cy.login(user.email, user.password)
                cy.visit('/signup')

                signupPage.signUp(user.email, 'Name', user.password, user.password, user.phoneNumber)
                signupPage.checkTermsAndConditions()
                signupPage.clickOnSignUp()

                cy.contains('user already exists')
            })
        })
    })

    it('can not create an account when passwords are not matching', () => {
        let fakeEmail = faker.internet.email()
        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'Test123!'
        let fakePhoneNumber = faker.phone.phoneNumber('+123############')

        signupPage.signUp(fakeEmail, fakeFirstName, fakePassword, 'ConfirmPass123!', fakePhoneNumber)
        signupPage.checkTermsAndConditions()
        signupPage.clickOnSignUp()

        cy.contains('Both passwords have to be the same.')
    })

})