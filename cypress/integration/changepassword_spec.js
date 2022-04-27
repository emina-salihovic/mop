import * as changePasswordPage from "../support/objects/changepassword"

describe('Change pssword page: Verify the user', () => {
    beforeEach(() => {
        cy.window().then((window) => {
            window.sessionStorage.clear()
            window.localStorage.clear()
        });

        cy.visit('/login')

        cy.url().then(url => {
            if (!url.includes('login')) {
                cy.logout()
            }
        })
    })

    it('can change password with valid password inputs', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {

                cy.login(user.email, user.password)

                cy.visit('/settings/login-settings')

                cy.url().then(url => {
                    console.log('URL is: ' + url)
                })

                changePasswordPage.enterCurrentPasswordField(user.password)
                changePasswordPage.enterNewPasswordField('NewPass123!')
                changePasswordPage.enterConfirmPasswordField('NewPass123!')
                changePasswordPage.clickOnChangePasswordButton()

                cy.logout()

                cy.login(user.email, 'NewPass123!')
            })
        })
    })

    it('can not change password with empty inputs', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {

                cy.login(user.email, user.password)

                cy.visit('/settings/login-settings')

                changePasswordPage.enterCurrentPasswordField()
                changePasswordPage.enterNewPasswordField()
                changePasswordPage.enterConfirmPasswordField()
                changePasswordPage.clickOnChangePasswordButton()

                changePasswordPage.isEmptyDataErrorMessageShown()

            })
        })
    })

    it('can not change password with wrong current password input', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {

                cy.login(user.email, user.password)

                cy.visit('/settings/login-settings')

                changePasswordPage.enterCurrentPasswordField('WrongPassword123!')
                changePasswordPage.enterNewPasswordField('NewPass123!')
                changePasswordPage.enterConfirmPasswordField('NewPass123!')
                changePasswordPage.clickOnChangePasswordButton()

                cy.contains('Current password is wrong, please try again.')

            })
        })
    })

    it('can not change password with unmatched passwords', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {

                cy.login(user.email, user.password)

                cy.visit('/settings/login-settings')

                changePasswordPage.enterCurrentPasswordField(user.password)
                changePasswordPage.enterNewPasswordField('NewPass123!')
                changePasswordPage.enterConfirmPasswordField('UnmatchedPassword123!')
                changePasswordPage.clickOnChangePasswordButton()

                cy.contains('Both passwords have to be the same.')

            })
        })
    })

    it('can not change password when the new password does not conform to the password format policy', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {

                cy.login(user.email, user.password)

                cy.visit('/settings/login-settings')

                changePasswordPage.enterCurrentPasswordField(user.password)
                changePasswordPage.enterNewPasswordField('pass')
                changePasswordPage.enterConfirmPasswordField('pass')
                changePasswordPage.clickOnChangePasswordButton()

                cy.contains('Password must be at least 8 characters long, contain both uppercase and lowercase English letters, special character and number.')

            })
        })
    })

})