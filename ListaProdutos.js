const products = [
    { codigo: '001', nome: 'RTX 3060 12gb', avaliacao: '4.5', descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus natus ab culpa minus ratione voluptatem.', preco: 'R$ 3.500,00', qtd: 10 },
    { codigo: '002', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '003', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '004', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '005', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '006', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '007', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '008', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '009', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '010', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 },
    { codigo: '011', nome: 'Produto B', avaliacao: '4.0', descricao: 'Descrição do Produto B', preco: 'R$ 200,00', qtd: 20 }
    
];

const itemsPorPagina = 10;
let paginaAtual = 1;

function displayProducts() {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';

    const start = (paginaAtual - 1) * itemsPorPagina;
    const end = start + itemsPorPagina;
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
                <button>Alterar</button>
                <button>Visualizar</button>
                <input type="checkbox" class="Checkbox-ativa"> Ativa
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

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});