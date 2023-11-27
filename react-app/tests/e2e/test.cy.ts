describe('Sample test', () => {
    it('should be sane', () => {
        expect(true).to.equal(true)
    })
})

describe('Authentication', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it.skip('should successfully log in with valid credentials', () => {
        // Do login

        // Assuming successful login redirects to another page, you can add assertions here
        cy.url().should('include', '/suppliers');
    });

    it('should gracefully decline login with bad credentials', () => {
        const usernameInputSelector = "#username";
        const passwordInputSelector = "#password";
        const loginButtonSelector = "#submit";
        const errorBox = "#error-message";

        cy.log('starting foo')
        cy.get(usernameInputSelector).type('unknown-user')
        cy.get(passwordInputSelector).type('guess-password')

        cy.get(loginButtonSelector).click().then(() => {
            cy.wait(3000)
            cy.log('After form submission with react');
            cy.get(errorBox).should('have.text', 'Incorrect username and or password combination')
        });
    });
})
