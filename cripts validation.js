// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Função para destacar a aba ativa
    const highlightActiveTab = () => {
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    };

    highlightActiveTab();

    // Função para verificar login e atualizar a interface
    const checkLoginStatus = () => {
        const isLoggedIn = false; // Simulação de status de login
        if (isLoggedIn) {
            document.getElementById('criar-conta').style.display = 'none';
            document.getElementById('entrar').style.display = 'none';
            const accountInfo = document.createElement('div');
            accountInfo.innerHTML = `
                <p>Saldo da Conta: R$ 10.000,00</p>
                <p>Quantidade de Ações: 100</p>
                <p><a href="perfil.html">Perfil</a></p>
            `;
            document.querySelector('header nav ul').appendChild(accountInfo);
        }
    };

    checkLoginStatus();
});

// Função para validar formulário de criação de conta
function validarFormulario(event) {
    event.preventDefault();

    const senha = document.getElementById('senha').value;

    // Verificar se a senha é forte
    const senhaForte = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!senhaForte.test(senha)) {
        alert('A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, número e símbolo.');
        return false;
    }

    // Simular confirmação por email
    alert('Conta criada com sucesso! Por favor, confirme seu email para ativar a conta.');

    // Redirecionar para a página inicial após a criação da conta
    window.location.href = 'index.html';
    return true;
}
