# ✊🏿 Base de Conhecimento: Gigantes da História Negra do Brasil 

O projeto atual faz parte da imersão Dev da Alura com o Google Gemini, por isso ainda é um projeto inicial e que poderá possuir mais funçõe futuramente.

Este projeto é uma homenagem digital e uma fonte de conhecimento dedicada a celebrar as vidas e os legados de personalidades negras que foram e são fundamentais na construção da história e da cultura do Brasil. Mais do que uma simples lista, é um convite à descoberta e ao reconhecimento das imensas contribuições em áreas como a arte, a ciência, a política, o esporte e o ativismo.

Em um país onde a história muitas vezes foi contada por uma única perspectiva, este espaço busca dar luz, voz e rosto àqueles que moldaram nossa nação. É um tributo à resiliência, ao talento e à força do povo negro. ✨

Além de seu valor cultural, o projeto foi estruturado para servir como uma base de dados aberta. Escolas, pesquisadores e instituições que buscam materiais sobre a história negra no Brasil podem utilizar as informações aqui compiladas, reforçando a importância do tema e auxiliando no combate ao apagamento histórico.

---

## 🚀 Funcionalidades do Projeto

A plataforma foi desenvolvida para ser uma experiência de aprendizado rica e acessível.

-   **📚 Galeria de Personalidades:** Exibição dos perfis em formato de cards, facilitando a visualização e a leitura.
-   **🖼️ Conteúdo Dinâmico:** Cada card contém:
    -   **Imagem:** Um retrato da personalidade.
    -   **Nome:** Identificação clara e em destaque.
    -   **Período de Vida:** Os anos de nascimento e falecimento (ou "presente").
    -   **Descrição:** Um resumo conciso sobre sua vida, suas obras e seu impacto.
    -   **Saiba Mais:** Um link direto para a página da Wikipédia (ou outra fonte), permitindo um aprofundamento no assunto.
-   **🔍 Busca Inteligente:** Um campo de busca que filtra as personalidades em tempo real conforme o usuário digita, tornando a navegação rápida e intuitiva.
-   **📱 Design Responsivo:** A interface se adapta perfeitamente a diferentes tamanhos de tela, como celulares, tablets e desktops, garantindo uma ótima experiência para todos os usuários.

---

## 🛠️ Recursos e Tecnologias Utilizadas

Para dar vida a este projeto, foram utilizadas as seguintes tecnologias web:

-   **HTML5:** A base do projeto foi construída com uma estrutura semântica, utilizando tags como `<header>`, `<main>`, `<input>` e `<article>`. Isso não apenas organiza o conteúdo de forma lógica, mas também melhora a acessibilidade e a indexação por mecanismos de busca.

-   **CSS3:** A estilização foi pensada para ser moderna e responsiva.
    -   **Grid Layout** foi utilizado para criar a galeria de cards, permitindo um alinhamento flexível e dinâmico.
    -   **Media Queries** garantem que a interface se adapte a diferentes dispositivos (celulares, tablets e desktops), reorganizando os elementos para a melhor experiência de visualização.
    -   Efeitos como `box-shadow` e transições (`transition`) foram aplicados para dar um acabamento visual polido e interativo aos cards.

-   **JavaScript (ES6+):** O cérebro por trás da interatividade do projeto.
    -   **Fetch API:** Utilizada para carregar de forma assíncrona os dados do arquivo `data.json`, sem a necessidade de recarregar a página.
    -   **Manipulação do DOM:** As informações das personalidades são dinamicamente inseridas na página. O script cria os cards, preenche com os dados (imagem, nome, descrição) e os adiciona à galeria.
    -   **Event Listeners:** A funcionalidade de busca em tempo real é implementada com um `event listener` no campo de input, que filtra os cards exibidos a cada nova letra digitada pelo usuário.

-   **JSON (`data.json`):** Funciona como um banco de dados local, armazenando as informações das personalidades de forma estruturada. Essa abordagem desacopla os dados da lógica da aplicação, facilitando a manutenção e a adição de novas figuras históricas.

---

## 🤔 Como Contribuir (Função ainda não disponível)

Este é um projeto vivo e que pode crescer com a ajuda da comunidade! Se você conhece alguma personalidade que deveria estar aqui, sinta-se à vontade para contribuir.

1.  **Fork** este repositório.
2.  Adicione a nova personalidade ao arquivo `data.json`, mantendo o mesmo padrão dos outros registros.
3.  Crie um **Pull Request** com suas alterações.

Sua contribuição é muito valiosa para enriquecer ainda mais esta base de conhecimento!

---

## 🌟 Funcionalidades Futuras

Para tornar este projeto ainda mais rico e interativo, aqui estão algumas ideias para futuras implementações:

-   **Categorias e Tags:** Filtrar personalidades por área de atuação (Música, Literatura, Política, Esporte, etc.) para facilitar a pesquisa temática.
-   **Linha do Tempo Interativa:** Uma visualização cronológica que permita navegar pela história e ver como as vidas dessas personalidades se cruzaram no tempo.
-   **Mapa do Brasil Interativo:** Exibir no mapa os locais de nascimento ou de grande influência de cada personalidade, criando uma geografia da história negra no país.
-   **"Neste Dia na História":** Uma seção que destaca diariamente uma personalidade que nasceu, faleceu ou realizou um grande feito na data atual.
-   **Conteúdo Multimídia:** Inclusão de vídeos (entrevistas, documentários) e áudios (músicas, discursos) nos cards para enriquecer a experiência.
-   **Sistema de Contribuição Simplificado:** Um formulário no próprio site para que usuários possam sugerir novas personalidades, tornando a colaboração mais acessível.
-   **API Pública:** Disponibilizar os dados em formato de API para que outros desenvolvedores possam criar suas próprias aplicações e visualizações a partir desta base de conhecimento.

---

> Que este projeto sirva como uma fonte de inspiração e um lembrete constante de que a história do Brasil é, e sempre será, uma história negra. 🖤