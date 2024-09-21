document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('.form-cadastro');
    const uploadInput = document.getElementById('upload');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nomeProduto = document.getElementById('nomeProduto').value;
            const descDetalhadaProduto = document.getElementById('descDetalhadaProduto').value;
            const precoProduto = parseFloat(document.getElementById('precoProduto').value); 
            const qtdEstoqueProduto = parseInt(document.getElementById('qtdEstoqueProduto').value); 
            const avalProduto = parseFloat(document.getElementById('avalProduto').value); 

            const dadosProduto = {
                nomeProduto,
                descDetalhadaProduto,
                precoProduto,
                qtdEstoqueProduto,
                avalProduto,
                prodDhCadastro: new Date().toISOString(),
                prodDhInativo: null
            };

            // Cadastro do produto
            fetch('http://localhost:8015/produto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosProduto)
            })
            .then(response => response.json())
            .then(produto => {
                const formData = new FormData();
                const caminhoBase = 'Documentos/imgs/';

                Array.from(uploadInput.files).forEach((file) => {
                    // Cria um objeto para cada imagem
                    const imgDTO = {
                        FkIdproduto: produto.id,
                        caminhoImg: caminhoBase + file.name,
                        imgPrincipal: false
                    };

                    // Adiciona a imagem ao FormData
                    formData.append('files', file);
                    formData.append('imgProdutoRequestDTO', JSON.stringify(imgDTO));
                });

                // Envio das imagens
                return fetch('http://localhost:8015/imgProduto', {
                    method: 'POST',
                    body: formData
                });
            })
            .then(response => response.json())
            .then(imageData => {
                console.log('URLs das imagens:', imageData);
                alert('Imagens enviadas com sucesso!');
                window.location.href = 'ListaProdutos.html';
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao cadastrar o produto ou enviar imagens: ' + error.message);
            });
        });
    }
});

function previewImages(event) {
    const files = event.target.files;
    const previewsContainer = document.getElementById('image-previews');
    previewsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novas imagens

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function() {
            const img = document.createElement('img');
            img.src = reader.result;
            img.className = 'image-preview';
            previewsContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}