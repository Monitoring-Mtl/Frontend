describe("Basic E2E tests", () => {

  it("Visit the page and test that the map and form are present.", () => {
    cy.visit("http://localhost:3000");
    cy.title().should("eq", "Monitoring MTL");
    cy.get("#stm-map").should("exist");
    cy.get("#bus-line-form").should("exist");
  });

})


