const isNonEmptyArray = (arrayElement) => {
  // vai retornar Falso ou Verdadeiro
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

const createTable = (columnsArray, dataArray, tableID) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableID
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
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  // função para criar elemento thead
  function createTheadElement(tableReference) {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead); // criar <thead></thead> dentro de <table></table>
    return thead;
  }
  // ?? se nulo testa a operação a direita que é criar o elemento thead
  const tableHeaderReference =
    tableReference.querySelector('thead') ?? createTheadElement(tableReference);

  const headerRow = document.createElement('tr');

  // colocando propriedades no cabeçalho da tabela
  // sticky et top-0 vão deixar o cabeçalho fixado no topo
  ['bg-blue-900', 'text-slate-200', 'sticky', 'top-0'].forEach((cssClass) =>
    headerRow.classList.add(cssClass)
  );

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
    tableReference.appendChild(tbody); // criar <tbody></tbody> dentro de <table></table>
    return tbody;
  }
  // ?? se nulo testa a operação a direita que é criar o elemento tbody
  const tableBodyReference =
    tableReference.querySelector('tbody') ?? createTbodyElement(tableReference);

  // Utilizando o ArrayIterator para criar cada linha da tabela
  // .entries() retorna um arrayIterator que podemos iterar cada mes do investimento
  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement('tr');

    // se o número for ímpar a gente coloca uma cor diferente
    if (itemIndex % 2 !== 0) {
      tableRow.classList.add('bg-blue-200'); // cor azul claro
    }
    for (const tableColumn of columnsArray) {
      // se existir a propriedade format na propriedade aplica ela, senão faz uma função que não faz nada
      const formatFn = tableColumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html*/ `<td class="text-center">${formatFn(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }

    tableBodyReference.appendChild(tableRow);
  }
}

// Export the createTable function
export { createTable };
