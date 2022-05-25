const cellPrototype = {};
const size = 9;
let firstClick = true;

//background
document.querySelector("body").style.backgroundColor = "#60b347";
const container = document.querySelector(".container");

//2 dimensional array of size,size
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
    // don't mine the first cell clicked...
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
  //console.log(arrayCell[arrayNeighbors[0][0]][arrayNeighbors[0][1]]);
  //
  // need to prune out negatives and >=size

  //arrayNeighbors.filter((item) => item.some((v) => v < 0));
  // tested with .some

  //arrayNeighbors.filter((a) => a[0] < 0 || a[1] < 0);

  // data = data.filter(function (element) {
  //   return element !== undefined;
  // });

  for (let i = 0; i < arrayNeighbors.length; i++) {
    console.log(arrayCell[arrayNeighbors[i][0]][arrayNeighbors[i][1]]);
  }

  for (let i = 0; i < arrayNeighbors.length; i++) {
    if (arrayCell[arrayNeighbors[i][0]][arrayNeighbors[i][1]].mined) total++;
  }

  var t = document.createTextNode(`${total}`);
  that.appendChild(t);
}

//examples
// var a = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// var b = [
//   [1, 2, 3],
//   [4, 5, 6],
// ];

// function array_equals(a, b) {
//   return a.length === b.length && a.every((item, idx) => item === b[idx]);
// }

// function diff(A, B) {
//   return A.filter((test) => {
//     return B.findIndex((item) => array_equals(item, test)) == -1;
//   });
// }
// console.log(diff(a, b));
