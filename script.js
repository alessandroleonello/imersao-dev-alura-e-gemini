let cardContainer = document.querySelector('.card-container');
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#botao-busca'); // Adicione um botão com id="search-button" no seu HTML
let dados = [];

async function iniciarBusca() {
    try {
        let resposta = await fetch('data.json');
        dados = await resposta.json();

        // Ordena os dados pelo ano de nascimento em ordem crescente
        dados.sort((a, b) => {
            const anoA = parseInt(a.ano.substring(0, 4), 10);
            const anoB = parseInt(b.ano.substring(0, 4), 10);
            return anoA - anoB;
        });

        renderizarCards(dados); // Mostra todos os cards inicialmente, agora ordenados
        
        // Função que executa a busca e renderiza os resultados
        const executarBusca = () => {
            const termoBusca = searchInput.value;
            const dadosFiltrados = filtrarDados(termoBusca);
            renderizarCards(dadosFiltrados);
        };

        // Adiciona a pesquisa em tempo real (ao digitar)
        searchInput.addEventListener('input', executarBusca);

        // Adiciona o evento de clique no botão de busca
        searchButton.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o recarregamento da página se o botão estiver em um form
            executarBusca();
        });

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

function filtrarDados(termo) {
    const termoNormalizado = termo.trim().toLowerCase();
    return dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoNormalizado) ||
        dado.descricao.toLowerCase().includes(termoNormalizado) ||
        dado.ano.toLowerCase().includes(termoNormalizado)
    );
}

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ''; // Limpa o container antes de renderizar os novos cards
    for (let dado of dadosParaRenderizar) {
        let article = document.createElement('article');
        article.classList.add('card');
        article.innerHTML = `
        <img src="${dado.imagem}" alt="Foto de ${dado.nome}" class="card-image">
        <div class="card-content">
            <h2>${dado.nome}</h2>
            <p>${dado.ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        </div>
        `;
        cardContainer.appendChild(article);
    }
}

iniciarBusca();

// --- Lógica para botões de rolagem (Topo/Fim) ---

const scrollToTopBtn = document.querySelector("#scrollToTopBtn");
const scrollToBottomBtn = document.querySelector("#scrollToBottomBtn");

// Mostra ou esconde os botões dependendo da posição da rolagem
window.onscroll = function() {
    if (scrollToTopBtn && scrollToBottomBtn) {
        // Posição atual da rolagem
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // Altura total do documento, subtraindo a altura da janela visível
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Mostra o botão "Topo" se o usuário rolou mais de 100px para baixo
        scrollToTopBtn.style.display = scrollTop > 100 ? "flex" : "none";

        // Mostra o botão "Fim" se o usuário não estiver perto do final
        // A margem de 100px evita que o botão fique visível quando já se está no fim
        scrollToBottomBtn.style.display = (scrollTop < scrollHeight - 100) ? "flex" : "none";
    }
};

// Evento de clique para rolar para o topo
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Evento de clique para rolar para o fim
if (scrollToBottomBtn) {
    scrollToBottomBtn.addEventListener("click", () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
}