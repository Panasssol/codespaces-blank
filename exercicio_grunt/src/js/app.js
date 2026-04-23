// Arquivo JavaScript de exemplo para minificação
(function() {
    'use strict';

    var App = {
        nome: 'Projeto Grunt',
        versao: '1.0.0',

        iniciar: function() {
            console.log('Aplicação iniciada: ' + this.nome);
            this.configurarEventos();
        },

        configurarEventos: function() {
            var botoes = document.querySelectorAll('.botao');

            for (var i = 0; i < botoes.length; i++) {
                botoes[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Botão clicado!');
                });
            }
        },

        calcularSoma: function(a, b) {
            return a + b;
        },

        formatarTexto: function(texto) {
            return texto.trim().toUpperCase();
        }
    };

    // Inicializar quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        App.iniciar();
    });

    window.App = App;
})();
