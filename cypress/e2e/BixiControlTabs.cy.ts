describe("Bixi Controls Tabs Switching", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the Bixi Trajets controls when the Trajets tab is clicked", () => {
    cy.get('[data-testid="service-tabs-tab-bixi"]')
      .click()
      .then(() => {
        cy.get('[data-testid="bixi-control-tabs-tab-trajets"]')
          .click()
          .then(() => {
            cy.get('[data-testid="bixi-trip-control-form"]').should(
              "be.visible"
            );
          });
      });
  });

  // it("should display the Bixi Stations controls when the Stations tab is clicked", () => {
  //   cy.get('[data-testid="service-tabs-tab-bixi"]').click().then(() => {
  //     cy.get('[data-testid="bixi-control-tabs-tab-stations"]').click().then(() => {
  //       cy.get('[data-testid="bixi-station-control-form"]').should('be.visible');
  //     });
  //   });
  // });
});
