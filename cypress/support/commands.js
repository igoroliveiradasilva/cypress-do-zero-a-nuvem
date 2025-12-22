Cypress.Commands.add('fillMandatoryFieldsAndSubmit'), data => {
    cy.get('[name="firstName"]').type(data.firstName)
    cy.get('[name="lastName"]').type(data.lastName)
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type(data.email)
    cy.get('[name="open-text-area"]').type(data.text)
    cy.get('.button').click()
}