document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const cpf = document.getElementById('cpf').value;

            const dados = {
                usuaNmUsuario: nome,
                usuaDsEmail: email,
                usuaDsCPF: cpf,
                usuaDsPassword: senha
            };

            fetch('http://localhost:8015/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                console.log('Resposta recebida:', response);
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados recebidos:', data);
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'telaPrincipal.html';
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao realizar o cadastro.');
            });
        });
    } else {
        console.error('Formulário não encontrado!');
    }
});
