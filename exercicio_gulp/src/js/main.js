// ===================================
// Script principal do projeto
// ===================================

// Função para inicializar a galeria
function initGallery() {
    const images = document.querySelectorAll('.gallery img');

    images.forEach(function (img) {
        img.addEventListener('click', function () {
            console.log('Imagem clicada:', img.src);
            openLightbox(img.src);
        });
    });
}

// Função para abrir lightbox
function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="' + src + '" alt="Imagem ampliada">';

    lightbox.addEventListener('click', function () {
        document.body.removeChild(lightbox);
    });

    document.body.appendChild(lightbox);
}

// Função utilitária para saudação
function saudar(nome) {
    const mensagem = 'Olá, ' + nome + '! Bem-vindo(a) ao projeto.';
    console.log(mensagem);
    return mensagem;
}

// Inicializa tudo ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    console.log('Página carregada com sucesso!');
    initGallery();
    saudar('visitante');
});
