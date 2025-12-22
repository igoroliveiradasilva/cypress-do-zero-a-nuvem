Cypress.Commands.add('fillMandatoryFieldsAndSubmit'), () => {
    cy.get('[name="firstName"]').type('Carlos')
    cy.get('[name="lastName"]').type('Oliveira')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('carlos@dogmail.com')
    cy.get('[name="open-text-area"]').type('Teste', { delay: 0 })
    cy.get('.button').click()
}