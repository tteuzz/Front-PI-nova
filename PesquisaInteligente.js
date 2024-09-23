function searchProducts() {
    const searchTerm = document.querySelector('.pesquisa').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.nome.toLowerCase().includes(searchTerm) || 
        product.codigo.toLowerCase().includes(searchTerm)
    );
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';

    const start = (paginaAtual - 1) * itemsPorPagina;
    const end = start + itemsPorPagina;
    const paginatedProducts = filteredProducts.slice(start, end);

    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id || 'N/A'}</td> <!-- Exibir ID do produto -->
            <td>${product.codigo || 'N/A'}</td>
            <td><img src="${product.imagemUrl || 'default_image_url.jpg'}" alt="${product.nome || 'Imagem indisponível'}" class="image-preview" style="width: 50px; height: auto;" /></td>
            <td>${product.nome || 'N/A'}</td>
            <td>${product.avaliacao || 'N/A'}</td>
            <td>${product.descricao || 'N/A'}</td>
            <td>${product.preco || 'N/A'}</td>
            <td>${product.qtd || 0}</td>
            <td>
                <button onclick="viewProduct('${product.codigo}')">Visualizar</button>
                <button onclick="deleteProduct('${product.codigo}')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('page-info').textContent = `Página ${paginaAtual} de ${Math.ceil(filteredProducts.length / itemsPorPagina)}`;
}