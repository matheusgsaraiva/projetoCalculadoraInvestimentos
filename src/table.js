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
  createTableBody();
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

function createTableBody() {}
