describe("Section isolation", () => {
  it("Section isolation should exist.", function () {
    /* Visit the app via  login  custom command. */
    cy.fixture("contexts/admin-user.json")
      .then(cy.login)
      .then((response) => {
        expect(response).to.exist;
        expect(response.redirectedToUrl).to.exist;
        /* Custom command  visitRedirect  to follow the redirect. */
        cy.visitRedirect(response);
        cy.get("#tab-manageSites").click();
        cy.get(`#lti_root`).contains(/isolate sections/i);
      });
  });
});
