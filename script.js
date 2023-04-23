let col = 0;
let row = 7;
let grid = getGridLayout();
let type = {
  block: 0,
  path: 1,
  bonus: 2,
  finish: 3,
  character: 4,
};

function getGridLayout() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1, 1, 1, 2, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 2, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [4, 1, 1, 1, 1, 1, 1, 1],
  ];
}

function renderGrid(grid) {
  const tbody = document.querySelector('tbody');
  const blockType = ['block', 'path', 'bonus', 'finish', 'character'];

  const data = grid.map((rowVal) => {
    const col = rowVal.map((colVal) => {
      return `<td class="${blockType[colVal]}">&nbsp;</td>`;
    });
    return `<tr>${col.join('')}</tr>`;
  });

  tbody.innerHTML = data.join('');
}

function handleUp() {
  const up = row - 1;

  if (up >= 0 && grid[up][col] !== 0) {
    lastMove(grid[up][col]);

    const last = Number(window.localStorage.getItem('lastMove'));

    grid[row][col] = 1;
    grid[up][col] = 4;
    row--;

    renderGrid(grid);

    blockEvents(last);
  }
}

function handleDown() {
  const down = row + 1;

  if (down < 8 && grid[down][col] !== 0) {
    lastMove(grid[down][col]);

    const last = Number(window.localStorage.getItem('lastMove'));

    grid[row][col] = 1;
    grid[down][col] = 4;
    row++;

    renderGrid(grid);

    blockEvents(last);
  }
}

function handleLeft() {
  const left = col - 1;

  if (left >= 0 && grid[row][left] !== 0) {
    lastMove(grid[row][left]);

    const last = Number(window.localStorage.getItem('lastMove'));

    grid[row][col] = 1;
    grid[row][left] = 4;
    col--;

    renderGrid(grid);

    blockEvents(last);
  }
}

// contoh
function handleRight() {
  const right = col + 1;

  if (right < 8 && grid[row][right] !== 0) {
    lastMove(grid[row][right]);

    const last = Number(window.localStorage.getItem('lastMove'));

    grid[row][col] = 1;
    grid[row][right] = 4;
    col++;

    renderGrid(grid);

    blockEvents(last);
  }
}

// remember last block
function lastMove(move) {
  window.localStorage.setItem('lastMove', move);
}

// event handlers
function blockEvents(move) {
  let score = Number(window.localStorage.getItem('score'));
  let bonus = Number(window.localStorage.getItem('bonus'));
  const notif = document.getElementById('notif');
  const reset = document.getElementById('reset');

  switch (move) {
    case 2:
      bonus++;

      notif.innerText = `Bermain | Bonus : ${bonus}`;

      localStorage.setItem('bonus', bonus);
      break;
    case 3:
      score++;

      notif.innerText = `Game Tamat | Score : ${score}`;

      localStorage.setItem('score', score);

      document.getElementById('up').disabled = true;
      document.getElementById('down').disabled = true;
      document.getElementById('left').disabled = true;
      document.getElementById('right').disabled = true;
      break;
    default:
      notif.innerText = `Bermain | Score : ${score}`;

      reset.disabled = false;
  }
}

localStorage.removeItem('lastMove');

if (!localStorage.getItem('score')) {
  window.localStorage.setItem('score', 0);
}

if (!localStorage.getItem('bonus')) {
  window.localStorage.setItem('bonus', 0);
}

document.getElementById('up').addEventListener('click', handleUp);
document.getElementById('down').addEventListener('click', handleDown);
document.getElementById('left').addEventListener('click', handleLeft);
document.getElementById('right').addEventListener('click', handleRight);
document.getElementById('reset').addEventListener('click', function () {
  location.reload();
})

renderGrid(grid);