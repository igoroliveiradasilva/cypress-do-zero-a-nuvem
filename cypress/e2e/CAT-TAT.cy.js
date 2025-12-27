describe('Central de Atendimentos ao Cliente TAT', () => {

    beforeEach(() => {
        cy.viewport(620, 900) // ajuste igor
        cy.visit('./src/index.html')
    });

    it('Verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()

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
        cy.contains('button', 'Enviar').click()

        // Mensagem de sucesso
        cy.get('.success > strong')
            .should('be.visible')

        cy.tick(3000)

        cy.get('.success > strong')
            .should('not.be.visible')
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()

        cy.get('[name="firstName"]').type('Carlos')
        cy.get('[name="lastName"]').type('Oliveira')
        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('carlos@dogmail,com')
        cy.get('[name="open-text-area"]').type('Teste', { delay: 0 })

        // mensagem de erro        
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')

        cy.tick(3000)
        cy.get('.error > strong').should('not.be.visible')
    });

    it('Campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()

        cy.get('[name="firstName"]').type('Carlos')
        cy.get('[name="lastName"]').type('Oliveira')
        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('carlos@dogmail.com')
        cy.get('[name="open-text-area"]').type('Teste', { delay: 0 })
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error > strong').should('be.visible')

        cy.tick(3000)

        cy.get('.error > strong').should('not.be.visible')
    });

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('[name="firstName"]')
            .type('Carlos')
            .should('have.value', 'Carlos')
            .clear()
            .should('have.value', '')

        cy.get('[name="lastName"]')
            .type('Oliveira')
            .should('have.value', 'Oliveira')
            .clear()
            .should('have.value', '')

        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]')
            .type('carlos@dogmail.com')
            .should('have.value', 'carlos@dogmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('51999999999')
            .should('have.value', '51999999999')
            .clear()
            .should('have.value', '')
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('.error > strong').should('be.visible')

        cy.tick(3000)

        cy.get('.error > strong').should('not.be.visible')
    });

    it('Envia o formulário com sucesso usando um comando customizado', () => {
        cy.clock()

        const data = {
            firstName: 'Carlos',
            lastName: 'Oliveira',
            email: 'carlos@dogmail.com',
            text: 'Teste'
        }

        cy.fillMandatoryFieldsAndSubmit(data)

        cy.get('.success').should('be.visible')

        cy.tick(3000)

        cy.get('.success').should('not.be.visible')
    });

    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    });

    it('Seleciona um produto (Mentoria) pelo seu valor (value)', () => {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    });

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    });

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .each(typeOfService => {
                cy.wrap(typeOfService)
                    .check()
                    .should('be.checked')
            })
    });

    it('Marca ambos checkbox, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('be.not.checked')
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('[name="firstName"]').type('Carlos')
        cy.get('[name="lastName"]').type('Oliveira')
        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('carlos@dogmail.com')
        cy.get('[name="open-text-area"]').type('Teste', { delay: 0 })
        cy.get('#phone-checkbox').check()
            .should('be.checked')

        cy.contains('button', 'Enviar').click()

        cy.get('.error > strong').should('be.visible')
    });

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'href', 'privacy.html')
            .and('have.attr', 'target', '_blank')
    });

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.contains('a', 'Política de Privacidade')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('h1', 'CAC TAT - Política de Privacidade')
    });

    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('Preenche o campo da área de texto usando o comando invoke', () => {
        cy.get('#open-text-area')
            .invoke('val', 'Um texto qualquer')
            .should('have.value', 'Um texto qualquer')
    });

    it('Faz uma requisição HTTP', () => {
        cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
            .as('getRequest')
            .its('status')
            .should('be.equal', 200)
        cy.get('@getRequest')
            .its('statusText')
            .should('be.equal', 'OK')
        cy.get('@getRequest')
            .its('body')
            .should('include', 'CAC TAT')
    });

});