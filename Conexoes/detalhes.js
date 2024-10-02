let currentImageIndex = 0;
const images = []; // Array para armazenar as imagens do produto

document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromUrl();
    if (productId) {
        fetchProductDetails(productId);
    } else {
        alert('Produto não encontrado.');
    }
});

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); 
}

function fetchProductDetails(productId) {
    fetch(`http://localhost:8015/produto/${productId}/acharProduto`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar detalhes do produto');
            }
            return response.json();
        })
        .then(product => {
            displayProductDetails(product);
            fetchProductImages(productId);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar detalhes do produto.');
        });
}

function displayProductDetails(product) {
    const productDetailsDiv = document.getElementById('product-details');
    productDetailsDiv.innerHTML = `
        <h2>${product.nomeProduto}</h2>
        <p><strong>Preço:</strong> R$ ${product.precoProduto.toFixed(2)}</p>
        <p><strong>Descrição:</strong> ${product.descDetalhadaProduto}</p>
        <p><strong>Avaliação dos usuarios:</strong> ${product.avalProduto ? product.avalProduto.toFixed(1) : 'Nenhuma avaliação disponível'}</p>
        <button id="add-to-cart">Adicionar ao Carrinho</button>
    `;

    document.getElementById("add-to-cart").addEventListener("click", function() {
        addToCart(product);
    });
}

function fetchProductImages(productId) {
    fetch(`http://localhost:8015/imgProduto/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar imagens do produto');
            }
            return response.json();
        })
        .then(imagesData => {
            displayProductImages(imagesData);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar as imagens do produto.');
        });
}



function displayProductImages(imagesData) {
    const carouselImages = document.getElementById('carousel-images');
    carouselImages.innerHTML = '';

    imagesData.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `data:image/jpeg;base64,${image.imgBlob}`;
        imgElement.alt = image.nomeArquivos; 
        imgElement.classList.add('carousel-image');
        carouselImages.appendChild(imgElement);
        images.push(imgElement.src);
    });

    if (images.length > 0) {
        showImage(currentImageIndex); // Mostra a primeira imagem
    }
}

function showImage(index) {
    const carouselImages = document.querySelectorAll('.carousel-images img');
    carouselImages.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
}

let cart = [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.nomeProduto);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: product.nomeProduto, price: product.precoProduto, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsElement.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)} (x${item.quantity})`;
        cartItemsElement.appendChild(listItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = total.toFixed(2);
}