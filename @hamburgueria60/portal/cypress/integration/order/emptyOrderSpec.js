describe('emptyOrder', () => {
  it('should open the app without data', () => {
    cy.visit('http://localhost:3000/');
    cy.viewport('iphone-3');

    cy.get('[data-e2e="Dashboard#EmptyState"]');
  });
});
