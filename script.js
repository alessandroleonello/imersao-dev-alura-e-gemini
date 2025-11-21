let cardContainer = document.querySelector('.card-container');
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#botao-busca'); // Adicione um botão com id="search-button" no seu HTML
let filtrosContainer = document.querySelector('#filtros-container');
let dados = [];
let dadosFiltradosAtualmente = [];
let categoriasSelecionadas = new Set();
 
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

        dadosFiltradosAtualmente = [...dados]; // Inicializa com todos os dados
        renderizarFiltrosDeCategoria(dados);
        renderizarCards(dadosFiltradosAtualmente); // Mostra todos os cards inicialmente

        // Função que executa a busca e renderiza os resultados
        const executarBusca = () => {
            const termoBusca = searchInput.value;
            // A busca por texto agora vai operar sobre os dados já filtrados pela categoria
            const dadosFiltradosPorTexto = filtrarDadosPorTexto(termoBusca, dadosFiltradosAtualmente);
            renderizarCards(dadosFiltradosPorTexto);
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

function filtrarDadosPorTexto(termo, dadosParaFiltrar) {
    const termoNormalizado = termo.trim().toLowerCase();
    if (!termoNormalizado) {
        return dadosParaFiltrar; // Se a busca estiver vazia, retorna os dados atuais
    }
    return dadosParaFiltrar.filter(dado =>
        dado.nome.toLowerCase().includes(termoNormalizado) ||
        dado.descricao.toLowerCase().includes(termoNormalizado) ||
        dado.ano.toLowerCase().includes(termoNormalizado) ||
        (dado.categoria && dado.categoria.some(cat => cat.toLowerCase().includes(termoNormalizado)))
    );
}

function aplicarFiltrosDeCategoria() {
    const btnTodos = document.querySelector('#filtros-container button'); // O primeiro botão é "Mostrar Todos"

    if (categoriasSelecionadas.size === 0) {
        dadosFiltradosAtualmente = [...dados];
        document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
        if (btnTodos) btnTodos.classList.add('active');
    } else {
        dadosFiltradosAtualmente = dados.filter(d =>
            d.categoria.some(cat => categoriasSelecionadas.has(cat))
        );
        if (btnTodos) btnTodos.classList.remove('active');
    }
    renderizarCards(dadosFiltradosAtualmente);
}

function renderizarFiltrosDeCategoria(dados) {
    filtrosContainer.innerHTML = ''; // Limpa filtros existentes

    // Botão para mostrar/esconder as categorias
    const toggleBtn = document.createElement('a');
    toggleBtn.textContent = 'Filtrar por Categoria';
    toggleBtn.classList.add('toggle-filtros-btn');
    filtrosContainer.appendChild(toggleBtn);

    // Container para os botões de categoria, que será escondido/mostrado
    const categoryButtonsContainer = document.createElement('div');
    categoryButtonsContainer.classList.add('category-buttons-container');
    categoryButtonsContainer.style.display = 'none'; // Começa escondido
    filtrosContainer.appendChild(categoryButtonsContainer);

    toggleBtn.addEventListener('click', () => {
        const isHidden = categoryButtonsContainer.style.display === 'none';
        categoryButtonsContainer.style.display = isHidden ? 'flex' : 'none';
        toggleBtn.textContent = isHidden ? 'Esconder Categorias' : 'Filtrar por Categoria';
    });

    const todasCategorias = new Set();
    dados.forEach(item => {
        item.categoria.forEach(cat => todasCategorias.add(cat));
    });

    // Botão "Mostrar Todos"
    const btnTodos = document.createElement('button');
    btnTodos.textContent = 'Mostrar Todos';
    btnTodos.classList.add('filtro-btn', 'active'); // Começa como ativo
    btnTodos.addEventListener('click', () => {
        categoriasSelecionadas.clear();
        document.querySelectorAll('.filtro-btn.active').forEach(btn => btn.classList.remove('active'));
        aplicarFiltrosDeCategoria();
    });
    categoryButtonsContainer.appendChild(btnTodos);

    // Botões para cada categoria
    Array.from(todasCategorias).sort().forEach(categoria => {
        const btn = document.createElement('button');
        btn.textContent = categoria;
        btn.classList.add('filtro-btn');
        btn.addEventListener('click', () => {
            if (categoriasSelecionadas.has(categoria)) {
                categoriasSelecionadas.delete(categoria);
            } else {
                categoriasSelecionadas.add(categoria);
            }
            btn.classList.toggle('active');
            aplicarFiltrosDeCategoria();
        });
        categoryButtonsContainer.appendChild(btn);
    });
}

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ''; // Limpa o container antes de renderizar os novos cards
    for (let dado of dadosParaRenderizar) {
        // Cria as tags de categoria
        const categoriasHtml = dado.categoria.map(cat => `<span class="categoria-tag">${cat}</span>`).join('');

        let article = document.createElement('article');
        article.classList.add('card');
        article.innerHTML = `
        <img src="${dado.imagem}" alt="Foto de ${dado.nome}" class="card-image">
        <div class="card-content">
            <h2>${dado.nome}</h2>
            <p>${dado.ano}</p>
            <p>${dado.descricao}</p>
            <div class="categorias-container">${categoriasHtml}</div>
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