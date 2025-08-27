// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitForDomToBeReady', () => {
  cy.document().should((doc) => {
    expect(doc.readyState).to.equal('complete');
  });

  const stableDuration = 1000;
  let lastCount = 0;
  let stableTime = 0;
  let start = Date.now();

  function getDomCount(doc: Document) {
    return doc.querySelectorAll('*').length;
  }

  cy.document().then((doc) => {
    return new Cypress.Promise((resolve, reject) => {
      const check = () => {
        const currentCount = getDomCount(doc);

        if (currentCount === lastCount) {
          stableTime += 200;
        } else {
          stableTime = 0;
        }

        lastCount = currentCount;

        if (stableTime >= stableDuration) {
          resolve();
        } else if (Date.now() - start > 10000) {
          reject(new Error('DOM did not stabilize in time.'));
        } else {
          setTimeout(check, 200);
        }
      };

      check();
    });
  });
});