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
  createTableHeader();
  createTableBody();
};

function createTableHeader() {}

function createTableBody() {}
