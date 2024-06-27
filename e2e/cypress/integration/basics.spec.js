describe("The basics", () => {
  it("Should visit the app and see wording specific to the  app.", function () {
    cy.server(); // enable response stubbing
    cy.route({
      method: "GET", // Route all GET requests
      url: "/api/sis-imports*",
      response: {},
    });
    cy.route({
      method: "GET", // Route all GET requests
      url: "/api/terms",
      response: {},
    });
    /* Visit the app via  login  custom command. */
    cy.fixture("contexts/admin-user.json")
      .then(cy.login)
      .then((response) => {
        expect(response).to.exist;
        expect(response.redirectedToUrl).to.exist;
        /* Custom command  visitRedirect  to follow the redirect. */
        cy.visitRedirect(response);
        cy.get(`#lti_root`).contains(/incremental/i);
      });
  });
});
