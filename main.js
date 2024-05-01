// importar a função exportada do arquivo investimentGoals.js
import { generateReturnsArray } from './src/investmentGoals';
// importando a biblioteca Charts conforme a documentação descreve
import { Chart } from 'chart.js/auto';

const finalMoneyChart = document.getElementById('final-money-distribution');
const progressionChart = document.getElementById('progression');
const form = document.getElementById('investment-form');
const clearFormButton = document.getElementById('clear-form');
const calculateButton = document.getElementById('calculate-results');
// vamos declarar as variáveis dos gráficos com um objeto vazio para inicializar
let doughnutChartReference = {};
let progressionChartReference = {};

const columnsArray = [
  { columnLabel: 'Total investido', accessor: 'investedAmount' },
  { columnLabel: 'Rendimento mensal', accessor: 'interestReturns' },
  { columnLabel: 'Rendimento total', accessor: 'totalInterestReturns' },
  { columnLabel: 'Mês', accessor: 'month' },
  { columnLabel: 'Quantia Total', accessor: 'totalAmount' },
];

function formatCurrency(value) {
  return value.toFixed(2);
}

// como a função ta associada a um evento podemos utilizá-la como parametro da própria função
function renderProgression(evt) {
  // evitar que execute o comportamento padrão que é de limpar os campos e enviar o formulário
  evt.preventDefault();

  // vamos procurar se tem a classe error em algum dos campos do formulário
  // se achar é um valor do tipo truthy e assim encerra-se a função. Se não achar é null e null é falsy. Então aí não faz nada
  if (document.querySelector('.error')) {
    return;
  }

  resetCharts();

  //   vamos converter para número pois no formulário o valor vem em formato de texto
  // selecionar e apertar ctrl D para selecionar a próxima aparição do texto selecionado. MUITO ÚTIL

  // const startingAmount = Number(
  //   document.getElementById('starting-amount').value.replace(',', '.')
  // );
  // outra forma de selecionar os campos do formulario
  const startingAmount = Number(
    form['starting-amount'].value.replace(',', '.')
  );
  const additionalContribution = Number(
    document.getElementById('additional-contribution').value.replace(',', '.')
  );
  const timeAmount = Number(document.getElementById('time-amount').value);
  const timeAmountPeriod = document.getElementById('time-amount-period').value;
  const returnRatePeriod = document.getElementById('evaluation-period').value;
  const returnRate = Number(
    document.getElementById('return-rate').value.replace(',', '.')
  );
  const taxRate = Number(
    document.getElementById('tax-rate').value.replace(',', '.')
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  // const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  // console.log(returnsArray[returnsArray.length - 1]);
  // console.log(finalInvestmentObject.totalInterestReturns);

  // doughnutChartReference = new Chart(finalMoneyChart, {
  //   type: 'doughnut',
  //   data: {
  //     labels: ['Total investido', 'Rendimento', 'Imposto'],
  //     datasets: [
  //       {
  //         data: [
  //           formatCurrency(finalInvestmentObject.investedAmount),
  //           formatCurrency(
  //             finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100)
  //           ),
  //           formatCurrency(
  //             finalInvestmentObject.totalInterestReturns * (taxRate / 100)
  //           ),
  //         ],
  //         backgroundColor: [
  //           'rgb(255, 99, 132)',
  //           'rgb(54, 162, 235)',
  //           'rgb(255, 205, 86)',
  //         ],
  //         hoverOffset: 4,
  //       },
  //     ],
  //   },
  // });

  // progressionChartReference = new Chart(progressionChart, {
  //   type: 'bar',
  //   data: {
  //     labels: returnsArray.map((investmentObject) => investmentObject.month),
  //     datasets: [
  //       {
  //         label: 'Total Investido',
  //         data: returnsArray.map((investmentObject) =>
  //           formatCurrency(investmentObject.investedAmount)
  //         ),
  //         backgroundColor: 'rgb(255, 99, 132)',
  //       },
  //       {
  //         label: 'Retorno do Investimento',
  //         data: returnsArray.map((investmentObject) =>
  //           formatCurrency(investmentObject.interestReturns)
  //         ),
  //         backgroundColor: 'rgb(54, 162, 235)',
  //       },
  //     ],
  //   },
  //   options: {
  //     plugins: {
  //       title: {
  //         display: true,
  //         text: 'Chart.js Bar Chart - Stacked',
  //       },
  //     },
  //     responsive: true,
  //     scales: {
  //       x: {
  //         stacked: true,
  //       },
  //       y: {
  //         stacked: true,
  //       },
  //     },
  //   },
  // });
}

function isObjectEmpy(obj) {
  // vai retornar a lista de todas as chaves e em serguida verificar se está vazia
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpy(doughnutChartReference) &&
    !isObjectEmpy(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function clearForm() {
  form['starting-amount'].value = '';
  form['additional-contribution'].value = '';
  form['time-amount'].value = '';
  form['return-rate'].value = '';
  form['tax-rate'].value = '';

  resetCharts();

  // vamos pegar todos os campos do formulário com a classe erro
  const errorInputContainers = document.querySelectorAll('.error');

  for (const errorInputContainer of errorInputContainers) {
    // vamos remover a mensagem de error pois vamos limpar o campo
    errorInputContainer.classList.remove('error');
    // vamos remover o paragrafo (elemento p) da mensagem de erro
    errorInputContainer.parentElement.querySelector('p').remove();
  }
}

function validateInput(evt) {
  // vai printar onde o evento aconteceu
  // console.log(evt.target);

  if (evt.target.value === '') {
    return;
  }

  // o {} serve para fazer um destructuring para pegar o pai do elemento onde o evento ocorreu
  // a desestruturação faz a mesma coisa que isso const parentElement = evt.target.parentElement; nesse caso
  // vamos atribuir a variável parentElement o pai do elemento onde acontece o evento.
  // O método parentElement é também uma propriedade do JS para elementos HTML
  const { parentElement } = evt.target;
  // pegando o avô do elemento
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(',', '.');

  // vamos colocar o texto em vermelho quando não for um número ou um número negativo
  // !parentElement.classList.contains('error') vai verificar se o elemento parentElement contém a classe error
  // em seguinda o ! faz a lógica inverso, para só deixar passar se for falso o contains
  if (
    !parentElement.classList.contains('error') &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement('p'); // <p></p>
    // atribuindo a classe de cor vermelha do tailwind
    errorTextElement.classList.add('text-red-500'); // <p class="text-red-500"></p>
    // gerando o texto do elemento p que acabamos de criar
    errorTextElement.innerText = 'Insira um valor numérico e maior que zero'; // <p class="text-red-500">Insira um valor numérico e maior que zero</p>

    parentElement.classList.add('error');
    grandParentElement.appendChild(errorTextElement); // adicionando um filho ao elemento vô
  } else if (
    // removendo as mensagens de erro quando não tiver erro
    parentElement.classList.contains('error') &&
    !isNaN(inputValue) && // quand for um número, ou seja, quando não for um NaN (ex: texto)
    Number(inputValue) > 0
  ) {
    // a gente remove a classe error que torna o contorno vermelho
    parentElement.classList.remove('error');
    // vamos selecionar a tag p que adicionamos quando tinha um erro no campo do formulário e vamos removê-la
    grandParentElement.querySelector('p').remove();
  }
}

for (const formElement of form) {
  // todos os campos do formulário que são obrigatórios tem o atributo name
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}

// comentar para fazer a parte da tabela
form.addEventListener('submit', renderProgression);
// calculateButton.addEventListener('click', renderProgression);
clearFormButton.addEventListener('click', clearForm);
