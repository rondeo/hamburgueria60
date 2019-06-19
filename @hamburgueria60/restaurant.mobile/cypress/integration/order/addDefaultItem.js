describe('addDefaultItem', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  describe('adds a default item to a new order', () => {
    before(() => {
      // cy.viewport('iphone-3');
    });

    it('should be on the dashboard', () => {
      cy.contains('Nenhum pedido foi criado');
    });

    it('should open the Overview screen', () => {
      cy.get('[data-e2e="Dashboard#AddButton"]').click();
      cy.contains('Nenhum item adicionado');
    });

    it('should open the Pick Item screen', () => {
      cy.get('[data-e2e="Overview#AddButton"]').click();
    });

    it('should open the Details Screen for the first item', () => {
      // TODO: mock items
      cy.contains('Grelhado de carne').click();
    });

    it('should open a dialog to choose the inclusion type', () => {
      cy.get('[data-e2e="Banner#AddFab"]').click();
    });

    it('should choose the default inclusion type', () => {
      cy.contains('Padrão').click();
    });

    it('should go back to the Overview screen', () => {
      cy.get('[data-e2e="Details#Done"]').click();
    });

    it('should select a table', () => {
      cy.contains('Informações').click();
      cy.contains('Mesa').click();
      cy.contains('1').click();
    });

    it('should save the order as a draft', () => {
      cy.get('[data-e2e="Toolbar#BackButton"]').click();
      cy.get('button')
        .contains('Salvar')
        .click();
    });

    it('should be on dashboard with the draft order', () => {
      cy.contains('Mesa 1');
    });
  });
});
