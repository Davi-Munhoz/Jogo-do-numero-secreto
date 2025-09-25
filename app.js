let numeroMaximo = 15;
let tentativas = 1;
var numerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', `Digite um número entre 1 e ${numeroMaximo}`);
}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas === 1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `Você acertou o número secreto ${numeroSecreto} em ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } 
    else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'Você errou! O número secreto é menor.');
        }
        else if(chute < numeroSecreto){
            exibirTextoNaTela('p', 'Você errou! O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo(){
    let chute = document.querySelector('input');
    chute.value = '';
}   

function gerarNumeroAleatorio(){
    parseInt(Math.random() * numeroMaximo) + 1;
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo) + 1;
    let quantidadeDeNumerosSorteados = numerosSorteados.length;
    if(quantidadeDeNumerosSorteados == numeroMaximo){
        numerosSorteados = [];
    }
    if(numerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        numerosSorteados.push(numeroEscolhido);
        console.log(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

mensagemInicial();