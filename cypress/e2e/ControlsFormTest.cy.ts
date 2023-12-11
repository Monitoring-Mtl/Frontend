// controlsForm.spec.js

describe('ControlsForm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('should submit the form with valid data', () => {
    cy.wait(12000)

    cy.get('[aria-labelledby="busLine"]').click();
    cy.get('[role="option"]').contains('10').click();

    cy.get('[aria-labelledby="direction"]').click();
    cy.get('[role="option"]').contains('10 De Lorimier dir. SUD').click();

    cy.get('[aria-labelledby="stopId"]').click();
    cy.get('[role="option"]').contains('52614').click();
    
    const currentDate = new Date().toISOString().split('T')[0];
    cy.get('#beginDate').should('exist');
    cy.get('#beginDate').type(currentDate);
    cy.get('#beginTime').should('exist');
    cy.get('#beginTime').type('12:00');
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    
    cy.get('#endDate').should('exist');
    cy.get('#endDate').type(futureDateString);

    cy.get('#endTime').should('exist');
    cy.get('#endTime').type('14:00');

    cy.contains('Analyser').click();

  });

});
