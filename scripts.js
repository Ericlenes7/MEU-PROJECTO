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
        const saldoConta = 10000; // Saldo inicial em EUR
        const acoesCompradas = 0; // Quantidade inicial de ações
        if (isLoggedIn) {
            document.getElementById('criar-conta').style.display = 'none';
            document.getElementById('entrar').style.display = 'none';
            const accountInfo = document.createElement('div');
            accountInfo.innerHTML = `
                <p>Saldo da Conta: €${saldoConta.toFixed(2)}</p>
                <p>Quantidade de Ações: ${acoesCompradas}</p>
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

// Simulação de ações
const acoes = Array.from({ length: 50 }, (_, i) => ({
    nome: `Ação ${i + 1}`,
    preco: 15,
    variacao: 0,
    quantidade: 10000
}));

const atualizarTabelaAcoes = () => {
    const tabelaAcoes = document.getElementById('tabela-acoes');
    tabelaAcoes.innerHTML = '';
    acoes.forEach((acao, index) => {
        const tr = document.createElement('tr');

        // Nome da ação
        const tdNome = document.createElement('td');
        tdNome.textContent = acao.nome;
        tr.appendChild(tdNome);

        // Preço da ação
        const tdPreco = document.createElement('td');
        tdPreco.textContent = `${acao.preco.toFixed(2)} EUR`;
        if (acao.variacao > 0) {
            tdPreco.style.color = 'green';
        } else if (acao.variacao < 0) {
            tdPreco.style.color = 'red';
        } else {
            tdPreco.style.color = 'blue';
        }
        tr.appendChild(tdPreco);

        // Variação da ação
        const tdVariacao = document.createElement('td');
        tdVariacao.textContent = `${acao.variacao.toFixed(3)}%`;
        tr.appendChild(tdVariacao);

        // Quantidade disponível
        const tdQuantidadeDisponivel = document.createElement('td');
        tdQuantidadeDisponivel.textContent = acao.quantidade;
        tr.appendChild(tdQuantidadeDisponivel);

        // Quantidade a comprar/vender
        const tdQuantidade = document.createElement('td');
        const inputQuantidade = document.createElement('input');
        inputQuantidade.type = 'number';
        inputQuantidade.min = 1;
        inputQuantidade.max = acao.quantidade;
        inputQuantidade.value = 1;
        tdQuantidade.appendChild(inputQuantidade);
        tr.appendChild(tdQuantidade);

        // Botão de compra
        const tdComprar = document.createElement('td');
        const botaoComprar = document.createElement('button');
        botaoComprar.textContent = 'Comprar';
        botaoComprar.classList.add('buy');
        botaoComprar.onclick = () => {
            const quantidade = parseInt(inputQuantidade.value);
            if (quantidade > 0 && quantidade <= acao.quantidade) {
                acao.quantidade -= quantidade;
                alert(`Comprou ${quantidade} unidades de ${acao.nome}`);
                atualizarTabelaAcoes();
                // Atualizar saldo do usuário e quantidade de ações compradas
            } else {
                alert('Quantidade inválida.');
            }
        };
        tdComprar.appendChild(botaoComprar);
        tr.appendChild(tdComprar);

        // Botão de venda
        const tdVender = document.createElement('td');
        const botaoVender = document.createElement('button');
        botaoVender.textContent = 'Vender';
        botaoVender.classList.add('sell');
        botaoVender.onclick = () => {
            const quantidade = parseInt(inputQuantidade.value);
            // Verificar se o usuário tem ações suficientes para vender
            if (quantidade > 0 && quantidade <= acoesCompradas) {
                acao.quantidade += quantidade;
                alert(`Vendeu ${quantidade} unidades de ${acao.nome}`);
                atualizarTabelaAcoes();
                // Atualizar saldo do usuário e quantidade de ações vendidas
            } else {
                alert('Quantidade inválida.');
            }
        };
        tdVender.appendChild(botaoVender);
        tr.appendChild(tdVender);

        tabelaAcoes.appendChild(tr);
    });
};

const atualizarVariacaoAcoes = () => {
    acoes.forEach(acao => {
        const variacao = (Math.random() * 0.01 - 0.005).toFixed(3);
        acao.variacao = parseFloat(variacao);
        acao.preco = Math.max(0, acao.preco + acao.preco * acao.variacao / 100);
    });
    atualizarTabelaAcoes();
};

// Atualizar tabela a cada 5 segundos
setInterval(atualizarVariacaoAcoes, 5000);

// Atualizar tabela ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarTabelaAcoes);
