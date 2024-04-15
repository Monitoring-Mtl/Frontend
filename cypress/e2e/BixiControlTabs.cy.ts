describe("Bixi Controls Tabs Switching", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/bixi/stations/arrondissements", {
      statusCode: 200,
      body: ["Arrondissement A", "Arrondissement B"],
    }).as("fetchArrondissements");
    cy.visit("http://localhost:3000");
    Cypress.config("defaultCommandTimeout", 15000);
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

  it("should load and display mock arrondissements in the select dropdowns", () => {
    cy.get('[data-testid="service-tabs-tab-bixi"]')
      .click()
      .then(() => {
        cy.get('[data-testid="bixi-control-tabs-tab-trajets"]')
          .click()
          .then(() => {
            cy.wait("@fetchArrondissements").then((interception) => {
              expect(interception.response?.statusCode).to.eq(200);
              expect(interception.response?.body).to.deep.equal([
                "Arrondissement A",
                "Arrondissement B",
              ]);

              cy.get('[data-testid="bixi-trip-control-form"]').should(
                "be.visible"
              );
              cy.get(
                '[data-testid="bixi-trip-control-form-depart-arrondissement-select"]'
              )
                .click()
                .then(() => {
                  interception.response?.body.forEach(
                    (arrondissement: string) => {
                      cy.contains(arrondissement).should("be.visible");
                    }
                  );
                  cy.get("body").click(0, 0);
                });

              cy.get(
                '[data-testid="bixi-trip-control-form-arrivee-arrondissement-select"]'
              )
                .click()
                .then(() => {
                  interception.response?.body.forEach(
                    (arrondissement: string) => {
                      cy.contains(arrondissement).should("be.visible");
                    }
                  );
                  cy.get("body").click(0, 0);
                });
            });
          });
      });
  });
});

describe("Bixi Controls Arrondissement and Station Fetching", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/bixi/stations/arrondissements", {
      statusCode: 200,
      body: ["Arrondissement A", "Arrondissement B"],
    }).as("fetchArrondissements");

    cy.intercept("GET", /\/api\/bixi\/stations\?arrondissement=(.*)/, (req) => {
      console.log("Intercepted request to:", req.url);
      if (decodeURIComponent(req.url.split("=")[1]) === "Arrondissement A") {
        return req.reply({
          statusCode: 200,
          body: [
            {
              name: "Station A1",
              arrondissement: "Arrondissement A",
              latitude: 45.5017,
              longitude: -73.5673,
            },
            {
              name: "Station A2",
              arrondissement: "Arrondissement A",
              latitude: 45.502,
              longitude: -73.567,
            },
          ],
        });
      }
    }).as("fetchStations");

    cy.visit("http://localhost:3000");
    Cypress.config("defaultCommandTimeout", 15000);
  });

  it("should load and display mock stations in the select dropdown when an arrondissement is selected", () => {
    cy.get('[data-testid="service-tabs-tab-bixi"]')
      .click()
      .then(() => {
        cy.get('[data-testid="bixi-control-tabs-tab-trajets"]')
          .click()
          .then(() => {
            cy.wait("@fetchArrondissements");
            cy.get(
              '[data-testid="bixi-trip-control-form-depart-arrondissement-select"]'
            )
              .click()
              .then(() => {
                cy.contains("Arrondissement A").click();
              })
              .then(() => {
                cy.wait("@fetchStations").then((interception) => {
                  expect(interception.response?.statusCode).to.eq(200);
                  cy.get(
                    '[data-testid="bixi-trip-control-form-depart-station-select"]'
                  )
                    .click()
                    .then(() => {
                      cy.contains("Station A1").should("be.visible");
                      cy.contains("Station A2").should("be.visible");
                    });
                });
              });
          });
      });
  });
});
