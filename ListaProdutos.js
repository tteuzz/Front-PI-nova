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
        const isActive = product.prodDhInativo === null;
        const status = isActive ? 'Ativo' : 'Inativo';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.idProduto || 'N/A'}</td>
            <td>${product.nomeProduto || 'N/A'}</td>
            <td>${product.avalProduto !== null ? product.avalProduto : 'N/A'}</td>
            <td>${product.descDetalhadaProduto || 'N/A'}</td>
            <td>R$ ${product.precoProduto ? product.precoProduto.toFixed(2) : 'N/A'}</td>
            <td>${product.qtdEstoqueProduto || 0}</td>
            <td>${status}</td>
            <td>
                <button onclick="viewProduct('${product.idProduto}')">Visualizar</button>
                <button onclick="openModal('${product.idProduto}', ${product.qtdEstoqueProduto})">Editar</button>
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

function openModal(id, quantidade) {
    document.getElementById('idProduto').value = id;
    document.getElementById('qtdEstoqueProduto').value = quantidade;
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveQuantity() {
    const idProduto = document.getElementById('idProduto').value;
    const novaQuantidade = parseInt(document.getElementById('qtdEstoqueProduto').value);

    if (novaQuantidade < 0) {
        alert('Por favor, insira uma quantidade válida (maior ou igual a zero).');
        return;
    }

    if (novaQuantidade === 0) {
        alterarStatus(idProduto)
            .then(() => atualizarQuantidade(idProduto, novaQuantidade))
            .catch(error => console.error('Erro ao alterar status:', error));
    } else {
        atualizarQuantidade(idProduto, novaQuantidade);
    }
}

function atualizarQuantidade(idProduto, novaQuantidade) {
    fetch(`http://localhost:8015/produto/${idProduto}/${novaQuantidade}/alteraQuantidade`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Quantidade atualizada com sucesso!');
            closeModal();
            const produto = products.find(p => p.idProduto === idProduto);
            if (produto) {
                produto.qtdEstoqueProduto = novaQuantidade;
                produto.prodDhInativo = novaQuantidade === 0 ? new Date() : null;
            }
            displayProducts();
        } else {
            alert('Erro ao atualizar quantidade.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao atualizar quantidade.');
    });
}

function alterarStatus(idProduto) {
    return fetch(`http://localhost:8015/produto/${idProduto}/alterarStatus`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            alert('Erro ao alterar status.');
            throw new Error('Erro ao alterar status');
        }
    });
}
