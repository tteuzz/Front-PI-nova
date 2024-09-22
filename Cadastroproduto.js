document.querySelector('.form-cadastro').onsubmit = function (event) {
    event.preventDefault();

    const nomeProduto = document.getElementById('nomeProduto').value;
    const avalProduto = parseFloat(document.getElementById('avalProduto').value);
    const descDetalhadaProduto = document.getElementById('descDetalhadaProduto').value;
    const precoProduto = parseFloat(document.getElementById('precoProduto').value.replace(',', '.'));
    const qtdEstoqueProduto = parseInt(document.getElementById('qtdEstoqueProduto').value);

    const imagens = Array.from(document.getElementById('upload').files).map(file => {
        const caminhoImg = `C:\\Users\\kmendes\\Documents\\img\\${file.name}`;
        return {
            caminhoImg,
            imgPrincipal: false
        };
    });

    if (imagens.length === 0) {
        alert('Por favor, adicione pelo menos uma imagem.');
        return;
    }

    const produtoData = {
        nomeProduto,
        avalProduto,
        descDetalhadaProduto,
        precoProduto,
        qtdEstoqueProduto,
        imagens
    };

    fetch('http://localhost:8015/produto/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoData)
    })
        .then(response => {
            if (response.ok) {
                alert('Produto cadastrado com sucesso!');
                window.location.href = 'ListaProdutos.html';
            } else {
                alert('Erro ao cadastrar produto.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar produto.');
        });
};

function previewImages(event) {
    const imagePreviews = document.getElementById('image-previews');
    imagePreviews.innerHTML = '';

    Array.from(event.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.margin = '5px';
            imagePreviews.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}
