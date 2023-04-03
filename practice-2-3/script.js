const mainContent = document.querySelector('.main');
const tableHeadRow = mainContent.querySelector('.table__head-row');
const tableBody = mainContent.querySelector('.table__body');
const templateHeader = document.querySelector('.template-header').content;
const templateBody = document.querySelector('.template-body').content;
const inputSearch = document.querySelector('.search-form__input');

//получить данные по ссылке
function getData(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = () => {
    const data = request.response;
    createTable(data);
  }
}
//передать ссылку в функцию
getData('https://jsonplaceholder.typicode.com/posts');

//создать таблицу
function createTable(data) {
  const dataKeys = Object.keys(Object.assign({}, ...data));//получить ключи

  dataKeys.forEach((elementKey) => {
    const tableElementHeader = templateHeader.cloneNode('true');

    tableElementHeader.querySelector('.table__header').textContent = elementKey

    tableHeadRow.append(tableElementHeader);
  });

  data.forEach((elementValue) => {
    const tableElementBody = templateBody.cloneNode('true');

    tableElementBody.querySelector('.table__data_column_userId').textContent = elementValue.userId;
    tableElementBody.querySelector('.table__data_column_id').textContent = elementValue.id;
    tableElementBody.querySelector('.table__data_column_title').textContent = elementValue.title;
    tableElementBody.querySelector('.table__data_column_body').textContent = elementValue.body;

    tableBody.append(tableElementBody);
  });
  const headers = mainContent.querySelectorAll('.table__header');
  const rows = mainContent.querySelectorAll('.table__body-row');
  getSort(headers, rows);
  search(rows);
}

//сортировать по убыванию/возрастанию при нажадии на заголовок
function getSort(headers, rows) {
  //направление сортировки (массив может иметь вид asc или desc указывающий направление)
  const directions = Array.from(headers).map(function() {
    return '';
  });
  //преобразовать содержимое ячейки в столбце(добавлен data-type='number' в HTML)
  const transform = (index, content) => {
    const type = headers[index].getAttribute('data-type');//получить тип данных
    switch (type) {
      case 'number':
        return parseFloat(content);
      case 'string':
        default:
          return content;
    }
  }
  //функция сортировки
  const columnSort = function(index) {
    const direction = directions[index] || 'asc'; //получить текущее направление

    const multiplier = (direction === 'asc') ? 1 : -1; //фактор по направлению

    const arrRows = Array.from(rows);//массив из строк
    //сравнить на основе содержимого HTML
    arrRows.sort((rowA, rowB) => {
      const cellA = rowA.querySelectorAll('.table__data')[index].innerHTML;
      const cellB = rowB.querySelectorAll('.table__data')[index].innerHTML;
      //преобразовать содержимое ячеек
      const a = transform(index, cellA);
      const b = transform(index, cellB);
      //сравнить
      switch(true) {
        case a > b: return 1 * multiplier;
        case b < a: return -1 * multiplier;
        case a === b: return 0;
        case cellA > cellB: return 1 * multiplier;
        case cellA < cellB: return -1 * multiplier;
        case cellA === cellB: return 0;
      }
    });

    directions[index] = direction === 'asc' ? 'desc' : 'asc'; //поменять направление
    //добавить новую строку
    arrRows.forEach((newRows) =>{
      tableBody.append(newRows);
    });
  }
  //получить все заголовки
  headers.forEach((header, index) =>{
    header.addEventListener('click', () =>{
      columnSort(index); // функция сортировки
    });
  });
}

// поиск от 3х знаков
function search(rows){
  inputSearch.oninput = () => {
    let val = inputSearch.value;
    if (val != '' && val.length > 2) {
      rows.forEach((element) => {
        if (element.textContent.search(val) === -1) {
          element.classList.add('table__data_hide');
        }
        else {
          element.classList.remove('table__data_hide');
        }
      });
    }
    else {
      rows.forEach((element) => {
        element.classList.remove('table__data_hide');
        });
    }
  }
}
