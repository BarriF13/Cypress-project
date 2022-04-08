/// <reference types="cypress" />;

describe('My first suite', () => {
  it('first test', () => {
    //for Cypress to check or test --we should do the visiting
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains("Form Layouts").click();
    //Type locators--------------------------------
    //by tag name
    cy.get('input');
    //by ID
    cy.get("#inputEmail1");
    //by class name
    cy.get(".input-full-width");
    //by attr name
    cy.get("[placeholder]");

    //by attr name and value
    cy.get('[placeholder="Email"]');
    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by tag name and attr with value
    cy.get("input[placeholder]");
    //by 2 different attributes
    cy.get('[placeholder="Email"][placeholder="Email"]');

    //tag name attr with value, ID and class
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //The most recommended way by cypress --creating own attr
    cy.get('[data-cy="imputEmail1"]');
  });

    it('Second test', () => {
      cy.visit("/");
      cy.contains("Forms").click();
      cy.contains("Form Layouts").click();

      cy.get('[data-cy="signInButton"]');

      cy.contains("Sign in");
      cy.contains('[status="warning"]', "Sign in");

      // cy.get(".custom-checkbox").click()--won't work os we get there via parent and children path

      cy.get("#inputEmail3")
        .parents("form")
        .find("button")
        .should("contain", "Sign in")
        .parents("form")
        .find("nb-checkbox")
        .click();

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    })
});
 