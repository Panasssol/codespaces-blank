// ***********************************************************
// Este arquivo é processado e carregado automaticamente antes
// dos arquivos de teste.
//
// Este é um ótimo lugar para colocar configurações globais
// e comportamentos que modificam o Cypress.
// ***********************************************************

// Importa os comandos customizados
import './commands'

// Evita que o Cypress falhe o teste caso a aplicação dispare
// um erro não tratado no console
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
