'use strict';
const display = document.querySelector('.display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador = null;
let numeroAnterior = null;



const calcular = () => {
    if (operador !=null) {
        const numeroAtual = parseFloat(display.textContent);
        novoNumero = true;
        if (operador == '+') {
            atualizarDisplay(parseFloat(numeroAnterior + numeroAtual))
        } else if (operador == '-') {
            atualizarDisplay(parseFloat(numeroAnterior - numeroAtual))

        } else if (operador == '*') {
            atualizarDisplay(parseFloat(numeroAnterior * numeroAtual))

        } else if (operador == '/') {
            atualizarDisplay(parseFloat(numeroAnterior / numeroAtual))

        }
    }
}
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    } else {
        display.textContent += texto;

    }

}
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

//agir em cada um dos elementos do node-list (array-like, por isso precisa do forEach)
numeros.forEach(num =>
    num.addEventListener('click', inserirNumero)

);

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent);
    }
}
operadores.forEach(operador =>
    operador.addEventListener('click', selecionarOperador)

);
