document.addEventListener('DOMContentLoaded', function() {
    let products = [
        { Produto: 'RTX 3060 12gb', Preço: 'R$1800,00', Quantidade: 1, Total: 'R$1800,00', imagens: ['img/rtx1.jpeg', 'img/rtx2.jpeg', 'img/rtx3.jpeg'] }
    ];

    const itemsPerPage = 10;
    let currentPage = 1;

    function displayProducts() {
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = '';

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProducts = products.slice(start, end);

        paginatedProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `   
                <td><img src="${product.imagens[0]}" alt="${product.Produto}" style="width:100px;height:100px;"></td>
                <td>${product.Produto}</td>
                <td class="preço">${product.Preço}</td>
                <td class="quantidade">${product.Quantidade}</td>
                <td class="total">${product.Total}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function addProduct(newProduct) {
        // Verifica se o produto já existe no carrinho
        const existingProduct = products.find(product => product.Produto === newProduct.Produto);

        if (existingProduct) {
            // Atualiza a quantidade e o total do produto existente
            existingProduct.Quantidade += newProduct.Quantidade;
            const precoUnitario = parseFloat(newProduct.Preço.replace('R$', '').replace('.', '').replace(',', '.'));
            existingProduct.Total = `R$${(precoUnitario * existingProduct.Quantidade).toFixed(2).replace('.', ',')}`;
        } else {
            // Adiciona o novo produto ao carrinho
            products.push(newProduct);
        }
        
        // Atualiza a exibição da tabela e o resumo do pedido
        displayProducts();
        atualizarResumo();
    }

    function atualizarResumo() {
        const valorTotal = products.reduce((acc, product) => acc + parseFloat(product.Total.replace('R$', '').replace('.', '').replace(',', '.')), 0);
        document.getElementById('resumo-valor').textContent = `Valor dos Produtos: R$${valorTotal.toFixed(2).replace('.', ',')}`;
    }

    // Exibe os produtos assim que a página carrega
    displayProducts();
    atualizarResumo();

    // Exemplo: Adicionar outro produto
    const novoProduto = { Produto: 'RTX 3060 12gb', Preço: 'R$1800,00', Quantidade: 1, Total: 'R$1800,00', imagens: ['img/rtx1.jpeg', 'img/rtx2.jpeg', 'img/rtx3.jpeg'] };
    addProduct(novoProduto);

    // Função para validar CEP e calcular frete
    document.getElementById("validarCep").addEventListener("click", function () {
        const cep = document.getElementById("cep").value;
        const primeiroQuantil = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA"];
        const segundoQuantil = ["MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS"];
        const terceiroQuantil = ["RO", "RR", "SC", "SP", "SE", "TO"];

        if (cep.length !== 8 || isNaN(cep)) {
            alert("CEP inválido. Digite um CEP válido com 8 dígitos numéricos.");
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
            if (dados.erro) {
                alert("CEP inválido.");
                return;
            }
            if (primeiroQuantil.includes(dados.uf)) {
                document.getElementById("frete-resultado").innerHTML = "Preço: R$35,00";
            } else if (segundoQuantil.includes(dados.uf)) {
                document.getElementById("frete-resultado").innerHTML = "Preço: R$25,00";
            } else if (terceiroQuantil.includes(dados.uf)) {
                document.getElementById("frete-resultado").innerHTML = "Preço: R$15,00";
            } else {
                document.getElementById("frete-resultado").innerHTML = "UF não está na tabela de preços.";
            }
        })
        .catch(error => {
            alert("Erro ao buscar o CEP: " + cep);
        });
    });
});
