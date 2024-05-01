const { data } = require('autoprefixer');

const isNonEmptyArray = (arrayElement) => {
  // vai retornar Falso ou Verdadeiro
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

const createTable = (columnsArray, dataArray, tableID) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tabledId
  ) {
    throw new Error(
      'Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o id da tabela selecionada!'
    );
  }
  const tableElement = document.getElementById(tableID);
  //   .nodeName retorna o nome da tag html
  if (!tableElement || tableElement.nodeName !== 'TABLE') {
    throw new Error('Id informado não corresponde a nenhum elemento table!');
  }
  createTableHeader(tableElement, columnsArray);
  createTableBody(tableReference, data, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  // função para criar elemento thead
  function createTheadElement(tableReference) {
    const thead = document.createElement('thead');
    tableHeaderReference.appendChild(thead); // criar <thead></thead> dentro de <table></table>
  }
  // ?? se nulo testa a operação a direita que é criar o elemento thead
  const tableHeaderReference =
    tableReference.querySelector('thead') ?? createTheadElement(tableReference);

  const headerRow = document.createElement('tr');
  for (const tableColumnObject of columnsArray) {
    // criando o elemento da tabela com a classe ja definida
    // extensão es6 string to html. Ao escrever /*html*/ ele formata o resto da linha em html
    const headerElement = /*html*/ `<th class="text-center">${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement('tbody');
    tableBodyReference.appendChild(tbody); // criar <tbody></tbody> dentro de <table></table>
  }
  // ?? se nulo testa a operação a direita que é criar o elemento tbody
  const tableBodyReference =
    tableReference.querySelector('tbody') ?? createTbodyElement(tableReference);

  // Utilizando o ArrayIterator para criar cada linha da tabela
  // .entries() retorna um arrayIterator que podemos iterar cada mes do investimento
  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement('tr');

    for (const tableColumn of columnsArray) {
      tableRow.innerHTML += /*html*/ `<td class="text-center">${
        tableItem[tableColumn.accessor]
      }</td>`;
    }

    tableBodyReference.appendChild(tableRow);
  }
}
