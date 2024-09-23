var imgsDto = [];

function previewImages(event) {
    const files = event.target.files;
    const previewsContainer = document.getElementById('image-previews');
    previewsContainer.innerHTML = ''; 
    imgsDto = [];

    Array.from(files).forEach(file => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file); 
        img.className = 'image-preview';
        previewsContainer.appendChild(img);

        const blobObject = { 
            blobImg: file,
            imgPrincipal: false
        };
        imgsDto.push(blobObject);
    });
}

document.querySelector('.form-cadastro').onsubmit = function (event) {
    event.preventDefault();

    const nomeProduto = document.getElementById('nomeProduto').value;
    const avalProduto = parseFloat(document.getElementById('avalProduto').value);
    const descDetalhadaProduto = document.getElementById('descDetalhadaProduto').value;
    const precoProduto = parseFloat(document.getElementById('precoProduto').value.replace(',', '.'));
    const qtdEstoqueProduto = parseInt(document.getElementById('qtdEstoqueProduto').value);

    const produtoData = {
        nomeProduto,
        avalProduto,
        descDetalhadaProduto,
        precoProduto,
        qtdEstoqueProduto,
    };

    fetch('http://localhost:8015/produto/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoData)
    })
    .then(response => response.json())
    .then(produto => {
        addBanco(produto.idProduto); 
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar produto.');
    });
};

function addBanco(id) {
    const formData = new FormData();

    imgsDto.forEach(img => {
        formData.append('imgBlob', img.blobImg); 
        formData.append('imgPrincipal', img.imgPrincipal); 
        formData.append('id', id); 
    });

    fetch('http://localhost:8015/imgProduto/', {
        method: 'POST',
        body: formData 
    })
    .then(response => response.json())
    .then(() => {
        window.location.href='ListaProdutos.html'
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar imagens.');
    });
}
