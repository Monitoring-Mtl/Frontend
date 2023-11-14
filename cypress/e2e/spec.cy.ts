describe("Basic E2E tests", () => {
  it("Visit the page and test the title.", () => {
    cy.visit("http://localhost:3000")
    cy.title().should("eq", "Monitoring MTL");
  })
})


