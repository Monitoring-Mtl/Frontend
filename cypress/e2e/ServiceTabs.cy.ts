describe("Service Tabs Switching", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the STM dashboard when the STM tab is clicked", () => {
    cy.get("button").contains("STM").click().then(() => {
      cy.get('div[data-testid="stm-dashboard"]').should("be.visible");
    });
  });

  it("should display the Bixi dashboard when the Bixi tab is clicked", () => {
    cy.get("button").contains("Bixi").click().then(() => {
      cy.get('div[data-testid="bixi-dashboard"]').should("be.visible");
    });
  });

  //TODO: about section
});
