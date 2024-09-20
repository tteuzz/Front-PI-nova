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
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao cadastrar produto: ${response.status}: ${response.statusText}`);
                }
                return response.json(); // Retorna o produto cadastrado
            })
            .then(produto => {
                const formData = new FormData();
                const caminhoBase = 'Documentos/imgs/';

                Array.from(uploadInput.files).forEach((file, index) => {
                    const imgDTO = {
                        FkIdproduto: produto.id,
                        caminhoImg: `${caminhoBase}${file.name}`,
                        imgPrincipal: index === 0 
                    };

                    formData.append('file', file); 
                    formData.append('imgProdutoRequestDTO', JSON.stringify(imgDTO)); 
                });

                // Envio das imagens
                return fetch('http://localhost:8015/imgProduto', {
                    method: 'POST',
                    body: formData
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao enviar imagens: ${response.statusText}`);
                }
                return response.json(); // Retorna as URLs das imagens
            })
            .then(imageData => {
                console.log('URLs das imagens:', imageData); 
                alert('Imagens enviadas com sucesso!');
                window.location.href = 'telaPrincipal.html';
            })
            .catch(error => {
                // Captura erros em qualquer parte do processo
                console.error('Erro:', error);
                alert('Erro ao cadastrar o produto ou enviar imagens: ' + error.message);
            });
        });
    }
});

function previewImages(event) {
    const files = event.target.files;
    const previewsContainer = document.getElementById('image-previews');
    previewsContainer.innerHTML = '';

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
