/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Waits for the DOM to be stable and fully loaded
     */
    waitForDomToBeReady(): Chainable<void>;
  }
}