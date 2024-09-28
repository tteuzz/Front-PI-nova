document.addEventListener('DOMContentLoaded', () => {
    const produtoEdit = JSON.parse(localStorage.getItem('produtoEdit'));
    const imagesEdit = JSON.parse(localStorage.getItem('imagesEdit'));

    if (produtoEdit) {

        document.getElementById('nomeProduto').value = produtoEdit.nomeProduto || '';
        document.getElementById('avalProduto').value = produtoEdit.avalProduto || '1'; 
        document.getElementById('descDetalhadaProduto').value = produtoEdit.descDetalhadaProduto || '';
        document.getElementById('precoProduto').value = produtoEdit.precoProduto || '';
        document.getElementById('qtdEstoqueProduto').value = produtoEdit.qtdEstoqueProduto || '';
    }

    if (imagesEdit) {
        const previewsContainer = document.getElementById('image-previews');
        previewsContainer.innerHTML = ''; // Limpa o container de previews

        // Cria elementos de imagem para cada imagem
        imagesEdit.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'image-preview';
            previewsContainer.appendChild(img);
        });
    }
});
