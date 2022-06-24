'use strict';
const display = document.querySelector('.display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador = null;
let numeroAnterior = null;



const calcular = () => {
    if (operador != null) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
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
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');

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
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }
}
operadores.forEach(operador =>
    operador.addEventListener('click', selecionarOperador)

);

const ativarIgual = () => {
    calcular()
    operador = null;
}

document.querySelector('#igual').addEventListener('click', ativarIgual)

setInterval(() => console.log(novoNumero), 2000)
//limpar display
const limparDisplay = () => display.textContent = '';
document.querySelector('#limparDisplay').addEventListener('click', limparDisplay)
//limpar calculo
const limparCalculo = () => {
    limparDisplay();
    operador = null;
    novoNumero = true;
    numeroAnterior = null;
}
document.querySelector('#limparCalculo').addEventListener('click', limparCalculo)
//backspace
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1)
document.querySelector('#backspace').addEventListener('click', removerUltimoNumero)
//inverter sinal
const inverterSinal = () => { atualizarDisplay(display.textContent * -1) }
document.querySelector('#operadorInverter').addEventListener('click', inverterSinal)
//virgula
const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}
document.querySelector('#decimal').addEventListener('click', inserirDecimal)
//teclado
const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorSomar',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    'c': 'limparDisplay',
    'Escape': 'limparCalculo',
    ',': 'decimal',
}
const mapearTeclado = (evento) => {
    const tecla = evento.key
    const teclaPermitida = () => {
        Object.keys(mapaTeclado).indexOf(tecla) != -1
    }
    if (teclaPermitida)
        document.getElementById(mapaTeclado[tecla]).click();


    console.log(mapaTeclado[tecla])
}
document.addEventListener('keydown', mapearTeclado)