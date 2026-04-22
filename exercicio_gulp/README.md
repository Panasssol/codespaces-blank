# Projeto Gulp

Projeto configurado com **Gulp** para automatizar três tarefas:

1. **Compilação do SASS** → converte arquivos `.scss` em CSS minificado
2. **Compressão de imagens** → otimiza JPG, PNG, GIF e SVG
3. **Compressão de JavaScript** → minifica arquivos `.js`

## 📁 Estrutura do projeto

```
projeto-gulp/
├── gulpfile.js          # Arquivo de configuração do Gulp
├── package.json         # Dependências do projeto
├── src/                 # Arquivos fonte
│   ├── sass/            # Arquivos .scss
│   │   └── style.scss
│   ├── js/              # Arquivos .js
│   │   └── main.js
│   └── images/          # Imagens originais
└── dist/                # Arquivos processados (gerado automaticamente)
    ├── css/
    ├── js/
    └── images/
```

## 🚀 Instalação

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

Isso irá instalar todas as dependências listadas no `package.json`.

## ▶️ Como executar

| Comando                  | O que faz                                       |
| ------------------------ | ----------------------------------------------- |
| `npx gulp`               | Executa as três tarefas de uma vez              |
| `npx gulp styles`        | Compila apenas o SASS                           |
| `npx gulp images`        | Comprime apenas as imagens                      |
| `npx gulp scripts`       | Minifica apenas os arquivos JavaScript          |
| `npx gulp watch`         | Observa mudanças nos arquivos e recompila       |

## 📦 Dependências usadas

- `gulp` — executor de tarefas
- `gulp-sass` + `sass` — compilação do SASS
- `gulp-imagemin` — compressão de imagens
- `gulp-uglify` — minificação de JavaScript
- `gulp-rename` — renomeação dos arquivos gerados (adiciona o sufixo `.min`)
