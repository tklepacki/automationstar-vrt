import * as common from "../pages/common/common";

describe('Login - Visual Tests', () => {
    it('Login Page', () => {
        cy.visit('/');
        common.inactivePace().should('exist')
        cy.matchImageSnapshot();
    });
});
