// importar a função exportada do arquivo investimentGoals.js
import { generateReturnsArray } from './src/investmentGoals';

const form = document.getElementById('investment-form');
const calculateButton = document.getElementById('calculate-results');

// como a função ta associada a um evento podemos utilizá-la como parametro da própria função
function renderProgression(evt) {
  // evitar que execute o comportamento padrão que é de limpar os campos e enviar o formulário
  evt.preventDefault();

  //   vamos converter para número pois no formulário o valor vem em formato de texto
  // selecionar e apertar ctrl D para selecionar a próxima aparição do texto selecionado. MUITO ÚTIL
  // const startingAmount = Number(
  //   document.getElementById('starting-amount').value
  // );
  // outra forma de selecionar os campos do formulario
  const startingAmount = Number(form['starting-amount'].value);
  const additionalContribution = Number(
    document.getElementById('additional-contribution').value
  );
  const timeAmount = Number(document.getElementById('time-amount').value);
  const timeAmountPeriod = document.getElementById('time-amount-period').value;
  const returnRatePeriod = document.getElementById('evaluation-period').value;
  const returnRate = Number(document.getElementById('return-rate').value);
  const taxRate = Number(document.getElementById('tax-rate').value);

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}

// form.addEventListener('submit', renderProgression);
calculateButton.addEventListener('click', renderProgression);
