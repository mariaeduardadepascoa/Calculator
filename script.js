var operacao = [];

let ultimoClique = null;

let numeroUser = document.querySelectorAll(".numbers");
let opUser = document.querySelectorAll(".options, .clear-all");
let display = document.querySelector(".display");
let verResultado = document.getElementById("ver-resultado");
let cA = document.getElementsByClassName("clear-all");

numeroUser.forEach(element => { //para os números
    element.addEventListener('click', function(event) {

        ultimoClique = event.target;
        console.log("Numero clicado: ", ultimoClique.textContent);

        let valorBotao = event.target.getAttribute("data-valor");
        let valorConvertido = (Number(valorBotao));
        console.log("Valor convertido: ", valorConvertido);
        operacao.push(valorConvertido); //.push adiciona o valor sem apagar os anteriores

        display.textContent = operacao.join(""); // adiciona os números no display e muda os sinais para pararem de ser strings e serem operadores normais --> CONTA DO EVAL

        console.log("Array: ", operacao);

    });
});

opUser.forEach(element => { //para as operacoes
    element.addEventListener('click', function (event) {

        let operacaoBotao = event.target.getAttribute("data-operacao");

        if (event.target.id == "deletar-tudo") { //if antes do .push para adicionar os operadores só se o usuário resolver fazer a conta, e n excluir tudo ---> não sobrescreve o display
            operacao = [];
            display.textContent = '0';
            console.log("limpou tudo! --> ", operacao);
            return; //já fecha e sai da função
        } 
        
        if (event.target.id == "apagar" || event.target.id == "imgApagar") {
            operacao.pop(); // remove o último elemento
            console.log(operacao);
            if (operacao.length === 0) {
                display.textContent = '0';
                return; //sai da função
            } else { 
                display.textContent = operacao.join(""); 
            }
        }

        if (event.target.id === "ponto") {
            operacao.push(".");
            display.textContent = operacao.join("");
        } else {
            operacao.push(operacaoBotao); // adiciona operadores sem apagar os conteúdos anteriores
        }
            
        display.textContent = operacao.join(""); //adicionando tudo no display

        
        if (event.target == verResultado) {
            console.log("operação antes do eval: ", operacao.join(""));
            const resultado = eval(operacao.join(""));
            operacao = [];
            console.log("resultado final: ", resultado);
            display.textContent = resultado;
        }
        
    });
});

function mostrarResultado() {

}


// PONTOS PARA ADICIONAR (miguelzito lindo me ajudou): 
// - se o usuário apertar em "+" mas depois apertar no botão de apagar ele tem q apagar apenas o operador e n o número q ta entes dele
// - função que percorre o array e vai traduzindo: "+" = +, "X" = *, etc.
// - duplicar esse projeto e fazer um com biblioteca mathjs e outro com eval