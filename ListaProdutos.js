let products = [];
const itemsPorPagina = 10;
let paginaAtual = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch('http://localhost:8015/produto/list') 
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verifique a estrutura dos dados aqui
            products = data; 
            displayProducts();
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
            alert('Erro ao buscar produtos.');
        });
}

function displayProducts() {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';

    const start = (paginaAtual - 1) * itemsPorPagina;
    const end = start + itemsPorPagina;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const imgSrc = product.imagens && product.imagens.length > 0 ? product.imagens[0].caminhoImg : 'default_image_url.jpg';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.idProduto || 'N/A'}</td>
            <td>
                <img src="${imgSrc}" 
                     alt="${product.nomeProduto || 'Imagem indisponível'}" 
                     class="image-preview" 
                     style="width: 50px; height: auto;" />
            </td>
            <td>${product.nomeProduto || 'N/A'}</td>
            <td>${product.avalProduto !== null ? product.avalProduto : 'N/A'}</td>
            <td>${product.descDetalhadaProduto || 'N/A'}</td>
            <td>R$ ${product.precoProduto ? product.precoProduto.toFixed(2) : 'N/A'}</td>
            <td>${product.qtdEstoqueProduto || 0}</td>
            <td>
                <button onclick="viewProduct('${product.idProduto}')">Visualizar</button>
                <button onclick="deleteProduct('${product.idProduto}')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('page-info').textContent = `Página ${paginaAtual} de ${Math.ceil(products.length / itemsPorPagina)}`;
}

function nextPage() {
    if (paginaAtual * itemsPorPagina < products.length) {
        paginaAtual++;
        displayProducts();
    }
}

function prevPage() {
    if (paginaAtual > 1) {
        paginaAtual--;
        displayProducts();
    }
}
