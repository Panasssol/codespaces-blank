// Usuário do GitHub que será consultado
const username = 'ogiansouza';
const apiUrl = `https://api.github.com/users/${username}`;

// Função assíncrona que faz a requisição Ajax via fetch
async function carregarPerfil() {
    try {
        const resposta = await fetch(apiUrl);

        // fetch só rejeita a promessa em erros de rede; status HTTP de erro
        // (404, 403, 500...) precisam ser tratados manualmente.
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        preencherPerfil(dados);

    } catch (erro) {
        console.error('Falha ao carregar perfil do GitHub:', erro);
        exibirErro(erro.message);
    }
}

// Preenche os elementos do DOM com os dados retornados pela API
function preencherPerfil(dados) {
    const avatar = document.getElementById('profile-avatar');
    avatar.src = dados.avatar_url;
    avatar.alt = `Avatar de ${dados.login}`;

    document.getElementById('profile-name').textContent = dados.name || dados.login;
    document.getElementById('profile-username').textContent = `@${dados.login}`;

    document.getElementById('profile-repos').textContent = dados.public_repos;
    document.getElementById('profile-followers').textContent = dados.followers;
    document.getElementById('profile-following').textContent = dados.following;

    document.getElementById('profile-link').href = dados.html_url;
}

// Exibe mensagem amigável caso a requisição falhe
function exibirErro(mensagem) {
    document.getElementById('profile-name').textContent = 'Erro ao carregar';
    document.getElementById('profile-username').textContent = mensagem;
}

// Dispara a requisição assim que a página termina de carregar
document.addEventListener('DOMContentLoaded', carregarPerfil);
