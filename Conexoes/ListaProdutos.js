const products = [
    { codigo: '001', nome: 'RTX 3060 12gb', avaliacao: '4.5', descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus natus ab culpa minus ratione voluptatem.', preco: 'R$ 3.500,00', qtd: 10, imagens: ['img/rtx1.jpeg', 'img/rtx2.jpeg', 'img/rtx3.jpeg'] },
    { codigo: '002', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20, imagens: ['img/bleble.jpg', 'img/mama.jpg'] },
];

const itemsPerPage = 10;
let currentPage = 1;
let currentImageIndex = 0;

function displayProducts() {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.codigo}</td>
            <td>${product.nome}</td>
            <td>${product.avaliacao}</td>
            <td>${product.descricao}</td>
            <td>${product.preco}</td>
            <td>${product.qtd}</td>
            <td>
                <button onclick="visualizarProduto('${product.codigo}')">Visualizar</button>
                <input type="checkbox" class="checkbox-ativa">
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('page-info').textContent = `Página ${currentPage} de ${Math.ceil(products.length / itemsPerPage)}`;
}

function nextPage() {
    if (currentPage * itemsPerPage < products.length) {
        currentPage++;
        displayProducts();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
}

function visualizarProduto(codigo) {
    const product = products.find(p => p.codigo === codigo);
    console.log(product);
    if (product) {
        console.log(product.nome);
        document.getElementById('modal-name').textContent = product.nome;
        document.getElementById('modal-avaliacao').textContent = product.avaliacao;
        document.getElementById('modal-descricao').textContent = product.descricao;
        document.getElementById('modal-preco').textContent = product.preco;
        document.getElementById('modal-qtd').textContent = product.qtd;

        const carouselImages = document.getElementById('carousel-images');
        carouselImages.innerHTML = '';
        product.imagens.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.display = index === 0 ? 'block' : 'none';
            carouselImages.appendChild(img);
        });

        currentImageIndex = 0;
        document.getElementById('product-modal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function nextImage() {
    const carouselImages = document.getElementById('carousel-images');
    const images = carouselImages.getElementsByTagName('img');
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = 'block';
}

function prevImage() {
    const carouselImages = document.getElementById('carousel-images');
    const images = carouselImages.getElementsByTagName('img');
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    images[currentImageIndex].style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});