// importar a função exportada do arquivo investimentGoals.js
import { generateReturnsArray } from './src/investmentGoals';

const form = document.getElementById('investment-form');

// como a função ta associada a um evento podemos utilizá-la como parametro da própria função
function renderProgression(evt) {
  evt.preventDefault();
  //   vamos converter para número pois no formulário o valor vem em formato de texto
  // selecionar e apertar ctrl D para selecionar a próxima aparição do texto selecionado. MUITO ÚTIL
  const startingAmount = Number(
    document.getElementById('starting-amount').value
  );
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

form.addEventListener('submit', renderProgression);
