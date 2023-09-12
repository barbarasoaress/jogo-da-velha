const tabuleiro = document.getElementById('tabuleiro')
const celulas = document.querySelectorAll('.celula')
const mensagem = document.getElementById('mensagem')
const reiniciarBotao = document.getElementById('reiniciar')
let jogadorAtual = 'X';
let jogoAtual = true;
const vitoriaCombinacoes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let tabuleiroEstado = ['','','','','','','','',''];

function verificarVitoria() {
    for (const combinacao of vitoriaCombinacoes) {
        const [a,b,c] = combinacao;
        if (tabuleiroEstado[a] && tabuleiroEstado [a] === tabuleiroEstado[b] && tabuleiroEstado[a] === tabuleiroEstado[c])
            jogoAtivo = false;
            celulas[a].classList.add('vencedor');
            celulas[b].classList.add('vencedor');
            celulas[c].classList.add('vencedor');
            if  (tabuleiroEstado[a] === 'X') {
            mensagem.textContent = 'Você ganhou!';
            } else {
                mensagem.textContent = 'Ele ganhou!';
            }
            mensagem.classList.add('vitoria');
            reiniciarBotao.style.display = 'block';
            return;
    }
}

function fazerJogadaHumana(celullaIndex) {
    if (tabuleiroEstado[celulaIndex] === '' & jogoAtivo && jogadorAtual === 'X') {
        tabuleiroEstado[celullaIndex] = jogadorAtual;
        celulas[celullaIndex].textContent = jogadorAtual;
        celulas[celullaIndex].classList.add('ocupada', 'X');
        verificarVitoria();
        jogadorAtual = 'O';

        if (jogoAtivo) {
            fazerJogadaComputador();
        }
    }
}

function fazerJogadaComputador() {
    if (jogadorAtual === 'O' && jogoAtivo) {
        setTimeout(() => {
            let jogadaAleatoria;
            do {
                jogadaAleatoria = Math.floor(Math.random() * 9);               
            } while (tabuleiroEstado[jogadaAleatoria] !== '');

            tabuleiroEstado[jogadaAleatoria] = jogadorAtual;
            celulas[jogadaAleatoria].textContent = jogadorAtual;
            celulas[jogadaAleatoria].classList.add('ocupada', 'O');
            verificarVitoria();
            jogadorAtual = 'X';
        }, 1000);
    }
}

function reiniciarJogo() {
    tabuleiroEstado = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true;
    mensagem.textContent = '';
    tabuleiro.classList.remove('empate');

    celulas.forEach(( celula) => {
        celula.textContent = '';
        celula.classList.remove('ocuada', 'vencedor', 'X', 'O');
    });

    reiniciarBotao.style.display = 'none';
    jogadorAtual = 'X';

    if (jogadorAtual === 'O') {
        fazerJogadaComputador();
    }
}

celulas.forEach((celular, index) => {
    celula.addEventListener('click', () => fazerJogadaHumana(index));
});

reiniciarBotao.addEventListener('click', reiniciarJogo);

if (jogoAtual === 'O') {
    fazerJogadaComputador();
}