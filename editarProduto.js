var imgsDto = [];
let produtoEdit = JSON.parse(localStorage.getItem('produtoEdit'));
    
let imagesEdit = JSON.parse(localStorage.getItem('imagesEdit'));
document.addEventListener('DOMContentLoaded', () => {
    
    

    if (produtoEdit) {

        document.getElementById('nomeProduto').value = produtoEdit.nomeProduto || '';
        document.getElementById('avalProduto').value = produtoEdit.avalProduto || '1'; 
        document.getElementById('descDetalhadaProduto').value = produtoEdit.descDetalhadaProduto || '';
        document.getElementById('precoProduto').value = produtoEdit.precoProduto || '';
        document.getElementById('qtdEstoqueProduto').value = produtoEdit.qtdEstoqueProduto || '';
    }

    if (imagesEdit) {
        const previewsContainer = document.getElementById('image-previews');
        previewsContainer.innerHTML = ''; 

        imagesEdit.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'image-preview';
            previewsContainer.appendChild(img);
        });
    }
});

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
  
    fetch(`http://localhost:8015/produto/update/${produtoEdit.idProduto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoData)
    })
    .then(response => response.json())
    .then(produto => {
        window.location.href='ListaProdutos.html';
        //updateImg(produtoEdit.idProduto); 
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar produto.');
    });
};
