
/* =========================================
   CONECTA TECH — INTERATIVIDADE
========================================= */

// ELEMENTOS DO MENU
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// ELEMENTOS DA BUSCA
const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");

// FILTROS E PROFISSIONAIS
const filterButtons = document.querySelectorAll(".filter-button");
const professionalCards = document.querySelectorAll(".professional-card");

// MODAL
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalClose = document.getElementById("modalClose");
const modalAction = document.getElementById("modalAction");

// CADASTRO
const clientRegister = document.getElementById("clientRegister");
const techRegister = document.getElementById("techRegister");

// FILTRO ATUAL
let currentFilter = "todos";

/* =========================================
   MENU MOBILE
========================================= */

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");

        const menuIsOpen = navLinks.classList.contains("open");

        menuToggle.textContent = menuIsOpen ? "✕" : "☰";
        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen ? "Fechar menu" : "Abrir menu"
        );
    });

    // Fecha o menu ao clicar em um link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}

/* =========================================
   MODAL
========================================= */

function openModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modalOverlay.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeModal() {
    modalOverlay.classList.remove("show");
    document.body.classList.remove("modal-open");
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (modalAction) {
    modalAction.addEventListener("click", closeModal);
}

// Fecha ao clicar fora da janela
if (modalOverlay) {
    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
}

// Fecha com tecla ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

/* =========================================
   FILTROS DOS PROFISSIONAIS
========================================= */

function filterProfessionals(filter) {
    currentFilter = filter;

    professionalCards.forEach(card => {
        const category = card.dataset.category;

        const matchesFilter =
            filter === "todos" || category === filter;

        card.classList.toggle("hidden", !matchesFilter);
    });

    // Atualiza botão ativo
    filterButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterProfessionals(button.dataset.filter);

        // Limpa pesquisa anterior ao trocar de categoria
        if (searchInput) {
            searchInput.value = "";
        }
    });
});

/* =========================================
   PESQUISA
========================================= */

function searchProfessionals() {
    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    const city = locationInput.value
        .trim();

    let visibleCount = 0;

    professionalCards.forEach(card => {
        const category = card.dataset.category;

        const cardText = card.textContent.toLowerCase();

        const matchesFilter =
            currentFilter === "todos" ||
            category === currentFilter;

        const matchesSearch =
            searchTerm === "" ||
            cardText.includes(searchTerm) ||
            category.includes(searchTerm) ||
            getCategoryName(category).includes(searchTerm);

        const matchesCity = city === "" || true;

        const shouldShow =
            matchesFilter &&
            matchesSearch &&
            matchesCity;

        card.classList.toggle("hidden", !shouldShow);

        if (shouldShow) {
            visibleCount++;
        }
    });

    // Mensagem de resultado
    if (visibleCount === 0) {
        openModal(
            "Nenhum profissional encontrado",
            "Não encontramos profissionais para essa pesquisa. Tente outro termo ou escolha uma especialidade nos filtros."
        );
    } else {
        document.getElementById("profissionais").scrollIntoView({
            behavior: "smooth"
        });
    }
}

// Traduz categorias
function getCategoryName(category) {
    const categories = {
        manutencao: "manutenção computador notebook reparo",
        redes: "redes internet wifi roteador",
        montagem: "montagem pc hardware upgrade",
        software: "software programa sistema instalação"
    };

    return categories[category] || "";
}

if (searchButton) {
    searchButton.addEventListener("click", searchProfessionals);
}

if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchProfessionals();
        }
    });
}

/* =========================================
   PERFIL DEMONSTRATIVO
========================================= */

document.querySelectorAll(".professional-button").forEach(button => {
    button.addEventListener("click", () => {
        const technician = button.dataset.tech;

        openModal(
            technician,
            "Este é um perfil demonstrativo. No projeto completo, aqui estarão os dados reais do profissional, suas informações, serviços, avaliações e opção para solicitar atendimento."
        );
    });
});

/* =========================================
   CADASTRO CLIENTE E TÉCNICO
========================================= */

if (clientRegister) {
    clientRegister.addEventListener("click", () => {
        openModal(
            "Cadastro de cliente",
            "A área de cadastro de clientes será desenvolvida na próxima etapa, com formulário, validação e perfil do usuário."
        );
    });
}

if (techRegister) {
    techRegister.addEventListener("click", () => {
        openModal(
            "Cadastro de técnico",
            "A área de cadastro de profissionais será desenvolvida na próxima etapa, com especialidades, informações de contato e perfil profissional."
        );
    });
}

/* =========================================
   LINKS DE LOGIN
========================================= */

document.querySelectorAll('a[href="#login"]').forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        openModal(
            "Área de login",
            "O sistema de login será criado na próxima etapa. Nele, clientes e profissionais poderão acessar suas contas."
        );
    });
});

/* =========================================
   INICIALIZAÇÃO
========================================= */

filterProfessionals("todos");

console.log("Conecta Tech carregado com sucesso!");

