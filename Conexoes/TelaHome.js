

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch('http://localhost:8015/produto/list') 
        .then(response => response.json())
        .then(data => {
            const products = data; 
            displayProducts(products); 
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
            alert('Erro ao buscar produtos.');
        });
}

function displayProducts(products) {
  const cardContainer = document.querySelector('.l-cards'); 
  cardContainer.innerHTML = ''; 

  products.forEach(product => {
      
      fetch(`http://localhost:8015/imgProduto/${product.idProduto}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro na resposta da rede');
          }
          return response.json();
      })
      .then(imagesData => {
        
          const principalImage = imagesData.find(img => img.imgPrincipal);
          
         
          if (principalImage) {
              const imgSrc = `data:image/jpeg;base64,${principalImage.imgBlob}`;

              const card = document.createElement('article');
              card.classList.add('c-card');

              card.innerHTML = `
                  <div class="c-card__image">
                      <img src="${imgSrc}" width="100%" alt="${product.nomeProduto}">
                  </div>
                  <div class="c-card__content">
                      <h2 class="titulo-produto">${product.nomeProduto}</h2>
                      <p class="preco-produto">R$ ${product.precoProduto.toFixed(2)}</p>
                      <button class="button" onclick="viewProduct(${product.idProduto})">Detalhe</button>
                  </div>
              `;
              
              cardContainer.appendChild(card);
          }
      })
      .catch(error => {
          console.error('Erro ao buscar a imagem:', error);
      });
  });
}


function viewProduct(idProduto) {
   
    window.location.href = `TelaProdutoDetalhe.html?id=${idProduto}`;
}
