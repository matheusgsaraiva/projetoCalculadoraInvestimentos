// importar a função exportada do arquivo investimentGoals.js
import { generateReturnsArray } from './src/investmentGoals';

const form = document.getElementById('investment-form');
// const calculateButton = document.getElementById('calculate-results');

// como a função ta associada a um evento podemos utilizá-la como parametro da própria função
function renderProgression(evt) {
  // evitar que execute o comportamento padrão que é de limpar os campos e enviar o formulário
  evt.preventDefault();
  // vamos procurar se tem a classe error em algum dos campos do formulário
  // se achar é um valor do tipo truthy e assim encerra-se a função. Se não achar é null e null é falsy. Então aí não faz nada
  if (document.querySelector('.error')) {
    return;
  }

  //   vamos converter para número pois no formulário o valor vem em formato de texto
  // selecionar e apertar ctrl D para selecionar a próxima aparição do texto selecionado. MUITO ÚTIL

  // const startingAmount = Number(
  //   document.getElementById('starting-amount').value
  // );
  // outra forma de selecionar os campos do formulario
  const startingAmount = Number(
    form['starting-amount'].value.replace(',', '.')
  );
  const additionalContribution = Number(
    document.getElementById('additional-contribution').value
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

  console.log(returnsArray);
}

function validateInput(evt) {
  // vai printar onde o evento aconteceu
  console.log(evt.target);

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
    isNaN(inputValue) ||
    (Number(inputValue) <= 0 && !parentElement.classList.contains('error'))
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

// form.addEventListener('submit', renderProgression);
form.addEventListener('click', renderProgression);
