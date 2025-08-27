// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'
import addContext from 'mochawesome/addContext'
import path from "path";

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed" && runnable) {
    const parentTitle = runnable.parent?.title || "Unknown Suite";

    const safeTestTitle = `${parentTitle} -- ${test.title}`
      .replace(/[^a-zA-Z0-9-_]/g, " ");

    const projectRoot = Cypress.config("projectRoot");
    const specFileName = Cypress.spec.name;
    const diffImagePath = path.join(
      projectRoot,
      "cypress",
      "snapshots",
      "cypress",
      "tests",
      specFileName,
      "__diff_output__",
      `${safeTestTitle}.diff.png`
    );

    const resultsDir = path.join(projectRoot, "cypress", "results");
    const correctReportPath = path.relative(resultsDir, diffImagePath);

    const mochaReportPath = `../cypress/${correctReportPath}`;

    // @ts-ignore
    addContext({ test }, mochaReportPath);
  }
});
