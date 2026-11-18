var operacao = [];

let ultimoClique = null;

let numeroUser = document.querySelectorAll(".numbers");
let opUser = document.querySelectorAll(".options, .clear-all");
let display = document.querySelector(".display");
let verResultado = document.getElementById("ver-resultado");
let cA = document.getElementsByClassName("clear-all");


function atualizarDisplay() {
    display.classList.remove("erro");
    const expressao = operacao.join("");

    display.textContent = expressao
        .replaceAll("**", "^")
        .replaceAll("*", "×")
        .replaceAll("/", "÷") || "0";
}


numeroUser.forEach(element => { //para os números
    element.addEventListener('click', function (event) {
        const botao = event.currentTarget;

        ultimoClique = botao;
        console.log("Numero clicado: ", ultimoClique.textContent);

        let valorBotao = botao.getAttribute("data-valor");
        let valorConvertido = (Number(valorBotao));
        console.log("Valor convertido: ", valorConvertido);
        operacao.push(valorConvertido); //.push adiciona o valor sem apagar os anteriores

        atualizarDisplay(); // adiciona os números no display e muda os sinais para pararem de ser strings e serem operadores normais --> CONTA DO EVAL

        console.log("Array: ", operacao);

    });
});

opUser.forEach(element => { //para as operacoes
    element.addEventListener('click', function (event) {
        const botao = event.currentTarget;

        let operacaoBotao = botao.getAttribute("data-operacao");

        if (botao.id == "deletar-tudo") { //if antes do .push para adicionar os operadores só se o usuário resolver fazer a conta, e n excluir tudo ---> não sobrescreve o display
            operacao = [];
            display.textContent = '0';
            console.log("limpou tudo! --> ", operacao);
            return; //já fecha e sai da função
        }

        if (botao.id === "apagar") {
            operacao.pop();
            atualizarDisplay();
            return;
        }


        if (botao === verResultado) {
            const expressao = operacao.join("");
            if (expressao === "") return;

            const expressaoParaCalcular = expressao.replace(
                /(\d+(?:\.\d*)?|\.\d+)%/g,
                "($1/100)" //$1 é o numero antes de "%"
            );

            console.log("Operação antes do eval:", expressao);
            const resultado = eval(expressaoParaCalcular);
            operacao = [];

            if (!Number.isFinite(resultado)) {
                display.classList.add("erro");
                display.textContent = "Cannot divide by zero";
                return;
            }

            display.textContent = resultado;
            return;
        }

        operacao.push(operacaoBotao);
        atualizarDisplay();

    });
});
