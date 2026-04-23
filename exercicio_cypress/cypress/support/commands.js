// ***********************************************
// Comandos customizados para reutilizar nos testes
// ***********************************************

// Cadastrar um novo contato (usa o botao "Adicionar" - .adicionar)
Cypress.Commands.add('cadastrarContato', (nome, email, telefone) => {
  cy.get('input[placeholder="Nome"]').clear().type(nome)
  cy.get('input[placeholder="E-mail"]').clear().type(email)
  cy.get('input[placeholder="Telefone"]').clear().type(telefone)
  cy.get('button.adicionar').click()
})

// Localizar o "card" de um contato pelo nome e retornar o elemento pai
Cypress.Commands.add('buscarContato', (nome) => {
  return cy.contains('div.contato li', nome).parents('div.contato')
})

// Deletar TODOS os contatos da agenda (limpeza antes dos testes)
// A aplicacao tem uma API real que persiste dados entre execucoes
Cypress.Commands.add('limparAgenda', () => {
  cy.get('body', { timeout: 10000 }).then(($body) => {
    const totalContatos = $body.find('div.contato').length

    if (totalContatos > 0) {
      // Clica no botao deletar do primeiro card repetidamente
      for (let i = 0; i < totalContatos; i++) {
        cy.get('div.contato').first().find('button.delete').click()
        cy.wait(400) // pausa para a API processar a remocao
      }
      // Confirma que a agenda esta vazia
      cy.get('div.contato').should('not.exist')
    }
  })
})
