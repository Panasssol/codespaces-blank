/// <reference types="cypress" />

describe('Agenda de Contatos - Testes E2E', () => {

  beforeEach(() => {
    cy.visit('/')
    // Aguarda a pagina carregar os dados da API
    cy.get('header h2').should('be.visible')
    // Limpa a agenda antes de cada teste para garantir isolamento
    cy.limparAgenda()
  })

  it('Deve carregar a pagina da agenda de contatos corretamente', () => {
    cy.get('header h1').should('contain', 'Agenda de')
    cy.get('header h2').should('contain', 'contatos na agenda')
    cy.get('input[placeholder="Nome"]').should('be.visible')
    cy.get('input[placeholder="E-mail"]').should('be.visible')
    cy.get('input[placeholder="Telefone"]').should('be.visible')
    cy.get('button.adicionar').should('be.visible')
  })

  it('CT001 - Deve incluir (cadastrar) um novo contato com sucesso', () => {
    cy.fixture('contatos').then((contatos) => {
      const contato = contatos.contatoOriginal

      // Preenche o formulario
      cy.get('input[placeholder="Nome"]').type(contato.nome)
      cy.get('input[placeholder="E-mail"]').type(contato.email)
      cy.get('input[placeholder="Telefone"]').type(contato.telefone)

      // Clica no botao "Adicionar"
      cy.get('button.adicionar').click()

      // Valida que o contato foi adicionado na lista
      cy.contains('div.contato li', contato.nome).should('be.visible')
      cy.contains('div.contato li', contato.email).should('be.visible')
      cy.contains('div.contato li', contato.telefone).should('be.visible')
    })
  })

  it('CT002 - Deve alterar (editar) um contato existente', () => {
    cy.fixture('contatos').then((contatos) => {
      const original = contatos.contatoOriginal
      const atualizado = contatos.contatoAtualizado

      // 1. Cadastra um contato para depois editar
      cy.cadastrarContato(original.nome, original.email, original.telefone)
      cy.contains('div.contato li', original.nome).should('be.visible')

      // 2. Confirma que existe apenas 1 contato na lista antes da edicao
      cy.get('div.contato').should('have.length', 1)

      // 3. Clica no botao "Editar" do contato cadastrado
      cy.buscarContato(original.nome).within(() => {
        cy.get('button.edit').click()
      })

      // 4. Aguarda o form entrar em modo edicao
      //    Neste modo, o botao .adicionar some e aparecem .alterar (Salvar) e .cancelar
      cy.get('button.alterar').should('be.visible')

      // 5. Valida que o formulario ja veio pre-preenchido com os dados atuais
      cy.get('input[placeholder="Nome"]').should('have.value', original.nome)
      cy.get('input[placeholder="E-mail"]').should('have.value', original.email)
      cy.get('input[placeholder="Telefone"]').should('have.value', original.telefone)

      // 6. Substitui os valores pelos novos
      cy.get('input[placeholder="Nome"]').clear().type(atualizado.nome)
      cy.get('input[placeholder="E-mail"]').clear().type(atualizado.email)
      cy.get('input[placeholder="Telefone"]').clear().type(atualizado.telefone)

      // 7. Clica em "Salvar" (classe .alterar)
      cy.get('button.alterar').click()

      // 8. Apos salvar, o form volta ao modo "Adicionar"
      cy.get('button.adicionar').should('be.visible')

      // 9. Valida que os dados atualizados aparecem na lista
      cy.contains('div.contato li', atualizado.nome).should('be.visible')
      cy.contains('div.contato li', atualizado.email).should('be.visible')
      cy.contains('div.contato li', atualizado.telefone).should('be.visible')

      // 10. Valida que continua existindo apenas 1 contato (a edicao nao duplicou)
      cy.get('div.contato').should('have.length', 1)
    })
  })

  it('CT003 - Deve remover (excluir) um contato da agenda', () => {
    cy.fixture('contatos').then((contatos) => {
      const contato = contatos.contatoParaRemover

      // 1. Cadastra um contato para depois remover
      cy.cadastrarContato(contato.nome, contato.email, contato.telefone)
      cy.contains('div.contato li', contato.nome).should('be.visible')

      // 2. Clica no botao "Deletar" do contato
      cy.buscarContato(contato.nome).within(() => {
        cy.get('button.delete').click()
      })

      // 3. Valida que o contato nao existe mais na lista
      cy.contains('div.contato li', contato.nome).should('not.exist')
      cy.contains('div.contato li', contato.email).should('not.exist')
    })
  })

  it('CT004 - Fluxo completo: incluir, alterar e remover contato', () => {
    const contato = {
      nome: 'Pedro Fluxo Completo',
      email: 'pedro.fluxo@teste.com',
      telefone: '51966665555'
    }

    const contatoEditado = {
      nome: 'Pedro Fluxo Editado',
      email: 'pedro.fluxoeditado@teste.com',
      telefone: '51955554444'
    }

    // ========== 1. INCLUSAO ==========
    cy.cadastrarContato(contato.nome, contato.email, contato.telefone)
    cy.contains('div.contato li', contato.nome).should('be.visible')

    // ========== 2. ALTERACAO ==========
    cy.buscarContato(contato.nome).within(() => {
      cy.get('button.edit').click()
    })

    cy.get('button.alterar').should('be.visible')

    cy.get('input[placeholder="Nome"]').clear().type(contatoEditado.nome)
    cy.get('input[placeholder="E-mail"]').clear().type(contatoEditado.email)
    cy.get('input[placeholder="Telefone"]').clear().type(contatoEditado.telefone)

    cy.get('button.alterar').click()

    cy.get('button.adicionar').should('be.visible')
    cy.contains('div.contato li', contatoEditado.nome).should('be.visible')

    // ========== 3. REMOCAO ==========
    cy.buscarContato(contatoEditado.nome).within(() => {
      cy.get('button.delete').click()
    })

    cy.contains('div.contato li', contatoEditado.nome).should('not.exist')
  })

  it('CT005 - Deve cancelar a edicao de um contato', () => {
    cy.fixture('contatos').then((contatos) => {
      const original = contatos.contatoOriginal

      // Cadastra um contato
      cy.cadastrarContato(original.nome, original.email, original.telefone)
      cy.contains('div.contato li', original.nome).should('be.visible')

      // Entra em modo edicao
      cy.buscarContato(original.nome).within(() => {
        cy.get('button.edit').click()
      })

      cy.get('button.cancelar').should('be.visible')

      // Altera o nome mas depois cancela
      cy.get('input[placeholder="Nome"]').clear().type('Nome que nao sera salvo')
      cy.get('button.cancelar').click()

      // Apos cancelar, volta ao modo "Adicionar" e o contato original permanece intacto
      cy.get('button.adicionar').should('be.visible')
      cy.contains('div.contato li', original.nome).should('be.visible')
      cy.contains('div.contato li', 'Nome que nao sera salvo').should('not.exist')
    })
  })

})
