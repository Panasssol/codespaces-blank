# Projeto de Testes Cypress - Agenda de Contatos

Projeto de testes automatizados E2E utilizando **Cypress** para validar as funcionalidades da aplicação [Agenda de Contatos](https://ebac-agenda-contatos-tan.vercel.app/).

## 📋 Funcionalidades Testadas

- ✅ **Inclusão** de um novo contato
- ✅ **Alteração** (edição) de um contato existente
- ✅ **Remoção** (exclusão) de um contato

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [Cypress](https://www.cypress.io/) v13

## 📁 Estrutura do Projeto

```
cypress-agenda-contatos/
├── cypress/
│   ├── e2e/
│   │   └── agenda-contatos.cy.js   # Arquivo principal de testes
│   ├── fixtures/
│   │   └── contatos.json           # Dados de teste (massa de dados)
│   └── support/
│       ├── commands.js             # Comandos customizados
│       └── e2e.js                  # Configurações globais
├── cypress.config.js               # Configuração do Cypress
├── package.json
└── README.md
```

## 🚀 Como executar no GitHub Codespaces

### 1. Instalar as dependências

No terminal do Codespaces, execute:

```bash
npm install
```

### 2. Instalar dependências do sistema (necessário no Codespaces)

O Cypress precisa de algumas bibliotecas do Linux para rodar. Execute:

```bash
sudo apt-get update
sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

### 3. Executar os testes

**Modo headless (recomendado no Codespaces):**

```bash
npm test
```

ou

```bash
npx cypress run
```

**Executar um arquivo específico:**

```bash
npx cypress run --spec "cypress/e2e/agenda-contatos.cy.js"
```

### 4. Abrir a interface gráfica do Cypress (opcional)

Caso queira abrir a interface gráfica (possível no Codespaces com port forwarding):

```bash
npm run cy:open
```

> 💡 **Dica:** No Codespaces, a execução em modo headless (`cypress run`) é mais rápida e prática.

## 📝 Cenários de Teste

| Código | Descrição |
|--------|-----------|
| CT001  | Incluir um novo contato com sucesso |
| CT002  | Alterar (editar) um contato existente |
| CT003  | Remover (excluir) um contato da agenda |
| CT004  | Fluxo completo: incluir, alterar e remover |

## 🎯 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm test` | Executa todos os testes em modo headless |
| `npm run cy:open` | Abre a interface gráfica do Cypress |
| `npm run cy:run` | Executa os testes em modo headless |
| `npm run test:chrome` | Executa os testes no Chrome |

## 📌 Observações

- O `baseUrl` já está configurado no `cypress.config.js`, então nos testes usamos `cy.visit('/')`.
- Os dados de teste estão centralizados em `cypress/fixtures/contatos.json`.
- Foi criado o comando customizado `cy.cadastrarContato()` para reutilização.
- Caso algum seletor não funcione na sua versão da aplicação, ajuste os seletores no arquivo `agenda-contatos.cy.js` de acordo com o HTML real da página (use o DevTools do navegador para inspecionar).

## 🔧 Solução de Problemas

**Erro ao executar no Codespaces:** certifique-se de ter instalado as dependências do sistema mencionadas no passo 2.

**Seletores não encontrados:** abra a aplicação no navegador, use o DevTools (F12) para inspecionar os elementos e ajuste os seletores (`input[placeholder="..."]`, botões, etc.) conforme necessário.
