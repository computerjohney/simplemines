const cellPrototype = {};
const size = 7;
let firstClick = true;

//background
document.querySelector("body").style.backgroundColor = "#60b347";
const container = document.querySelector(".container");

// array of size,size
let arrayCell = new Array(size);
for (let r = 0; r < size; r++) {
  arrayCell[r] = new Array(size);
}

// make a view and each model cell
makeGrid(size, size);

//the grid of buttons in the DOM (browser) and
// array of newCell objects
function makeGrid(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //
      //make cell objects, the MODEL
      const newCell = Object.create(cellPrototype);
      newCell.row = r;
      newCell.col = c;
      newCell.mined = false;
      arrayCell[r][c] = newCell;
      //
      //HTML element creation, the VIEW
      let cellElement = document.createElement("div");
      //cellElement.innerHTML = `${r},${c}`;
      container.appendChild(cellElement).className = "grid-item";
      // buttons
      const btn = document.createElement("button");
      cellElement.appendChild(btn);
      // click event for each button
      btn.addEventListener("click", function () {
        clickFunction(r, c, this);
      });
    }
  }
}

//click event handler for that button
// could use target instead of this,that for clicked button
function clickFunction(row, col, that) {
  //that.style.backgroundColor = "red";
  //that.style = "display: none;";
  that.style =
    "background-color: white; outline: none; border: solid beige 1px; ";

  // log clicked cell...
  console.log(arrayCell[row][col]);
  if (firstClick == true) makeMines(row, col);
  firstClick = false;
  var t = document.createTextNode(`💥`);
  if (arrayCell[row][col].mined == true) {
    that.appendChild(t);
  }
  // get a list of neighbor cells
  getNeighbors(row, col, that);
  // color the neighbors
}

function makeMines(row, col) {
  let i = 0;
  while (i < size) {
    let rand1 = Math.floor(Math.random() * size);
    let rand2 = Math.floor(Math.random() * size);
    if (rand1 == row && rand2 == col) continue;
    arrayCell[rand1][rand2].mined = true;
    i++;
  }
}

//function showMines() {}
function getNeighbors(row, col, that) {
  let arrayNeighbors = new Array();
  arrayNeighbors.push([row - 1, col - 1]);
  arrayNeighbors.push([row - 1, col]);
  arrayNeighbors.push([row - 1, col + 1]);
  arrayNeighbors.push([row, col - 1]);
  //arrayNeighbors.push([row], [col]]);
  arrayNeighbors.push([row, col + 1]);
  arrayNeighbors.push([row + 1, col - 1]);
  arrayNeighbors.push([row + 1, col]);
  arrayNeighbors.push([row + 1, col + 1]);
  let total = 0;
  //
  //console.log(arrayNeighbors);
  console.log(`1st:${arrayNeighbors[0]}`);
  console.log(arrayCell[arrayNeighbors[0][0]][arrayNeighbors[0][1]]);
  //
  // need to prune out negatives and size
  //
  for (let i = 0; i < arrayNeighbors.length; i++) {
    console.log(arrayCell[arrayNeighbors[i][0]][arrayNeighbors[i][1]]);
  }

  var t = document.createTextNode(`${total}`);
  that.appendChild(t);
}