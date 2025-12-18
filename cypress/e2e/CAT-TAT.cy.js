describe('Central de Atendimentos ao Cliente TAT', () => {

    beforeEach(() => {
        cy.viewport(470, 850) // ajuste igor
        cy.visit('./src/index.html')
    });

    it('Verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('Teste Texto Teste Texto Teste Texto', 5)

        // Nome
        cy.get('[name="firstName"]')
            .type('Carlos')
        // Sobrenome
        cy.get('[name="lastName"]')
            .type('Oliveira')
        // Email
        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]')
            .type('carlos@dogmail.com')
        // Textarea 'como podemos ajudar...'
        cy.get('[name="open-text-area"]')
            .type(longText, { delay: 0 })
        // Enviar
        cy.get('.button')
            .click()

        // Mensagem de sucesso
        cy.get('.success > strong')
            .should('be.visible')

    });
});