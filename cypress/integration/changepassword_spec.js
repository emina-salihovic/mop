import * as changePasswordPage from "../support/objects/changepassword";

describe('Verify the Change Password Page', () => {  
    beforeEach(() => {
        cy.window().then((window) => {
            window.sessionStorage.clear();
            window.localStorage.clear();
        });
        
        cy.visit('/login');

        cy.url().then(url => {
            if (! url.includes('login')) {
                cy.logout()   
            }
        })
    })

    it('is visible', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {
                cy.login(user.email,user.password)
            })
        })

        cy.visit('/settings/login-settings')
        changePasswordPage.isChangePasswordPageVisible()
    })

    it ('can change the password', () => {
        let fakeUser = cy.fakeUserData().then(user => {
            cy.signup(user).then(response => {

                cy.login(user.email, user.password)

                cy.visit('/settings/login-settings')

                changePasswordPage.enterCurrentPasswordField(user.password)
                changePasswordPage.enterNewPasswordField('NewPass123!')
                changePasswordPage.enterConfirmPasswordField('NewPass123!')
                changePasswordPage.clickOnChangePasswordButton()

                cy.logout()

                cy.login(user.email, 'NewPass123!')

            })
        })
    })
   
})