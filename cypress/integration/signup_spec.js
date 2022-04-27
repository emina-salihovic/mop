import * as signupPage from "../support/objects/signup"
import { faker } from '@faker-js/faker'

describe('Sign up page: Verify the user', () => {
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

    it('can Sign up with valid data', () => {
        let fakeEmail = faker.internet.email()
        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'Test123!'
        let fakePhoneNumber = faker.phone.phoneNumber('+123############')

        signupPage.signUp(fakeEmail, fakeFirstName, fakePassword, fakePassword, fakePhoneNumber)
        signupPage.checkTermsAndConditions()
        signupPage.clickOnSignUp()

        signupPage.goThroughSignUpProcess()
        signupPage.isUserSignedUp(fakeFirstName, fakeEmail)

    })

    it('can not Sign up with empty data', () => {

        signupPage.signUp()
        signupPage.clickOnSignUp()
        signupPage.isEmptyDataErrorMessageShown()

    })

    it('can not Sign up with invalid email format', () => {

        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'Test123!'
        let fakePhoneNumber = faker.phone.phoneNumber('+123############')

        signupPage.signUp('invalid@', fakeFirstName, fakePassword, fakePassword, fakePhoneNumber)
        signupPage.checkTermsAndConditions()
        signupPage.clickOnSignUp()

        cy.contains('Please enter a valid email.')
    })

    it('can not Sign up with existing user email', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {

                cy.visit('/signup')

                signupPage.signUp(user.email, 'Name', user.password, user.password, user.phoneNumber)
                signupPage.checkTermsAndConditions()
                signupPage.clickOnSignUp()

                cy.contains('user already exists')
            })
        })
    })

    it('can not Sign up with invalid password format', () => {
        let fakeEmail = faker.internet.email()
        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'pass'
        let fakePhoneNumber = faker.phone.phoneNumber('+123############')

        signupPage.signUp(fakeEmail, fakeFirstName, fakePassword, fakePassword, fakePhoneNumber)
        signupPage.checkTermsAndConditions()
        signupPage.clickOnSignUp()

        cy.contains('Password must be at least 8 characters long, contain both uppercase and lowercase English letters, special character and number.')
    })

    it('can not Sign up with unmatched passwords', () => {
        let fakeEmail = faker.internet.email()
        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'Test123!'
        let fakePhoneNumber = faker.phone.phoneNumber('+123############')

        signupPage.signUp(fakeEmail, fakeFirstName, fakePassword, 'ConfirmPass123!', fakePhoneNumber)
        signupPage.checkTermsAndConditions()
        signupPage.clickOnSignUp()

        cy.contains('Both passwords have to be the same.')
    })

    it('can not Sign up with invalid format for phone number', () => {
        let fakeEmail = faker.internet.email()
        let fakeFirstName = faker.name.firstName()
        let fakePassword = 'Test123!'
        let fakePhoneNumber = faker.phone.phoneNumber('############')

        signupPage.signUp(fakeEmail, fakeFirstName, fakePassword, fakePassword, fakePhoneNumber)
        signupPage.checkTermsAndConditions()
        signupPage.clickOnSignUp()

        cy.contains('Please use +123 format.')
    })

})