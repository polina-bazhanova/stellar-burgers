/// <reference types="cypress" />

Cypress.Commands.add('addBun', () => {
  cy.get('[data-cy=buns-as-ingredients]').contains('Добавить').click();
});

Cypress.Commands.add('addMainIngredient', () => {
  cy.get('[data-cy=mains-as-ingredients]').contains('Добавить').click();
});

Cypress.Commands.add('addSauce', () => {
  cy.get('[data-cy=sauces-as-ingredients]').contains('Добавить').click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get('[data-cy=close-modal]').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      addBun(): Chainable<void>;
      addMainIngredient(): Chainable<void>;
      addSauce(): Chainable<void>;
      closeModal(): Chainable<void>;
    }
  }
}

export {};
