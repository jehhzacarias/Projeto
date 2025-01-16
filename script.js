console.log("Script carregado");

const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const checkouBtn = document.getElementById("checkout-btn");
const addressWarn = document.getElementById("address-warn");
const addressInput = document.getElementById("address"); 



let cart = [];

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
    updateCartModal();
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
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        
        cartItemElement.innerHTML = `
            <div class= "flex items-center justify-between">
                <div>
                    <p class = "font-medium">${item.name}</p> 
                    <p>Quantidade: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>
            
            </div>

        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.quantity;
        itemCount += item.quantity; // Soma a quantidade total de itens
    });

    // Atualiza o total e contador no modal
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency:"BRL"
    });

    cartCounter.textContent = itemCount;
}

// Adicionar evento para remover itens do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    if(event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeFromCart(name); // Remove o item
    }
});

// Função para remover itens do carrinho
function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1; // Decrementa a quantidade
        } else {
            cart.splice(index, 1); // Remove o item do array
        }

        updateCartModal(); // Atualiza o modal
    }
}
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value; 

    if(inputValue!== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }


})
//Finalizar pedido
checkouBtn.addEventListener("click",function(){
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
    
        Toastify({
            text: "O restaurante está fechado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
        }).showToast();

    return; }


    if(cart.length == 0) return;

    if(addressInput.value.trim() === ""){
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500")
        return;
    }

    //enviar o pedido para api whats
    const cartItems = cart.map((item) =>{
        return(
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "coloca o telefone"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();
    
})

//verifica a hora e manipular o card horario
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
    //true = restaurante esta aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen(); 

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}
else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}