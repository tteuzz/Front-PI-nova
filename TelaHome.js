document.addEventListener('DOMContentLoaded', (event) => {
  const icone = document.querySelector('.icone');
  const cardLoginCadastro = document.getElementById('card-login-cadastro');

  icone.addEventListener('click', (event) => {
      event.stopPropagation(); // Evita que o clique no ícone feche o card
      if (cardLoginCadastro.style.display === 'none' || cardLoginCadastro.style.display === '') {
          cardLoginCadastro.style.display = 'block';
      } else {
          cardLoginCadastro.style.display = 'none';
      }
  });

  document.addEventListener('click', (event) => {
      if (!icone.contains(event.target) && !cardLoginCadastro.contains(event.target)) {
          cardLoginCadastro.style.display = 'none';
      }
  });
});

function login() {
  window.location.href = 'TelaInicial.html';
}

function cadastro() {
  window.location.href = 'TelaCadastroUsuario.html';
}

const myCarouselElement = document.querySelector('#myCarousel')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})
