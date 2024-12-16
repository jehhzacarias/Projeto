console.log("Script carregado");

const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");

let cart = [];

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex"; // Exibe o modal
});

// Fechar o modal ao clicar fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"; // Fecha o modal
    }
});

// Fechar o modal ao clicar no botão de fechar
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"; // Fecha o modal
});

// Adicionar evento ao menu para tratar cliques nos botões
menu.addEventListener("click", function (event) {
    const button = event.target.closest(".add-to-cart-btn");
    if (button) {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));

        addToCart(name, price); // Adiciona o item ao carrinho
    }
});

// Event listener para os botões add-to-cart-btn
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        console.log("Botão clicado!", event.target);
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        addToCart(name, price);
    });
});

// Função para adicionar ao carrinho
function addToCart(name, price) {
    console.log("Adicionando ao carrinho: ", name, price);

    // Procura se o item já está no carrinho
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        // Se já existe, apenas aumenta a quantidade
        existingItem.quantity += 1;
    } else {
        // Se não existe, cria um novo item no carrinho
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal(); // Atualiza a visualização do modal
}

// Função para atualizar o conteúdo do modal
function updateCartModal() {
    console.log("Atualizando o modal...", cart);

    cartItemsContainer.innerHTML = ""; // Limpa os itens do carrinho
    let total = 0;
    let itemCount = 0;

    // Percorre todos os itens do carrinho
    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
            <div>
                <p>${item.name}</p> 
                <p>Quantidade: ${item.quantity}</p>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
            <div>
                <button class="remove-btn" data-name="${item.name}">Remover</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.quantity;
        itemCount += item.quantity; // Soma a quantidade total de itens
    });

    // Atualiza o total e contador no modal
    cartTotal.textContent = total.toFixed(2);
    cartCounter.textContent = itemCount;
}

// Adicionar evento para remover itens do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    const button = event.target.closest(".remove-btn");
    if (button) {
        const name = button.getAttribute("data-name");
        removeFromCart(name); // Remove o item
    }
});

// Função para remover itens do carrinho
function removeFromCart(name) {
    cart = cart.filter((item) => item.name !== name); // Remove o item do carrinho
    updateCartModal(); // Atualiza o carrinho após remoção
}
