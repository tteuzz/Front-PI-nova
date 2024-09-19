document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Coleta os valores dos campos
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            // Cria um objeto com os dados do formulário
            const dados = {
                usuaDsEmail: email,
                usuaDsPassword: senha
            };

            // Envia a solicitação fetch
            fetch('http://localhost:8015/user/login', {
                method: 'POST', // Altera para POST
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(dados)
            })
            .then(response => {
                console.log('Resposta recebida:', response); // Log da resposta
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }
                return response; 
            })
            .then(data => {
                console.log('Dados recebidos:', data); // Log dos dados recebidos
                alert('Login realizado com sucesso!');
                // Redireciona para a tela principal do sistema
                window.location.href = 'telaPrincipal.html';
            })
            .catch(error => {
                console.error('Erro:', error); // Log do erro
                alert('Ocorreu um erro ao fazer login.');
            });
        });
    } else {
        console.error('Formulário não encontrado!');
    }
});
