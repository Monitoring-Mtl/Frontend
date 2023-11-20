const localUrl = "http://localhost:3000";

describe("Basic E2E tests", () => {

  it("Visit the page and test the title.", () => {
    cy.visit(localUrl);
    cy.title().should("eq", "Monitoring MTL");
  });

  it("Test that all the visualization elements are present.", () => {
    cy.visit(localUrl);
    cy.get("#stm-map").should("exist");
    cy.get("#occupancy-chart").should("exist");
    cy.get("#punctuality-chart").should("exist");
    cy.get("#ramp-chart").should("exist");
  });
})


